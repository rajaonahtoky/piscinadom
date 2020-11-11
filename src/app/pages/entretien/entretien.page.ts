import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Entretien } from '../../models/entretien.model';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.page.html',
  styleUrls: ['./entretien.page.scss'],
})
export class EntretienPage implements OnInit {
  entretiens: Entretien[] = [];

  constructor(
    public loadingCtrl: LoadingController,
    private router: Router,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getEntretiens();
    }
  }

  async getEntretiens() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData.entretiens.subscribe(entretiens => {
        this.entretiens = [];
        entretiens.forEach(element => {
          const entretien = element.payload.doc.data() as Entretien;
          this.entretiens.push(entretien);
        });
        loading.dismiss();
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  // createEntretien() {
  //   const entretien = {
  //     description: 'Demande d’un contrat d’entretien de notre piscine de 30m2, 1 fois par semaine, de préférence le vendredi. Incluant produits et maintenance générale.',
  //     date: '8 Nov',
  //   };
  //   this.firebaseService.createEntretien(entretien);
  // }

}
