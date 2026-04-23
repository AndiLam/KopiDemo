import React from 'react';
import { IonText, IonIcon, IonButton } from '@ionic/react';
import './EmptyState.css';

interface EmptyStateProps {
  icon?: string;
  title: string;
  message?: string;
  buttonText?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  buttonText,
  onAction
}) => {
  return (
    <div className="empty-state">
      
      {icon && <IonIcon icon={icon} />}

      <IonText>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
      </IonText>

      {buttonText && onAction && (
        <IonButton fill="outline" size="small" onClick={onAction}>
          {buttonText}
        </IonButton>
      )}

    </div>
  );
};

export default EmptyState;
