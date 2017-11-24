import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AppComponent } from '../../app/app.component';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(public navCtrl: NavController ) {

  }

  login() {
    alert('login');
  }
}
