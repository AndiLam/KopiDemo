import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  useIonLoading,
  useIonToast   
} from '@ionic/react';
import { useState } from 'react';
import { eyeOutline, eyeOffOutline, logoGoogle, logoFacebook } from 'ionicons/icons';
import { useHistory } from 'react-router';
import { Preferences } from '@capacitor/preferences';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async () => {
  if (!email || !password) {
    presentToast({
      message: 'Please enter email and password',
      duration: 2000,
      color: 'warning',
      position: 'bottom'
    });
    return;
  }

  await presentLoading({
    message: 'Authenticating...',
    spinner: 'crescent',
    cssClass: 'custom-loading',
    mode: 'ios'
  });

  try {
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email === 'admin@gmail.com' && password === 'admin123') {
      await Preferences.set({
        key: 'isLoggedIn',
        value: 'true'
      });

      presentToast({
        message: 'Login Successful! Welcome back.',
        duration: 1500,
        color: 'success',
        position: 'bottom'
      });

      history.replace('/tabs/home');
    } else {
      throw new Error('Invalid credentials');
    }

  } catch (err) {
    presentToast({
      message: 'Invalid email or password.',
      duration: 2000,
      color: 'danger',
      position: 'bottom',
    });
  } finally {
    dismissLoading();
  }
};

  return (
    <IonPage>
      <IonContent className="login-content">
        <div className="overlay">
          <div className="login-container">
            <div className="logo-section">
              <img src="/assets/logo.png" alt="logo" />
              <p>Welcome back! Please login to continue.</p>
            </div>

            <IonItem className="input-item">
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput 
                type="email" 
                value={email}
                placeholder="Enter your email" 
                onIonChange={(e) => setEmail(e.detail.value ?? '')}
              />
            </IonItem>

            <IonItem className="input-item">
              <IonLabel position="stacked">Password</IonLabel>
              <IonInput 
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Enter your password" 
                onIonChange={(e) => setPassword(e.detail.value ?? '')}
              >
                <IonButton 
                  fill="clear" 
                  slot="end" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <IonIcon 
                    slot="icon-only" 
                    icon={showPassword ? eyeOffOutline : eyeOutline} 
                    color="medium"
                  />
                </IonButton>
              </IonInput>
            </IonItem>

            <IonText className="forgot-text" onClick={() => history.push('/forgot-password')}>
              <p>Forgot Password?</p>
            </IonText>

            <IonButton expand="block" className="login-btn" onClick={handleLogin}>
              Login
            </IonButton>

            <div className="divider"><span>Or login with</span></div>
            <IonButton expand="block" className="google-btn">
              <IonIcon slot="start" icon={logoGoogle} /> Login with Google
            </IonButton>
            <IonButton expand="block" className="fb-btn">
              <IonIcon slot="start" icon={logoFacebook} /> Login with Facebook
            </IonButton>

            <IonText className="register-text">
              <p>Don’t have an account? <strong>Register</strong></p>
            </IonText>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;