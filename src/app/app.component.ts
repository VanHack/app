import { GeolocationService } from './../geolocation.service';
import { TasteMeterComponent } from './../pages/tasteMeter/TasteMeter.component';
import { Component          } from '@angular/core';

import { Platform           } from 'ionic-angular';
import { StatusBar          } from '@ionic-native/status-bar';
import { SplashScreen       } from '@ionic-native/splash-screen';
import { Storage            } from '@ionic/storage/dist/storage';

import { LoginComponent     } from '../pages/login/login.component';
import { TabsPage           } from './../pages/tabs/tabs';
import { TasteMeterSuggestionsComponent } from '../pages/tasteMeter-Suggestions/TasteMeter-Suggestions.component';
import { Geolocation        } from '@ionic-native/geolocation';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  rootPage:any = LoginComponent;

  constructor( platform: Platform,
               statusBar: StatusBar,
               private storage: Storage,
               splashScreen: SplashScreen ) {

    //this.rootPage = this.isUserLogged() ? TabsPage : LoginComponent;
		this.rootPage = this.isUserLogged() ? TabsPage : TabsPage;

    platform.ready().then(
      () => {
        statusBar.styleDefault();
        splashScreen.hide();
      }
    );
  }

  public isUserLogged(): boolean {
    let userValidated: boolean = false;

    this.storage.get('login').then( ( user ) => {

      if ( user == null ) {
        console.log(`No user data found`);
      } else {
        userValidated = user;
        console.log(`User: ${ user } logged`);
      }
    });
    return userValidated;
  }

}
