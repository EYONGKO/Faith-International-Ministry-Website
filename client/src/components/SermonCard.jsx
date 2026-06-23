import { useState } from 'react';

function getYouTubeId(url) {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? match[1] : null;
}

export default function SermonCard({ sermon }) {
  const [playing, setPlaying] = useState(false);

  const formattedDate = new Date(sermon.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isLocalVideo = sermon.videoUrl && sermon.videoUrl.includes('.mp4');
  const ytId = sermon.videoUrl ? getYouTubeId(sermon.videoUrl) : null;
  const hasVideo = isLocalVideo || !!ytId;

  return (
    <article className="sermon-card">
      {/* Media area */}
      <div className="sermon-media">
        {playing && isLocalVideo && (
          <video
            className="sermon-video-player"
            src={sermon.videoUrl}
            controls
            autoPlay
            onEnded={() => setPlaying(false)}
          />
        )}
        {playing && ytId && (
          <iframe
            className="sermon-video-player"
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
            title={sermon.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        {!playing && (
          <div
            className={`sermon-thumbnail${hasVideo ? ' clickable' : ''}`}
            onClick={() => hasVideo && setPlaying(true)}
          >
            {sermon.thumbnail ? (
              <img src={sermon.thumbnail} alt={sermon.title} />
            ) : (
              <div className="sermon-thumb-placeholder">
                <span>✝</span>
              </div>
            )}
            {hasVideo && (
              <div className="sermon-play-overlay">
                <div className="sermon-play-btn">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="sermon-play-label">
                  {isLocalVideo ? 'Play Sermon' : 'Watch on YouTube'}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="sermon-body">
        <div className="sermon-meta-row">
          <span className="sermon-date">{formattedDate}</span>
          {isLocalVideo && <span className="sermon-badge">📹 Video</span>}
          {ytId && <span className="sermon-badge sermon-badge-yt">▶ YouTube</span>}
        </div>
        <h3 className="sermon-title">{sermon.title}</h3>
        <p className="sermon-speaker">🎙️ {sermon.speaker}</p>
        <p className="sermon-desc">{sermon.description}</p>

        {hasVideo && !playing && (
          <button className="btn btn-primary sermon-watch-btn" onClick={() => setPlaying(true)}>
            ▶ Watch Now
          </button>
        )}
        {playing && (
          <button className="btn btn-outline sermon-watch-btn" onClick={() => setPlaying(false)}>
            ✕ Close Player
          </button>
        )}
      </div>
    </article>
  );
}
