import { useState } from 'react';
import Button from './Button.jsx';

const navLinks = [
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Features', href: '#features' },
  { label: 'Updates', href: '#updates' }
];

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand">
          <span className="navbar-glyph">BB</span>
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
                href={link.href}
                className={`pill-nav-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button variant="secondary" href="#cta">
            Field brief
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
