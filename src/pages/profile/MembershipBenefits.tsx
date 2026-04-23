import React from 'react';
import {
  IonPage,
  IonIcon,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { 
  giftOutline, 
  cafeOutline, 
  rocketOutline, 
  flashOutline, 
  star 
} from 'ionicons/icons';
import './MembershipBenefits.css';
import PageWrapper from '../../components/PageWrapper';
import PageHeader from '../../components/PageHeader';

const MembershipBenefits: React.FC = () => {
  const benefits = [
    {
      icon: cafeOutline,
      title: 'Free Monthly Drink',
      desc: 'Satu cup Latte gratis setiap awal bulan untuk member PRO.',
      color: '#f3580a'
    },
    {
      icon: flashOutline,
      title: 'Double Points',
      desc: 'Dapatkan poin 2x lebih banyak untuk setiap transaksi di jam 14:00 - 17:00.',
      color: '#ffd700'
    },
    {
      icon: giftOutline,
      title: 'Birthday Reward',
      desc: 'Hadiah spesial berupa Cake pilihan di hari ulang tahunmu.',
      color: '#ff4d4d'
    },
    {
      icon: rocketOutline,
      title: 'Priority Queue',
      desc: 'Pesananmu akan diproses lebih cepat tanpa perlu antre lama.',
      color: '#4facfe'
    }
  ];

  return (
    <IonPage>
      <PageWrapper className="benefit-content">  
        {/* HEADER */}
        <PageHeader
          subtitle="Your Membership"
          title="Membership Benefits"
        />
        {/* TIER STATUS CARD */}
        <div className="tier-card">
          <div className="tier-header">
            <IonIcon icon={star} className="tier-icon" />
            <IonText>
              <span>Current Tier</span>
              <h2>PRO MEMBER</h2>
            </IonText>
          </div>
            <div className="tier-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '75%' }}></div>
              </div>
              <p>250 points more to <strong>Elite Tier</strong></p>
            </div>
          </div>

          <IonText className="section-label">
            <h5>Your Exclusive Perks</h5>
          </IonText>

          {/* BENEFITS LIST */}
          <div className="benefit-grid">
            {benefits.map((b, i) => (
              <IonCard key={i} className="benefit-item">
                <IonCardContent>
                  <div className="benefit-icon-box" style={{ backgroundColor: `${b.color}20`, color: b.color }}>
                    <IonIcon icon={b.icon} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
      </PageWrapper>
    </IonPage>
  );
};

export default MembershipBenefits;