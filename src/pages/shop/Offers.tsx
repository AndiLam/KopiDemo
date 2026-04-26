import {
  IonPage,
  IonButton
} from '@ionic/react';
import { giftOutline } from 'ionicons/icons';
import './Offers.css';

import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';

type Offer = {
  id: number;
  title: string;
  discount: string;
  desc: string;
  img: string;
};

const offers: Offer[] = [
  {
    id: 1,
    title: 'Buy 1 Get 1 Coffee',
    discount: '50%',
    desc: 'Only for today!',
    img: '/assets/offer/offer1.jpg'
  },
  {
    id: 2,
    title: 'Weekend Combo',
    discount: '30%',
    desc: 'Burger + Drink special price',
    img: '/assets/offer/offer2.jpg'
  },
  {
    id: 3,
    title: 'Dessert Day',
    discount: '20%',
    desc: 'Sweet treats for less',
    img: '/assets/offer/offer3.jpg'
  }
];

const Offers: React.FC = () => {
  return (
    <IonPage>
      <PageWrapper className="offers-content">

        <PageHeader
          subtitle="Best Deals 🔥"
          title="Special Offers"
        />

        {offers.length === 0 ? (
          <EmptyState
            icon={giftOutline}
            title="No Offers Available"
            message="Check back later for exciting deals!"
          />
        ) : (
          <div className="offer-list">
            {offers.map((offer) => (
              <div key={offer.id} className="offer-card">

                {/* IMAGE */}
                <img src={offer.img} alt={`Promo ${offer.title}`} />

                {/* BADGE */}
                <div className="discount-badge">
                  {offer.discount}
                </div>

                {/* INFO */}
                <div className="offer-info">
                  <h3>{offer.title}</h3>
                  <p>{offer.desc}</p>

                  <IonButton size="small" expand="block">
                    Claim Offer
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

export default Offers;
