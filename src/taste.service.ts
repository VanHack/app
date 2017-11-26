import { Injectable     } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { ITaste } from './app/taste.interface';
import { ENV }    from './config/env.dev';
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';
import { IServiceInterface } from './app/serviceEnviroment.interface';

@Injectable()
export class TasteService {

    public env: IServiceInterface;

    public constructor( private http: Http ) {
        this.setEnviroment();
    }

    private setEnviroment() {
        this.env.action   = ENV.services.actions.tastes;
        this.env.provider = ENV.services.providers[ this.env.action.provider ];
        this.env.urlBase  = this.env.provider.url + this.env.action.action;
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
