import { Component } from '@angular/core';

import { AboutPage            } from '../about/about';
import { ContactPage          } from '../contact/contact';
import { HomePage             } from '../home/home';
import { TasteMeterComponent  } from '../tasteMeter/TasteMeter.component';
import { TasteMeterSettingUpPage  } from '../tasteMeter-Setting-Up/TasteMeter-Setting-Up';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
	tab4Root = TasteMeterComponent;
	tab5Root = TasteMeterSettingUpPage;

  constructor() {

  }
}
