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

function Brief() {
  const { theories = [], concepts = [], people = [] } = knowledgeBase ?? {};
  const steps = productSteps ?? [];
  const schedule = timeline ?? [];
  const keywords = keywordMatrix ?? [];
  const resources = researchResources ?? [];
  const references = bibliography ?? [];
  const risks = riskRegister ?? [];

  const moscowBuckets = [
    { key: 'must', label: 'Must Have' },
    { key: 'should', label: 'Should Have' },
    { key: 'could', label: 'Could Have' },
    { key: 'wont', label: 'Won’t Have (Phase 1)' }
  ];

  const keywordHeaders = ['Core Term', 'Broader', 'Narrower', 'Related'];

  return (
    <section className="container brief" id="brief">
      <header className="section-heading">
        <span className="badge">Project dossier</span>
        <h2>{workingTitle}</h2>
        <p>{projectAim}</p>
      </header>

      <div className="brief-grid">
        <article className="card">
          <h3>Knowledge Base</h3>
          <div className="brief-list">
            <ListGroup title="Theories" items={theories} />
            <ListGroup title="Key Concepts" items={concepts} />
            <ListGroup title="People & Texts" items={people} />
          </div>
        </article>

        <article className="card">
          <h3>Research Resources</h3>
          <ul className="brief-list tight">
            {resources.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <div className="brief-block">
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
      </div>

      <div className="brief-block">
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
      </div>

      <div className="brief-block">
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
      </div>

      <div className="brief-block">
        <h3>MoSCoW Priorities</h3>
        <div className="moscow-grid">
          {moscowBuckets.map(({ key, label }) => (
            <ListGroup key={key} title={label} items={moscow[key] ?? []} />
          ))}
        </div>
      </div>

      <div className="brief-block">
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
      </div>

      <div className="brief-block">
        <h3>Suggested Bibliography</h3>
        <ul className="references">
          {references.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ListGroup({ title, items }) {
  if (!items?.length) return null;

  return (
    <div>
      <h4>{title}</h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default memo(Brief);
