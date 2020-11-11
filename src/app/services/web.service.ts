import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class WebService {

    constructor(private http: HttpClient) { }

    getPostsByUserId(userId: number): Observable<Post[]> {
        return this.http.get<Post[]>(environment.API_URL + 'posts/' + userId);
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get<User>(environment.API_URL + 'user/' + userId);
    }
}