import {
  IonPage,
  IonAvatar,
  IonInput,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/react';
import { useState } from 'react';
import './EditProfile.css';
import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';

const EditProfile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@email.com');
  const [avatar, setAvatar] = useState('/assets/avatar.png');

  // HANDLE UPLOAD
  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };

  return (
    <IonPage>
      <PageWrapper className="edit-profile-content">
        <PageHeader
          subtitle="Your Account"
          title="Edit Profile"
        />
          {/* AVATAR */}
          <div className="avatar-section">
            <IonAvatar>
              <img src={avatar} alt="avatar" />
            </IonAvatar>

            <label className="upload-btn">
              Change Photo
              <input type="file" hidden onChange={handleUpload} />
            </label>
          </div>

          {/* FORM */}
          <div className="form-section">

            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" className="save-btn">
              Save Changes
            </IonButton>
          </div>
      </PageWrapper>
    </IonPage>
  );
};

export default EditProfile;
