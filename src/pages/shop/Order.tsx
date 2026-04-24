import { useState, useEffect } from 'react';
import {
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import { useCartStore } from '../../store/useCartStore';
import './Order.css';

import MenuContent from '../../components/MenuContent';
import CartContent from '../../components/CartContent';
import StatusContent from '../../components/StatusContent'; 
import PageHeader from '../../components/PageHeader';
import PageWrapper from '../../components/PageWrapper';

const Order: React.FC = () => {
  const { order, updateOrderStatus } = useCartStore();
  const [activeTab, setActiveTab] = useState<'menu' | 'cart' | 'status'>('menu');

  // Logic Simulasi Status Otomatis
  useEffect(() => {
    if (order) {
      if (order.status === 'received') {
        const timer = setTimeout(() => updateOrderStatus('preparing', 10), 5000);
        return () => clearTimeout(timer);
      } 
      if (order.status === 'preparing') {
        const timer = setTimeout(() => updateOrderStatus('ready', 2), 8000);
        return () => clearTimeout(timer);
      }
      if (order.status === 'ready') {
        const timer = setTimeout(() => updateOrderStatus('done', 0), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [order?.status, updateOrderStatus]);

  return (
    <IonPage>
      <PageWrapper className="order-content">
        <PageHeader
          subtitle="Order Service"
          title="Your Order"
        />

        <IonSegment
          value={activeTab}
          mode="ios"
          onIonChange={(e) => setActiveTab(e.detail.value as any)}
          className="custom-segment"
        >
          <IonSegmentButton value="menu">
            <IonLabel>Menu</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="cart">
            <IonLabel>Cart</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="status">
            <IonLabel>Status</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <div className="order-body">
          {activeTab === 'menu' && <MenuContent />}
          {activeTab === 'cart' && (
            <CartContent 
              onCheckoutSuccess={() => setActiveTab('status')} 
              onGoToMenu={() => setActiveTab('menu')} 
            />
          )}
          {activeTab === 'status' && <StatusContent />}
        </div>
      </PageWrapper>
    </IonPage>
  );
};

export default Order;