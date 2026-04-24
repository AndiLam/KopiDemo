import React from 'react';
import { IonList, IonItem, IonLabel, IonButton, IonText, IonIcon } from '@ionic/react';
import { cartOutline, addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useCartStore } from '../store/useCartStore';
import './CartContent.css';

interface CartContentProps {
  onCheckoutSuccess: () => void;
  onGoToMenu: () => void;
}

const CartContent: React.FC<CartContentProps> = ({ onCheckoutSuccess, onGoToMenu }) => {
  const { cart, checkout, clearCart, addToCart, removeFromCart } = useCartStore();

  // Hitung total dengan QTY
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxAmount = subtotal * 0.11;
  const finalTotal = subtotal + taxAmount;

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <div className="empty-cart-icon-wrapper">
            <IonIcon icon={cartOutline} className="empty-cart-icon" />
          </div>
          <h3 className="empty-title">Your Cart is Empty</h3>
          <p className="empty-subtitle">Looks like you haven't added anything yet.</p>
          <IonButton fill="outline" className="browse-btn" onClick={onGoToMenu}>
            Browse Menu
          </IonButton>
        </div>
      ) : (
        <>
          <IonList lines="full" className="cart-list">
            {cart.map((item) => (
              <IonItem key={item.id} className="cart-item">
                <IonLabel>
                  <h2>{item.name}</h2>
                  <p>Rp {item.price.toLocaleString()}</p>
                </IonLabel>

                {/* KONTROL QTY */}
                <div slot="end" className="qty-control">
                  <IonIcon 
                    icon={removeCircleOutline} 
                    className="icon-minus" 
                    onClick={() => removeFromCart(item.id)}
                  />
                  <IonText className="qty-text">{item.quantity}</IonText>
                  <IonIcon 
                    icon={addCircleOutline} 
                    className="icon-plus" 
                    onClick={() => addToCart(item)}
                  />
                </div>
              </IonItem>
            ))}
          </IonList>

          {/* SUMMARY */}
          <div className="cart-summary">
            <div className="row">
              <IonText className="label">Subtotal</IonText>
              <IonText className="value">Rp {subtotal.toLocaleString()}</IonText>
            </div>
            <div className="row">
              <IonText className="label">Tax (11%)</IonText>
              <IonText className="value">Rp {taxAmount.toLocaleString()}</IonText>
            </div>
            <div className="divider"></div>
            <div className="row total">
              <IonText>Total Payment</IonText>
              <IonText className="total-price">Rp {finalTotal.toLocaleString()}</IonText>
            </div>

            <IonButton expand="block" className="checkout-btn" onClick={() => { checkout(); onCheckoutSuccess(); }}>
              Checkout Now
            </IonButton>
            <IonButton fill="clear" color="danger" expand="block" onClick={clearCart} className="clear-btn">
              Clear Cart
            </IonButton>
          </div>
        </>
      )}
    </div>
  );
};

export default CartContent;