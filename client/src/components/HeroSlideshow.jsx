import { useState, useEffect, useRef } from 'react';
import './HeroSlideshow.css';

const slideImages = [
  '/images of Church Programs/Faith international Images (1).jpeg',
  '/images of Church Programs/Faith international Images (2).jpeg',
  '/images of Church Programs/Faith international Images (3).jpeg',
  '/images of Church Programs/Faith international Images (4).jpeg',
  '/images of Church Programs/Faith international Images (5).jpeg',
  '/images of Church Programs/Faith international Images (6).jpeg',
  '/images of Church Programs/Faith international Images (7).jpeg',
  '/images of Church Programs/Faith international Images (8).jpeg',
  '/images of Church Programs/Faith international Images (9).jpeg',
  '/images of Church Programs/Faith international Images (10).jpeg',
  '/images of Church Programs/Faith international Images (11).jpeg',
  '/images of Church Programs/Faith international Images (12).jpeg',
  '/images of Church Programs/Faith international Images (13).jpeg',
  '/images of Church Programs/Faith international Images (14).jpeg',
  '/images of Church Programs/Faith international Images (15).jpeg',
  '/images of Church Programs/Faith international Images (16).jpeg',
  '/images of Church Programs/Faith international Images (17).jpeg',
  '/images of Church Programs/Faith international Images (18).jpeg',
  '/images of Church Programs/Faith international Images (19).jpeg',
  '/images of Church Programs/Faith international Images (20).jpeg',
  '/images of Church Programs/Faith international Images (21).jpeg',
  '/images of Church Programs/Faith international Images (22).jpeg',
  '/images of Church Programs/Faith international Images (23).jpeg',
  '/images of Church Programs/Faith international Images (24).jpeg',
  '/images of Church Programs/Faith international Images (25).jpeg',
  '/images of Church Programs/Faith international Images (27).jpeg',
  '/images of Church Programs/Faith international Images (28).jpeg',
  '/images of Church Programs/Faith international Images (29).jpeg',
  '/images of Church Programs/Faith international Images (30).jpeg',
  '/images of Church Programs/Faith international Images (31).jpeg',
  '/images of Church Programs/Faith international Images (32).jpeg',
  '/images of Church Programs/Faith international Images (33).jpeg',
];

export default function HeroSlideshow({ title, subtitle }) {
  const [current, setCurrent] = useState(() => Math.floor(Math.random() * slideImages.length));
  const [next, setNext] = useState(null);
  const timerRef = useRef(null);

  function advance(to) {
    const target = to !== undefined ? to : (current + 1) % slideImages.length;
    setNext(target);
    setTimeout(() => {
      setCurrent(target);
      setNext(null);
    }, 900);
  }

  useEffect(() => {
    timerRef.current = setInterval(() => advance(), 3000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  function goTo(index) {
    if (index === current || next !== null) return;
    clearInterval(timerRef.current);
    advance(index);
    timerRef.current = setInterval(() => advance(), 3000);
  }

  return (
    <section className="hs-hero">
      {/* Current slide */}
      <div
        className="hs-slide"
        style={{ backgroundImage: `url('${slideImages[current]}')` }}
      />
      {/* Incoming slide */}
      {next !== null && (
        <div
          className="hs-slide hs-slide-in"
          style={{ backgroundImage: `url('${slideImages[next]}')` }}
        />
      )}

      <div className="hs-overlay" />

      <div className="container hs-content">
        <p className="hs-tag">Faith International Ministry</p>
        <h1>{title}</h1>
        {subtitle && <p className="hs-subtitle">{subtitle}</p>}
      </div>

      {/* Dot indicators */}
      <div className="hs-dots">
        {slideImages.map((_, i) => (
          <button
            key={i}
            className={`hs-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Curved bottom */}
      <div className="hs-curve" />
    </section>
  );
}
