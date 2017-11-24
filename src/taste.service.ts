import { Injectable     } from '@angular/core';
import { Http, Response } from '@angular/http';

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
    private urlBase: string = 'http://192.168.2.1:3000';

    constructor( private http: Http ) { }

    public getTastes( page: number, quantity: number ): Observable<ITaste[]> {
        let url: string = `${ this.urlBase }/tastes?_page=${ page }&_limit=${ quantity }`;

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
