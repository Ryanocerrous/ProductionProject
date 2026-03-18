import { useMemo, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import ElectricBorder from '../components/ElectricBorder.jsx';
import { supportTopics } from '../content/supportTopics.js';

function SupportPage() {
  const [query, setQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();
    if (!normalisedQuery) {
      return supportTopics;
    }

    return supportTopics.filter((topic) => {
      const searchable = `${topic.label} ${topic.summary}`.toLowerCase();
      return searchable.includes(normalisedQuery);
    });
  }, [query]);

  return (
    <div>
      <Navbar />
      <main className="support-wrapper">
        <ElectricBorder
          color="#7df9ff"
          chaos={0.45}
          speed={1.4}
          thickness={1.6}
          className="support-electric"
          style={{ borderRadius: 16 }}
        >
          <section className="support-card" aria-label="Support topics">
            <header className="support-header">
              <h1>What&apos;s happening with your ByteBite device?</h1>
              <p>
                Search for a topic or pick one below. We&apos;ll help you find the best support options.
              </p>
            </header>

            <label className="support-search">
              <span className="support-search-icon" aria-hidden="true">
                🔍
              </span>
              <input
                type="search"
                placeholder="Search topics"
                aria-label="Search support topics"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>

            <div className="support-grid">
              {filteredTopics.map((topic) => (
                <a key={topic.slug} href={`/support/${topic.slug}`} className="support-tile">
                  <span className="support-icon" aria-hidden="true">
                    {topic.icon}
                  </span>
                  <span>{topic.label}</span>
                </a>
              ))}
            </div>
            {!filteredTopics.length && (
              <p className="support-empty">No topics matched your search. Try a different keyword.</p>
            )}
          </section>
        </ElectricBorder>
      </main>
    </div>
  );
}

export default SupportPage;
