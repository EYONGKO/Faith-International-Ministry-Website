import { useState } from 'react';
import HeroSlideshow from '../components/HeroSlideshow';
import './Gallery.css';

const allImages = Array.from({ length: 33 }, (_, i) => i + 1)
  .filter((n) => n !== 26)
  .map((n) => ({
    id: n,
    src: `/images of Church Programs/Faith international Images (${n}).jpeg`,
    name: `Faith International Ministry — Photo ${n}`,
  }));

const allVideos = [
  {
    id: 'v1',
    src: '/Videos of church programs/church videos.mp4',
    title: 'Church Worship & Program',
    speaker: 'Prophet AKO GABRIEL',
    filename: 'Church-Worship-Program.mp4',
  },
  {
    id: 'v2',
    src: '/Videos of church programs/man of GOD Sermon.mp4',
    title: 'Walking by Faith — Sermon',
    speaker: 'Prophet AKO GABRIEL',
    filename: 'Walking-by-Faith-Sermon.mp4',
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);
  const [tab, setTab] = useState('photos');

  function openLightbox(img) {
    setLightbox(img);
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    setLightbox(null);
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    const idx = allImages.findIndex((i) => i.id === lightbox.id);
    const next = (idx + dir + allImages.length) % allImages.length;
    setLightbox(allImages[next]);
  }

  return (
    <div>
      <HeroSlideshow
        title="Photo & Video Gallery"
        subtitle="Moments of worship, fellowship, and God's presence captured at Faith International Ministry."
      />

      <section className="section">
        <div className="container">
          {/* Tabs */}
          <div className="gallery-tabs">
            <button
              className={`gallery-tab${tab === 'photos' ? ' active' : ''}`}
              onClick={() => setTab('photos')}
            >
              📷 Church Photos ({allImages.length})
            </button>
            <button
              className={`gallery-tab${tab === 'videos' ? ' active' : ''}`}
              onClick={() => setTab('videos')}
            >
              🎬 Sermon Videos ({allVideos.length})
            </button>
          </div>

          {/* Photos Grid */}
          {tab === 'photos' && (
            <>
              <p className="gallery-hint">Click any photo to view full size · Download button appears on hover</p>
              <div className="photo-grid">
                {allImages.map((img) => (
                  <div key={img.id} className="photo-item">
                    <img
                      src={img.src}
                      alt={img.name}
                      loading="lazy"
                      onClick={() => openLightbox(img)}
                    />
                    <div className="photo-overlay">
                      <button className="photo-view-btn" onClick={() => openLightbox(img)}>
                        🔍 View
                      </button>
                      <a
                        href={img.src}
                        download={`FIM-Photo-${img.id}.jpeg`}
                        className="photo-download-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        ⬇ Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Videos Grid */}
          {tab === 'videos' && (
            <div className="video-download-grid">
              {allVideos.map((vid) => (
                <div key={vid.id} className="video-download-card">
                  <div className="vdc-preview">
                    <video src={vid.src} preload="metadata" />
                    <div className="vdc-play-icon">🎬</div>
                  </div>
                  <div className="vdc-body">
                    <h3>{vid.title}</h3>
                    <p>🎙️ {vid.speaker}</p>
                    <a
                      href={vid.src}
                      download={vid.filename}
                      className="btn btn-primary vdc-download-btn"
                    >
                      ⬇ Download Video
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>✕</button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); navigate(-1); }}>‹</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.name} />
            <div className="lightbox-footer">
              <span>{lightbox.name}</span>
              <a
                href={lightbox.src}
                download={`FIM-Photo-${lightbox.id}.jpeg`}
                className="btn btn-primary lightbox-dl-btn"
              >
                ⬇ Download Photo
              </a>
            </div>
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); navigate(1); }}>›</button>
        </div>
      )}
    </div>
  );
}
