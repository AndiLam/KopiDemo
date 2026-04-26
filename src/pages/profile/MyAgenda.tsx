import { IonPage } from '@ionic/react';
import './MyAgenda.css';

import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

import { calendarClearOutline } from 'ionicons/icons';

type AgendaItem = {
  id: number;
  title: string;
  date: string;
  status: 'upcoming' | 'done' | 'canceled';
  img: string;
};

const myEvents: AgendaItem[] = [
  {
    id: 1,
    title: 'Live Music Night',
    date: '25 July 2026',
    status: 'upcoming',
    img: '/assets/event/event1.jpg'
  },
  {
    id: 2,
    title: 'Coffee Brewing Class',
    date: '20 July 2026',
    status: 'done',
    img: '/assets/event/event2.jpg'
  },
  {
    id: 3,
    title: 'Special Tasting Event',
    date: '1 July 2026',
    status: 'canceled',
    img: '/assets/event/event3.jpg'
  }
];

const MyAgenda: React.FC = () => {
  const isEmpty = myEvents.length === 0;

  return (
    <IonPage>
      <PageWrapper className="agenda-content">

        <PageHeader
          subtitle="Your Activity"
          title="My Agenda"
        />

        {isEmpty ? (
          <EmptyState
            icon={calendarClearOutline}
            title="No Agenda Yet"
            message="You haven't joined any events yet."
          />
        ) : (
          <div className="agenda-list">
            {myEvents.map((event) => (
              <div key={event.id} className="agenda-card">

                {/* IMAGE */}
                <img src={event.img} alt={event.title} />

                {/* INFO */}
                <div className="agenda-info">
                  <span className={`status ${event.status}`}>
                    {event.status === 'upcoming' ? 'Upcoming' : event.status === 'done' ? 'Completed' : 'Canceled'}
                  </span>

                  <h3>{event.title}</h3>
                  <p>{event.date}</p>
                </div>

              </div>
            ))}
          </div>
        )}

      </PageWrapper>
    </IonPage>
  );
};

export default MyAgenda;
