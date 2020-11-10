import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {

   constructor(public popoverCtrl: PopoverController) { }

  async presentPlus(event: Event) {
    const alert = await this.popoverCtrl.create({
      component: PopoverComponent,
      event
    });

    await alert.present();
  }

}
