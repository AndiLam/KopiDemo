import React from 'react';
import { IonCard, IonCardContent, IonText, IonIcon, IonButton } from '@ionic/react';
import { timeOutline, checkmarkCircle, fastFoodOutline, restaurantOutline, receiptOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { useCartStore } from '../store/useCartStore';
import './StatusContent.css';

const StatusContent: React.FC = () => {
  const order = useCartStore((state) => state.order);

  if (!order) {
    return (
      <div className="empty-status-container">
        <IonIcon icon={receiptOutline} className="empty-icon" />
        <h3>No Active Order</h3>
        <p>Grab some food and start your order!</p>
      </div>
    );
  }

  const getStatusClass = (step: string) => {
    const statusLevel: Record<string, number> = { received: 1, preparing: 2, ready: 3, done: 4 };
    const current = statusLevel[order.status];
    const target = statusLevel[step];
    if (current > target) return 'done';
    if (current === target) return 'active';
    return '';
  };

  const subtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxAmount = subtotal * 0.11;
  const finalTotal = subtotal + taxAmount;

  return (
    <div className="status-container">
      {/* STATUS CARD */}
      <IonCard className="estimation-card">
        <IonCardContent>
          <div className="est-header">
            <IonIcon icon={order.status === 'done' ? checkmarkDoneOutline : timeOutline} />
            <IonText>{order.status === 'done' ? 'Order Completed' : 'Estimated Ready In'}</IonText>
          </div>
          <h1 className="est-time">{order.status === 'done' ? 'Enjoy!' : `${order.eta} Min`}</h1>
          <div className="order-badge">
            <IonText>Table #05 • Dine In</IonText>
          </div>
        </IonCardContent>
      </IonCard>

      {/* TRACKING STEPPER */}
      <div className="tracking-list">
        <div className={`step ${getStatusClass('received')}`}>
          <div className="step-icon"><IonIcon icon={checkmarkCircle} /></div>
          <div className="step-label">
            <h3>Order Received</h3>
            <p>The kitchen has received your order</p>
          </div>
        </div>
        <div className={`step ${getStatusClass('preparing')}`}>
          <div className="step-icon"><IonIcon icon={fastFoodOutline} /></div>
          <div className="step-label">
            <h3>Preparing</h3>
            <p>The chef is preparing your order</p>
          </div>
        </div>
        <div className={`step ${getStatusClass('ready')}`}>
          <div className="step-icon"><IonIcon icon={restaurantOutline} /></div>
          <div className="step-label">
            <h3>Ready to Serve</h3>
            <p>The order is ready to be served</p>
          </div>
        </div>
      </div>

      {/* ORDER DETAILS */}
      <div className="active-items-section">
        <div className="section-title">
          <h4>Order Details</h4>
          <IonText color="medium">#IMS-2026</IonText>
        </div>
        
        <div className="items-card">
          {order.items.map((item, index) => (
            <div key={index} className="order-item-row">
              <div className="item-info">
                <span className="item-qty">{item.quantity}x</span>
                <span className="item-name">{item.name}</span>
              </div>
              <span className="item-price">Rp {item.price.toLocaleString()}</span>
            </div>
          ))}
          
          <div className="divider"></div>
          
          <div className="order-summary-row">
            <IonText color="medium">Subtotal</IonText>
            <IonText>Rp {subtotal.toLocaleString()}</IonText>
          </div>
          <div className="order-summary-row">
              <IonText color="medium">Tax (11%)</IonText>
              <IonText>Rp {taxAmount.toLocaleString()}</IonText>
            </div>

            <div className="divider"></div>
            
            <div className="order-total-row">
              <span>Total Payment</span>
              <span className="total-price">Rp {finalTotal.toLocaleString()}</span>
            </div>
        </div>

        {/* HELP BUTTON */}
        <IonButton expand="block" fill="outline" className="help-btn">
          Need Help? Call Waiter
        </IonButton>
      </div>
    </div>
  );
};

export default StatusContent;