import { Component, OnInit } from '@angular/core';
import { NavController     } from 'ionic-angular';
import { TabsPage          } from '../tabs/tabs';

@Component({
  selector: 'page-TasteMeter-Setting-Up',
  templateUrl: 'tasteMeterSettingUp.html'
})
export class TasteMeterSettingUpPage implements OnInit {

  constructor( public navCtrl: NavController ) { }

  ngOnInit(): void {
    setTimeout(
      () => this.navCtrl.push( TabsPage )
      , 1500
    );
  }

}
