import { Injectable } from "@angular/core";


import { IUser    } from './app/user.interface';
import { Storage  } from "@ionic/storage";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

    private userData = [];

    constructor( private storage: Storage ) { }

    public getUserData() {
        ["id", "name", "login", "lastName", "email", "session", "taste_list" ].forEach( ( key ) => {
            this.getStorageValue( key );
        });
        return this.userData;
    }

    private getStorageValue( key ) {

        this.storage.get( key ).then( (value) => {
            this.setUserData(key, value );
        });
    }

    setUserData( key, value ) {
        this.userData[key] = value;
    }

}