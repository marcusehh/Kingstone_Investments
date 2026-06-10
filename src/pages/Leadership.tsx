interface Leader {
  name: string;
  role: string;
  linkedin: string;
  sector?: string;
  bullets?: string[];
}

// Edit this list to add/remove/reorder leaders.
const LEADERS: Leader[] = [
  { name: 'Oliver Kemp',    role: 'Chief Executive Officer & Founding Partner', linkedin: 'https://linkedin.com/in/oliver-e-kemp/',               sector: 'Real Estate', bullets: ['Oliver\'s interest in finance goes beyond the technical. He has a keen interest in how capital moves, what drives markets and the long-term structural forces that shape economies. He is particularly involved with real estate and has joined the Project Destined Commercial Real Estate Program where he is gaining an in-depth understanding of the industry. Olliver is also a student ambassador for the University of Bristol Centre for Innovation and Entrepreneurship while he studies his integrated Master in History with Innovation.'] },
  { name: 'Max Norman',     role: 'Chief Operating Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/normanmax/',                sector: 'Energy & Utilities', bullets: ['Max has a strong background in operations as the Head of Technology at the Loughborough Student Managed Fund and as the Vice Chair of the Loughborough Finance & Consulting Society. Max has applied his bachelor\'s degree in Economics with Management to roles extending beyond Kingstone Investments sucha as a founder\'s associate of Uprise Consulting.'] },
  { name: 'Leon Brierly',   role: 'Chief Financial Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/leon-brierly-0a5a2a305/',  sector: 'FX',          bullets: ['Leon is an undergraduate at the University of Exeter studying BSc Economics & Finance.'] },
  { name: 'Ethan Ghosh',    role: 'Chief Investment Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/ethan-ghosh-7505aa318/',  sector: 'TMT',         bullets: ['Ethan is an undergraduate at the University of Bristol studying BSc Economics & Finance.'] },
  { name: 'Marcus Hawkins', role: 'Chief Technology Officer & Founding Partner', linkedin: 'https://linkedin.com/in/marcusejhawkins',             sector: 'TMT',         bullets: ['Marcus is an incoming undergraduate at University College London (UCL) and will study Social Data Science.'] },
  { name: 'Aaron McEntire', role: 'Chief Risk Officer & Founding Partner',       linkedin: 'https://www.linkedin.com/in/aaron-m-646174296/',       sector: 'Industrials',        bullets: ['Aaron is an undergraduate at the University of Loughborough studying BSc Economics & Finance.'] },
  { name: 'Ollie Barnett',  role: 'Head of Equities',                            linkedin: 'https://www.linkedin.com/in/ollie-barnett-2804owbb/', sector: 'Financials',    bullets: ['Ollie is an undergraduate at the University of Bristol studying BSc Economics & Finance.'] },
  { name: 'Ivor Alberto',   role: 'Head of Commodities',                         linkedin: 'https://www.linkedin.com/in/ivor-alberto-245816269/', sector: 'Healthcare', bullets: ['Ivor is an undergraduate at the University of Bristol studying PPE'] },
  { name: 'Lenny Tucker',   role: 'Head of Macroeconomics',                      linkedin: 'https://www.linkedin.com/in/lenny-tucker-3b0324282/', sector: 'Macro',       bullets: ['Lenny is an undergraduate at the University of Bristol studying BSc Economics & Finance.'] }
];

export default function Leadership() {
  return (
    <>
      <div className="page__header">
        <h1 className="page__title">Leadership</h1>
        <p className="page__subtitle">The team behind Kingstone Investments.</p>
      </div>

      <div className="leader-cards-wrapper">
        {LEADERS.map((l) => (
          <article className="leader-card" key={l.name}>
            <header className="leader-card__header">
              <h3>
                <a href={l.linkedin} target="_blank" rel="noreferrer">{l.name}</a>
              </h3>
              <p><em>{l.role}</em></p>
              <div className="leader-card__tags">
                {l.sector && <span className="leader-card__sector">{l.sector}</span>}
              </div>
            </header>
            <div className="leader-card__body">
              {l.bullets && l.bullets.length > 0 && (
                <ul>
                  {l.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
