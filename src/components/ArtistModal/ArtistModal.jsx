import { useEffect } from 'react'

function ArtistModal({ artist, onClose }) {
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

  if (!artist) {
    return null
  }

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
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
          backgroundImage: `url(${artist.image})`,
        }}
      />

      <div className="artist-modal-background-overlay" />


      {/* Окно */}

      <div className="artist-modal-window">

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
                {artist.description ||
                  'Информация о группе появится позже.'}
              </p>

            </div>

          </section>


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
                    key={social.type}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="artist-modal-social"
                    aria-label={social.name}
                    title={social.name}
                  >
                    <img
                      src={social.icon}
                      alt=""
                      className="artist-modal-social-icon"
                    />

                    <span className="artist-modal-social-name">
                      {social.name}
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