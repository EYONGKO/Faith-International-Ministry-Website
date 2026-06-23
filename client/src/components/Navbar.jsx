import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setResourcesOpen(false);
  }, [location]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <img
            src="/images of Church Programs/logo.png"
            alt="Faith International Ministry Logo"
            className="logo-img"
          />
          <span className="logo-text">Faith International Ministry</span>
        </Link>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links${menuOpen ? ' nav-open' : ''}`}>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/sermons">Sermons</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/ministries">Ministries</NavLink>
          <div className="nav-dropdown" ref={resourcesRef}>
            <button
              className={`nav-dropdown-btn${resourcesOpen ? ' open' : ''}${['/gallery','/bible-study'].includes(location.pathname) ? ' active' : ''}`}
              onClick={() => setResourcesOpen(!resourcesOpen)}
            >
              Resources <span className="nav-dropdown-arrow">▾</span>
            </button>
            {resourcesOpen && (
              <div className="nav-dropdown-menu">
                <NavLink to="/gallery">📷 Gallery</NavLink>
                <NavLink to="/bible-study">📖 Bible Study</NavLink>
              </div>
            )}
          </div>
          <NavLink to="/give">Give</NavLink>
          <NavLink to="/prayer">Prayer</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        {menuOpen && (
          <div className="nav-overlay" onClick={() => setMenuOpen(false)} />
        )}
      </div>
    </header>
  );
}
