import {
  IonPage,
  IonButton
} from '@ionic/react';
import './Menu.css';

import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

import { calendarOutline } from 'ionicons/icons';

type Event = {
  id: number;
  title: string;
  date: string;
  desc: string;
  img: string;
};

const events: Event[] = [
  {
    id: 1,
    title: 'Live Music Night',
    date: '25 July 2026',
    desc: 'Enjoy acoustic performance with your favorite coffee',
    img: '/assets/event/event1.jpg'
  },
  {
    id: 2,
    title: 'Coffee Brewing Class',
    date: '28 July 2026',
    desc: 'Learn how to brew like a barista',
    img: '/assets/event/event2.jpg'
  },
  {
    id: 3,
    title: 'Open Mic Night',
    date: '30 July 2026',
    desc: 'Show your talent and enjoy the vibe',
    img: '/assets/event/event3.jpg'
  }
];

const Menu: React.FC = () => {
  return (
    <IonPage>
      <PageWrapper className="menu-content">

        <PageHeader
          subtitle="Explore"
          title="Events & Activities"
        />

        {events.length === 0 ? (
          <EmptyState
            icon={calendarOutline}
            title="No Events Available"
            message="Stay tuned! Upcoming events will appear here."
          />
        ) : (
          <div className="event-list">
            {events.map((event) => (
              <div key={event.id} className="event-card">

                {/* IMAGE */}
                <img src={event.img} alt={`Event ${event.title}`} />

                {/* INFO */}
                <div className="event-info">
                  <span className="event-date">{event.date}</span>
                  <h3>{event.title}</h3>
                  <p>{event.desc}</p>

                  <IonButton expand="block" className="event-button">
                    View Details
                  </IonButton>
                </div>

              </div>
            ))}
          </div>
        )}

      </PageWrapper>
    </IonPage>
  );
};

export default Menu;
