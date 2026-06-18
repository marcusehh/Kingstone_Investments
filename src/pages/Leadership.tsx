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
  { name: 'Max Norman',     role: 'Chief Operating Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/normanmax/',                sector: 'Energy & Utilities', bullets: ['Max oversees all operations of Kingstone Investments, alongside leading the Energy and Utilities sector. He has internship experience spanning the breadth of financial services, from Wealth Management at global banks like HSBC and smaller boutiques alike. He has also gained experience in buy-side operations at Harwood Private Equity (>£1bn in total investment value) as well as strong exposure to fractional CFO services supporting VC-backed startups from seed to Series C. At Loughborough University, Max is studying Economics and Management and serves as Vice Chair of Loughborough Finance and Consulting Society (the largest society on campus with 500+ members). He is also the Head of Technology Sector at the UK’s largest student-managed fund with £300k+ in AUM and enjoys a wide variety of sports in his spare time.'] },
  { name: 'Leon Brierly',   role: 'Chief Financial Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/leon-brierly-0a5a2a305/',  sector: 'FX',          bullets: ['As Chief Financial Officer, Leon oversees the financial operations of the company alongside leading the fund\'s FX coverage. He has gained early exposure to professional services and banking through shadowing a corporate restructuring project manager at KPMG and a B2B lending internship at Sparkasse Nürnberg in Germany. At the University of Exeter, Leon is the Treasurer of the Art Society and is studying Economics with Finance.'] },
  { name: 'Ethan Ghosh',    role: 'Chief Investment Officer & Founding Partner', linkedin: 'https://www.linkedin.com/in/ethan-ghosh-7505aa318/',  sector: 'TMT',         bullets: ['As Chief Investment Officer, Ethan shapes Kingstone\'s investment strategy across equities and fixed-income. He focuses on the TMT sector, generating ideas through a combination of fundamental and macroeconomic research. He has gained relevant experience as a summer intern at Hanbury Strategy and as a spring intern at Copper.co where he analysed crypto price movements and delivered actionable insights for finance teams. Within these experiences he also gained direct exposure to C-suite level thinking for leading firms. Throughout his professional experience and trading competitions he has proven his expertise to manage securities using both quantitative and holistic strategies. Ethan is an undergraduate at the University of Bristol studying BSc Economics & Finance, aspiring to a career in asset management.'] },
  { name: 'Marcus Hawkins', role: 'Chief Technology Officer & Founding Partner', linkedin: 'https://linkedin.com/in/marcusejhawkins',             sector: 'TMT',         bullets: ['As Chief Technology Officer, Marcus\' responsibilities span the technological infrastructure of the company: developing and maintaining the website, managing the company\'s technological operations and applying his background in programming to engineering tools to streamline the selection and evaluation of equities to invest into. With Ethan, Marcus also leads investments in TMT, after gaining relevant experience as a pioneering member of the technology advisory division of the student-led consultancy, Exe-Consulting. Marcus is an incoming undergraduate at University College London (UCL) and will study Social Data Science.'] },
  { name: 'Aaron McEntire', role: 'Chief Risk Officer & Founding Partner',       linkedin: 'https://www.linkedin.com/in/aaron-m-646174296/',       sector: 'Industrials',        bullets: ['As Chief Risk Officer, Aaron is responsible for monitoring portfolio exposure and ensuring the fund\'s positions remain within its risk framework, alongside covering the Industrials sector. He has developed his expertise across multiple financial and accounting departments as an intern at Evans Turner Ltd, Ackroyd London and as an analyst in Loughborough\'s Student-Managed Fund. Aaron is an undergraduate at Loughborough University studying BSc Economics & Finance.'] },
  { name: 'Ollie Barnett',  role: 'Head of Equities',                            linkedin: 'https://www.linkedin.com/in/ollie-barnett-2804owbb/', sector: 'Financials',    bullets: ['Ollie is responsible for advising equity investment decisions in the financial sector. He gained early insight into how large organisations allocate and deploy capital through work experience in Transport for London\'s Asset Strategy and Engineering departments, and was previously a senior member of the Kingstonian Economics & Finance Society. Ollie is an undergraduate at the University of Bristol studying BSc Economics.'] },
  { name: 'Ivor Alberto',   role: 'Head of Commodities',                         linkedin: 'https://www.linkedin.com/in/ivor-alberto-245816269/', sector: 'Healthcare', bullets: ['Ivor heads the Commodities Division at Kingstone Investment as well as the healthcare portfolio. As a first-year Politics, Philosophy and Economics student at Loughborough University, he provides a multidisciplinary perspective to the team, whilst offering broad market exposure as the Head of Research for Loughborough\'s Student-Managed Fund and a Real Estate Market Analyst for Loughborough\'s Finance and Investment Society.', 'Ivor has completed Spring Week programmes at both PwC and Moody\'s Corporation and will be undertaking an internship at PKF Littlejohn in the summer of 2026. His experience spans M&A deals advisory, client engagement and outreach, credit risk analysis, and audit. These experiences developed his analytical rigour, conceptual thinking and collaboration skills, whilst reflecting his profound interest in global markets, public policy and stakeholder impact.'] },
  { name: 'Lenny Tucker',   role: 'Head of Macroeconomics',                      linkedin: 'https://www.linkedin.com/in/lenny-tucker-3b0324282/', sector: 'Macro',       bullets: ['Lenny leads the fund\'s macroeconomic research as Head of Macroeconomics. He also writes the weekly Kingstone macro-reports covering the rate of inflation, interest and economic growth as well as the key concepts shaping markets. He applies his deep macroeconomic research to form trade theses with a deep awareness of international factors. Lenny is an undergraduate at the University of Bristol studying BSc Economics & Finance.'] }
];

export default function Leadership() {
  return (
    <>
      <div className="page__header">
        <h1 className="page__title">Leadership</h1>
        <p className="page__subtitle">All of our members hold the same responsibility in developing pitches and informing investment decisions covering and not limited to: growth factors, risks and valuation across their respective sectors.</p>
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
