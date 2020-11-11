import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Shop } from 'src/app/models/shop.model';
import * as firebase from 'firebase/app';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  shops: Shop[] = [];

  constructor(
    public loadingCtrl: LoadingController,
    private router: Router,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.getShops();
    }
  }

  async getShops() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });

    this.presentLoading(loading);
    this.route.data.subscribe(routeData => {
      routeData.shops.subscribe(shops => {
        this.shops = [];
        shops.forEach(element => {
          const shop = element.payload.doc.data() as Shop;
          this.shops.push(shop);
        });
        loading.dismiss();
      });
    });
  }

  async presentLoading(loading) {
    return await loading.present();
  }

  createShop() {
    const data = {
      title: 'Accessoires & Equipements',
      imageUrl: './assets/images/acces_equip.png',
      date: '08 nov'
    };

    this.firebaseService.createShop(data)
      .then(
        res => {
          //this.router.navigate(["/home"]);
        }
      );
  }
}
