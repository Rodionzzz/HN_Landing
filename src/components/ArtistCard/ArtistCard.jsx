import './ArtistCard.css'

// Инициалы для карточки-заглушки: «Королева Ведьм» → «КВ»,
// «The Madbilly's Trio» → «MT» (артикль The пропускаем)
function getInitials(name) {
  const words = name
    .split(/\s+/)
    .filter((word) => word && word.toLowerCase() !== 'the')

  if (words.length === 0) {
    return ''
  }

  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''

  return (first + last).toUpperCase()
}

// index — порядковый номер в сетке (для поочерёдной анимации появления),
// badge — необязательная метка в углу (например «2025 · 2026»)
function ArtistCard({ artist, index = 0, badge }) {
  return (
    <a
      href={`#artist/${artist.id}`}
      className="artist-card"
      aria-label={`Открыть страницу группы ${artist.name}`}
      style={{ '--i': index }}
    >
      {artist.image ? (
        <img
          src={artist.image}
          alt={artist.name}
          className="artist-card-photo"
          loading="lazy"
          decoding="async"
        />
      ) : (
        // Фото группы ещё нет — показываем фирменную заглушку
        <div className="artist-card-placeholder" aria-hidden="true">
          <span>{getInitials(artist.name)}</span>
        </div>
      )}

      {badge && <span className="artist-card-badge">{badge}</span>}

      <div className="artist-card-overlay"></div>

      <div className="artist-card-content">
        <div className="artist-card-text">
          <h3>{artist.name}</h3>
          <p>{artist.genre}</p>
        </div>
      </div>
    </a>
  )
}

export default ArtistCard
