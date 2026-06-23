export default function EventCard({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="card event-card">
      {event.image && (
        <img src={event.image} alt={event.title} className="card-image" />
      )}
      <div className="card-body">
        <p className="card-meta">{formattedDate} · {event.time}</p>
        <h3>{event.title}</h3>
        <p className="event-location">{event.location}</p>
        <p>{event.description}</p>
      </div>
    </article>
  );
}
