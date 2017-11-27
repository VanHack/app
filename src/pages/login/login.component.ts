import { NavController } from 'ionic-angular';
import { Component     } from '@angular/core';

import { Storage                } from '@ionic/storage';

import { TasteMeterComponent    } from './../tasteMeter/TasteMeter.component';
import { AuthenticationService  } from '../../athentication.service';
import { IUser                  } from './../../app/user.interface';

@Component({
  selector: 'login-component',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  private errorMessage: string;
  private userData        = { "username": null, "password": null };
  public  loader: boolean = false;

  tmComponent: any = TasteMeterComponent;

  constructor(  private storage: Storage,
                private authenticationService: AuthenticationService,
                public navCtrl: NavController ) { }

  public submitLogin() {
    // The user authentication was not propertly validate
    // to save time to the rest of the project

    this.loader = true;
    this.authenticationService.authenticate( this.userData )
      .subscribe( ( user ) => {
        if ( user["session"] !== null ) {
          this.storage.set( 'id',      user["id"] );
          this.storage.set( 'login',   user["login"] );
          this.storage.set( 'lastName',user["lastName"] );
          this.storage.set( 'email',   user["email"] );
          this.storage.set( 'session', user["session"] );
          this.loader = false;
          this.navCtrl.push( TasteMeterComponent );
        };
        console.log(  'user' );
        console.log( user );
      },
      ( error )  => {
        this.loader = false;
        this.errorMessage = error;
      });
  }

}
