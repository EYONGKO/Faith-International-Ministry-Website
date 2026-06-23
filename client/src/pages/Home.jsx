import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getAnnouncements, getEvents, getSermons } from '../api';
import SermonCard from '../components/SermonCard';
import EventCard from '../components/EventCard';
import { staticSermons, staticEvents, staticAnnouncements } from '../staticData';

const stats = [
  { value: '10+', label: 'Years of Ministry' },
  { value: '500+', label: 'Church Members' },
  { value: '50+', label: 'Community Programs' },
  { value: '3', label: 'Weekly Services' },
];

const serviceTimes = [
  { icon: '🙏', day: 'Sunday', name: 'Worship Service', time: '9:00 AM' },
  { icon: '📖', day: 'Wednesday', name: 'Bible Study', time: '7:00 PM' },
  { icon: '✨', day: 'Friday', name: 'Youth Service', time: '6:00 PM' },
];

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [sermons, setSermons] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  function toggleMute() {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to play with sound; fall back to muted if browser blocks it
    video.muted = false;
    video.play().catch(() => {
      video.muted = true;
      setMuted(true);
      video.play().catch(() => {});
    });

    // Pause when scrolled out of view, resume when back
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const [announcementsRes, sermonsRes, eventsRes] = await Promise.all([
          getAnnouncements(),
          getSermons(),
          getEvents(),
        ]);
        setAnnouncements(announcementsRes.data);
        setSermons(sermonsRes.data.slice(0, 3));
        setEvents(eventsRes.data.slice(0, 3));
      } catch {
        setAnnouncements(staticAnnouncements);
        setSermons(staticSermons.slice(0, 3));
        setEvents(staticEvents);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero" ref={heroRef}>
        <video
          ref={videoRef}
          className="hero-video"
          loop
          playsInline
          src="/Videos of church programs/man of GOD Sermon.mp4"
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-tag">Welcome to</p>
          <h1>Faith International Ministry</h1>
          <p className="hero-subtitle">
            A place of worship, fellowship, and spiritual growth. Join us as we build faith,
            transform lives, and serve our community with love.
          </p>
          <div className="hero-actions">
            <Link to="/contact" className="btn btn-primary">Plan Your Visit</Link>
            <Link to="/sermons" className="btn btn-outline-light">Watch Sermons</Link>
          </div>
        </div>

        <button className={`hero-sound-btn${muted ? ' is-muted' : ''}`} onClick={toggleMute} aria-label={muted ? 'Unmute video' : 'Mute video'} title={muted ? 'Unmute' : 'Mute'}>
          {muted ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/>
              <line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
          <span>{muted ? 'Unmute' : 'Mute'}</span>
        </button>

        <div className="hero-scroll-indicator">
          <span />
        </div>
      </section>

      {/* Service Times */}
      <section className="section service-section">
        <div className="container">
          <div className="service-times">
            {serviceTimes.map((s) => (
              <div key={s.name} className="service-time-card">
                <span className="service-icon">{s.icon}</span>
                <span className="service-day">{s.day}</span>
                <h3>{s.name}</h3>
                <p>{s.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      {!loading && announcements.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <h2 className="section-title">Announcements</h2>
            <div className="announcements">
              {announcements.map((item) => (
                <div key={item._id} className="announcement">
                  <span className="announcement-icon">📢</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="section stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Recent Sermons</h2>
            <Link to="/sermons" className="link-more">View all →</Link>
          </div>
          {loading ? (
            <p className="loading">Loading sermons...</p>
          ) : sermons.length === 0 ? (
            <p className="loading">No sermons available yet.</p>
          ) : (
            <div className="card-grid">
              {sermons.map((sermon) => (
                <SermonCard key={sermon._id} sermon={sermon} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <Link to="/events" className="link-more">View all →</Link>
          </div>
          {loading ? (
            <p className="loading">Loading events...</p>
          ) : events.length === 0 ? (
            <p className="loading">No upcoming events.</p>
          ) : (
            <div className="card-grid">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Church Gallery</h2>
            <Link to="/gallery" className="link-more">View all & Download →</Link>
          </div>
          <p className="section-intro-text">Relive the moments — browse and download photos and sermon videos from our services.</p>
          <div className="home-gallery-grid">
            {[3,7,11,15,20,23].map((n) => (
              <Link to="/gallery" key={n} className="home-gallery-item">
                <img
                  src={`/images of Church Programs/Faith international Images (${n}).jpeg`}
                  alt={`Church photo ${n}`}
                  loading="lazy"
                />
                <div className="home-gallery-overlay">⬇ View & Download</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bible Study CTA */}
      <section className="section section-alt">
        <div className="container">
          <div className="bible-study-promo">
            <div className="bsp-image">
              <img src="/images of Church Programs/Faith international Images (11).jpeg" alt="Bible Study" />
            </div>
            <div className="bsp-text">
              <span className="bsp-tag">New</span>
              <h2>Bible Study & Sunday School</h2>
              <p>
                Grow in the Word of God with structured lessons, Sunday school topics,
                and an interactive Bible quiz. Test your knowledge and deepen your faith.
              </p>
              <div className="bsp-features">
                <div className="bsp-feature"><span>📖</span> Study Lessons</div>
                <div className="bsp-feature"><span>🏫</span> Sunday School</div>
                <div className="bsp-feature"><span>📝</span> Bible Quiz</div>
              </div>
              <div className="bsp-actions">
                <Link to="/bible-study" className="btn btn-primary">Start Learning</Link>
                <Link to="/bible-study" className="btn btn-outline">Take the Bible Quiz</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer CTA */}
      <section className="section prayer-cta-section">
        <div className="container">
          <div className="prayer-cta">
            <div className="prayer-cta-text">
              <h2>Need Prayer?</h2>
              <p>
                Our prayer team is here for you. Submit a prayer request and our congregation
                will lift you up in prayer.
              </p>
            </div>
            <Link to="/prayer" className="btn btn-primary">Submit a Prayer Request</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section section-alt newsletter-section">
        <div className="container">
          <div className="newsletter-box">
            <div className="newsletter-text">
              <h2>Stay Connected</h2>
              <p>Get updates on sermons, events, and church news delivered to your inbox.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); e.target.reset(); }}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
