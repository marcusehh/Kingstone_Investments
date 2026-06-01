interface ContactMethod {
  label: string;
  value: string;
  href?: string;
  kind: 'email' | 'link' | 'plain';
}

// Edit this list to change what appears on the Contact page.
const METHODS: ContactMethod[] = [
  { label: 'Email',    value: 'contact@kingstoneinvestments.com', href: 'mailto:marcusejhawkins@gmail.com',                 kind: 'email' },
  { label: 'LinkedIn', value: 'Kingstone Investments',            href: 'https://www.linkedin.com/company/kingstoneinvestments/', kind: 'link' },
  { label: 'HQ',       value: 'London, United Kingdom',                                                                       kind: 'plain' }
];

export default function Contact() {
  return (
    <>
      <div className="page__header">
        <h1 className="page__title">Contact Us</h1>
      </div>

      <div className="garden__section">
        <div className="garden__section-header">
          <h2 className="garden__section-title">Get in touch</h2>
        </div>
        <ul className="post-list">
          {METHODS.map((m) => (
            <li className="post-item" key={m.label}>
              {m.href ? (
                <a
                  className="post-item__link external-link"
                  href={m.href}
                  target={m.kind === 'link' ? '_blank' : undefined}
                  rel={m.kind === 'link' ? 'noreferrer' : undefined}
                >
                  {m.value}
                </a>
              ) : (
                <span className="post-item__link">{m.value}</span>
              )}
              <span className="post-item__date">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
