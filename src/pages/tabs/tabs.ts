import { Component } from '@angular/core';

import { AboutPage         		   					} from '../about/about';
import { ContactPage      		    				} from '../contact/contact';
import { HomePage           		  				} from '../home/home';
import { TasteMeterComponent  						} from '../tasteMeter/TasteMeter.component';
import { TasteMeterSettingUpPage  				} from '../tasteMeter-setting-up/tasteMeterSettingUp';
import { TasteMeterSuggestionsComponent		} from '../tasteMeter-Suggestions/TasteMeter-Suggestions.component';
import { RestaurantPage  									} from '../RestaurantPage/RestaurantPage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
	tab4Root = TasteMeterComponent;
	tab5Root = TasteMeterSettingUpPage;
	tab6Root = TasteMeterSuggestionsComponent;
	tab7Root = RestaurantPage;


  constructor() {

  }
}
