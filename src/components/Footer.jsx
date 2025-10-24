const footerLinks = {
  Product: [
    { label: 'Capabilities', href: '#features' },
    { label: 'Updates', href: '#updates' },
    { label: 'Testimonials', href: '#testimonials' }
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' }
  ],
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'Field reports', href: '#testimonials' },
    { label: 'Support', href: 'mailto:ops@bytebite.com' }
  ]
};

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>ByteBite</h3>
            <p>
              Portable cyber operations platform for agencies that need decisive extraction and exploitation tooling in one
              hardened unit.
            </p>
          </div>
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ color: '#fff' }}>{section}</h4>
              <div className="footer-links">
                {links.map((link) => (
                  <a key={link.label} href={link.href} style={{ color: 'inherit' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} ByteBite Labs Inc. All rights reserved.</span>
          <nav>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="mailto:security@bytebite.com">Security</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
