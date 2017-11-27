import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';

import { IUser       } from './app/user.interface';
import { Storage     } from "@ionic/storage/dist/storage";
import { Geolocation } from '@ionic-native/geolocation';
import { ENV         } from './config/env.dev';
import { ICity       } from './app/city.interface';

import { Observable  } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class GeolocationService {

    private geodata = [];

    public env = {
        action   : null,
        provider : null,
        urlBase  : '',
        headers  : null
    };

    constructor( private storage: Storage,
                 private geolocation: Geolocation,
                 private http: Http ) {
                     this.setEnviroment();
                  }

    public getGeolocation() {
        let keys = [
            { "key" : "latitude", "alias": "geo_lat"},
            { "key" : "longitude", "alias": "geo_lon"},
            { "key" : "country_id", "alias": "country_id"},
            { "key" : "country_name", "alias": "country_name"},
            { "key" : "discovery_enabled", "alias": "discovery_enabled"},
            { "key" : "has_new_ad_format", "alias": "has_new_ad_format"},
            { "key" : "id", "alias": "city_id"},
            { "key" : "is_state", "alias": "is_state"},
            { "key" : "name", "alias": "name"},
            { "key" : "should_experiment_with", "alias": "should_experiment_with"},
            { "key" : "state_code", "alias": "state_code"},
            { "key" : "state_id", "alias": "state_id"},
            { "key" : "state_name", "alias": "state_name"},
        ].forEach( ( data_key ) => {
            this.getStorageGeolocation( data_key.key, data_key.alias );
        });
        return this.geodata;
    }

    private setEnviroment() {
        this.env.action   = ENV.services.actions.cities;
        this.env.provider = ENV.services.providers[ this.env.action.provider ],
        this.env.urlBase  = this.env.provider.url + this.env.action.action;
        this.env.urlBase += '?lat=49.8981772&lon=-97.1379823';
        this.env.headers  = new Headers();
        this.setHeaders();
        this.setGeolocation();
    }

    private setHeaders() {
        this.env.provider.headers.forEach(
            ( header ) => {
                this.env.headers.append( header.header , header.value );
            }
        );
    }

    private get(url) {
        return this.http.get(url, {
            headers: this.env.headers
        });
    }

    public getCity(): Observable<ICity[]>  {
        return this.http.get( this.env.urlBase, { headers: this.env.headers } )
            .map( this.extractData )
            .catch( this.handleError );
    }

    private extractData( response: Response ) {
        let body = response.json();
        return body.location_suggestions || {};
    }

    private handleError(error: Response): Observable<any> {
        return Observable.throw( error || 'Server error');
    }

    private setGeolocation() {
        this.geolocation.getCurrentPosition().then( ( position ) => {
          // WINNIPEG GEOLOCATION 49.8981772,-97.1379823
          //this.storage.set( 'geo_lat', position.coords.latitude );
          //this.storage.set( 'geo_lon', position.coords.longitude );
          //this.storage.set( 'geo_lat', '49.8981772'  );
          //this.storage.set( 'geo_lon', '-97.1379823' );

          this.getCity()
          .subscribe( ( cities ) => {
              cities.map( ( city ) => {
                  let key_values = [
                    { "key" : "geo_lat", "value" : '49.8981772'  },
                    { "key" : "geo_lon", "value" : '-97.1379823'  },
                    { "key" : "country_id", "value" : city.country_id  },
                    { "key" : "country_name", "value" : city.country_name  },
                    { "key" : "discovery_enabled", "value" : city.discovery_enabled  },
                    { "key" : "has_new_ad_format", "value" : city.has_new_ad_format  },
                    { "key" : "city_id", "value" : city.id  },
                    { "key" : "is_state", "value" : city.is_state  },
                    { "key" : "name", "value" : city.name  },
                    { "key" : "should_experiment_with", "value" : city.should_experiment_with  },
                    { "key" : "state_code", "value" : city.state_code  },
                    { "key" : "state_id", "value" : city.state_id  },
                    { "key" : "state_name", "value" : city.state_name }
                  ].forEach( ( key_value ) => {
                    this.storage.set( key_value.key, key_value.value );
                    this.setStorageGeolocation( key_value.key, key_value.value );
                  });
              });
          },
          ( error ) => {
              console.log( error );
          });
        }, ( err ) => {
          alert( err.code + ':' + err.message );
        });
    }

    private getStorageGeolocation( key, return_key ) {
        this.storage.get( key ).then( (value) => {
            this.setStorageGeolocation( return_key, value );
        });
    }

    private setStorageGeolocation( key, value ) {
        this.geodata[key] = value;
    }

}