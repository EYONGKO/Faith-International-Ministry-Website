import { Link } from 'react-router-dom';
import HeroSlideshow from '../components/HeroSlideshow';

const ministries = [
  {
    icon: '🎵',
    title: 'Worship Ministry',
    description: 'Our worship team ushers the congregation into the presence of God through Spirit-filled praise and adoration. Every song is a sacrifice of worship lifted to the Most High.',
    detail: 'Rehearsals every Saturday at 4:00 PM',
  },
  {
    icon: '🌟',
    title: 'Youth Ministry',
    description: 'We are raising a generation of bold, faith-filled young people who know their God and are not ashamed of the Gospel. Through the Word, prayer, and fellowship, we equip youth for purpose.',
    detail: 'Every Friday at 6:00 PM',
  },
  {
    icon: '🤝',
    title: 'Outreach Ministry',
    description: 'Carrying the love of Christ beyond the church walls into Kekpoti Village and the surrounding communities — through evangelism, practical support, and demonstrating God\'s compassion.',
    detail: 'Regular community outreach days',
  },
  {
    icon: '🙏',
    title: 'Prayer Ministry',
    description: 'Prayer is the heartbeat of Faith International Ministry. Our intercessors stand in the gap for families, the nation, and the nations — travailing in prayer until breakthrough comes.',
    detail: 'Prayer meetings every Tuesday at 6:00 AM',
  },
  {
    icon: '👧',
    title: "Children's Ministry",
    description: "We plant the seeds of God's Word deep in the hearts of our children from a young age. In a safe, loving, and Spirit-filled environment, children discover that Jesus loves them.",
    detail: 'Every Sunday during the main service',
  },
  {
    icon: '📹',
    title: 'Media Ministry',
    description: 'Extending the reach of Prophet AKO GABRIEL\'s ministry through video recordings, sermon archives, and digital sharing — so that the Word of God reaches every corner of the earth.',
    detail: 'Every Sunday service — recorded & shared',
  },
];

export default function Ministries() {
  return (
    <div>
      <HeroSlideshow
        title="Our Ministries"
        subtitle="Discover ways to grow, serve, and connect within our church family."
      />

      <section className="section">
        <div className="container">
          <p className="page-intro">
            At Faith International Ministry, every believer is called to serve. God has placed a
            gift inside you — and there is a place here where that gift can flourish for His glory.
            Explore our ministries and find where you belong in the body of Christ.
          </p>
          <div className="ministries-grid">
            {ministries.map((ministry) => (
              <article key={ministry.title} className="ministry-card">
                <span className="ministry-icon">{ministry.icon}</span>
                <h3>{ministry.title}</h3>
                <p>{ministry.description}</p>
                <p className="ministry-detail">📅 {ministry.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="get-involved-box">
            <h2>Ready to Serve?</h2>
            <p>
              If God is stirring something in your heart, don&apos;t ignore it — that is His call.
              Reach out to us at Faith International Ministry Kendem Center and we will connect
              you with the right team. Together, we go further for the Kingdom.
            </p>
            <Link to="/contact" className="btn btn-primary">Contact Us to Get Started</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
