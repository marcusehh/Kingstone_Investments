import { useMarkdownCollection } from '../loadMarkdown';

interface ResultMeta {
  file: string;
  title: string;
  date: string;
}

const QUARTERLY_RESULTS: ResultMeta[] = [
  { file: 'q2-2026', title: 'Q2 2026', date: 'July 2026' },
  { file: 'q1-2026', title: 'Q1 2026', date: 'April 2026' },
];

export default function Performance() {
  const quarterlyResults = useMarkdownCollection('quarterly-results', QUARTERLY_RESULTS).sort(
    (a, b) => (a.meta.date < b.meta.date ? 1 : -1)
  );

  return (
    <>
      <div className="page__header page__header--articles">
        <h1 className="page__title">Performance</h1>
        <p className="page__subtitle">Quarterly results from Kingstone Investments.</p>
      </div>

      <div className="performance-results">
        {quarterlyResults.map((qr) => (
          <div className="home-card home-card--qr" key={qr.meta.file}>
            <img src="/assets/KI_BW_Logo.jpg" alt="" className="home-card__qr-logo" />
            <span className="home-card__title">{qr.meta.title}</span>
            <div
              className="home-card__preview"
              dangerouslySetInnerHTML={{ __html: qr.bodyHtml }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
