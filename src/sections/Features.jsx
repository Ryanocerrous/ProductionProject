import ElectricBorder from '../components/ElectricBorder.jsx';

const features = [
  {
    title: 'Dual-stack acquisition',
    description: 'Parallel physical and logical extraction pipelines with hardware-level isolation for rapid imaging of mobile devices and edge nodes.',
    icon: '🛰️'
  },
  {
    title: 'Offensive toolkit dock',
    description: 'Slot in proprietary exploit modules, run custom payloads, and escalate access without ever leaving the secure field unit.',
    icon: '🧩'
  },
  {
    title: 'Air-gapped intelligence core',
    description: 'Onboard analytics engine performs triage, artifact carving, and signal correlation—no external network required.',
    icon: '🧠'
  },
  {
    title: 'Mission telemetry & audit',
    description: 'Cryptographically sealed logs give legal defensibility while surfacing risk alerts and operator guidance in real time.',
    icon: '📡'
  }
];

function Features() {
  return (
    <section className="container" id="features">
      <div className="section-heading">
        <span className="badge">Core capabilities</span>
        <h2>Operational supremacy in a carry kit</h2>
        <p>
          ByteBite combines hardened hardware, zero-trust firmware, and an adaptable software stack so your team can execute
          digital extractions or decisive exploit delivery under any conditions.
        </p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <ElectricBorder
            key={feature.title}
            color="#7df9ff"
            chaos={0.45}
            speed={1.4}
            thickness={1.6}
            style={{ borderRadius: 24 }}
          >
            <article className="card feature-card">
              <span className="feature-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>{feature.description}</p>
            </article>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
}

export default Features;
