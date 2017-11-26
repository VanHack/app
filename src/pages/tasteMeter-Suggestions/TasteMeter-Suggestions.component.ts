import { Component, OnInit  } from '@angular/core';
import { NavController      } from 'ionic-angular';

import { IUser } from './../../app/user.interface';

@Component({
  selector: 'page-tasteMeter-Suggestions',
  templateUrl: 'TasteMeter-Suggestions.component.html'
})
export class TasteMeterSuggestionsComponent implements OnInit {

  userData = {
    name: "John"
  };

  private errorMessage: any;

  constructor( public navCtrl: NavController ) { }

  slides = [
    {img: "https://source.unsplash.com/750x900/?salad", name:"Green Salad"},
    {img: "https://source.unsplash.com/750x900/?burger", name: "Monster BBQ Burger"},
    {img: "https://source.unsplash.com/750x900/?pasta", name: "Fettuccini Alfredo"},
    {img: "https://source.unsplash.com/750x900/?chinese,food", name:"Teriaky Chiken"}
  ];

  slideConfig = {
    infinite: true,
    arrows: false,
    initialSlide: 3,
    centerMode: true,
    speed: 50,
    slidesToShow: 1,
    variableWidth: true
  };

  addSlide() {
    console.log( 'Slide added' );
    this.slides.push(
      { img: "https://source.unsplash.com/750x900/?dessert,strawberry,pie", name: "Strawberry Pie" }
    )
  }

  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }

  afterChange(e) {
    console.log('afterChange');
  }

  ngOnInit(): void {
    this.addSlide();
  }

}
