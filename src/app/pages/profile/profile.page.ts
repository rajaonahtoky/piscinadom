import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  posts: Post[] = [];
  profile: User;

  constructor( private route: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.route.data.subscribe(pageData => {
        this.posts = pageData.data.posts;
        this.profile = pageData.data.profile;
        console.log('name: ' + this.profile.name);
      });
    }
  }

  // createEntretien() {
  //   const entretien = {
  //     description: 'Demande d’un contrat d’entretien de notre piscine de 30m2, 1 fois par semaine, de préférence le vendredi. Incluant produits et maintenance générale.',
  //     date: '8 Nov',
  //     comments: 56,
  //     sender: {
  //       'name': 'Maria Snow',
  //       'imageUrl': './assets/images/profile-photo-square.jpg'
  //       }
  //   };
  //   this.firebaseService.createEntretien(entretien);
  // }

  // createProfile() {
  //   const profile = {
  //     name: 'John Snow',
  //     imageUrl: './assets/images/profile-photo-square.jpg',
  //     address: 'San Francisco, CA',
  //     likes: 125,
  //     followers: 150,
  //     following: 321,
  //   };
  //   this.firebaseService.createUser(profile);
  // }
}
