function ArtistCard({ artist }) {
  return (
    <a
      href={`#artist/${artist.id}`}
      className="artist-card"
      aria-label={`Открыть страницу группы ${artist.name}`}
    >
      <img
        src={artist.image}
        alt={artist.name}
        className="artist-card-photo"
      />

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