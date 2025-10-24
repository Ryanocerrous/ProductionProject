import ElectricBorder from '../components/ElectricBorder.jsx';

const updates = [
  {
    version: 'v0.9.4',
    codename: 'Blacklight',
    description: 'Expanded mobile chipset support and added encrypted extraction pipeline for Android 15 beta builds.',
    date: 'July 2, 2025'
  },
  {
    version: 'v0.9.2',
    codename: 'Nightfall',
    description: 'Introduced air-gapped deployment mode with hardware kill-switch diagnostics and telemetry scrubbing.',
    date: 'May 18, 2025'
  },
  {
    version: 'v0.9',
    codename: 'Vector',
    description: 'Initial field-release candidate featuring modular injections and rapid imaging toolkit upgrades.',
    date: 'Sep 30, 2025'
  }
];

function Updates() {
  return (
    <section className="container" id="updates">
      <div className="section-heading">
        <span className="badge">Release notes</span>
        <h2>Mission-critical updates on a rapid cadence</h2>
        <p>
          Track firmware builds, hardware refinements, and exploitation toolkit drops. ByteBite evolves with each field op to stay ahead of hardened targets.
        </p>
      </div>
      <div className="updates-grid">
        {updates.map((update) => (
          <ElectricBorder
            key={update.version}
            color="#7df9ff"
            chaos={0.55}
            speed={1.3}
            thickness={1.5}
            style={{ borderRadius: 24 }}
          >
            <article className="card update-card">
              <div className="update-header">
                <span className="tag">{update.version}</span>
                <span className="update-codename">{update.codename}</span>
              </div>
              <p style={{ color: 'var(--color-muted)', lineHeight: 1.6 }}>{update.description}</p>
              <span className="update-date">{update.date}</span>
            </article>
          </ElectricBorder>
        ))}
      </div>
    </section>
  );
}

export default Updates;
