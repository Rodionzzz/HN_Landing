import { useEffect, useRef, useState } from 'react'

function ArtistModal({ artist, onClose }) {
  const audioRef = useRef(null)
  const [playingTrackId, setPlayingTrackId] = useState(null)
  const [selectedTrackId, setSelectedTrackId] = useState(null)
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
    setSelectedTrackId(null)
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
    const externalUrl = track.platforms?.yandexMusic?.iframeUrl
    const audio = audioRef.current

    // Внешний плеер: открываем/закрываем iframe выбранного трека.
    if (externalUrl) {
      if (audio) {
        audio.pause()
      }

      setPlayingTrackId(null)
      setProgress(0)
      setSelectedTrackId((currentId) =>
        currentId === track.id ? null : track.id
      )
      return
    }

    // Обратная совместимость для локальных audioUrl.
    if (!audio || !track.audioUrl) {
      return
    }

    setSelectedTrackId(null)

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
      .then(() => {
        setPlayingTrackId(track.id)
      })
      .catch(() => {
        setPlayingTrackId(null)
      })
  }

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) {
      return
    }
    setProgress((audio.currentTime / audio.duration) * 100)
  }

  const handleEnded = () => {
    const tracks = artist.tracks || []
    const currentIndex = tracks.findIndex((item) => item.id === playingTrackId)
    const nextTrack = tracks[currentIndex + 1]

    if (nextTrack?.audioUrl) {
      const audio = audioRef.current
      audio.src = nextTrack.audioUrl
      audio.currentTime = 0
      audio.play()
      setPlayingTrackId(nextTrack.id)
      setProgress(0)
      return
    }

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
      <div className={`artist-modal-window${playingTrackId ? ' is-playing' : ''}`}>
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
        />

        {/* Тлеющие искры */}
        <div className="artist-modal-embers" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

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
                  const isSelected = selectedTrackId === track.id
                  const isPlaying = playingTrackId === track.id
                  const hasExternalPlayer = Boolean(
                    track.platforms?.yandexMusic?.iframeUrl
                  )

                  return (
                    <div
                      key={track.id}
                      className={`artist-track${
                        isSelected || isPlaying ? ' is-active' : ''
                      }`}
                    >
                      <div className="artist-track-row">
                        <button
                          type="button"
                          className="artist-track-play-btn"
                          onClick={() => handleTrackClick(track)}
                          aria-label={
                            isPlaying
                              ? `Пауза: ${track.title}`
                              : hasExternalPlayer
                                ? `Открыть плеер: ${track.title}`
                                : `Слушать ${track.title}`
                          }
                        >
                          {isPlaying ? '❚❚' : '▶'}
                        </button>

                        <span className="artist-track-title">{track.title}</span>

                        {isPlaying && (
                          <span className="artist-eq" aria-hidden="true">
                            <i></i>
                            <i></i>
                            <i></i>
                          </span>
                        )}

                        {track.duration && (
                          <span className="artist-track-duration">
                            {track.duration}
                          </span>
                        )}
                      </div>

                      {isPlaying && (
                        <div className="artist-track-progress">
                          <div
                            className="artist-track-progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      )}

                      {isSelected && hasExternalPlayer && (
                        <div className="artist-external-player">
                          <div className="artist-external-player-header">
                            <span>ЯНДЕКС МУЗЫКА</span>
                            <a
                              href={track.platforms.yandexMusic.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Открыть в Яндекс Музыке ↗
                            </a>
                          </div>

                          <iframe
                            src={track.platforms.yandexMusic.iframeUrl}
                            title={`${artist.name} — ${track.title}`}
                            frameBorder="0"
                            allow="clipboard-write; autoplay"
                            loading="lazy"
                          >
                            Слушайте {track.title} — {artist.name} на Яндекс Музыке
                          </iframe>
                        </div>
                      )}
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