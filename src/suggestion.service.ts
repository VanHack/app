import { AuthenticationService } from './athentication.service';
import { Injectable     } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ENV } from './config/env.dev';
import { ITaste } from './app/taste.interface';
import { GeolocationService } from './geolocation.service';
import { UserService } from './user.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class SuggestionService {

    public env = {
        action   : null,
        provider : null,
        urlBase  : '',
        headers  : null,
    };
    private geo;


    public constructor( private geolocation: GeolocationService,
                        private storage: Storage,
                        private http: Http ) {
        this.setEnviroment();
    }

    public getSuggestions(){
        return {};
    }

    private setEnviroment() {
        this.env.action   = ENV.services.actions.suggestion;
        this.env.provider = ENV.services.providers[ this.env.action.provider ],
        this.env.urlBase  = this.env.provider.url + this.env.action.action;
        this.geo = this.geolocation.getGeolocation();

        this.storage.get("taste_list")
            .then( tastes => {
                this.geo.taste_list = tastes;
            }
        );
        this.env.urlBase += `?entity_id=${ this.geo['city_id'] }&entity_type=city&cuisines=${ this.geo['taste_list'] }&sort=rating&order=asc`;
        //console.log( this.env.urlBase );
        console.log( this.geo );

        // console.log( this.env.urlBase );
        //https://developers.zomato.com/api/v2.1/search?entity_id=346&entity_type=city&cuisines=175%2C401%2C193%2C3%2C151&sort=rating&order=asc

        this.env.headers  = new Headers();
        this.setHeaders();
    }

    private setHeaders() {
        this.env.provider.headers.forEach(
            ( header ) => {
                this.env.headers.append( header.header , header.value );
            }
        );
    }

    public get(url) {
        return this.http.get(url, {
            headers: this.env.headers
        });
    }

    public getTastes(): Observable<ITaste[]> {
        return this.http.get( this.env.urlBase, { headers: this.env.headers } )
            .map( this.extractData )
            .catch( this.handleError );
    }

    private extractData( response: Response ) {
        let body = response.json();
        return body.cuisines || {};
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
