import { IonText } from '@ionic/react';
import './PageHeader.css';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  rightElement
}) => {
  return (
    <div className="page-header">
      
      <div className="page-header-left">
        {subtitle && (
          <IonText className="page-subtitle">
            {subtitle}
          </IonText>
        )}
        <h2 className="page-title">{title}</h2>
      </div>

      {rightElement && (
        <div className="page-header-right">
          {rightElement}
        </div>
      )}

    </div>
  );
};

export default PageHeader;
