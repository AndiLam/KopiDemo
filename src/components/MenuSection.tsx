import React from 'react';
import { IonIcon } from '@ionic/react';
import { cartOutline, star  } from 'ionicons/icons';
import './MenuSection.css';

interface Item {
  id: number;
  name: string;
  price: number;
  img: string;
  rating?: number;
}

interface Props {
  title: string;
  items: Item[];
}

const MenuSection: React.FC<Props> = ({ title, items }) => {

  const handleAddToCart = (item: Item) => {
    console.log('Add to cart:', item);
    // nanti bisa connect ke state / redux / context
  };

  return (
    <div className="menu-section">
      <div className="section-header">
        <h4>{title}</h4>
      </div>

      <div className="menu-list">
        {items.map((item) => (
          <div key={item.id} className="menu-card">

            {/* IMAGE */}
            <img src={item.img} alt={item.name} />

            <div className="rating-badge">
              <IonIcon icon={star} />
              <span>{item.rating}</span>
            </div>

            {/* INFO */}
            <div className="menu-info">
              <div className="menu-top">
                <h4>{item.name}</h4>

                {/* ADD BUTTON */}
                <button
                  className="add-cart-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  <IonIcon icon={cartOutline} />
                </button>
              </div>

              <p>Rp {item.price.toLocaleString()}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuSection;
