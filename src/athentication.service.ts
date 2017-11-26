import { Injectable     } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IUser } from './app/user.interface';

@Injectable()
export class AuthenticationService {

    private urlBase: string = 'http://192.168.0.4:3000';

    constructor( private http: Http ) { }

    public authenticate( userData ): Observable<IUser[]> {
        let url: string = `${ this.urlBase }/users/1`;

        // This method will not do a real authentication of the user
        // with the userData to save time in this Hackathon.
        return this.http.get( url )
            .map( this.extractData )
            .catch( this.handleError );
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
