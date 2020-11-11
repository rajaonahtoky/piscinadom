import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  options = {
    slidesPerView: 3,
    spaceBetween: 10,
  };

  constructor() { }

  ngOnInit() {
  }

}
