import {
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonList,
  IonListHeader
} from '@ionic/react';
import { eyeOutline, eyeOffOutline, notificationsOutline, languageOutline, chevronForwardOutline } from 'ionicons/icons';
import { useState } from 'react';
import './Settings.css';
import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';

const Settings: React.FC = () => {
  // State Password
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  // State Preferences
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  const getStrength = (password: string) => {
    if (password.length < 6) return 'Weak';
    if (password.match(/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/)) return 'Strong';
    return 'Medium';
  };

  const strength = getStrength(newPassword);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Password does not match');
      return;
    }
    setError('');
    alert('Settings updated successfully!');
  };

  return (
    <IonPage>
      <PageWrapper className="settings-content">
        <PageHeader
          subtitle="Settings"
          title="Configure your app"
        />

        <div className="settings-container">
          
          {/* SECTION: PREFERENCES */}
          <IonList lines="none" className="settings-list">
            <IonListHeader>
              <IonLabel>App Preferences</IonLabel>
            </IonListHeader>

            <IonItem className="settings-item">
              <IonIcon icon={notificationsOutline} slot="start" className="section-icon" />
              <IonLabel>Notifications</IonLabel>
              <IonToggle 
                slot="end" 
                checked={notifications} 
                onIonChange={e => setNotifications(e.detail.checked)}
                className="custom-toggle"
              />
            </IonItem>

            <IonItem className="settings-item">
              <IonIcon icon={languageOutline} slot="start" className="section-icon" />
              <IonLabel>Language</IonLabel>
              <IonSelect 
                slot="end"
                value={language} 
                onIonChange={e => setLanguage(e.detail.value)}
                interface="action-sheet"
                className="custom-select"
                toggleIcon={chevronForwardOutline}
              >
                <IonSelectOption value="en">English</IonSelectOption>
                <IonSelectOption value="id">Indonesia</IonSelectOption>
                <IonSelectOption value="jp">Japanese</IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          {/* SECTION: SECURITY */}
          <IonList lines="none" className="settings-list">
            <IonListHeader>
              <IonLabel>Security</IonLabel>
            </IonListHeader>

            <div className="form-section">
              <IonItem className="settings-item">
                <IonLabel position="stacked">Current Password</IonLabel>
                <IonInput
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onIonChange={(e) => setCurrentPassword(e.detail.value!)}
                />
                <IonIcon
                  icon={showCurrent ? eyeOffOutline : eyeOutline}
                  slot="end"
                  onClick={() => setShowCurrent(!showCurrent)}
                />
              </IonItem>

              <IonItem className="settings-item">
                <IonLabel position="stacked">New Password</IonLabel>
                <IonInput
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onIonChange={(e) => setNewPassword(e.detail.value!)}
                />
                <IonIcon
                  icon={showNew ? eyeOffOutline : eyeOutline}
                  slot="end"
                  onClick={() => setShowNew(!showNew)}
                />
              </IonItem>

              {newPassword && (
                <p className={`strength ${strength.toLowerCase()}`}>
                  Strength: {strength}
                </p>
              )}

              <IonItem className="settings-item">
                <IonLabel position="stacked">Confirm Password</IonLabel>
                <IonInput
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                />
                <IonIcon
                  icon={showConfirm ? eyeOffOutline : eyeOutline}
                  slot="end"
                  onClick={() => setShowConfirm(!showConfirm)}
                />
              </IonItem>

              {error && <p className="error-text">{error}</p>}

              <IonButton expand="block" className="save-btn" onClick={handleChangePassword}>
                Save Changes
              </IonButton>
            </div>
          </IonList>

        </div>
      </PageWrapper>
    </IonPage>
  );
};

export default Settings;