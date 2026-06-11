interface Leader {
  name: string;
  role: string;
  linkedin: string;
  sector?: string;
  bullets?: string[];
}

// Edit this list to add/remove/reorder leaders.
const LEADERS: Leader[] = [
  { name: 'Oliver Kemp',    role: 'Chief Executive Officer & Founding Partner', linkedin: 'https://linkedin.com/in/oliver-e-kemp/',               sector: 'Real Estate', bullets: ['Oliver\'s interest in finance goes beyond the technical. He has a keen interest in how capital moves, what drives markets and the long-term structural forces that shape economies. He is particularly involved with real estate and has joined the Project Destined Commercial Real Estate Program where he is gaining an in-depth understanding of the industry. Oliver is also a student ambassador for the University of Bristol Centre for Innovation and Entrepreneurship while he studies his integrated Masters in History with Innovation.'] },
  { name: 'Max Norman',     role: 'Chief Operating Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/normanmax/',                sector: 'Energy & Utilities', bullets: ['Max has a strong background in operations as the Head of Technology at the Loughborough Student Managed Fund and as the Vice Chair of the Loughborough Finance & Consulting Society. Max has applied his BSc in Economics with Management to roles extending beyond Kingstone Investments such as a Founder\'s Associate of Uprise Consulting.'] },
  { name: 'Leon Brierly',   role: 'Chief Financial Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/leon-brierly-0a5a2a305/',  sector: 'FX',          bullets: ['As Chief Financial Officer, Leon oversees the financial operations of Kingstone Investments alongside leading the fund\'s FX coverage. He has gained early exposure to professional services and banking through shadowing a corporate restructuring project manager at KPMG and a B2B lending internship at Sparkasse Nürnberg in Germany. At the University of Exeter, Leon is the Treasurer of the Art Society and is studying Economics with Finance.'] },
  { name: 'Ethan Ghosh',    role: 'Chief Investment Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/ethan-ghosh-7505aa318/',  sector: 'TMT',         bullets: ['As Chief Investment Officer, Ethan shapes Kingstone\'s investment strategy across equities, fixed-income and commodities. He focuses on the TMT portfolio, generating ideas through fundamental and macroeconomic research, and is heading the development of a quantitative mean reversion strategy backtested across ten years of market data. Ethan has gained industry experience as a Spring Intern at digital asset firm Copper.co and through programmes with PIMCO and Morgan Stanley and led a team to a top performance in the Bloomberg Trading Competition. He is an undergraduate at the University of Bristol studying BSc Economics & Finance, aspiring to a career in asset management.'] },
  { name: 'Marcus Hawkins', role: 'Chief Technology Officer & Founding Partner', linkedin: 'https://linkedin.com/in/marcusejhawkins',             sector: 'TMT',         bullets: ['Marcus drives the technological edge of Kingstone Investments as Chief Technology Officer. Alongside Ethan, he also focuses on the TMT sector. He has engineered multiple applications in Python to assist with portfolio allocation and assessing a company\'s intrinsic value and risk profile. His expertise extends beyond tools; he also developed the KI website and manages the company\'s technological operations. Beyond the fund, Marcus was a pioneering member of the newly founded Technology Advisory division at Exe Consulting (a student-led consultancy), where he established new client relationships and authored research on developments in the technology sector. Marcus studied a term at the University of Exeter where he achieved a first in modules covering maths, statistics and economic theory before transferring to University College London to study Social Data Science. At UCL he will hone his statistical and data analytics skills while gaining a deep social perspective that he will bring to analysing financial markets.'] },
  { name: 'Aaron McEntire', role: 'Chief Risk Officer & Founding Partner',       linkedin: 'https://www.linkedin.com/in/aaron-m-646174296/',       sector: 'Industrials',        bullets: ['As Chief Risk Officer, Aaron is responsible for monitoring portfolio exposure and ensuring the fund\'s positions remain within its risk framework, alongside covering the Industrials sector. He is an undergraduate at Loughborough University studying BSc Economics & Finance.'] },
  { name: 'Ollie Barnett',  role: 'Head of Equities',                            linkedin: 'https://www.linkedin.com/in/ollie-barnett-2804owbb/', sector: 'Financials',    bullets: ['Ollie is responsible for advising equity investment decisions in the financial sector. He gained early insight into how large organisations allocate and deploy capital through work experience in Transport for London\'s Asset Strategy and Engineering departments, and was previously a senior member of the Kingstonian Economics & Finance Society. Ollie is an undergraduate at the University of Bristol studying BSc Economics.'] },
  { name: 'Ivor Alberto',   role: 'Head of Commodities',                         linkedin: 'https://www.linkedin.com/in/ivor-alberto-245816269/', sector: 'Healthcare', bullets: ['Ivor heads commodities and healthcare, closely monitoring geopolitical developments to inform Kingstone\'s positioning. He brings broad market exposure as Head of Research at the Loughborough Student Managed Fund and as a Real Estate Market Analyst for the Loughborough Finance & Investment Society, where he won the Semester 1 Stock Pitch Competition for the real estate sector. Ivor has completed Spring Weeks at PwC and Moody\'s and the Project Destined Commercial Real Estate Fundamentals Programme, and is an undergraduate at Loughborough University studying Philosophy, Politics and Economics.'] },
  { name: 'Lenny Tucker',   role: 'Head of Macroeconomics',                      linkedin: 'https://www.linkedin.com/in/lenny-tucker-3b0324282/', sector: 'Macro',       bullets: ['Lenny leads the fund\'s macroeconomic research as Head of Macroeconomics and writes the weekly Kingstone macro reports covering the rate of inflation, interest and economic growth as well as the key concepts shaping markets. He applies his deep macroeconomic research to form trade theses with a deep awareness of international factors. Lenny is an undergraduate at the University of Bristol studying BSc Economics & Finance.'] }
];

export default function Leadership() {
  return (
    <>
      <div className="page__header">
        <h1 className="page__title">Leadership</h1>
        <p className="page__subtitle">All of our members hold the same responsibility in developing pitches and informing investment decisions, including but not limited to: growth factors, risks, and valuations across their respective sectors.</p>
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
