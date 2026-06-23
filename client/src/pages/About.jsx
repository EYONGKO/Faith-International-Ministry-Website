import { useEffect, useState } from 'react';
import { getTeam } from '../api';
import HeroSlideshow from '../components/HeroSlideshow';
import { staticTeam } from '../staticData';

export default function About() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await getTeam();
        setTeam(data.length > 0 ? data : staticTeam);
      } catch {
        setTeam(staticTeam);
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, []);

  return (
    <div>
      <HeroSlideshow
        title="About Us"
        subtitle="Learn about our mission, vision, and the people who serve our congregation."
      />

      <section className="section">
        <div className="container">
          <div className="about-intro">
            <p>
              Faith International Ministry is a Spirit-filled church community located at the
              Kendem Center, Kekpoti Village. Founded by Prophet AKO GABRIEL with a burning
              heart for God and His people, we have grown into a family of believers committed
              to worship, intercession, discipleship, and community transformation. We believe
              in the power of the Holy Spirit and the uncompromising truth of God&apos;s Word.
            </p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <span className="about-card-icon">🎯</span>
              <h2>Our Mission</h2>
              <p>
                To preach the undiluted Gospel of Jesus Christ, raise Spirit-filled disciples,
                and serve our community with compassion, prayer, and the love of God.
              </p>
            </div>
            <div className="about-card">
              <span className="about-card-icon">👁️</span>
              <h2>Our Vision</h2>
              <p>
                To be a house of prayer and power where every soul encounters the living God,
                finds healing, and walks in their divine destiny in Christ Jesus.
              </p>
            </div>
            <div className="about-card">
              <span className="about-card-icon">💎</span>
              <h2>Our Values</h2>
              <ul className="values-list">
                <li>Faith in God&apos;s Word</li>
                <li>Prayer and intercession</li>
                <li>Love for one another</li>
                <li>Service to the community</li>
                <li>Excellence in worship</li>
              </ul>
            </div>
          </div>

          {/* Location */}
          <div className="about-location">
            <span className="about-location-icon">📍</span>
            <div>
              <h3>Find Us</h3>
              <p>Faith International Ministry Kendem Center, Kekpoti Village</p>
              <p>
                <a href="tel:+237650423020">+237 6 50 42 30 20</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="tel:+237681879410">+237 6 81 87 94 10</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Our Leadership Team</h2>
          <p className="section-subtitle">
            Dedicated servants of God who lead with integrity, compassion, and vision.
          </p>
          {loading ? (
            <p className="loading">Loading team...</p>
          ) : (
            <div className="team-grid">
              {team.map((member) => (
                <article key={member._id} className="team-card">
                  {member.photo ? (
                    <img src={member.photo} alt={member.name} className="team-photo" />
                  ) : (
                    <div className="team-photo-placeholder">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p>{member.bio}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
