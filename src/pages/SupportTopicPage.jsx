import PropTypes from 'prop-types';
import Navbar from '../components/Navbar.jsx';
import IkeaManual from '../components/IkeaManual.jsx';

function SupportTopicPage({ topic }) {
  const isManual = topic.slug === 'manual';

  return (
    <div>
      <Navbar />
      <main className="support-wrapper">
        <article className="support-detail-card">
          <header className="support-detail-header">
            <a href="/support" className="support-back-link">
              ← Back to support
            </a>
            <span className="support-topic-icon" aria-hidden="true">
              {topic.icon}
            </span>
            <h1>{topic.label}</h1>
            <p>{topic.summary}</p>
          </header>

          {isManual ? (
            <IkeaManual />
          ) : (
            <section className="support-section-grid" aria-label={`${topic.label} guidance`}>
              {topic.sections.map((section) => (
                <section key={section.title} className="support-section-card">
                  <h2>{section.title}</h2>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </section>
          )}
        </article>
      </main>
    </div>
  );
}

SupportTopicPage.propTypes = {
  topic: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    ).isRequired
  }).isRequired
};

export default SupportTopicPage;
