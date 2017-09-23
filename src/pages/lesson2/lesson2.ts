import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams, ModalController, ViewController, Slides, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { PlayerService } from '../../services/player.service';
import { StatementService } from '../../services/statementgen.service';

@Component({
  templateUrl: 'lesson2.html',
  providers: [PlayerService, StatementService]
})

export class Lesson2Page {
  completedL2Q1: boolean = false;
  completedL2Q2: boolean = false;
  lessonComplete: boolean = false;
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public modalCtrl: ModalController,
    public events: Events,
    private _storage: Storage,
    public player: PlayerService,
    public statement: StatementService,
    private _navParams: NavParams) {
      //initialize your page here
      this.statement.giveCreds(this.userName, this.userEmail, "Kristin Anthony", "kristin@knanthony.com");
      this.player.giveCreds(this.userName, this.userEmail, "Kristin Anthony", "kristin@knanthony.com", "lesson2");
  }
  @ViewChild(Slides) slideShow: Slides;
  slidePercentage: number;
  userEmail: string = this._navParams.get('userEmail');
  userName: string = this._navParams.get('userName');

  slides = [
    {
      title: "<h1 class='lesson-title'>Which One’s Which?</h1>",
      description: "",
      image: "assets/lessonTwo/lessonTwo.png",
      imgClass: "lesson-image-start",
    },
    {
      title: "UX Research Methods for ID",
      titleClass: "lesson-subtitle",
      description: "Every learning experience design process that you can name, from ADDIE to SAM, incorporates testing as a part of the process.",
      image: "assets/lessonTwo/userResearch.png",
      imgClass: "lesson-image",
    },
    {
      title: "",
      description: "In the real world of budgets and timelines and objections, the kind of testing that we need to be doing, UX Research, may not seem like reality. But the wonderful thing about UX is that it recognizes what it takes to do in-depth research as well as what it takes to do just enough to give you valuable insights.",
      image: "assets/lessonTwo/budgetDiagram.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "No matter how strapped for time or resources you are, there's some variation of UX research that you can afford to do; in fact, you can't afford not to try.",
      image: "assets/lessonTwo/feedbackForm.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Scenario",
      titleClass: "lesson-special-title",
      description: "Let’s consider this real-life example (names have been changed to protect the innocent): Julia has designed what she thinks is an awesome course. She’s tested it and QAd it with their team to make sure that everything is working properly.",
      specialImg: "assets/icons/Scenario2.png",
    },
    {
      title: "",
      description: "She’s worked closely with the subject matter expert to make sure that the content is on-point and the scenario-based interactives they’ve created are both accurate and effective. She’s excited to release the course!",
      image: "assets/lessonTwo/onlineEducation.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "",
      description: "After release, she gets lots of emails from the instructor saying that course participants don’t understand how to get to the content in the course. In fact, some participants haven’t looked at the course content at all and have just been doing the assignments without the benefit of the knowledge they should have developed.",
      image: "assets/lessonTwo/Communication.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Question",
      titleClass: "lesson-special-title",
      description: "What can we conclude from this?",
      choiceQuestion: true,
      questionNumber: 1,
      choice1: "Julia is actually a terrible designer!",
      choice2: "Julia didn’t test her course with her target audience.",
      specialImg: "assets/icons/Question.png",
    },
    {
      title: "",
      description: "On the one hand, conventions provide a great guide for us. Since all elearning development is part of web development, we can take some comfort in following the conventions that have shaped the web for many years. At the same time, it’s important that we not get too comfortable. Incorporating UX Research can help us overcome the biases that come with experience.",
    },
    {
      title: "Types of UX Research",
      titleClass: "lesson-subtitle",
      description: "Before we dig into to types of UX research and which one is right for you, we should back up a bit. You've got to be clear on your purpose before you invest the time in UX research.",
      image: "assets/lessonTwo/uxMethods.png",
      imgClass: "lesson-image",
    },
    {
      title: "Ask Yourself",
      titleClass: "lesson-special-title",
      description: "Are you trying to figure out whether or not you should make an online course or a face-to-face course? Are you trying to figure out how you can get more people to use the resources and microlearning you've created on the company intranet? Or, are you trying to figure out whether or not the solution you came up with works?",
      specialImg: "assets/icons/askYourself.png",
    },
    {
      title: "",
      description: "Each of these should be approached with a different kind of research. Knowing your purpose up front means that you can concentrate your time and effort on performing the right kind of analysis.",
      image: "assets/lessonTwo/Analysis.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Tools",
      titleClass: "lesson-special-title",
      description: "In <strong><em>Just Enough Research</em></strong>, Erika Hall identifies 4 broad classifications of research: <ul><li>Generative</li><li>Descriptive</li><li>Evaluative</li><li>Causal</li></ul> Let's take a close look at each of them.",
      specialImg: "assets/icons/Tools.png",
    },
    {
      title: "Generative Research",
      titleClass: "lesson-subtitle",
      description: "In generative research (think Needs Analysis), you’re asking the questions that will help you to define your problem. For us, this means asking questions like, 'Why do you think the sales people don’t know enough about the product?' If you’ve got this kind of question, you might consider these UX methods: <ul><li><strong>Interviews</strong></li><li><strong>Field Observation</strong></li></ul>",
    },
    {
      title: "",
      description: "<strong>Interviews:</strong> Go out and talk to people! This sounds a bit scary but even a short conversation (that you take notes about) might help your insight.",
      videoUrl: "https://www.youtube.com/embed/8tiuWYs5Z-A?rel=0?enablejsapi=1",
      videoId: "8tiuWYs5Z-A",
      playerId: "youTubeIframeLesson2Video1"
    },
    {
      title: "",
      description: "<strong>Field Observation:</strong> If you can manage it, it’s often useful to go out and see how people actually do their work. For example, shadowing a call center representative as they interact with customers can reveal all sorts of insights!",
      videoUrl: "https://www.youtube.com/embed/XrpAveg7ZIg?rel=0?enablejsapi=1",
      videoId: "XrpAveg7ZIg",
      playerId: "youTubeIframeLesson2Video2"
    },
    {
      title: "Descriptive Research",
      titleClass: "lesson-subtitle",
      description: "In descriptive research, you’ve already identified the problem (or for some of us, the problem has been identified and handed to you) and now you want to make sure that you understand the context and the audience to make sure that you understand the best way to solve the problem.",
    },
    {
      title: "Scenario",
      titleClass: "lesson-special-title",
      description: "Consider this real-world scenario: You’re brought in to design a training update for call center employees who need to switch from using old protocol numbers, which they had memorized, to completely new protocol numbers.",
      specialImg: "assets/icons/Scenario2.png",
    },
    {
      title: "Question",
      titleClass: "lesson-special-title",
      description: "The list of numbers is very long and all employees need to memorize them. How do you approach this work?",
      choiceQuestion: true,
      questionNumber: 2,
      choice1: "Begin rapid prototyping interactives and quizzes.",
      choice2: "Ask more questions about how employees used the protocol numbers.",
      specialImg: "assets/icons/Question.png",
    },
    {
      title: "",
      description: "UX Methods for descriptive research are similar to those for generative research (interviews and field observations are useful). The fundamental difference is that you now have a defined problem that you’re looking to investigate and come up with a solution for. ",
      image: "assets/lessonTwo/Statistics.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Ask Yourself",
      titleClass: "lesson-special-title",
      description: "For LX Designers, questions during descriptive research might sound like: <ul><li>How do the needs of desktop learners differ from mobile learners for this course?</li><li>What activities do employees already do that might interfere with or enforce what we’re trying to teach them?</li></ul>",
      specialImg: "assets/icons/askYourself.png",
    },
    {
      title: "Evaluative Research",
      titleClass: "lesson-subtitle",
      description: "With evaluative research, you’ve defined your problems and you’ve got some ideas for potential solutions (think interactive prototypes) that you can test with real users. The questions you’re trying to answer with these type of research center around whether or not your solution is actually helping you to solve the problem: Do your learners understand how to use this interactive? Is this scenario story resonating with learners?",
    },
    {
      title: "",
      description: "Evaluative research is typically associated with usability testing, the kind of testing that happens when you show and ask learners to interact with a solution you’ve come up with.",
      videoUrl: "https://www.youtube.com/embed/PK-V66I9VgE?rel=0?enablejsapi=1",
      videoId: "PK-V66I9VgE",
      playerId: "youTubeIframeLesson2Video3"
    },
    {
      title: "",
      description: "For many of us, usability testing is the fastest and easiest way to get started with incorporating UX research into our practice. Something as simple as creating a wireframe or a prototype and asking a colleague to interact with it can give you valuable insight into your design and development process. ",
      image: "assets/lessonTwo/Wireframe.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Causal Research",
      titleClass: "lesson-subtitle",
      description: "Causal research happens after you’ve launched your product and you notice that people are using it in certain ways (for better or worse). Remember our LX Designer Julia and the problems she experienced? Julia and her client could conduct some causal research with their users to figure out what went wrong. UX Methods for causal research can include: <ul><li>A/B Testing</li><li>Reviewing Analytics</li></ul>",
    },
    {
      title: "",
      description: "<strong>A/B Testing:</strong> A/B testing involves making a hypothesis that changing one part of your design will have an effect on users. For example, our ID Julia might want to test whether putting an alert at the top of the page would help users to scroll down to see the navigation.",
      videoUrl: "https://www.youtube.com/embed/8H6QmMQWPEI?rel=0?enablejsapi=1",
      videoId: "8H6QmMQWPEI",
      playerId: "youTubeIframeLesson2Video4"
    },
    {
      title: "",
      description: "<strong>Reviewing Analytics:</strong> Many course and video platforms report analytics such as where your users are coming from or how long they watched a video. For example, after reviewing analytics, you might find that learners stop watching videos at the 5-minute mark. Causal research will help you to pin down why that happens.",
      image: "assets/lessonTwo/videoCourse.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Summary",
      titleClass: "lesson-subtitle",
      description: "All ID frameworks incorporate needs analysis and testing into them but it may be difficult to understand how to perform these tasks. UX as a discipline offers us a variety of methodologies to actually make those things happen.",
      image: "assets/icons/generateIdea.png",
      imgClass: "lesson-image",
    },
    {
      title: "",
      description: "By focusing first on the understanding the purpose behind our research and then aligning the kind of research we concentrate on and the methods we use to that purpose we can improve our practice and get results &mdash even if we only concentrate on one small method to start, such as conducting small usability tests.",
      image: "assets/lessonTwo/userTesting.png",
      imgClass: "lesson-image-tiny",
    },
    {
      title: "Read Up",
      titleClass: "lesson-special-title",
      description: "We’ve only scratched the surface of UX research here. Check out these resources to learn more:",
      links: [
        {
          title: "When to Use Which User-Experience Research Methods",
          href: "https://www.nngroup.com/articles/which-ux-research-methods/"
        },
        {
          title: "Complete Beginner’s Guide to UX Research",
          href: "http://www.uxbooth.com/articles/complete-beginners-guide-to-design-research/"
        },
        {
          title: "Just Enough Research",
          href: "https://abookapart.com/products/just-enough-research"
        }
      ],
      specialImg: "assets/icons/readUp.png",
      lastCard: true,
    },
  ];

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  presentModal(response, isCorrect) {
    let modal = this.modalCtrl.create(L2Q1ModalPage);
    this.statement.questionAnswered("lesson2", "1", this.slideShow.getActiveIndex(), response, isCorrect, this.slidePercentage);
    modal.present();
    modal.onDidDismiss(data=>{
      //This is a listener which will get the data passed from modal when the modal's view controller is dismissed
      this.completedL2Q1 = data;
      this.slideShow.lockSwipes(false);
      this._storage.set('lesson2Q1Complete', data);
    })
  }

  presentModal2(response, isCorrect) {
    let modal = this.modalCtrl.create(L2Q2ModalPage, {
      userName: this.userName,
      userEmail: this.userEmail,
    });
    this.statement.questionAnswered("lesson2", "2", this.slideShow.getActiveIndex(), response, isCorrect, this.slidePercentage);
    modal.present();
    modal.onDidDismiss(data=>{
      //This is a listener which will get the data passed from modal when the modal's view controller is dismissed
      this.completedL2Q2 = data;
      this.slideShow.lockSwipes(false);
      this._storage.set('lesson2Q2Complete', data);
    })
  }

  getSlideProgress() {
    let currentIndex = this.slideShow.getActiveIndex();
    let currentSlide = this.slides[this.slideShow.getActiveIndex()];
    // Get percentage completion
    this.slidePercentage = this.slideShow.getActiveIndex()/(this.slideShow.length() - 1) * 100;
    // If slide has a video id, then launch the YouTube iframe API
    if(currentSlide && currentSlide.hasOwnProperty('videoId')) {
      this.player.launchPlayer(currentSlide['videoId'], currentSlide['playerId']);
    }
    let data = {
      lesson2Progress: this.slidePercentage || 0,
    }
    this.events.publish('lesson2Progress', data);
    this.statement.lessonProgressed("lesson2", this.slideShow.getActiveIndex(), this.slideShow.length(), this.slidePercentage);

    // Lock slideshow until questions answered
    if(currentIndex === 7 && !this.completedL2Q1) {
      this.slideShow.lockSwipes(true);
    }
    if(currentIndex === 18 && !this.completedL2Q2) {
      this.slideShow.lockSwipes(true);
    }

    this._storage.set('currentL2Slide', currentIndex);
    if(this.slideShow.isEnd()) {
      this.lessonComplete = true;
      this._storage.set('lesson2Complete', true);
    }
  }

  launchLink(url, title) {
    this.statement.launchLink("lesson1", url, title);
  }

  lessonSlidesComplete() {
    this._storage.get('lesson2Complete').then((val) => {
      if (!val) {
        this.statement.completedLesson("lesson2", this.slidePercentage);
      }
    });
  }

  ionViewWillEnter() {
    this._storage.get('currentL2Slide').then((val) => {
      this.slideShow.slideTo(val, 500);
    });
  }

  ionViewDidLoad() {
    this._storage.get('lesson2Q1Complete').then((val) => {
      this.completedL2Q1 = val;
    });
    this._storage.get('lesson2Q2Complete').then((val) => {
      this.completedL2Q2 = val;
    });
  }

}

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          User Testing Please
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="lesson-page">
      <p class="modal-page">Julia might well be a terrible LX Designer (though we suspect she isn’t) but the real problem here is that Julia didn’t embed user testing into her design plans.</p>
      <p class="modal-page">It’s not enough to test our products ourselves. That’s part of the work, of course, but we all have to remember: We aren’t designing for us! And to assume that every user that takes an online course has taken one before and is familiar with the conventions of scrolling and cards and menus can be a costly mistake.</p>
    </ion-content>
  `
})

export class L2Q1ModalPage {
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

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          User Testing Please
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="lesson-page">
      <p class="modal-page">In this instance, it might be easy to assume that you have a training problem because you were told that it was, but by asking more questions and observing employees at work, you may find that what would be most helpful would be an interactive job aid that employees use for a period of several months that translated the old number into the new number. After typing in the new number over a period of time, the employees will have memorized it.</p>
      <p class="modal-page">You didn’t have a training problem at all, and doing descriptive research would help you to uncover that.</p>
      <p class="modal-page">Check out the real-world inspiration for this scenario on the Dear Instructional Designer Podcast: <br/><audio #dearIDEpisode43 controls="controls"> <source src="https://audio.simplecast.com/17c5013f.mp3" /></audio></p>
    </ion-content>
  `
})

export class L2Q2ModalPage {
  answered2Question: boolean = true;
  userEmail: string = this._navParams.get('userEmail');
  userName: string = this._navParams.get('userName');
  constructor(
    public platform: Platform,
    public viewCtrl: ViewController,
    public player: PlayerService,
    public events: Events,
    private _navParams: NavParams
  ) {
    this.player.giveCreds(this.userName, this.userEmail, "Kristin Anthony", "kristin@knanthony.com", "lesson2");
  }
  @ViewChild('dearIDEpisode43') dearIDEpisode;
  ionViewDidLoad() {
    let episode = {
      audio: this.dearIDEpisode,
      name: "Episode 43: A Tale of Two Projects with Zsolt Olah",
      episodeNum: 43,
      podcastName: "Dear Instructional Designer",
      podcastHost: "Kristin Anthony",
      episodeLink: "https://dearinstructionaldesigner.simplecast.fm/episode-43-zsolt-olah",
    };
    this.events.publish("podcastEpisodeLoaded", episode);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.answered2Question);
  }
}
