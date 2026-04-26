import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonSearchbar,
  IonAvatar,
  IonModal,
  IonIcon,
  IonButton,
  useIonViewDidEnter
} from '@ionic/react';
import { closeCircle } from 'ionicons/icons';
import { App } from '@capacitor/app';
import './Home.css';

import MenuSection from '../../components/MenuSection';
import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const categories = [
  { name: 'Popular', img: '/assets/category/cat-popular.png' },
  { name: 'Food', img: '/assets/category/cat-food.png' },
  { name: 'Drink', img: '/assets/category/cat-drink.png' },
  { name: 'Dessert', img: '/assets/category/cat-dessert.png' },
  { name: 'Coffee Tools', img: '/assets/category/cat-coffee-tools.png' },
  { name: 'Merchandise', img: '/assets/category/cat-merchandise.png' }
];

const menus = [
  { id: 1, name: 'Latte', price: 25000, img: '/assets/menu/coffee.jpg', rating: 4.8 },
  { id: 2, name: 'Burger', price: 40000, img: '/assets/menu/burger.jpg', rating: 4.6 },
  { id: 3, name: 'Cake', price: 30000, img: '/assets/menu/cake.jpg', rating: 4.7 }
];

const promos = [
  { id: 1, title: '20% OFF', desc: 'Special for coffee lovers ☕', img: '/assets/offer/promo.jpg' },
  { id: 2, title: 'Buy 1 Get 1', desc: 'Only today! Don’t miss it 🔥', img: '/assets/offer/promo2.jpg' },
  { id: 3, title: 'Free Dessert', desc: 'For every large coffee ☕🍰', img: '/assets/offer/promo3.jpg' }
];

const Home: React.FC = () => {
  const [showAds, setShowAds] = useState(false);

  // Efek untuk Iklan
  useEffect(() => {
    const hasSeenAds = sessionStorage.getItem('hasSeenAds');
    if (!hasSeenAds) {
      const timer = setTimeout(() => {
        setShowAds(true);
        sessionStorage.setItem('hasSeenAds', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Handler Tombol Back Device
  useIonViewDidEnter(() => {
    let listener: any;
    const setup = async () => {
      listener = await App.addListener('backButton', ({ canGoBack }) => {
        if (!canGoBack) {
          App.exitApp();
        }
      });
    };
    setup();
    return () => {
      listener?.remove();
    };
  });

  return (
    <IonPage>
      <PageWrapper className="home-content">
        <PageHeader
          subtitle="Hi, User 👋"
          title="Find your favorite food"
          rightElement={
            <IonAvatar>
              <img src="/assets/avatar.png" alt="avatar" />
            </IonAvatar>
          }
        />

        <IonSearchbar className="search-bar" placeholder="Search menu..." />

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          spaceBetween={10}
          slidesPerView={1}
          loop
          pagination={{ clickable: true }}
          className="promo-slider"
        >
          {promos.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="promo-banner" style={{ backgroundImage: `url(${promo.img})` }}>
                <div className="promo-text">
                  <h3>{promo.title}</h3>
                  <p>{promo.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="section">
          <div className="section-header">
            <h4>Category</h4>
          </div>
          <div className="category-list">
            {categories.map((cat) => (
              <div key={cat.name} className="category-item">
                <img src={cat.img} alt={cat.name} />
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <MenuSection title="Recommended for you" items={menus} />
        <MenuSection title="Popular Drinks" items={menus} />
        <MenuSection title="Popular Food" items={menus} />
      </PageWrapper>

      {/* popup ads */}
      <IonModal 
        isOpen={showAds} 
        onDidDismiss={() => setShowAds(false)}
        className="ads-modal"
      >
        <div className="ads-container">
          <IonIcon 
            icon={closeCircle} 
            className="close-ads-icon" 
            onClick={() => setShowAds(false)} 
          />
          <div className="ads-content">
            <div className="ads-image-wrapper">
              <img src="/assets/offer/promo.jpg" alt="Special Promo" />
              <div className="ads-tag">LIMITED TIME</div>
            </div>
            <div className="ads-info">
              <h2>Weekend Special!</h2>
              <p>Get 20% OFF for all coffee lovers. Valid only this weekend!</p>
              <IonButton expand="block" className="ads-action-btn" onClick={() => setShowAds(false)}>
                Claim Voucher
              </IonButton>
            </div>
          </div>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default Home;