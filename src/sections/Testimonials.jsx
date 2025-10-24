import ElectricBorder from '../components/ElectricBorder.jsx';

const testimonials = [
  {
    quote:
      'ByteBite let our red and blue teams operate from the same kit. We can image, analyze, and pivot to offensive operations without swapping hardware.',
    name: 'Maya Thornton',
    title: 'Director, NCSC',
    company: 'National Cyber Security Centre'
  },
  {
    quote:
      'The air-gapped workflow is uncompromising. We maintained evidentiary integrity on a sensitive insider case while running live exploit tests.',
    name: 'Jonah Reyes',
    title: 'Lead Forensic Examiner',
    company: 'West Yorkshire Police'
  },
  {
    quote:
      'Having swappable RF and memory modules in one device changed how we respond on site. Our time-to-insight dropped from hours to minutes.',
    name: 'Lt. Harper Kim',
    title: 'Incident Response Commander',
    company: 'Central Command'
  }
];

const metrics = [
  { label: 'Average imaging time', value: '12m 44s' },
  { label: 'Spectrum capture fidelity', value: '97.2%' },
  { label: 'Chain-of-custody variance', value: '<0.1%' }
];

function Testimonials() {
  return (
    <section className="container" id="testimonials">
      <div className="section-heading">
        <span className="badge">Field reports</span>
        <h2>Trusted by expeditionary cyber units</h2>
        <p>
          From sovereign investigations to rapid counter-intrusion ops, ByteBite delivers hardened capability without sacrificing
          speed or evidentiary assurance.
        </p>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <ElectricBorder
            key={testimonial.name}
            color="#ff4df6"
            chaos={0.6}
            speed={1.1}
            thickness={1.8}
            style={{ borderRadius: 24 }}
          >
            <blockquote className="card testimonial">
              <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{testimonial.quote}</p>
              <footer>
                <div>
                  <span>{testimonial.name}</span>
                  <div className="testimonial-company">{testimonial.title}</div>
                </div>
                <span className="tag">{testimonial.company}</span>
              </footer>
            </blockquote>
          </ElectricBorder>
        ))}
      </div>
      <div className="impact-metrics">
        {metrics.map((metric) => (
          <div className="metric-card" key={metric.label}>
            <span className="metric-value">{metric.value}</span>
            <span style={{ color: 'var(--color-muted)' }}>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
