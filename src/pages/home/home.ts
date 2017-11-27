import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	userData = {
    name: "John"
  };

	constructor(public navCtrl: NavController) {

  }

}
