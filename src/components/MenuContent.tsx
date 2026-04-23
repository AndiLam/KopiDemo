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
import './MenuContent.css';

import { useIonViewWillEnter } from '@ionic/react';

interface Product {
  id: number;
  name: string;
  price: number;
  img: string;
}

const MenuContent: React.FC = () => {
  const products: Product[] = [
    { id: 1, name: 'Latte', price: 25000, img: '/assets/coffee.jpg' },
    { id: 2, name: 'Burger', price: 40000, img: '/assets/burger.jpg' },
    { id: 3, name: 'Cake', price: 30000, img: '/assets/cake.jpg' },
  ];

const [timestamp, setTimestamp] = React.useState(Date.now());

  useIonViewWillEnter(() => {
    setTimestamp(Date.now());
  });
  
  return (
<IonList lines="none" className="menu-list" key={timestamp}>
      {products.map((item) => (
        <IonItem key={item.id} className="menu-item">

          {/* IMAGE */}
          <IonThumbnail slot="start" className="menu-thumbnail">
            <img src={item.img} alt={item.name} />
          </IonThumbnail>

          {/* INFO */}
          <IonLabel>
            <h2>{item.name}</h2>
            <IonText className="menu-price">
              Rp {item.price.toLocaleString()}
            </IonText>
          </IonLabel>

          {/* ACTION */}
          <IonButton
            slot="end"
            fill="clear"
            className="add-btn"
          >
            <IonIcon icon={addOutline} />
          </IonButton>

        </IonItem>
      ))}
    </IonList>
  );
};

export default MenuContent;
