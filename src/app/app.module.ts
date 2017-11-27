import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule    } from '@angular/http';
import { StatusBar          } from '@ionic-native/status-bar';
import { SplashScreen       } from '@ionic-native/splash-screen';
import { Pro                } from '@ionic/pro';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation        } from '@ionic-native/geolocation';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { SlickModule             } from 'ngx-slick';

import { AppComponent            } from './app.component';
import { AboutPage               } from '../pages/about/about';
import { ContactPage             } from '../pages/contact/contact';
import { HomePage                } from '../pages/home/home';
import { TabsPage                } from '../pages/tabs/tabs';
import { TasteMeterComponent     } from '../pages/tasteMeter/TasteMeter.component';
import { TasteMeterSettingUpPage } from '../pages/tasteMeter-setting-up/tasteMeterSettingUp';
import { RestaurantPage          } from '../pages/RestaurantPage/RestaurantPage';
import { LoginComponent          } from '../pages/login/login.component';
import { TasteService            } from '../taste.service';
import { AuthenticationService   } from '../athentication.service';
import { UserService             } from '../user.service';
import { GeolocationService      } from './../geolocation.service';
import { TasteMeterSuggestionsComponent  } from '../pages/tasteMeter-Suggestions/TasteMeter-Suggestions.component';
import { SuggestionService       } from '../suggestion.service';

const IonicPro = Pro.init('fee2cdf8', {
  appVersion: "0.0.1"
});

@Injectable()
export class SkipAppErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor( injector: Injector ) {
    try {
      this.ionicErrorHandler = injector.get( IonicErrorHandler );
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError( err );
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError( err );
  }
}

@NgModule({
  declarations: [
    AppComponent,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginComponent,
    TasteMeterComponent,
		TasteMeterSettingUpPage,
		TasteMeterSuggestionsComponent,
		RestaurantPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot( AppComponent ),
    IonicStorageModule.forRoot({
      name: 'skipthedishes_DB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    SlickModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginComponent,
    TasteMeterComponent,
		TasteMeterSettingUpPage,
		TasteMeterSuggestionsComponent,
		RestaurantPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    TasteService,
    AuthenticationService,
    UserService,
    GeolocationService,
    SuggestionService,
    IonicErrorHandler,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
