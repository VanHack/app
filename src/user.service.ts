import { Injectable } from "@angular/core";
import { IonicStorageModule } from "@ionic/storage";

import { IUser    } from './app/user.interface';
import { Storage } from "@ionic/storage/dist/storage";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

    private userData = [];

    constructor( private storage: Storage ) {
        this.getStorageValue("id");
        this.getStorageValue("name");
        this.getStorageValue("login");
        this.getStorageValue("lastName");
        this.getStorageValue("email");
        this.getStorageValue("session");
    }

    public getUserData() {
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