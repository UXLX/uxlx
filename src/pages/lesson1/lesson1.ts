import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ModalController, ViewController, Slides, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { PlayerService } from '../../services/player.service';

@Component({
  templateUrl: 'lesson1.html',
  providers: [PlayerService],
})

export class Lesson1Page {
  completedQ1: boolean = false;
  lessonComplete: boolean = false;
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public events: Events,
    private _storage: Storage,
    private _network: Network,
    public player: PlayerService) {
      this.player.setupPlayer();
      //initialize your page here
      // watch network for a disconnect
      this._network.onDisconnect().subscribe(() => {
        console.log('network was disconnected :-(');
      });
      this.platform.ready().then(() => {
        // Now all cordova plugins are ready!
        console.log(this._network.type);
      });
  }
  @ViewChild(Slides) slideShow: Slides;
  slidePercentage: number;

  slides = [
    {
      title: "<h1 class='lesson-title'>What is UX and Why do I Need it?</h1>",
      description: "",
      image: "assets/lessonOne/Lesson1.png",
      imgClass: "lesson-image-start",
    },
    {
      title: "What is UX?",
      titleClass: "lesson-subtitle",
      description: "You (yes you!) design learning experiences. You design them for audiences in grade school, in college, and in the workplace. You design them for audiences that will complete them by themselves and those that will work in a group. ",
      image: "assets/lessonOne/UIUX.png",
      imgClass: "lesson-image",
    },
    {
      title: "",
      description: "You design them for audiences that will use them on their computers, on their tablets and phones, and in face-to-face workshops. You design learning experiences for people. And every single one of them is different.",
      image: "assets/lessonOne/Learners.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "While you can and should value your experience, we’ve all been in situations where we’ve designed something one way and found out that our learners were using it completely differently. Their behavior didn’t match our assumptions. And that usually stinks.",
      image: "assets/lessonOne/OffCenter.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "The discipline of User Experience (UX) is about tackling those assumptions up front to build a better product.",
      videoUrl: "https://www.youtube.com/embed/Ovj4hFxko7c?rel=0"
    },
    {
      title: "Ask Yourself",
      titleClass: "lesson-special-title",
      description: "What are we assuming about the way users will use our elearning course? What are we assuming about the way users will be able to use the LMS? What are we assuming about the way users will interpret our buttons and menus and content? If you aren’t asking these questions of real people, then you can’t know the answers.",
      specialImg: "assets/icons/askYourself.png",
    },
    {
      title: "Why You Need UX",
      titleClass: "lesson-subtitle",
      description: "As learning experience designers, we can benefit from the work and resources of UX researchers and communicators by pulling in their methodologies into our processes.",
      image: "assets/lessonOne/refineDesign.png",
      imgClass: "lesson-image",
    },
    {
      title: "",
      description: "UX research borrows research methodologies from other disciplines, such as marketing and academia, with the end goal of making sure that the product (a learning experience, in our case) is designed with the end user in mind, instead of being designed for ourselves.",
      image: "assets/lessonOne/userResearch.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Scenario",
      titleClass: "lesson-special-title",
      description: "But in organizations where we often need to meet a deadline or please a client or do the most we can with limited time and financial resources, what does research do for us? Consider this scenario...",
      specialImg: "assets/icons/Scenario2.png",
    },
    {
      title: "",
      description: "You're working on an online, synchronous course for college students around forensic science. The course can be taken by any student to gain science credits.",
      image: "assets/lessonOne/onlineCourse.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "The end goal of the course is for students to be able to accurately learn to perform several tasks such as calculating blood alcohol content and identify the characteristics of various fibers. ",
      image: "assets/lessonOne/scienceExperiment.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Question",
      titleClass: "lesson-special-title",
      description: "Assuming already that you're working closely with a subject matter expert, how might you approach creating this course?",
      choiceQuestion: true,
      choice1: "Work with the SME to create a mixture of content and interactivity to help students practice these skills.",
      choice2: "Come on, we know the right answer!",
      specialImg: "assets/icons/Question.png",
    },
    {
      title: "Why You Need UX",
      titleClass: "lesson-subtitle",
      description: "As learning experience designers, we can benefit from the work and resources of UX researchers and communicators by pulling in their methodologies into our processes.",
      image: "assets/lessonOne/refineDesign.png",
      imgClass: "lesson-image",
    },
    {
      title: "",
      description: "In much of our work, it's easy to begin to assume that we've seen it all before and we know how to design an elearning course for <strong>x</strong> audience with <strong>y</strong> experience.",
      image: "assets/lessonOne/cognitiveProcess.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "On the one hand, your experience is super valuable! On the other hand, leaning only on your past experience can mean that you aren't aware of biases and blind spots that can prevent you from creating the best and most effective learning experience.",
      image: "assets/lessonOne/BlindSpot.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "By incorporating UX into your design practice, even in a small way, you increase your chances of being able to creating the best possible learning experience you can.",
      image: "assets/lessonOne/bestWork.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "UX Research is a tool that helps us move from assuming we have the answers to assuming that we need to ask more questions.",
      image: "assets/lessonOne/userResearch2.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: 'As Erika Hall writes in her book, <strong><em>Just Enough Research</em></strong>: <blockquote>"Design research requires us to approach familiar people and things as though they are unknown to us to see them clearly. We need to peel away our assumptions like a gray alien shedding its encounter suit."</blockquote>',
    },
    {
      title: "Summary",
      titleClass: "lesson-subtitle",
      description: "You design learning experiences. Your experience in this field and with the work that you do is valuable AND we often need to question our assumptions to do our best work.",
      image: "assets/icons/generateIdea.png",
      imgClass: "lesson-image",
    },
    {
      title: "",
      description: "UX Research methodologies range from the very tiny and imperfect “give-me-insights-on-a-budget” variety to the full-blown multi-day intensive kind. So there’s something for every LX Designer wanting to use research to shed light on the work that they produce. ",
      image: "assets/lessonOne/userResearch3.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Read Up",
      titleClass: "lesson-special-title",
      description: "Here are some resources to get you started. <ul><li><a href='https://abass.co/blog/why-you-should-run-usability-testing-everything'>Why You should run Usability Testing on Everything</a></li><li><a href='https://www.ideo.com/news/informing-our-intuition-design-research-for-radical-innovation/'>Informing Our Intuition: Design Research for Radical Innovation</a></li><li><a href='https://abookapart.com/products/just-enough-research'>Just Enough Research</a></li></ul>",
      specialImg: "assets/icons/readUp.png",
      lastCard: true,
    },
  ];



  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  presentModal() {
    let modal = this.modalCtrl.create(L1Q1ModalPage);
    modal.present();
    modal.onDidDismiss(data=>{
      //This is a listener which will get the data passed from modal when the modal's view controller is dismissed
      this.completedQ1 = data;
      this.slideShow.lockSwipes(false);
      this._storage.set('lesson1Q1Complete', data);
    })
  }

  getSlideProgress() {
    let currentIndex = this.slideShow.getActiveIndex();
    //console.log('Current index is', currentIndex);
    this.slidePercentage = this.slideShow.getActiveIndex()/(this.slideShow.length() - 1) * 100;
    //console.log('Lesson Page: Slide Progress is ' + this.slidePercentage);
    let data = {
      lesson1Progress: this.slidePercentage || 0,
    }
    this.events.publish('lessonProgress', data);
    if(currentIndex === 11 && !this.completedQ1) {
      this.slideShow.lockSwipes(true);
    }
    this._storage.set('currentL1Slide', currentIndex);
    if(this.slideShow.isEnd()) {
      this.lessonComplete = true;
      //console.log(this.slideShow.isEnd());
      this._storage.set('lesson1Complete', true);
    }
  }

  ionViewWillEnter() {
    this._storage.get('currentL1Slide').then((val) => {
      this.slideShow.slideTo(val, 0);
    });
  }

  ionViewDidLoad() {
    this._storage.get('lesson1Q1Complete').then((val) => {
      //console.log('Did you answer the question? ', val);
      this.completedQ1 = val;
    });
  }

}

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Collaborating with SMEs
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="lesson-page">
      <p class="modal-page">Okay, okay. That's what we would do too. But what about those interactives that you design?
      What if you had to include the possibility that the learner might be blind or deaf or have a motor impairment?
      What if the typical age of students taking this particular class was 40+ and they hadn't taken an online course before?</p>
      <p class="modal-page">Wouldn't that change things a bit?
      Wouldn't that impact the design of your interactives?
      Wouldn't you be interested in seeing whether or not real students could interact effectively with what you've created, before you went too far?</p>
    </ion-content>
  `
})

export class L1Q1ModalPage {
  answeredQuestion: boolean = true;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController
  ) {

  }

  dismiss() {
    this.viewCtrl.dismiss(this.answeredQuestion);
  }
}
