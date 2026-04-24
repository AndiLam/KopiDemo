import React, { Suspense } from 'react';
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import {
  homeOutline,
  pricetagOutline,
  calendarOutline,
  receiptOutline,
  personOutline
} from 'ionicons/icons';

import './Tabs.css';

// Import Pages
const Home = React.lazy(() => import('../../pages/main/Home'));
const Menu = React.lazy(() => import('../../pages/shop/Menu'));
const Order = React.lazy(() => import('../../pages/shop/Order'));
const Offers = React.lazy(() => import('../../pages/shop/Offers'));
const Profile = React.lazy(() => import('../../pages/profile/Profile'));
const EditProfile = React.lazy(() => import('../../pages/profile/EditProfile'));
const MyAgenda = React.lazy(() => import('../../pages/profile/MyAgenda'));
const PointHistory = React.lazy(() => import('../../pages/profile/PointHistory'));
const MembershipBenefits = React.lazy(() => import('../../pages/profile/MembershipBenefits'));
const Settings = React.lazy(() => import('../../pages/profile/Settings'));

const ElegantLoader = () => (
  <div className="elegant-loader-container">
    <div className="elegant-spinner"></div>
    <div className="loader-text">IMS APP</div>
  </div>
);

const Tabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Suspense fallback={<ElegantLoader />}>
          {/* Tab pages */}
          <Route exact path="/tabs/home" component={Home} />
          <Route exact path="/tabs/menu" component={Menu} />
          <Route exact path="/tabs/offers" component={Offers} />
          <Route exact path="/tabs/order" component={Order} />
          <Route exact path="/tabs/profile" component={Profile} />

          {/* Sub-Pages */}
          <Route exact path="/tabs/profile/edit-profile" component={EditProfile} />
          <Route exact path="/tabs/profile/point-history" component={PointHistory} />
          <Route exact path="/tabs/profile/membership-benefits" component={MembershipBenefits} />
          <Route exact path="/tabs/profile/my-agenda" component={MyAgenda} />
          <Route exact path="/tabs/profile/settings" component={Settings} />

          <Route exact path="/tabs">
            <Redirect to="/tabs/home" />
          </Route>
        </Suspense>
      </IonRouterOutlet>

      <div className="tabs-container">
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/tabs/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="menu" href="/tabs/menu">
            <IonIcon icon={calendarOutline} />
            <IonLabel>Menu</IonLabel>
          </IonTabButton>

          <IonTabButton tab="order" href="/tabs/order">
            <IonIcon icon={receiptOutline} />
            <IonLabel>Order</IonLabel>
          </IonTabButton>

          <IonTabButton tab="offers" href="/tabs/offers">
            <IonIcon icon={pricetagOutline} />
            <IonLabel>Offers</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/tabs/profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </div>
    </IonTabs>
  );
};
export default Tabs;