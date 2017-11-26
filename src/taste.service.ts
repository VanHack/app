import { Injectable     } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITaste } from './app/taste.interface';

@Injectable()
export class TasteService {

    private response: any;
    private urlBase: string = 'https://developers.zomato.com/api/v2.1/cuisines?city_id=346';

    // curl -X GET --header "Accept: application/json" --header "user-key: f8216020db0ddcd5081730299d5336fd" "https://developers.zomato.com/api/v2.1/cuisines?city_id=346"

    constructor( private http: Http ) { }

    createAuthorizationHeader(headers: Headers) {
        headers.append('Accept',   'application/json');
        headers.append('user-key', 'f8216020db0ddcd5081730299d5336fd');
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    public getTastes(): Observable<ITaste[]> {
        let headers = new Headers();
        this.createAuthorizationHeader( headers );

        return this.http.get( this.urlBase, { headers: headers } )
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
