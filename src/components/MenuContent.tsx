import React from 'react';
import {
  IonList,
  IonItem,
  IonThumbnail,
  IonLabel,
  IonButton,
  IonIcon,
  IonText
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useCartStore } from '../store/useCartStore';
import './MenuContent.css';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const MenuContent: React.FC = () => {
  const addToCart = useCartStore((state) => state.addToCart);

  const products: Product[] = [
    { id: 1, name: 'Latte', price: 25000, img: '/assets/menu/coffee.jpg' },
    { id: 2, name: 'Burger', price: 40000, img: '/assets/menu/burger.jpg' },
    { id: 3, name: 'Cake', price: 30000, img: '/assets/menu/cake.jpg' },
  ];

  return (
    <IonList lines="none" className="menu-list">
      {products.map((item) => (
        <IonItem key={item.id} className="menu-item">
          <IonThumbnail slot="start" className="menu-thumbnail">
            <img src={item.img} alt={item.name} />
          </IonThumbnail>

          <IonLabel>
            <h2>{item.name}</h2>
            <IonText className="menu-price">
              Rp {item.price.toLocaleString()}
            </IonText>
          </IonLabel>

          <IonButton
            slot="end"
            fill="clear"
            className="add-btn"
            onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
          >
            <IonIcon icon={addOutline} />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default MenuContent;