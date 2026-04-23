import {
  IonPage,
  IonSearchbar,
  IonAvatar,
  useIonViewDidEnter
} from '@ionic/react';

import { App } from '@capacitor/app';
import './Home.css';

import MenuSection from '../../components/MenuSection';
import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';

// Swiper React
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const categories = [
  { name: 'Popular', img: '/assets/cat-popular.png' },
  { name: 'Food', img: '/assets/cat-food.png' },
  { name: 'Drink', img: '/assets/cat-drink.png' },
  { name: 'Dessert', img: '/assets/cat-dessert.png' },
  { name: 'Coffee Tools', img: '/assets/cat-coffee-tools.png' },
  { name: 'Merchandise', img: '/assets/cat-merchandise.png' }
];

const menus = [
  { id: 1, name: 'Latte', price: 25000, img: '/assets/coffee.jpg', rating: 4.8 },
  { id: 2, name: 'Burger', price: 40000, img: '/assets/burger.jpg', rating: 4.6 },
  { id: 3, name: 'Cake', price: 30000, img: '/assets/cake.jpg', rating: 4.7 }
];

const promos = [
  {
    id: 1,
    title: '20% OFF',
    desc: 'Special for coffee lovers ☕',
    img: '/assets/promo.jpg'
  },
  {
    id: 2,
    title: 'Buy 1 Get 1',
    desc: 'Only today! Don’t miss it 🔥',
    img: '/assets/promo2.jpg'
  },
  {
    id: 3,
    title: 'Free Dessert',
    desc: 'For every large coffee ☕🍰',
    img: '/assets/promo3.jpg'
  }
];

const Home: React.FC = () => {

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

        {/* HEADER */}
        <PageHeader
          subtitle="Hi, User 👋"
          title="Find your favorite food"
          rightElement={
            <IonAvatar>
              <img src="/assets/avatar.png" alt="avatar" />
            </IonAvatar>
          }
        />

        {/* SEARCH */}
        <IonSearchbar
          className="search-bar"
          placeholder="Search menu..."
        />

        {/* PROMO */}
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
              <div
                className="promo-banner"
                style={{ backgroundImage: `url(${promo.img})` }}
              >
                <div className="promo-text">
                  <h3>{promo.title}</h3>
                  <p>{promo.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CATEGORY */}
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

        {/* MENU */}
        <MenuSection title="Recommended for you" items={menus} />
        <MenuSection title="Popular Drinks" items={menus} />
        <MenuSection title="Popular Food" items={menus} />

      </PageWrapper>
    </IonPage>
  );
};

export default Home;
