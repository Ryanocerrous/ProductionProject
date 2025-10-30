import { Fragment, memo } from 'react';
import {
  workingTitle,
  projectAim,
  knowledgeBase,
  productSteps,
  timeline,
  keywordMatrix,
  researchResources,
  bibliography,
  moscow,
  riskRegister,
  generativeAiLog
} from '../content/projectBrief.js';

const moscowBuckets = [
  { key: 'must', label: 'Must Have' },
  { key: 'should', label: 'Should Have' },
  { key: 'could', label: 'Could Have' },
  { key: 'wont', label: 'Won’t Have (Phase 1)' }
];

const keywordHeaders = ['Core Term', 'Broader', 'Narrower', 'Related'];

const knowledge = knowledgeBase ?? {};
const steps = productSteps ?? [];
const schedule = timeline ?? [];
const keywords = keywordMatrix ?? [];
const resources = researchResources ?? [];
const references = bibliography ?? [];
const risks = riskRegister ?? [];
const aiEntries = generativeAiLog ?? [];

export const DossierIntro = memo(function DossierIntro() {
  return (
    <section className="container brief" id="brief">
      <header className="section-heading">
        <span className="badge">Project dossier</span>
        <h2>{workingTitle}</h2>
        <p>{projectAim}</p>
      </header>
    </section>
  );
});

export const ProductProgressionSection = memo(function ProductProgressionSection() {
  return (
    <section className="container brief-block" id="product-progression">
      <h3>7 Step Product Progression</h3>
      <div className="product-steps">
        {steps.map((step) => (
          <article className="card step-card" key={step.step}>
            <header>
              <span className="step-number">{step.step}</span>
              <h4>{step.title}</h4>
            </header>
            <p>{step.summary}</p>
            <ul>
              {(step.deliverables ?? []).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
});

export const ProjectTimelineSection = memo(function ProjectTimelineSection() {
  return (
    <section className="container brief-block" id="project-timeline">
      <h3>Project Timeline</h3>
      <div className="timeline-table">
        {schedule.map((item) => (
          <div className="timeline-row" key={item.week}>
            <span className="timeline-week">Week {item.week}</span>
            <span className="timeline-area">{item.area}</span>
            <p className="timeline-deliverables">{item.deliverables}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

export const KnowledgeBaseSection = memo(function KnowledgeBaseSection() {
  const { theories = [], concepts = [], people = [] } = knowledge;

  return (
    <section className="container brief-block" id="knowledge-base">
      <h3>Knowledge Base</h3>
      <div className="brief-grid">
        <ListGroup title="Theories" items={theories} />
        <ListGroup title="Key Concepts" items={concepts} />
        <ListGroup title="People & Texts" items={people} />
      </div>
    </section>
  );
});

export const ResearchResourcesSection = memo(function ResearchResourcesSection() {
  return (
    <section className="container brief-block" id="research-resources">
      <h3>Research Resources</h3>
      <article className="card">
        <ul className="brief-list tight">
          {resources.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </article>
    </section>
  );
});

export const ResearchPreparationSection = memo(function ResearchPreparationSection() {
  return (
    <section className="container brief-block" id="research-preparation">
      <h3>Research Preparation</h3>
      <div className="keyword-table">
        {keywordHeaders.map((heading) => (
          <div className="keyword-header" key={heading}>
            {heading}
          </div>
        ))}
        {keywords.map((row, index) => (
          <Fragment key={`${row.core ?? 'keyword'}-${index}`}>
            <div>{row.core}</div>
            <div>{row.broader}</div>
            <div>{row.narrower}</div>
            <div>{row.related}</div>
          </Fragment>
        ))}
      </div>
    </section>
  );
});

export const MoscowSection = memo(function MoscowSection() {
  return (
    <section className="container brief-block" id="moscow-priorities">
      <h3>MoSCoW Priorities</h3>
      <div className="moscow-grid">
        {moscowBuckets.map(({ key, label }) => (
          <ListGroup key={key} title={label} items={moscow[key] ?? []} />
        ))}
      </div>
    </section>
  );
});

export const RiskRegisterSection = memo(function RiskRegisterSection() {
  return (
    <section className="container brief-block" id="risk-register">
      <h3>Risk Register</h3>
      <div className="risk-table">
        <div className="risk-header">ID</div>
        <div className="risk-header">Risk</div>
        <div className="risk-header">Likelihood</div>
        <div className="risk-header">Impact</div>
        <div className="risk-header">Mitigation</div>
        <div className="risk-header">Status</div>
        {risks.map((risk) => (
          <Fragment key={risk.id}>
            <div>#{risk.id}</div>
            <div>{risk.description}</div>
            <div>{risk.likelihood}</div>
            <div>{risk.impact}</div>
            <div>{risk.mitigation}</div>
            <div>{risk.status}</div>
          </Fragment>
        ))}
      </div>
    </section>
  );
});

export const ReferencesSection = memo(function ReferencesSection() {
  return (
    <section className="container brief-block" id="references">
      <h3>References & Research Log</h3>
      <div className="references">
        <div>
          <h4>Suggested Bibliography</h4>
          <ul>
            {references.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Generative AI Log</h4>
          <ul className="ai-log">
            {aiEntries.map((entry, index) => (
              <li key={`${entry.date}-${index}`}>
                <div className="ai-log-meta">
                  <span>{entry.date}</span>
                  <span>{entry.tool}</span>
                </div>
                <p className="ai-log-prompt">{entry.prompt}</p>
                <p className="ai-log-summary">{entry.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

function ListGroup({ title, items }) {
  if (!items?.length) return null;

  return (
    <article className="card">
      <h4>{title}</h4>
      <ul className="brief-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
