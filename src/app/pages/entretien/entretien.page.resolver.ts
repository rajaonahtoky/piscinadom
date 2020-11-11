import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Injectable()
export class EntretiensPageResolver implements Resolve<any> {

    constructor(private firebaseService: FirebaseService) { }

    resolve() {
        return this.firebaseService.getEntretiens();
    }
}