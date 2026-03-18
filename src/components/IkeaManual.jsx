const operatingGuide = [
  {
    title: 'How The Buttons Work',
    points: [
      'Left button: back / previous screen.',
      'Middle button: select, execute, or confirm.',
      'Right button: move focus to the next option.',
      'On the home screen, use right to cycle cards, middle to open, left to back out.'
    ]
  },
  {
    title: 'Turning ByteBite On',
    points: [
      'Connect stable power and any required USB storage first.',
      'Power on and wait for the home screen to fully load.',
      'Do not press run actions until the UI is responsive.'
    ]
  },
  {
    title: 'How Menu Navigation Works',
    points: [
      'Home menu is the top-level controller for your workflows.',
      'Right cycles through main menu tiles.',
      'Middle opens the highlighted tile.',
      'Left returns to the previous menu.'
    ]
  },
  {
    title: 'Forensic Menu Process',
    points: [
      'Open Forensic from Home using middle on the highlighted tile.',
      'Use right to move through options and middle to toggle/select.',
      'Run extraction/analysis and wait for completion messages.',
      'Review output and export paths before leaving the menu.'
    ]
  },
  {
    title: 'Offensive Menu Process',
    points: [
      'Open Offensive from Home.',
      'Cycle available actions with right and execute with middle.',
      'Use left to cancel/back when needed.',
      'Confirm status/log output after each operation.'
    ]
  },
  {
    title: 'Settings Menu Process',
    points: [
      'Open Settings from Home to manage configuration.',
      'Navigate settings entries with right, select/apply with middle.',
      'Use left to return without exiting the entire app.',
      'After changes, verify behavior from Home before field use.'
    ]
  }
];

function IkeaManual() {
  return (
    <section className="ikea-manual" aria-label="ByteBite IKEA-style manual">
      <header className="ikea-manual-header">
        <p className="ikea-part-code">BYTEBITE BB-01</p>
        <h2>Operator Manual</h2>
        <p>Read in order: buttons, power on, menu navigation, then each menu workflow.</p>
      </header>

      <div className="ikea-drawing-grid">
        <figure className="ikea-drawing-card">
          <img src="/manual/bytebite-front.png" alt="ByteBite front panel line drawing" />
          <figcaption>Front panel reference drawing</figcaption>
        </figure>
        <figure className="ikea-drawing-card">
          <img src="/manual/bytebite-iso.png" alt="ByteBite isometric shell line drawing" />
          <figcaption>Isometric shell reference drawing</figcaption>
        </figure>
      </div>

      <div className="ikea-callouts" aria-label="Manual callouts">
        <div className="ikea-callout">
          <span className="ikea-callout-icon" aria-hidden="true">
            ⚠
          </span>
          <p>Navigation buttons only: left=GPIO22, middle=GPIO27, right=GPIO17.</p>
        </div>
        <div className="ikea-callout">
          <span className="ikea-callout-icon" aria-hidden="true">
            ✓
          </span>
          <p>Always wait for workflow completion text before powering off or unplugging storage.</p>
        </div>
      </div>

      <ol className="ikea-steps" aria-label="Manual flow">
        {operatingGuide.map((step, index) => (
          <li key={step.title} className="ikea-step-card">
            <span className="ikea-step-number" aria-hidden="true">
              {index + 1}
            </span>
            <div>
              <h3>{step.title}</h3>
              <ul className="ikea-step-list">
                {step.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default IkeaManual;
