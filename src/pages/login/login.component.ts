import { Component     } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AppComponent        } from '../../app/app.component';
import { TasteMeterComponent } from './../tasteMeter/TasteMeter.component';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  tmComponent: any = TasteMeterComponent;
  constructor( public navCtrl: NavController ) { }

  login() {
    console.log('clicked');
    this.navCtrl = TasteMeterComponent;
  }
}
