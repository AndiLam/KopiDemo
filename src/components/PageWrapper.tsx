import { IonContent } from '@ionic/react';
import './PageWrapper.css';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const PageWrapper: React.FC<Props> = ({ children, className }) => {
  return (
    <IonContent fullscreen className={className}>
      <div className="container">
        {children}
      </div>
    </IonContent>
  );
};

export default PageWrapper;
