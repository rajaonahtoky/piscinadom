import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/app';
import {
  AlertController,
  MenuController,
  Platform,
} from '@ionic/angular';
import { cfaSignInPhoneOnCodeSent } from 'capacitor-firebase-auth';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import * as firebase from 'firebase';
import { Plugins } from '@capacitor/core';

const { SignInWithApple } = Plugins;

@Component({
  selector: 'app-login-intro',
  templateUrl: './login-intro.page.html',
  styleUrls: ['./login-intro.page.scss'],
})
export class LoginIntroPage implements OnInit {
  unknownError = {
    frFR: 'Une erreur inattendue s\'est produite. Veuillez recommencer.',
  };
  isiOs = false;

  constructor(
    public firebaseAuth: FirebaseAuthService,
    public router: Router,
    private ngZone: NgZone,
    public alertController: AlertController,
    public menu: MenuController,
    public plt: Platform
  ) {}

  ngOnInit() {
    this.isiOs = this.plt.is('ios');
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

  async signInWithPhone() {
    if (this.plt.is('desktop')) {
      this.router.navigateByUrl('/login/phone-login');
    } else {
      const newLocal = 'phoneNumber';
      this.alertController
        .create({
          message: 'Enter votre numero de téléphone',
          header: '4 essais pour ce mode test',
          inputs: [
            {
              name: newLocal,
              placeholder: '',
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: (data: any) => {
                console.log('Canceled', data);
              },
            },
            {
              text: 'Done!',
              handler: (phoneNumber: string) => {
                // 1. send sms verification code
                this.firebaseAuth
                  .signInWithPhone()
                  .then((user: User) => {})
                  .catch((error) => {
                    console.log(error);
                  });
              },
            },
          ],
        })
        .then((res) => {
          res.present();
        });

      // 2.listiner fo
      cfaSignInPhoneOnCodeSent().subscribe(async (verificationId) => {
        this.showPrompt(verificationId);
      });
    }
  }

  signInWithGoogle() {
    this.firebaseAuth
      .signInWithGoogle()
      .then((user: User) => {
        if (user != null) {
          this.redirectAuthenticatedUser();
        } else {
          console.log('signInWithGoogle', 'error');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  signInWithFacebook() {
    this.firebaseAuth
      .signInWithFacebook()
      .then((user: User) => {
        if (user != null) {
          console.log(user.displayName);
          this.redirectAuthenticatedUser();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showPrompt(verificationId: string) {
    this.alertController
      .create({
        message: 'Enter votre code de vérification',
        inputs: [
          {
            name: 'verificationCode',
            placeholder: '',
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: (data: any) => {
              console.log('Canceled', data);
            },
          },
          {
            text: 'Done!',
            handler: (verificationCode: string) => {
              // 3.
              const newLocal = 'verificationCode';
              const credential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                verificationCode[newLocal]
              );
              firebase.auth().signInWithCredential(credential);
              this.redirectAuthenticatedUser();
            },
          },
        ],
      })
      .then((res) => {
        res.present();
      });
  }

  signInWithApple() {
    SignInWithApple.Authorize()
      .then((response) => {
        console.log('signInWithApple', response);
      })
      .catch((response) => {
        console.error(response);
      });
  }

  ionViewWillEnter() {
    this.menu.enable(false);
  }
}
