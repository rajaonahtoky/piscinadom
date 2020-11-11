import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Intervention } from '../../models/intervention.model';

@Component({
  selector: 'app-sav',
  templateUrl: './sav.page.html',
  styleUrls: ['./sav.page.scss'],
})
export class SavPage implements OnInit {
  interventions: Intervention[] = [];
  // interventions: Array<any>;

  constructor(
    public loadingCtrl: LoadingController,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getInterventions();
    }
  }

  async getInterventions() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData.data.subscribe(interventions => {
        loading.dismiss();
        this.interventions = [];
        interventions.forEach(element => {
          const intervention = element.payload.doc.data() as Intervention;
          this.interventions.push(intervention);
        });
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  onCreateIntervention() {
    console.log('onCreateIntervention');
    const data = {
      sender: 'SS',
      title: 'Fuite ?',
      description: 'Laboris nisi ut aliquip ex ea commodo consequat.',
      date: '15 sept'
    };

    this.firebaseService.createIntervention(data)
    .then(
      res => {
        console.log('sav created');
      }
    );
  }

}

