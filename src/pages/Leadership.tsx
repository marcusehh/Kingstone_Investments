interface Leader {
  name: string;
  role: string;
  linkedin: string;
  bullets?: string[];
}

// Edit this list to add/remove/reorder leaders.
const LEADERS: Leader[] = [
  { name: 'Oliver Kemp',    role: 'Chief Executive Officer & Founding Partner', linkedin: 'https://linkedin.com/in/oliver-e-kemp/',                bullets: ['Does bullshit.'] },
  { name: 'Max Norman',     role: 'Chief Operating Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/normanmax/',                bullets: ['Does bullshit.'] },
  { name: 'Leon Brierly',   role: 'Chief Financial Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/leon-brierly-0a5a2a305/',   bullets: ['Does bullshit.'] },
  { name: 'Ethan Ghosh',    role: 'Chief Investment Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/ethan-ghosh-7505aa318/',   bullets: ['Does bullshit.'] },
  { name: 'Marcus Hawkins', role: 'Chief Technology Officer & Founding Partner', linkedin: 'https://linkedin.com/in/marcusejhawkins',              bullets: ['Does bullshit.'] },
  { name: 'Aaron McEntire', role: 'Chief Risk Officer & Founding Partner',       linkedin: 'https://www.linkedin.com/in/aaron-m-646174296/',       bullets: ['Does bullshit.'] },
  { name: 'Ollie Barnett',  role: 'Head of Equities',                            linkedin: 'https://www.linkedin.com/in/ollie-barnett-2804owbb/',  bullets: ['Does bullshit.'] },
  { name: 'Ivor Alberto',   role: 'Head of Commodities',                         linkedin: 'https://www.linkedin.com/in/ivor-alberto-245816269/',  bullets: ['Does bullshit.'] },
  { name: 'Lenny Tucker',   role: 'Head of Macroeconomics',                      linkedin: 'https://www.linkedin.com/in/lenny-tucker-3b0324282/',  bullets: ['Does bullshit.'] }
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
            <h3>
              <a href={l.linkedin} target="_blank" rel="noreferrer">{l.name}</a>
            </h3>
            <p><em>{l.role}</em></p>
            {l.bullets && l.bullets.length > 0 && (
              <ul>
                {l.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
