import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { WindowService } from 'src/app/services/window.service';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
})
export class PhoneLoginPage implements OnInit {

  windowRef: any;
  prefix: any;
  line: any;
  verifCode: any;

  constructor(private windowService: WindowService) { }
  
  async ionViewWillEnter() {
    this.windowRef = await this.windowService.windowRef;
    this.windowRef.recaptchaVerifier = await new firebase.auth.RecaptchaVerifier('recaptcha-container');
    await this.windowRef.recaptchaVerifier.render();
  }
  
  ngOnInit() {
  }

  sendLoginCode() {
    const num = '+261341400009';//this.prefix.toString() + this.line.toString();
    //console.log('phone_number', num);
    const appVerifier = this.windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(num, appVerifier)
      .then((result) => {
        this.windowRef.confirmationResult = result;
      })
      .catch((err) => console.log('err1', err));
  }

  submitVerif() {
    this.windowRef.confirmationResult
      .confirm(this.verifCode)
      .then(async (result) => {
        console.log('phone_number', 'successful');
        //If the result is successful...
      })
      .catch((err) => {
        console.log('err2', err);
      });
  }

}
