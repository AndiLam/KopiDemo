import {
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText
} from '@ionic/react';

import {
  arrowUpOutline,
  arrowDownOutline,
  walletOutline
} from 'ionicons/icons';

import './PointHistory.css';

import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

type PointItem = {
  id: number;
  type: 'earn' | 'redeem';
  title: string;
  date: string;
  point: number;
};

const data: PointItem[] = [
  {
    id: 1,
    type: 'earn',
    title: 'Latte purchase',
    date: '2026-04-20',
    point: 1000,
  },
  {
    id: 2,
    type: 'redeem',
    title: 'Checkout Discount',
    date: '2026-04-21',
    point: -850,
  },
  {
    id: 3,
    type: 'earn',
    title: 'Event Cafe Bonus',
    date: '2026-04-22',
    point: 1100,
  },
];

const PointHistory: React.FC = () => {
  const totalPoints = 1250;

  return (
    <IonPage>
      <PageWrapper className="history-content">

        <PageHeader
          subtitle="Your Point"
          title="Point History"
        />

        {/* EMPTY STATE */}
        {data.length === 0 ? (
          <EmptyState
            icon={walletOutline}
            title="No Transactions Yet"
            message="Start earning points by making your first order."
          />
        ) : (
          <>
            {/* TOTAL POINT CARD */}
            <div className="total-point-banner">
              <IonIcon icon={walletOutline} className="wallet-icon" />
              <p>Your Point</p>
              <h1>
                {totalPoints.toLocaleString('id-ID')} <span>pts</span>
              </h1>
            </div>

            <IonText className="section-title">
              <h5>Recent Transactions</h5>
            </IonText>

            <IonList lines="none" className="history-list">
              {data.map((item) => (
                <IonItem key={item.id} className="history-card">

                  {/* ICON */}
                  <div slot="start" className={`icon-box ${item.type}`}>
                    <IonIcon
                      icon={item.type === 'earn' ? arrowUpOutline : arrowDownOutline}
                    />
                  </div>

                  {/* INFO */}
                  <IonLabel>
                    <h3>{item.title}</h3>
                    <p>
                      {new Date(item.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </IonLabel>

                  {/* POINT */}
                  <div slot="end" className="point-value">
                    <span className={item.type}>
                      {item.type === 'earn' ? '+' : ''}
                      {item.point}
                    </span>
                  </div>

                </IonItem>
              ))}
            </IonList>
          </>
        )}

      </PageWrapper>
    </IonPage>
  );
};

export default PointHistory;
