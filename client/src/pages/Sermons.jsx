import { useEffect, useState, useMemo } from 'react';
import { getSermons } from '../api';
import SermonCard from '../components/SermonCard';
import HeroSlideshow from '../components/HeroSlideshow';
import { staticSermons } from '../staticData';

export default function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [speakerFilter, setSpeakerFilter] = useState('');

  useEffect(() => {
    async function loadSermons() {
      try {
        const { data } = await getSermons();
        setSermons(data);
      } catch {
        setSermons(staticSermons);
      } finally {
        setLoading(false);
      }
    }
    loadSermons();
  }, []);

  const speakers = useMemo(() => {
    const all = sermons.map((s) => s.speaker).filter(Boolean);
    return [...new Set(all)].sort();
  }, [sermons]);

  const filtered = useMemo(() => {
    return sermons.filter((s) => {
      const matchesSearch =
        !search ||
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        (s.description || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.speaker || '').toLowerCase().includes(search.toLowerCase());
      const matchesSpeaker = !speakerFilter || s.speaker === speakerFilter;
      return matchesSearch && matchesSpeaker;
    });
  }, [sermons, search, speakerFilter]);

  return (
    <div>
      <HeroSlideshow
        title="Sermons"
        subtitle="Watch and listen to messages that inspire faith and transformation."
      />

      <section className="section">
        <div className="container">
          <div className="sermon-filters">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search sermons by title, speaker, or topic..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search">✕</button>
              )}
            </div>
            {speakers.length > 1 && (
              <select
                value={speakerFilter}
                onChange={(e) => setSpeakerFilter(e.target.value)}
                className="speaker-select"
              >
                <option value="">All Speakers</option>
                {speakers.map((sp) => (
                  <option key={sp} value={sp}>{sp}</option>
                ))}
              </select>
            )}
          </div>

          {loading && <p className="loading">Loading sermons...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <>
              {filtered.length === 0 ? (
                <div className="no-results">
                  <p>No sermons found{search ? ` for "${search}"` : ''}.</p>
                  {(search || speakerFilter) && (
                    <button className="btn btn-outline" onClick={() => { setSearch(''); setSpeakerFilter(''); }}>
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {(search || speakerFilter) && (
                    <p className="results-count">{filtered.length} sermon{filtered.length !== 1 ? 's' : ''} found</p>
                  )}
                  <div className="card-grid">
                    {filtered.map((sermon) => (
                      <SermonCard key={sermon._id} sermon={sermon} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
