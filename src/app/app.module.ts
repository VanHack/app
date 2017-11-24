import { NgModule, ErrorHandler, Injectable, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Pro } from '@ionic/pro';

import { AppComponent } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TMSetupPage } from '../pages/tm-setup/tm-setup';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
		TMSetupPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    AboutPage,
    ContactPage,
    HomePage,
		TMSetupPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicErrorHandler,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
