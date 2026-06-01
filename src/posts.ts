import { useEffect, useState } from 'react';
import { marked } from 'marked';
import { POSTS } from './pages/Posts';

export interface PostMeta {
  file: string;
  title: string;
  date: string;
  category?: string;
}

export interface Post extends PostMeta {
  bodyHtml: string;
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

let cache: Post[] | null = null;

export async function loadPosts(): Promise<Post[]> {
  if (cache) return cache;
  const loaded = await Promise.all(
    POSTS.map(async (meta): Promise<Post | null> => {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}posts/${meta.file}.md?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`${meta.file}.md missing`);
        const body = await res.text();
        return { ...meta, bodyHtml: marked.parse(body) as string };
      } catch (err) {
        console.error(`Failed to load post "${meta.file}":`, err);
        return null;
      }
    })
  );
  cache = loaded.filter((p): p is Post => p !== null).sort((a, b) => (a.date < b.date ? 1 : -1));
  return cache;
}

export function usePosts(): Post[] {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    loadPosts().then(setPosts);
  }, []);
  return posts;
}
