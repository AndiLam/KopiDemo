import {
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { useState } from 'react';
import './Settings.css';
import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';

const Settings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');

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
    alert('Password updated successfully!');
  };

  return (
    <IonPage>
      <PageWrapper className="settings-content">
        <PageHeader
          subtitle="Settings"
          title="Change your password"
        />
          <div className="form-section">

            {/* CURRENT PASSWORD */}
            <IonItem>
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

            {/* NEW PASSWORD */}
            <IonItem>
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

            {/* STRENGTH */}
            {newPassword && (
              <p className={`strength ${strength.toLowerCase()}`}>
                Strength: {strength}
              </p>
            )}

            {/* CONFIRM PASSWORD */}
            <IonItem>
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

            <IonButton expand="block" onClick={handleChangePassword}>
              Save Changes
            </IonButton>
          </div>
      </PageWrapper>
    </IonPage>
  );
};

export default Settings;
