import { Component } from '@angular/core';

import { AboutPage         		   					} from '../about/about';
import { ContactPage      		    				} from '../contact/contact';
import { HomePage           		  				} from '../home/home';
import { LoginComponent           		  	} from '../login/login.component';
import { TasteMeterComponent  						} from '../tasteMeter/TasteMeter.component';
import { TasteMeterSettingUpPage  				} from '../tasteMeter-setting-up/tasteMeterSettingUp';
import { TasteMeterSuggestionsComponent		} from '../tasteMeter-Suggestions/TasteMeter-Suggestions.component';
import { RestaurantPage  									} from '../RestaurantPage/RestaurantPage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
	tab1Root = HomePage;
	tab2Root = TasteMeterSuggestionsComponent;
  tab3Root = AboutPage;
  tab4Root = ContactPage;
	tab5Root = TasteMeterComponent;
	tab6Root = TasteMeterSettingUpPage;
	tab7Root = RestaurantPage;

  constructor() {

  }
}
