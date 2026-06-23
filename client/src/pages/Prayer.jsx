import { useState } from 'react';
import { submitPrayer } from '../api';
import HeroSlideshow from '../components/HeroSlideshow';

export default function Prayer() {
  const [form, setForm] = useState({ name: '', email: '', request: '', isAnonymous: false });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const { data } = await submitPrayer(form);
      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', request: '', isAnonymous: false });
    } catch {
      setStatus({ type: 'error', message: 'Failed to submit. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <HeroSlideshow
        title="Prayer Requests"
        subtitle="Share your needs with us. Our team prays over every request submitted."
      />

      <section className="section">
        <div className="container prayer-container">
          <div className="prayer-info">
            <div className="prayer-verse">
              <blockquote>
                "Do not be anxious about anything, but in every situation, by prayer and
                petition, with thanksgiving, present your requests to God."
              </blockquote>
              <cite>— Philippians 4:6</cite>
            </div>

            <div className="prayer-promise-cards">
              <div className="prayer-promise">
                <span>🙏</span>
                <h4>We Pray Together</h4>
                <p>Every request is shared with our prayer team who intercede on your behalf.</p>
              </div>
              <div className="prayer-promise">
                <span>🔒</span>
                <h4>Confidential</h4>
                <p>Your prayer requests are kept confidential within our pastoral team.</p>
              </div>
              <div className="prayer-promise">
                <span>❤️</span>
                <h4>You Are Not Alone</h4>
                <p>Whatever you are facing, our church family stands with you in prayer.</p>
              </div>
            </div>
          </div>

          <div className="prayer-form-wrapper">
            <h2>Submit a Prayer Request</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="isAnonymous"
                    checked={form.isAnonymous}
                    onChange={handleChange}
                  />
                  <span>Submit anonymously</span>
                </label>
              </div>

              {!form.isAnonymous && (
                <>
                  <div className="form-group">
                    <label htmlFor="pray-name">Your Name</label>
                    <input
                      id="pray-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pray-email">Email <span className="optional">(optional)</span></label>
                    <input
                      id="pray-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="pray-request">Your Prayer Request <span className="required">*</span></label>
                <textarea
                  id="pray-request"
                  name="request"
                  rows="6"
                  value={form.request}
                  onChange={handleChange}
                  placeholder="Share what you would like us to pray for..."
                  required
                />
              </div>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.type === 'success' ? '✅' : '❌'} {status.message}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                {submitting ? 'Submitting...' : '🙏 Submit Prayer Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
