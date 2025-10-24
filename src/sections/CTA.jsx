import Button from '../components/Button.jsx';

function CTA() {
  return (
    <section className="container" id="cta">
      <div className="cta">
        <div>
          <span className="badge" style={{ color: '#fff', backgroundColor: 'rgba(255, 255, 255, 0.18)' }}>
            Mission briefing
          </span>
          <h2 style={{ fontSize: '2.4rem', margin: '1rem 0' }}>Book a field readiness brief</h2>
          <p style={{ lineHeight: 1.7 }}>
            Coordinate with our threat lab to stage ByteBite for your upcoming deployment. We tailor modules, prep exploit
            toolchains, and deliver a sealed operational runbook.
          </p>
        </div>
        <div className="cta-actions">
          <Button href="mailto:ops@bytebite.com">Request secure briefing</Button>
          <Button variant="secondary" href="#features">
            Download spec dossier
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
