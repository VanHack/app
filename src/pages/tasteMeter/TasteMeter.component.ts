import { Component, OnInit  } from '@angular/core';
import { NavController      } from 'ionic-angular';

import { ITaste                  } from '../../app/taste.interface';
import { TasteService            } from '../../taste.service';
import { TabsPage                } from './../tabs/tabs';
import { TasteMeterSettingUpPage } from '../tasteMeter-setting-up/tasteMeterSettingUp';

@Component({
  selector: 'page-tasteMeter-setup',
  templateUrl: 'TasteMeter.component.html'
})
export class TasteMeterComponent implements OnInit {
  private errorMessage: any;

  public  tasteOptions  = [];
  private currentPage   = 1;
  private itemsPerPage  = 3;

  private selectedOptions: ITaste[] = [];
  private minimumOptionQuantity = 5;

  constructor( private tasteService: TasteService,
               public navCtrl: NavController ) { }

  ngOnInit() {
    this.getTastes();
  }

  setTasteOption( taste ) {
    this.selectedOptions.push( taste );
  }

  private getTastes() {
    this.tasteService.getTastes()
    .subscribe(
      ( tastes ) => {
        tastes.map( ( taste ) => {
          this.tasteOptions.push( taste['cuisine'] );
        } );
      },
      error => this.errorMessage = error );
  }

  nextPage() {
    this.navCtrl.push( TasteMeterSettingUpPage );
  }

}
