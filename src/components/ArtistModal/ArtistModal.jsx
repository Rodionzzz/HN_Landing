import { useEffect, useRef, useState } from 'react'

function ArtistModal({ artist, onClose }) {
  const audioRef = useRef(null)
  const [playingTrackId, setPlayingTrackId] = useState(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!artist) {
      return
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [artist, onClose])

  // Останавливаем плеер при закрытии модалки или смене артиста
  useEffect(() => {
    audioRef.current?.pause()
    setPlayingTrackId(null)
    setProgress(0)
  }, [artist])

  if (!artist) {
    return null
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  const handleTrackClick = (track) => {
    const audio = audioRef.current
    if (!audio || !track.audioUrl) {
      return
    }

    if (playingTrackId === track.id) {
      audio.pause()
      setPlayingTrackId(null)
      return
    }

    if (audio.src !== track.audioUrl) {
      audio.src = track.audioUrl
      audio.currentTime = 0
    }

    audio.play()
    setPlayingTrackId(track.id)
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) {
      return
    }
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleEnded = () => {
    setPlayingTrackId(null)
    setProgress(0)
  }

  return (
    <div
      className="artist-modal"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Информация о группе ${artist.name}`}
    >
      {/* Размытый фон всей модалки */}
      <div
        className="artist-modal-background"
        style={{
          backgroundImage: `url(${artist.image || artist.cover})`,
        }}
      />
      <div className="artist-modal-background-overlay" />

      {/* Окно */}
      <div className="artist-modal-window">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {/* Закрыть */}
        <button
          type="button"
          className="artist-modal-close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <span></span>
          <span></span>
        </button>

        <div className="artist-modal-content">
          {/* =========================
              HEADER
             ========================= */}
          <header className="artist-modal-header">
            {artist.cover && (
              <div
                className="artist-modal-cover"
                style={{
                  backgroundImage: `url(${artist.cover})`,
                }}
              >
                <div className="artist-modal-cover-overlay" />
              </div>
            )}
            <div className="artist-modal-title-block">
              <h2>{artist.name}</h2>
              <p>{artist.genre}</p>
            </div>
          </header>

          {/* =========================
              ABOUT
             ========================= */}
          <section className="artist-modal-section">
            <div className="artist-modal-section-label">
              О ГРУППЕ
            </div>
            <div className="artist-modal-section-content">
              <p className="artist-modal-description">
                {artist.description || artist.bio ||
                  'Информация о группе появится позже.'}
              </p>
            </div>
          </section>

          {/* =========================
              TRACKS (если появятся в данных)
             ========================= */}
          {artist.tracks && artist.tracks.length > 0 && (
            <section className="artist-modal-section">
              <div className="artist-modal-section-label">
                ТРЕКИ
              </div>
              <div className="artist-tracks-list">
                {artist.tracks.map((track) => {
                  const isActive = playingTrackId === track.id

                  return (
                    <div
                      key={track.id}
                      className={`artist-track${isActive ? ' is-active' : ''}`}
                    >
                      <div className="artist-track-row">
                        <span className="artist-track-title">{track.title}</span>

                        {track.duration && (
                          <span className="artist-track-duration">
                            {track.duration}
                          </span>
                        )}

                        <button
                          type="button"
                          className="artist-track-play-btn"
                          onClick={() => handleTrackClick(track)}
                          aria-label={
                            isActive
                              ? `Пауза: ${track.title}`
                              : `Слушать ${track.title}`
                          }
                        >
                          {isActive ? '❚❚' : '▶'}
                        </button>
                      </div>

                      <div className="artist-track-progress">
                        <div
                          className="artist-track-progress-fill"
                          style={{ width: `${isActive ? progress : 0}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* =========================
              SOCIALS
             ========================= */}
          {artist.socials?.length > 0 && (
            <section className="artist-modal-section artist-modal-social-section">
              <div className="artist-modal-section-label">
                СОЦСЕТИ
              </div>
              <div className="artist-modal-socials">
                {artist.socials.map((social) => (
                  <a
                    key={social.type || social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="artist-modal-social"
                    aria-label={social.name}
                    title={social.name}
                  >
                    {social.icon && (
                      <img
                        src={social.icon}
                        alt=""
                        className="artist-modal-social-icon"
                      />
                    )}
                    <span className="artist-modal-social-name">
                      {social.name || social.type}
                    </span>
                    <span className="artist-modal-social-arrow">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtistModal