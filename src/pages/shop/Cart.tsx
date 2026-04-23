import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';
import { useCartStore } from '../../store/useCartStore';
import { useHistory } from 'react-router';

const Cart: React.FC = () => {
    const cart = useCartStore((state) => state.cart);
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
            {cart.map((item, index) => (
            <IonItem key={index}>
              <IonLabel>
                {item.name} - Rp {item.price}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonButton expand="block" onClick={() => history.push('/order-status')}>
          Checkout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cart;
