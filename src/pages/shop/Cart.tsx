import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';
import { useCartStore } from '../../store/useCartStore';
import { useIonRouter } from '@ionic/react';

const Cart: React.FC = () => {
  const cart = useCartStore((s) => s.cart);
  const checkout = useCartStore((s) => s.checkout);
  const router = useIonRouter();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    checkout();
    router.push('/tabs/order-status', 'forward');
  };

  return (
    <IonPage>
      <IonContent>

        <IonList>
          {cart.map((item, i) => (
            <IonItem key={i}>
              <IonLabel>
                {item.name} - Rp {item.price}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <h3>Total: Rp {total}</h3>

        <IonButton expand="block" onClick={handleCheckout}>
          Checkout
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Cart;
