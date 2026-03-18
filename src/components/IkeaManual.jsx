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

function ByteBiteFrontReferenceDrawing() {
  return (
    <svg viewBox="0 0 620 820" role="img" aria-label="ByteBite front line drawing">
      <title>ByteBite front panel line drawing</title>
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M96 80 523 48Q555 49 558 82L581 760Q580 792 548 794L83 784Q49 783 48 750L71 111Q74 84 96 80Z" />
        <rect x="166" y="158" width="300" height="150" />
        <circle cx="205" cy="580" r="52" />
        <circle cx="313" cy="580" r="68" />
        <circle cx="424" cy="580" r="52" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="253" y1="187" x2="394" y2="306" />
        <line x1="270" y1="182" x2="412" y2="301" />
        <line x1="288" y1="176" x2="430" y2="295" />
        <line x1="306" y1="170" x2="448" y2="289" />
        <line x1="324" y1="164" x2="460" y2="277" />
        <line x1="335" y1="132" x2="374" y2="154" />
        <line x1="360" y1="130" x2="398" y2="152" />
        <line x1="386" y1="128" x2="423" y2="151" />
      </g>
      <text x="309" y="430" textAnchor="middle" fontSize="64" fontWeight="700">
        BYTEBITE
      </text>
    </svg>
  );
}

function ByteBiteIsoReferenceDrawing() {
  return (
    <svg viewBox="0 0 760 520" role="img" aria-label="ByteBite isometric line drawing">
      <title>ByteBite isometric shell line drawing</title>
      <g fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M73 220 365 78Q393 66 416 77L680 206Q693 213 693 229L434 435Q412 451 388 438L95 278Q71 267 73 220Z" />
        <path d="M95 278V334Q95 352 108 360L393 510Q409 518 426 505L680 285Q695 273 693 250V229" />
        <rect x="399" y="150" width="190" height="107" transform="rotate(23 399 150)" />
        <circle cx="212" cy="246" r="34" />
        <circle cx="309" cy="282" r="47" />
        <circle cx="400" cy="317" r="34" />
        <rect x="114" y="315" width="35" height="52" />
        <rect x="155" y="331" width="35" height="51" />
        <rect x="196" y="347" width="35" height="50" />
      </g>
      <g stroke="currentColor" strokeWidth="2">
        <line x1="460" y1="169" x2="542" y2="245" />
        <line x1="472" y1="162" x2="554" y2="238" />
        <line x1="484" y1="154" x2="566" y2="231" />
        <line x1="496" y1="146" x2="578" y2="223" />
      </g>
      <text
        x="475"
        y="136"
        textAnchor="middle"
        fontSize="56"
        fontWeight="700"
        transform="rotate(23 475 136)"
      >
        BYTEBITE
      </text>
    </svg>
  );
}

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
          <ByteBiteFrontReferenceDrawing />
          <figcaption>Front panel reference drawing</figcaption>
        </figure>
        <figure className="ikea-drawing-card">
          <ByteBiteIsoReferenceDrawing />
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
