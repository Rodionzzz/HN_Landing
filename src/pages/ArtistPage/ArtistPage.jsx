function ArtistPage({ artist, onBack }) {
  if (!artist) {
    return (
      <main className="artist-page artist-page-not-found">
        <button onClick={onBack} className="artist-back">
          ← Назад к группам
        </button>

        <h1>Группа не найдена</h1>
      </main>
    )
  }

  return (
    <main className="artist-page">

      <button
        type="button"
        className="artist-back"
        onClick={onBack}
      >
        ← Назад к группам
      </button>


      {/* HERO */}

      <section className="artist-hero">

        <div className="artist-hero-image">
          <img
            src={artist.image}
            alt={artist.name}
          />

          <div className="artist-hero-overlay"></div>

          <div className="artist-hero-title">
            <h1>{artist.name}</h1>

            <p>{artist.genre}</p>
          </div>
        </div>

      </section>


      {/* ABOUT */}

      <section className="artist-section artist-about">

        <div className="artist-section-label">
          О ГРУППЕ
        </div>

        <div className="artist-about-content">

          <p>
            {artist.description ||
              'Информация о группе появится позже.'}
          </p>

          {artist.vk && (
            <a
              href={artist.vk}
              target="_blank"
              rel="noreferrer"
              className="artist-social"
            >
              VK ↗
            </a>
          )}

        </div>

      </section>


      {/* EVENTS */}

      <section className="artist-section">

        <div className="artist-section-label">
          МЕРОПРИЯТИЯ
        </div>

        <div className="artist-empty-block">
          <span>Мероприятия появятся здесь</span>
        </div>

      </section>


      {/* MUSIC */}

      <section className="artist-section">

        <div className="artist-section-label">
          МУЗЫКА
        </div>

        <div className="artist-empty-block">
          <span>Альбомы и треки появятся здесь</span>
        </div>

      </section>


      {/* PHOTOS */}

      <section className="artist-section artist-photos-section">

        <div className="artist-section-label">
          ФОТО
        </div>

        <div className="artist-empty-block">
          <span>Фотографии появятся здесь</span>
        </div>

      </section>

    </main>
  )
}

export default ArtistPage