export const workingTitle = 'ByteBite: A Portable Cybersecurity Device for Mobile Data Extraction and Exploitation.';

export const projectAim = `ByteBite is a portable plug-and-play cybersecurity device built on a Raspberry Pi 5 that
unifies forensic data extraction and offensive payload delivery. The goal is to challenge the limitations of existing
solutions—typically bulky, expensive, and single-purpose—by delivering a dual-mode unit for Evidence Mode (ADB
extraction with write blocking) and Offensive Mode (HID payload injection). The prototype emphasises mobility, a
field-ready interface, removable storage, battery power, encryption, and ethical compliance with UK legislation.`;

export const productSteps = [
  {
    step: '01',
    title: 'Ideation',
    summary:
      'Framed the device concept, target users (intelligence, law enforcement, military) and ethical boundaries while benchmarking tools such as Cellebrite UFED and the Hak5 Rubber Ducky.',
    deliverables: [
      'Vision statement & sketches',
      'Feature list and scope alignment with degree goals',
      'Competitive comparison & ethical outline'
    ]
  },
  {
    step: '02',
    title: 'Feasibility Study',
    summary:
      'Evaluated technical, financial, and legal feasibility including Raspberry Pi 5 capability, encryption, write blocking, and HID emulation. Identified risks using MoSCoW analysis.',
    deliverables: [
      'Feasibility & risk register',
      'Legal compliance review (IPA, GDPR)',
      'Technical capability matrix'
    ]
  },
  {
    step: '03',
    title: 'Product Design',
    summary:
      'Focused on enclosure CAD, UI mock-ups, wiring diagrams, and UX flows for dual operating modes while ensuring durability and discretion.',
    deliverables: [
      'Fusion 360 CAD & STL files',
      'GUI mock-ups & workflow maps',
      'Hardware placement diagrams'
    ]
  },
  {
    step: '04',
    title: 'Development',
    summary:
      'Assembled hardware, installed Kali Linux, wrote extraction and payload scripts, and integrated screen and physical controls with a quick boot experience.',
    deliverables: [
      'Working prototype assembly',
      'ADB extraction & HID payload scripts',
      'Source control & documentation'
    ]
  },
  {
    step: '05',
    title: 'Testing',
    summary:
      'Validated Evidence Mode across Android OEMs with hash verification, tested HID payload success rate, battery performance, and enclosure durability.',
    deliverables: [
      'Structured test logs & outcomes',
      'Power management results',
      'Limitations analysis for iteration'
    ]
  },
  {
    step: '06',
    title: 'Launch',
    summary:
      'Deliver a functioning prototype, technical report, demo, public site (bytebite.co.uk), codebase, STL files, and an ethical/legal dossier.',
    deliverables: [
      'Launch demo & technical report',
      'Public website & repositories',
      'Strength/weakness comparison vs industry'
    ]
  },
  {
    step: '07',
    title: 'Post Launch',
    summary:
      'Reflect on constraints, propose enhancements (compatibility, payload depth, manufacturing), and recommend ethical safeguards such as restricted distribution.',
    deliverables: [
      'Future improvements roadmap',
      'Ethical recommendations & role-based variants',
      'Lessons learned retrospective'
    ]
  }
];

export const timeline = [
  { week: 1, area: 'Launch & Setup', deliverables: 'GitHub setup, finalise vision' },
  { week: 2, area: 'Feasibility Review', deliverables: 'Feasibility report, risk register' },
  { week: 3, area: 'Component Setup', deliverables: 'Hardware assembly, OS install' },
  { week: 4, area: 'Software Basics', deliverables: 'ADB scripts, GUI layout' },
  { week: 5, area: 'HID Development', deliverables: 'Payload testing, mode menu' },
  { week: 6, area: 'Encryption Testing', deliverables: 'Secure extraction, verification' },
  { week: 7, area: 'CAD Design', deliverables: 'Modelling, documentation' },
  { week: 8, area: 'Integration', deliverables: 'Prototype assembly' },
  { week: 9, area: 'Testing', deliverables: 'Data integrity, HID validation' },
  { week: 10, area: 'WIP Presentation', deliverables: 'Progress demo, CAD refinement' },
  { week: 11, area: 'Refinement', deliverables: 'Final enclosure, software optimisation' },
  { week: 12, area: 'Documentation', deliverables: 'Website content, report writing' },
  { week: 13, area: 'Evaluation & Ethics', deliverables: 'Ethics research, improvements' },
  { week: 14, area: 'Final Edits', deliverables: 'Proofreading, final checks' },
  { week: 15, area: 'Presentation', deliverables: 'Final product presentation' }
];

export const knowledgeBase = {
  theories: [
    'CIA Triad (Confidentiality, Integrity, Availability)',
    'Cyber Kill Chain lifecycle',
    'Ethical hacking frameworks aligned with the Computer Misuse Act',
    'ACPO guidelines for digital evidence handling'
  ],
  concepts: [
    'Digital forensic acquisition and chain-of-custody',
    'HID (Human Interface Device) emulation for payload delivery',
    'Encryption for protecting extracted evidence under GDPR'
  ],
  people: [
    'Kim Zetter – Countdown to Zero Day',
    'Justin Seitz – Black Hat Python'
  ]
};

export const keywordMatrix = [
  { core: 'USB Exploitation', broader: 'Cyber Attacks', narrower: 'HID Injection', related: 'Hak5 Rubber Ducky' },
  { core: 'Raspberry Pi 5', broader: 'Electronics', narrower: 'USB Gadget Mode', related: 'Kali Linux' },
  { core: 'Data Extraction', broader: 'Information Security', narrower: 'Android ADB Extraction', related: 'Chain of Custody' },
  { core: 'Mobile Forensics', broader: 'Digital Forensics', narrower: 'Smartphone Data Extraction', related: 'Autopsy' },
  { core: 'Offensive Security', broader: 'Ethical Hacking', narrower: 'Payload Scripting', related: 'Penetration Testing' },
  { core: 'Portable Forensic Device', broader: 'Forensic Technology', narrower: 'USB Forensic Tools', related: 'Field Investigations' },
  { core: 'Encryption', broader: 'Data Protection', narrower: 'AES Encryption', related: 'Secure Storage' },
  { core: 'Ethical Issues', broader: 'Technology Ethics', narrower: 'Laws and Ethics', related: 'Responsible Disclosure' },
  { core: 'Cybersecurity Devices', broader: 'Cyber Defence', narrower: 'Embedded Security Device', related: 'Hardware Hacking' },
  { core: 'Legal Compliance', broader: 'Digital Law Acts', narrower: 'GDPR', related: 'Investigatory Powers Act' },
  { core: 'Payload Injection', broader: 'Offensive Security', narrower: 'Script Based Payloads', related: 'Keystroke Injection' }
];

export const researchResources = [
  'Investigatory Powers Act 2016, GDPR, and ACPO Good Practice Guide for Digital Evidence',
  'Academic databases: Leeds Beckett University library, Google Scholar',
  'Industry and practitioner sources: ResearchGate, Raspberry Pi forums, Stack Overflow, TryHackMe',
  'Hands-on testing with Raspberry Pi 5 and Android devices'
];

export const bibliography = [
  'Zetter, K. (2014) Countdown to Zero Day: Stuxnet and the Launch of the World’s First Digital Weapon.',
  'Beazley, D. M. and Jones, B. K. (2013) Python Cookbook: Recipes for Mastering Python 3.',
  'Aggarwal, S. et al. (2019) A Targeted Data Extraction System for Mobile Devices. Advances in Digital Forensics XV.',
  'Institute of Product Leadership (2024) 7 Steps to Creating a Product in 2024.',
  'Shklovski, I. and Wulf, V. (2018) The Use of Private Mobile Phones at War: Accounts from the Donbas Conflict.',
  'College of Policing (2023) Trustworthy and Useful Tools for Mobile Phone Extraction.',
  'Participation, E. Investigatory Powers Act 2016.',
  'ACPO (2012) Good Practice Guide for Digital Evidence (7th ed.).',
  'Sikorski, M. and Honig, A. (2012) Practical Malware Analysis.',
  'Kim, P. (2018) The Hacker Playbook 3.'
];

export const moscow = {
  must: [
    'Dual mode functionality (Evidence & Offensive)',
    'TFT/IPS display with tactile controls',
    'Raspberry Pi 5 running Kali Linux',
    'Removable USB 3.0 evidence storage',
    'Portable Li-ion power via UPS HAT',
    'Durable 3D printed enclosure',
    'Ethical/legal compliance warnings',
    'USB-C male adapter for target connection'
  ],
  should: [
    'Encrypted storage support',
    'Automated boot modes',
    'Active cooling solution',
    'Public-facing website',
    'On-device extraction summaries'
  ],
  could: [
    'Polished GUI animations',
    'Colour variants for stealth/identity',
    'Wireless updates (Wi-Fi/Bluetooth)',
    'Payload editor tooling',
    'Audit logging',
    'Future adapter support',
    'Weather resistant enclosure',
    'Quick view evidence browser'
  ],
  wont: [
    'Commercial production run (Phase 1)',
    'Touchscreen-only interface',
    'Integration with third-party forensic suites',
    'Cloud synchronisation'
  ]
};

export const riskRegister = [
  {
    id: 1,
    description: 'Hardware incompatibility (display, UPS HAT, USB connectors)',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Research Pi 5 assemblies, prototype components individually before integration',
    status: 'Active'
  },
  {
    id: 2,
    description: 'Power instability when running from UPS HAT',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Use high-capacity cells and staged power tests with monitoring',
    status: 'Active'
  },
  {
    id: 3,
    description: 'Software failure or script crashes mid-operation',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Robust exception handling, manual cancel controls, detailed error logging',
    status: 'Active'
  },
  {
    id: 4,
    description: 'Data loss or corruption during extraction',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Hash verification, safe unmount routines, storage capacity checks',
    status: 'Active'
  },
  {
    id: 5,
    description: 'Overheating under heavy USB/CPU workloads',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Integrate fan/vents, monitor temps, auto-shutdown thresholds',
    status: 'Active'
  },
  {
    id: 6,
    description: 'Legal/ethical misuse of offensive capabilities',
    likelihood: 'Low',
    impact: 'High',
    mitigation: 'On-screen disclaimers, clear documentation, access controls',
    status: 'Active'
  },
  {
    id: 7,
    description: '3D print failures or poor enclosure tolerances',
    likelihood: 'High',
    impact: 'Medium',
    mitigation: 'Iterative prototyping, allow clearances, adjust CAD based on test prints',
    status: 'Active'
  },
  {
    id: 8,
    description: 'Supply delays for Raspberry Pi 5 or peripherals',
    likelihood: 'Low',
    impact: 'Medium',
    mitigation: 'Source components early, maintain alternative suppliers',
    status: 'Finished'
  },
  {
    id: 9,
    description: 'UI usability issues',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Gather peer feedback, simplify layout, ensure readability',
    status: 'Active'
  },
  {
    id: 10,
    description: 'Time constraints towards Week 15 submission',
    likelihood: 'High',
    impact: 'High',
    mitigation: 'Prioritise must-have features, track weekly progress, adjust scope quickly',
    status: 'Active'
  },
  {
    id: 11,
    description: 'USB-C connector strain in field use',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Reinforce connector internally, add printed support bracket, use right-angle adapter',
    status: 'Active'
  },
  {
    id: 12,
    description: 'Incomplete documentation',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Document weekly, keep GitHub repo updated with build/test logs',
    status: 'Active'
  },
  {
    id: 13,
    description: 'Payload development delays',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Time-box payload development, de-scope if required, prioritise critical scripts',
    status: 'Active'
  },
  {
    id: 14,
    description: 'Battery life shorter than expected',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Use high-capacity batteries, enable power-saving, add battery indicator',
    status: 'Active'
  },
  {
    id: 15,
    description: 'Loss or theft of prototype device',
    likelihood: 'Low',
    impact: 'High',
    mitigation: 'Store securely, keep backups of all data and design files',
    status: 'Active'
  }
];

export const generativeAiLog = [
  {
    date: '07 Oct 2025',
    tool: 'ChatGPT',
    prompt:
      'How can the Raspberry Pi 5 be configured and utilised as an effective cybersecurity tool for both forensic data extraction and offensive security operations?',
    summary:
      'Identified Raspberry Pi 5 strengths (Linux support, USB gadget mode, GPIO, networking) enabling forensic acquisition, penetration testing, and payload delivery.'
  },
  {
    date: '07 Oct 2025',
    tool: 'ChatGPT',
    prompt: 'What are the hardware and software limitations of the Raspberry Pi 5 when used for cybersecurity applications?',
    summary:
      'Documented CPU/RAM ceilings, storage bandwidth, power constraints, thermal management needs, limited native ports, lack of write blocker, and absence of cellular/RF modules.'
  },
  {
    date: '07 Oct 2025',
    tool: 'ChatGPT',
    prompt: 'What methods can be used to verify evidence authenticity using hashing and logs on portable forensic tools?',
    summary:
      'Outlined extraction → hashing → logging → verification workflow with SHA-256, timestamped logs, and re-validation on secondary systems.'
  },
  {
    date: '07 Oct 2025',
    tool: 'ChatGPT',
    prompt: 'Discuss the legal and ethical boundaries I might encounter during my project',
    summary:
      'Mapped legal considerations (CMA, GDPR, IPA, licensing, chain of custody) and ethical boundaries (dual-use, consent, confidentiality, academic integrity).'
  }
];
