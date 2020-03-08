import React from 'react';
import { Redirect } from 'react-router-dom';
import { IonSlides, IonSlide, IonContent, IonButton, IonIcon } from '@ionic/react';
import IntroSlide1 from '../../assets/icons/IntroSlide1.png';
import IntroSlide2 from '../../assets/icons/Question.png'; 
import IntroSlide3 from '../../assets/icons/IntroSlide3.png'; 
import '../../pages/Intro.css';

import { arrowForwardOutline } from 'ionicons/icons';

// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 2,
  speed: 400
};

const onSubmit = () => {
  return  <Redirect  to="/home" />;
}

export const Intro: React.FC = () => (
  <IonContent>
    <IonSlides pager={true} options={slideOpts} className="tutorial-page">
      <IonSlide>
        <div>
          <h1>User Experience Design</h1>
          <img src={IntroSlide1} alt="" className="slide-image" />
          <p>You keep yourself up-to-date on the latest trends, and you’ve heard a lot about UX. It sounds good and you want to incorporate it into the way you design learning experiences. But where do you start?</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div>
          <h1>How Can you get Started?</h1>
          <img src={IntroSlide2} alt="" className="slide-image" />
          <p>Maybe you feel like you don’t have the budget for it, or maybe your projects are moving so rapidly, that you don’t know where you’d find the time to incorporate any new best practices into your processes.</p>
        </div>
      </IonSlide>
      <IonSlide>
        <div>
          <h1>UX + LX</h1>
          <img src={IntroSlide3} alt="" className="slide-image" />
          <p><b>UX + LX</b> offers bite-sized lessons and resources to get you started implementing the lessons from User Experience into Learning Experience design.</p>
          <IonButton fill="clear" size="large" onClick={onSubmit}>
            Get Started
            <IonIcon slot="end" icon={arrowForwardOutline} />
          </IonButton>
          </div>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

