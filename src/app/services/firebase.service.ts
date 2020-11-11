import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Intervention } from '../models/intervention.model';
import { Shop } from '../models/shop.model';
import { User } from '../models/user.model';
//import { User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private snapshotChangesSubscription: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }


  getInterventions() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          // tslint:disable-next-line:max-line-length
          this.snapshotChangesSubscription = this.afs.collection<Intervention[]>('users').doc(currentUser.uid).collection('interventions').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  getIntervention(interventionId) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          // tslint:disable-next-line:max-line-length
          this.snapshotChangesSubscription = this.afs.doc<any>('users/' + currentUser.uid + '/interventions/' + interventionId).valueChanges()
            .subscribe(snapshots => {
              resolve(snapshots);
            }, err => {
              reject(err);
            });
        }
      });
    });
  }

  createIntervention(value) {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      this.afs.collection('users').doc(currentUser.uid).collection('interventions').add({
        sender: value.sender,
        title: value.title,
        description: value.description,
        date: value.date
      }).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  createShop(value) {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      this.afs.collection('shops').add({
        sender: currentUser.uid,
        title: value.title,
        imageUrl: value.imageUrl,
        date: value.date,
      }).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  getShops() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          // tslint:disable-next-line:max-line-length
          this.snapshotChangesSubscription = this.afs.collection<Shop[]>('shops').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  createEntretien(value) {
    return new Promise<any>((resolve, reject) => {
      const currentUser = firebase.auth().currentUser;
      this.afs.collection('entretiens').add({
        //enderUid: currentUser.uid,
        description: value.description,
        date: value.date,
        sender: value.sender
      }).then(
        res => resolve(res),
        err => reject(err)
      );
    });
  }

  getEntretiens() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.user.subscribe(currentUser => {
        if (currentUser) {
          // tslint:disable-next-line:max-line-length
          this.snapshotChangesSubscription = this.afs.collection<Shop[]>('entretiens').snapshotChanges();
          resolve(this.snapshotChangesSubscription);
        }
      });
    });
  }

  // createUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     const currentUser = firebase.auth().currentUser;
  //     this.afs.collection('all_user').doc(currentUser.uid).collection('user').add({
  //       name: value.name,
  //       uid: currentUser.uid,
  //       imageUrl: value.imageUrl,
  //       address: value.address,
  //       likes: value.likes,
  //       following: value.following,
  //       followers: value.followers,
  //     }).then(
  //       res => resolve(res),
  //       err => reject(err)
  //     );
  //   });
  // }


  // getUser() {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afAuth.user.subscribe(currentUser => {
  //       if (currentUser) {
  //         // tslint:disable-next-line:max-line-length
  //         this.snapshotChangesSubscription = this.afs.collection('all_users').doc(currentUser.uid).snapshotChanges();
  //         // this.snapshotChangesSubscription = this.afs.collection('all_users').doc(currentUser.uid).collection('user').snapshotChanges();
  //         resolve(this.snapshotChangesSubscription);
  //       }
  //     });
  //   });
  // }


}
