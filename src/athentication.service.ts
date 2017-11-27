import { Injectable     } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser } from './app/user.interface';
import { ENV   } from './config/env.dev';

@Injectable()
export class AuthenticationService {

    public env = {
        action  : null,
        provider: null,
        urlBase : '',
        headers : null
    };

    constructor( private http: Http ) {
        this.setEnviroment();
    }

    public authenticate( userData ): Observable<IUser[]> {
        let url: string = `${ this.env.urlBase }/1.json`;
        console.log( url );

        // This method will not do a real authentication of the user
        // with the userData to save time in this Hackathon.
        return this.http.get( url, { headers: this.env.headers } )
        .map( this.extractData )
        .catch( this.handleError );
    }

    private setHeaders() {
        this.env.provider.headers.forEach(
            ( header ) => {
                this.env.headers.append( header.header , header.value );
            }
        );
    }

    private setEnviroment() {
        this.env.action   = ENV.services.actions.authentication;
        this.env.provider = ENV.services.providers[ this.env.action.provider ];
        this.env.urlBase  = this.env.provider.url + this.env.action.action;
        this.env.headers  = new Headers();
        this.setHeaders();
    }


    private extractData( response: Response ) {
        let body = response.json();
        return body || {};
    }

    private handleError(error: Response): Observable<any> {
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
