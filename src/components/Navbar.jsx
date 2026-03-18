import { useState } from 'react';
import Button from './Button.jsx';

const navLinks = [
  { label: 'Features', href: '#features', type: 'section' },
  { label: 'Updates', href: '#updates', type: 'section' },
  { label: 'Support', href: '/support', type: 'page' },
  { label: 'Testimonials', href: '#testimonials', type: 'section' },
  { label: 'Project', href: '#product-progression', type: 'section' },
  { label: 'Book Test', href: '#cta', type: 'section' }
];

const pathname = window.location.pathname.replace(/\/$/, '') || '/';
const hash = window.location.hash;

function getInitialIndex() {
  if (pathname === '/support' || pathname.startsWith('/support/')) {
    const supportIndex = navLinks.findIndex((link) => link.href === '/support');
    return supportIndex >= 0 ? supportIndex : 0;
  }

  if (pathname === '/' && hash) {
    const hashIndex = navLinks.findIndex((link) => link.href === hash);
    if (hashIndex >= 0) {
      return hashIndex;
    }
  }

  return 0;
}

function resolveHref(link) {
  if (link.type === 'section' && pathname !== '/') {
    return `/${link.href}`;
  }
  return link.href;
}

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(getInitialIndex);
  const brandHref = pathname === '/' ? '#top' : '/';

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href={brandHref} className="navbar-brand">
          <img src="/media/bytebite-logo.png" alt="ByteBite logo" className="navbar-logo" />
          <span className="navbar-title">ByteBite</span>
        </a>
        <div className="navbar-actions">
          <nav
            className="pill-nav"
            style={{ '--count': navLinks.length, '--active-index': activeIndex }}
            aria-label="Primary navigation"
          >
            <span className="pill-nav-indicator" aria-hidden="true" />
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={resolveHref(link)}
                className={`pill-nav-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button variant="secondary" href="/login" data-link>
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
