import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, MenuController } from '@ionic/angular';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import { INTRO_KEY } from '../../guards/intro.guard';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  @ViewChild('slides', { static: true }) slides: IonSlides;

  isBeginning = true;
  public slidesData = [];

  constructor(
    public menu: MenuController,
    public router: Router
  ) { }

  ngOnInit() {
    this.slidesData = [
      {
        image: 'assets/images/pic.jpg',
        title: 'Le shop mobile',
        description: 'Bienvenu'
      },
      {
        image: 'assets/images/slide-2.jpg',
        title: 'Service d\'entretien à domicile',
        description: 'Maitrisez la qualité de l\'eau de votre piscine. Planifiez les interventions.'
      },
      {
        image: 'assets/images/slide-3.jpg',
        title: 'Interventions et SAV',
        description: 'Une panne ou un doute sur le fonctionnement d\'un équipement ?'
      }
    ];
  }

  startApp() {
    this.slides.isEnd().then(async (isEnd) => {
      if (isEnd) {
        await Storage.set({ key: INTRO_KEY, value: 'true' });

        this.router
        .navigateByUrl('/login/intro', { replaceUrl: true });
      } else {
        this.slides.slideNext();
      }
    });
  }


  onSlideChangeStart(event) {
    event.target.isBeginning().then(isBeginning => {
      this.isBeginning = isBeginning;
    });
  }

 ionViewWillEnter() {
    this.menu.enable(false);
  }
}
