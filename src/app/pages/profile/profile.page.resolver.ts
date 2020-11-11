import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WebService } from 'src/app/services/web.service';
import { Post } from 'src/app/models/post.model';
import { Observable, forkJoin } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class ProfilePageResolver implements Resolve<any> {

    constructor(
        private webService: WebService
    ) { }

    resolve() {
        return forkJoin({
            posts: this.webService.getPostsByUserId(1),
            profile: this.webService.getUserById(1)
        });
    }
}