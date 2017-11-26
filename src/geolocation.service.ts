import { Injectable } from "@angular/core";

import { IUser       } from './app/user.interface';
import { Storage     } from "@ionic/storage/dist/storage";
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class GeolocationService {

    private geodata = [];

    constructor( private storage: Storage,
                 private geolocation: Geolocation ) {
                     this.setGeolocation();
                  }

    public getGeolocation() {
        this.getStorageGeolocation("geo_lat", "latitude");
        this.getStorageGeolocation("geo_lon", "longitude");
        return this.geodata;
    }

    private setGeolocation() {
        this.geolocation.getCurrentPosition().then( ( position ) => {

          // WINNIPEG GEOLOCATION 49.8981772,-97.1379823
          //this.storage.set( 'geo_lat', position.coords.latitude );
          //this.storage.set( 'geo_lon', position.coords.longitude );
          this.storage.set( 'geo_lat', '49.8981772'  );
          this.storage.set( 'geo_lon', '-97.1379823' );
        }, ( err ) => {
          alert( err.code + ':' + err.message );
        });
      }

    private getStorageGeolocation( key, return_key ) {

        this.storage.get( key ).then( (value) => {
            this.setStorageGeolocation( return_key, value );
        });
    }

    setStorageGeolocation( key, value ) {
        this.geodata[key] = value;
    }

}