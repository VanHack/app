import { NavController } from 'ionic-angular';
import { Component     } from '@angular/core';

import { Storage                } from '@ionic/storage';

import { TasteMeterComponent    } from './../tasteMeter/TasteMeter.component';
import { AuthenticationService  } from '../../athentication.service';
import { IUser                  } from './../../app/user.interface';
import { TabsPage               } from '../tabs/tabs';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  private userData = {};
  errorMessage: string;

  tmComponent: any = TasteMeterComponent;

  constructor(  private authenticationService: AuthenticationService,
                public navCtrl: NavController,
                private storage: Storage ) { }

  submitLogin() {

    // The user authentication was not propertly validate
    // to save time to the rest of the project

    this.authenticationService.authenticate( this.userData )
        .subscribe(
          ( user ) => {
            if ( user["session"] !== null ) {
              this.storage.set( 'id',      user["id"] );
              this.storage.set( 'login',   user["login"] );
              this.storage.set( 'lastName',user["lastName"] );
              this.storage.set( 'email',   user["email"] );
              this.storage.set( 'session', user["session"] );
              this.navCtrl.push( TabsPage )
            };
          },
          error => this.errorMessage = error );
  }

}
