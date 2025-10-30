import Button from './Button.jsx';

const navLinks = [
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Features', href: '#features' },
  { label: 'Updates', href: '#updates' }
];

function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand">
          <span className="navbar-glyph">BB</span>
          <span className="navbar-title">ByteBite</span>
        </a>
        <div className="navbar-actions">
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <Button variant="secondary" href="/login">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
