import { Component, OnInit  } from '@angular/core';
import { NavController      } from 'ionic-angular';

import { ITaste                  } from '../../app/taste.interface';
import { TasteService            } from '../../taste.service';
import { TabsPage                } from './../tabs/tabs';
import { TasteMeterSettingUpPage } from '../tasteMeter-setting-up/tasteMeterSettingUp';

@Component({
  selector: 'page-tm-setup',
  templateUrl: 'TasteMeter.component.html'
})
export class TasteMeterComponent implements OnInit {
  private errorMessage: any;

  public  tasteOptions  = [];
  private currentPage   = 1;
  private itemsPerPage  = 3;

  constructor( private tasteService: TasteService,
               public navCtrl: NavController ) { }

  ngOnInit() {
    this.getTastes( 20 );
  }

  setTasteOption( taste ) {
    console.log( taste );
    this.getTastes( 1 );
  }

  private getTastes( numberOfPages ) {
    this.tasteService.getTastes( this.currentPage, numberOfPages * this.itemsPerPage )
    .subscribe(
      ( tastes ) => {
        console.log( "tastes" + tastes);
        tastes.map( taste => this.tasteOptions.push( taste ) );
      },
      error => this.errorMessage = error );

      this.currentPage += numberOfPages;

  }

  nextPage() {
    this.navCtrl.push( TasteMeterSettingUpPage );
  }

  scroll( event ) {
    console.log( "Scroll" + event.target.scrollTop );
  }

}
