import React from 'react';
import { Redirect } from 'react-router-dom';
import { IonSlides, IonContent, IonButton, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

import { arrowForwardOutline } from 'ionicons/icons';

const onSubmit = () => {
  return  <Redirect  to="/home" />;
}

export const Home: React.FC = () => (
  <IonContent>
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
        <IonCardTitle>Card Title</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        Keep close to Nature's heart... and break clear away, once in awhile,
        and climb a mountain or spend a week in the woods. Wash your spirit clean.
      </IonCardContent>
    </IonCard>
  </IonContent>
);

