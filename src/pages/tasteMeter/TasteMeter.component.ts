import { Component, OnInit  } from '@angular/core';
import { NavController      } from 'ionic-angular';

import { ITaste                  } from '../../app/taste.interface';
import { TasteService            } from '../../taste.service';
import { TabsPage                } from './../tabs/tabs';
import { TasteMeterSettingUpPage } from '../tasteMeter-setting-up/tasteMeterSettingUp';
import { Storage                 } from '@ionic/storage';

@Component({
  selector: 'page-tasteMeter-setup',
  templateUrl: 'TasteMeter.component.html'
})
export class TasteMeterComponent implements OnInit {
  private errorMessage: any;

  public  loader        = true;
  public  tasteOptions  = [];

  private selectedOptions = [];
  private minimumOptionQuantity = 5;

  constructor( private tasteService: TasteService,
               private storage: Storage,
               public navCtrl: NavController ) { }

  ngOnInit() {
    this.getTastes();
  }

  setTasteOption( taste ) {
    var index = this.selectedOptions.indexOf( taste.cuisine_id );

    if (index >= 0) {
      this.selectedOptions.splice( index, 1 );
    } else {
      this.selectedOptions.push( taste.cuisine_id );
    }

  }

  private getTastes() {
    this.tasteService.getTastes()
    .subscribe(
      ( tastes ) => {
        if ( tastes.length ) {
          this.loader = false;
          tastes.map( ( taste ) => {
            this.tasteOptions.push( taste['cuisine'] );
          } );
        };
      },
      ( error ) => {
        this.loader = false;
        this.errorMessage = error;
      });
  }

  nextPage() {
    if ( this.selectedOptions.length >= 5 ) {
      this.storage.set( 'taste_list', this.selectedOptions.join('|') );
      this.navCtrl.push( TasteMeterSettingUpPage );
    }
  }

}
