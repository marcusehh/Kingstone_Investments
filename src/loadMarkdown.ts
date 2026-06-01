import { useEffect, useState } from 'react';
import { marked } from 'marked';

export interface MarkdownItem<TMeta> {
  meta: TMeta;
  bodyHtml: string;
}

/**
 * Fetch a list of markdown files from `public/<folder>/<file>.md` and parse
 * each one. The metadata you pass in (title, date, etc.) is kept alongside
 * the rendered HTML body.
 */
export function useMarkdownCollection<TMeta extends { file: string }>(
  folder: string,
  items: TMeta[]
): MarkdownItem<TMeta>[] {
  const [loaded, setLoaded] = useState<MarkdownItem<TMeta>[]>([]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      items.map(async (meta): Promise<MarkdownItem<TMeta> | null> => {
        try {
          const res = await fetch(
            `${import.meta.env.BASE_URL}${folder}/${meta.file}.md?t=${Date.now()}`,
            { cache: 'no-store' }
          );
          if (!res.ok) throw new Error(`${meta.file}.md missing`);
          const body = await res.text();
          return { meta, bodyHtml: marked.parse(body) as string };
        } catch (err) {
          console.error(`Failed to load ${folder}/${meta.file}:`, err);
          return null;
        }
      })
    ).then((results) => {
      if (!cancelled) {
        setLoaded(results.filter((r): r is MarkdownItem<TMeta> => r !== null));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [folder, JSON.stringify(items)]);

  return loaded;
}
