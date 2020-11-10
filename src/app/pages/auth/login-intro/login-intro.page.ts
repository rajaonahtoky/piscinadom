import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/app';
import { AlertController, MenuController } from '@ionic/angular';
import { cfaSignIn, cfaSignInPhoneOnCodeSent } from 'capacitor-firebase-auth';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';

const { Device, SignInWithApple } = Plugins

@Component({
  selector: 'app-login-intro',
  templateUrl: './login-intro.page.html',
  styleUrls: ['./login-intro.page.scss'],
})
export class LoginIntroPage implements OnInit {

  unknownError = {
    frFR: 'Une erreur inattendue s\'est produite. Veuillez recommencer.'
  }

  constructor(
    public firebaseAuth: FirebaseAuthService,
    public router: Router,
    private ngZone: NgZone,
    public alertController: AlertController,
    public menu: MenuController
  ) { }

  async ngOnInit() {
    let device = await Device.getInfo();

    if (device.platform === 'ios') {
      // Show the button with SignInWithApple.Authorize()
    }
  }

  signInAnonymously() {
    // this.firebaseAuthService.signInWithGoogle().then((userData) => {
    //   if (userData != null) {
    //     alert('signInAnonymously success : ' + userData);
    //   }
    // }).catch((error) => {
    //   console.log(error);
    //   alert('signInAnonymously error : ' + error);
    // });
  }

  redirectAuthenticatedUser() {
    this.ngZone.run(() => {
      this.firebaseAuth.isAuthenticated.next(true);
      this.router.navigateByUrl('/tabs/home');
    });
  }

  signInWithPhone() {
    //1. send sms verification code
    cfaSignIn('phone', { phone: "+261341400009" }).subscribe(
      user => {
        alert(user.phoneNumber);
      }
    );

    //2.listiner fo 
    cfaSignInPhoneOnCodeSent().subscribe(
      async verificationId => {
        console.log("cfaSignInPhoneOnCodeSent");
        console.log("verificationId::" + verificationId);

        this.showPrompt(verificationId);
        //this.showCodeInput = true;
      }
    );
    // let verificationCode = "954551";
    // let verificationId = "AM5PThB_d9ON-qGOo6QC_tz4Sjwc0ubCcQyE9P1lYzXOBo-lHtlk-EEKnTOcU2x7zFmxINMEi7fsO52_CURnCXNkJZRJtddVhSazgJUi8h0AfkIoC14rmeKqTQtpNaR1FUKmiTklfGUdB6q2dnNSECZ2uTZeXGnCgTEjzPUdAasPelHelWdpJmJ73AuW_I4ds5LVHrSrcOiDdXQ4rmurmlz8ycsy-QJsfA";

    // //3.
    // const credential = firebase.auth.PhoneAuthProvider
    // .credential(verificationId, verificationCode);
    // firebase.auth().signInWithCredential(credential);
  }

  signInWithGoogle() {
    this.firebaseAuth.signInWithGoogle()
    .then((user: User) => {
      if (user != null) {
        console.log(user.displayName);
        this.redirectAuthenticatedUser();
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  signInWithFacebook() {
    this.firebaseAuth.signInWithFacebook()
    .then((user: User) => {
      if (user != null) {
        console.log(user.displayName);
        this.redirectAuthenticatedUser();
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  showPrompt(verificationId: string) {
    this.alertController.create({
      header: 'Prompt Alert',
      subHeader: 'Enter information requested',
      message: 'Enter your favorate place',
      inputs: [
        {
          name: 'verificationCode',
          placeholder: 'Eg.NY',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: (data: any) => {
            console.log('Canceled', data);
          }
        },
        {
          text: 'Done!',
          handler: (verificationCode: string) => {
            //3.
            console.log('verificationCode::', verificationCode['verificationCode']);
            const credential = firebase.auth.PhoneAuthProvider
              .credential(verificationId, verificationCode['verificationCode']);
            firebase.auth().signInWithCredential(credential);
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  signInWithApple() {
    SignInWithApple.Authorize().then(response => {
      console.log('signInWithApple', response);
    }).catch(response => {
      console.error(response);
    });
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
}