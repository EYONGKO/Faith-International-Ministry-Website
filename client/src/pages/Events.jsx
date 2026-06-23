import { useEffect, useState } from 'react';
import { getEvents } from '../api';
import EventCard from '../components/EventCard';
import HeroSlideshow from '../components/HeroSlideshow';
import { staticEvents } from '../staticData';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { data } = await getEvents();
        setEvents(data);
      } catch {
        setEvents(staticEvents);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return (
    <div>
      <HeroSlideshow
        title="Events"
        subtitle="Stay connected with upcoming services, gatherings, and community activities."
      />

      <section className="section">
        <div className="container">
          {loading && <p className="loading">Loading events...</p>}
          {!loading && (
            <div className="card-grid">
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
