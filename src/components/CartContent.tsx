import React from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import './CartContent.css';

const CartContent: React.FC = () => {
  const cartItems = [
    { id: 1, name: 'Latte', price: 25000, qty: 1 },
    { id: 2, name: 'Burger', price: 40000, qty: 2 },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const taxRate = 0.11;
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + taxAmount;

  return (
    <div className="cart-container">

      {/* LIST ITEM */}
      <IonList lines="full" className="cart-list">
        {cartItems.map((item) => (
          <IonItem key={item.id} className="cart-item">
            <IonLabel>
              <h2>{item.name}</h2>
              <p>Rp {item.price.toLocaleString()}</p>
            </IonLabel>

            <div slot="end" className="qty-control">
              <IonIcon icon={removeCircleOutline} className="icon-minus" />
              <IonText className="qty-text">{item.qty}</IonText>
              <IonIcon icon={addCircleOutline} className="icon-plus" />
            </div>
          </IonItem>
        ))}
      </IonList>

      {/* SUMMARY */}
      <div className="cart-summary">

        <div className="row">
          <IonText className="label">Subtotal</IonText>
          <IonText className="value">
            Rp {subtotal.toLocaleString()}
          </IonText>
        </div>

        <div className="row">
          <IonText className="label">Tax (11%)</IonText>
          <IonText className="value">
            Rp {taxAmount.toLocaleString()}
          </IonText>
        </div>

        <div className="divider"></div>

        <div className="row total">
          <IonText>Total Payment</IonText>
          <IonText className="total-price">
            Rp {finalTotal.toLocaleString()}
          </IonText>
        </div>

        <IonButton expand="block" className="checkout-btn">
          Checkout Now
        </IonButton>
      </div>
    </div>
  );
};

export default CartContent;
