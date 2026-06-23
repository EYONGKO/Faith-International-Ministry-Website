import HeroSlideshow from '../components/HeroSlideshow';

const givingMethods = [
  {
    icon: '💳',
    title: 'Bank Transfer',
    lines: [
      'Bank: Faith Community Bank',
      'Account Name: Faith International Ministry',
      'Contact us for account details',
    ],
  },
  {
    icon: '🏛️',
    title: 'In-Person Offering',
    lines: [
      'Sunday Worship: 9:00 AM',
      'Wednesday Bible Study: 7:00 PM',
      'Offering baskets available during service',
    ],
  },
  {
    icon: '✉️',
    title: 'By Mail',
    lines: [
      'Faith International Ministry',
      'Kendem Center, Kekpoti Village',
      'Include your name and purpose of giving',
    ],
  },
];

export default function Give() {
  return (
    <div>
      <HeroSlideshow
        title="Give"
        subtitle="Your generosity helps us spread the Gospel and serve our community."
      />

      <section className="section">
        <div className="container">
          <div className="give-verse">
            <blockquote>
              "Each of you should give what you have decided in your heart to give, not reluctantly
              or under compulsion, for God loves a cheerful giver."
            </blockquote>
            <cite>— 2 Corinthians 9:7</cite>
          </div>

          <h2 className="section-title" style={{ marginTop: '3rem' }}>Ways to Give</h2>
          <div className="give-methods">
            {givingMethods.map((method) => (
              <div key={method.title} className="give-method-card">
                <span className="give-method-icon">{method.icon}</span>
                <h3>{method.title}</h3>
                <ul>
                  {method.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="give-contact-note">
            <p>
              For online giving options or any questions about tithing and donations, please
              contact us at{' '}
              <a href="mailto:info@faithministry.org" className="give-email">
                info@faithministry.org
              </a>{' '}
              or call <a href="tel:+237650423020"><strong>+237 6 50 42 30 20</strong></a>.
            </p>
            <p>
              All gifts are used to fund worship, outreach programs, community services, and
              the ongoing mission of Faith International Ministry.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="give-impact-grid">
            <div className="give-impact-item">
              <span>🏘️</span>
              <h4>Community Outreach</h4>
              <p>Funding food drives, shelter support, and community programs.</p>
            </div>
            <div className="give-impact-item">
              <span>📖</span>
              <h4>Bible & Education</h4>
              <p>Providing Bibles, study materials, and youth programs.</p>
            </div>
            <div className="give-impact-item">
              <span>🌍</span>
              <h4>Missions</h4>
              <p>Supporting local and international mission activities.</p>
            </div>
            <div className="give-impact-item">
              <span>🎵</span>
              <h4>Worship</h4>
              <p>Maintaining our facilities and equipping our worship teams.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
