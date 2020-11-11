import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { Intervention } from '../../models/intervention.model';

@Injectable()
export class SavPageResolver implements Resolve<any> {

    constructor(private firebaseService: FirebaseService) {}

    resolve() {
        return this.firebaseService.getInterventions();
    }
}