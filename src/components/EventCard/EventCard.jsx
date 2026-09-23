function EventCard({ event }) {
  return (
    <article className="event-card">

      <div className="event-card-date">
        {event.date}
      </div>

      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <a href={`/events/${event.id}`}>
        Подробнее ↗
      </a>

    </article>
  )
}

export default EventCard