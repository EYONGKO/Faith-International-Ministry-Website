import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src="/images of Church Programs/logo.png"
              alt="Faith International Ministry"
              className="footer-logo-img"
            />
            <span>Faith International Ministry</span>
          </div>
          <p>Building faith, transforming lives, and serving our community with love.</p>
          <div className="footer-social">
            <a href="https://www.facebook.com/share/1GzGqEuAet/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
            </a>
            <a href="https://wa.me/237650423020" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="footer-social-wa">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4>Service Times</h4>
          <ul>
            <li>Sunday Worship &mdash; 9:00 AM</li>
            <li>Wed Bible Study &mdash; 7:00 PM</li>
            <li>Friday Youth &mdash; 6:00 PM</li>
          </ul>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/sermons">Sermons</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/ministries">Ministries</Link></li>
            <li><Link to="/prayer">Prayer Requests</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/bible-study">Bible Study</Link></li>
            <li><Link to="/give">Give</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact Us</h4>
          <ul>
            <li>📍 Kendem Center, Kekpoti Village</li>
            <li>
              📧{' '}
              <a href="mailto:info@faithministry.org">info@faithministry.org</a>
            </li>
            <li>📞 <a href="tel:+237650423020">+237 6 50 42 30 20</a></li>
            <li>📞 <a href="tel:+237681879410">+237 6 81 87 94 10</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Faith International Ministry. All rights reserved.</p>
        <Link to="/admin/login" className="footer-admin-link">Admin</Link>
      </div>
    </footer>
  );
}
