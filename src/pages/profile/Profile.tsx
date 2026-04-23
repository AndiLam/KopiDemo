import {
  IonPage,
  IonAvatar,
  IonText,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonButton,
  useIonAlert,  
  useIonLoading,
  useIonToast   
} from '@ionic/react';
import { 
  personOutline, 
  starOutline, 
  shieldCheckmarkOutline, 
  calendarClearOutline, 
  settingsOutline,
  logOutOutline,
  chevronForwardOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router';
import './Profile.css';
import { Preferences } from '@capacitor/preferences';
import PageWrapper from '../../components/PageWrapper';

const Profile: React.FC = () => {

  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const handleLogout = () => {
    presentAlert({
      header: 'Logout',
      message: 'Are you sure you want to log out?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { console.log('Logout cancelled'); }
        },
        {
          text: 'Logout',
          role: 'confirm',
          handler: async () => {
            await presentLoading({
              message: 'Logging out...',
              duration: 1000,
              cssClass: 'loading-logout'
            });
            
            await Preferences.remove({ key: 'isLoggedIn' });

            setTimeout(() => {
              presentToast({
                message: 'You have been logged out.',
                duration: 1500,
                color: 'success',
                position: 'bottom'
              });
              history.replace('/login');
            }, 1000);
          }
        }
      ]
    });
  };

  return (
    <IonPage>
      <PageWrapper className="profile-content">
          {/* HEADER PROFILE */}
          <div className="profile-header">
            <div className="avatar-wrapper">
              <IonAvatar>
                <img src="/assets/avatar.png" alt="avatar" />
              </IonAvatar>
              <div className="badge-pro">PRO</div>
            </div>
            <h2>John Doe</h2>
            <IonText className="email">john@email.com</IonText>
          </div>

          {/* POINT CARD - Pakai Variable Warna Kamu */}
          <div className="point-card">
            <div className="point-info">
              <IonIcon icon={starOutline} className="star-icon" />
              <div>
                <h3>Total Points</h3>
                <p>1,250 <span>pts</span></p>
              </div>
            </div>
            <IonButton fill="clear" className="redeem-btn">Redeem</IonButton>
          </div>

          {/* MENU LIST */}
          <IonList lines="none" className="profile-menu">
            <IonItem button routerLink="/tabs/profile/edit-profile" routerDirection="forward" className="menu-item">
              <IonIcon slot="start" icon={personOutline} />
              <IonLabel>Edit Profile</IonLabel>
              <IonIcon slot="end" icon={chevronForwardOutline} className="chevron" />
            </IonItem>

            <IonItem button routerLink="/tabs/profile/point-history" routerDirection="forward" className="menu-item">
              <IonIcon slot="start" icon={starOutline} />
              <IonLabel>Point History</IonLabel>
              <IonIcon slot="end" icon={chevronForwardOutline} className="chevron" />
            </IonItem>

            <IonItem button routerLink="/tabs/profile/membership-benefits" routerDirection="forward" className="menu-item">
              <IonIcon slot="start" icon={shieldCheckmarkOutline} />
              <IonLabel>Membership Benefits</IonLabel>
              <IonIcon slot="end" icon={chevronForwardOutline} className="chevron" />
            </IonItem>

            <IonItem button routerLink="/tabs/profile/my-agenda" routerDirection="forward" className="menu-item">
              <IonIcon slot="start" icon={calendarClearOutline} />
              <IonLabel>My Agenda</IonLabel>
              <IonIcon slot="end" icon={chevronForwardOutline} className="chevron" />
            </IonItem>

            <IonItem button routerLink="/tabs/profile/settings" routerDirection="forward" className="menu-item">
              <IonIcon slot="start" icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
              <IonIcon slot="end" icon={chevronForwardOutline} className="chevron" />
            </IonItem>

            <IonItem button className="logout-item" onClick={handleLogout}>
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
      </PageWrapper>
    </IonPage>
  );
};

export default Profile;