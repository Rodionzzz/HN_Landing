import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ArtistVideos.css'

// Автозапуск не используем: браузеры разрешают его только без звука
// (плеер VK стартует беззвучным), а на телефонах VK с autoplay=1
// вообще пишет «видео недоступно». Видео запускается кнопкой ▶
// в самом плеере — сразу со звуком.

// Видео группы: в модалке — карточка-«сторис» с обложкой,
// сам плеер (VK Видео / YouTube) открывается поверх всего только по клику.
function ArtistVideos({ artist }) {
  const [openVideo, setOpenVideo] = useState(null)

  useEffect(() => {
    if (!openVideo) {
      return
    }

    // Escape закрывает только видео, а не всю модалку группы
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopImmediatePropagation()
        setOpenVideo(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown, true)
    return () => window.removeEventListener('keydown', handleKeyDown, true)
  }, [openVideo])

  if (!artist.videos?.length) {
    return null
  }

  return (
    <section className="artist-modal-section">
      <div className="artist-modal-section-label">ВИДЕО</div>

      <div className="artist-videos">
        {artist.videos.map((video) => (
          <button
            key={video.id}
            type="button"
            className="artist-video-card"
            onClick={() => setOpenVideo(video)}
            aria-label={`Смотреть видео: ${video.title}`}
          >
            {video.poster && (
              <span
                className="artist-video-card-bg"
                style={{ backgroundImage: `url(${video.poster})` }}
                aria-hidden="true"
              />
            )}

            <span
              className={`artist-video-thumb${video.vertical ? ' is-vertical' : ''}`}
            >
              {video.poster && <img src={video.poster} alt="" loading="lazy" />}
              <span className="artist-video-play" aria-hidden="true">
                <span>▶</span>
              </span>
            </span>

            <span className="artist-video-info">
              <small>{video.source || 'VK Видео'}</small>
              <strong>{video.title}</strong>
              <span className="artist-video-cta">
                Смотреть <i aria-hidden="true">→</i>
              </span>
            </span>
          </button>
        ))}
      </div>

      {openVideo &&
        createPortal(
          <div
            className="video-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${artist.name} — ${openVideo.title}`}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setOpenVideo(null)
              }
            }}
          >
            <button
              type="button"
              className="video-lightbox-close"
              onClick={() => setOpenVideo(null)}
              aria-label="Закрыть видео"
            >
              <span></span>
              <span></span>
            </button>

            <div
              className={`video-lightbox-frame${openVideo.vertical ? ' is-vertical' : ''}`}
            >
              <iframe
                src={openVideo.embedUrl}
                title={`${artist.name} — ${openVideo.title}`}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
                allowFullScreen
              />
            </div>

            <p className="video-lightbox-caption">
              {artist.name} · {openVideo.title}
            </p>
          </div>,
          document.body,
        )}
    </section>
  )
}

export default ArtistVideos
