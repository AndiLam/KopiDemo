import { useState } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';

import './Order.css';

import MenuContent from '../../components/MenuContent';
import CartContent from '../../components/CartContent';
import PageHeader from '../../components/PageHeader';
import PageWrapper from '../../components/PageWrapper';

const Order: React.FC = () => {
  type TabType = 'menu' | 'cart';
  const [activeTab, setActiveTab] = useState<TabType>('menu');

  return (
    <IonPage>
      <PageWrapper className="order-content">

        {/* HEADER */}
        <PageHeader
          subtitle="Your Order"
          title="My Order"
        />

        {/* SEGMENT */}
        <IonSegment
          value={activeTab}
          mode="ios"
          onIonChange={(e) => {
            const value = e.detail.value as TabType;
            if (value) setActiveTab(value);
          }}
          className="custom-segment"
        >
          <IonSegmentButton value="menu">
            <IonLabel>Menu</IonLabel>
          </IonSegmentButton>

          <IonSegmentButton value="cart">
            <IonLabel>Cart</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* CONTENT */}
        <div className="order-body">
          {activeTab === 'menu' && <MenuContent key={`menu-${activeTab}`} />}
          {activeTab === 'cart' && <CartContent key={`cart-${activeTab}`} />}
        </div>
      </PageWrapper>
    </IonPage>
  );
};

export default Order;