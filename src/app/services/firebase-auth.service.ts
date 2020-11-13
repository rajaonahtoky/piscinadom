import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject, from, BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { User, auth } from 'firebase/app';
import { ProfileModel } from '../models/profile.model';
import { cfaSignIn } from 'capacitor-firebase-auth';

import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
const UID_KEY = 'my-uid';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  uid = '';
  currentUser: User;
  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();

  constructor(
    public angularFire: AngularFireAuth,
    public platform: Platform
  ) {
    this.init();
  }

  get authenticatedUser() {
    return this.currentUser;
  }

  async init() {
    await this.loadUid();

    this.angularFire.onAuthStateChanged(async (user) => {
      if (user) {
        this.isAuthenticated.next(true);
        await Storage.set({key: UID_KEY, value: user.uid});
        this.uid = user.uid;
        this.currentUser = user;
      } else {
        this.isAuthenticated.next(false);
        await Storage.remove({key: UID_KEY});
        this.uid = '';
        this.currentUser = null;
      }
    });

    this.angularFire.getRedirectResult()
    .then((result) => {
      if (result.user) {
        this.setProviderAdditionalInfo(result.additionalUserInfo.profile);
        this.currentUser = result.user;
        this.redirectResult.next(result);
      }
    }, (error) => {
      this.redirectResult.next({error: error.code});
    });
  }

  async loadUid() {
    const uid = await Storage.get({ key: UID_KEY });

    if (uid && uid.value) {
      this.uid = uid.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  getLoggedInUser() {
    return this.currentUser;
  }

  getRedirectResult(): Observable<any> {
    return this.redirectResult.asObservable();
  }

  setProviderAdditionalInfo(additionalInfo: any) {
    this.userProviderAdditionalInfo = {...additionalInfo};
  }


  signInWithEmail(credentials: {email: string, password: string}): Promise<auth.UserCredential> {
    return this.angularFire.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signInWithFacebook() {
    return new Promise<any>((resolve, reject) => {
      cfaSignIn('facebook.com').subscribe(
        (user: User) => {
          if (user != null) {
            resolve(user);
          } else {
            reject('login failed');
          }
        }
      );

    });
  }

  signInWithPhone() {
    return new Promise<any>((resolve, reject) => {
      cfaSignIn('phone').subscribe(
        (user: User) => {
          if (user != null) {
            resolve(user);
          } else {
            reject('login failed');
          }
        }
      );
    });
  }


  signInWithGoogle() {
    return new Promise<any>((resolve, reject) => {
      cfaSignIn('google.com').subscribe(
        (user: User) => {
          if (user != null) {
            resolve(user);
          } else {
            reject('login failed');
          }
        }
      );
    });
  }

  signInAnonymously() {
    return new Promise<any>((resolve, reject) => {
      this.angularFire.signInAnonymously().then((data) => {
        resolve(data);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        reject('login failed ${error.message}');
        // ...
      });
    });

  }
}

