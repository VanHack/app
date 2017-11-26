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
    {img: "https://source.unsplash.com/750x900/?salad", name:"Green Salad", venue:"The Vegan Squad", price: "14.90"},
    {img: "https://source.unsplash.com/750x900/?burger", name: "Monster BBQ Burger", venue:"Tipsy Cow", price:"23.50"},
    {img: "https://source.unsplash.com/750x900/?pasta", name: "Fettuccine Alfredo", venue:"Olive Garden", price: "36.70"},
    {img: "https://source.unsplash.com/750x900/?chinese,food", name:"Teriaky Chiken", venue:"Panda Chinese Restaurant", price: "8.90"}
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
      { img: "https://source.unsplash.com/750x900/?dessert,strawberry,pie", name: "Strawberry Pie", venue: "Baked Expectations", price:"15.90" }
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
