import { Component, OnInit  } from '@angular/core';
import { NavController      } from 'ionic-angular';

import { IUser } from './../../app/user.interface';

@Component({
  selector: 'page-tasteMeter-Suggestions',
  templateUrl: 'TasteMeter-Suggestions.component.html'
})
export class TasteMeterSuggestionsComponent implements OnInit {

  userData = {
    name: "Thiago Alencar"
  };

  private errorMessage: any;

  constructor( public navCtrl: NavController ) { }

  slides = [
    {img: "../../assets/imgs/sample-image-635912088.jpg"},
    {img: "../../assets/imgs/sample-image-635912088.jpg"},
    {img: "../../assets/imgs/sample-image-635912088.jpg"},
    {img: "../../assets/imgs/sample-image-635912088.jpg"}
  ];

  slideConfig = {
    infinite: true,
    arrows: false,
    initialSlide: 3,
    centerMode: true,
    speed: 300,
    slidesToShow: 1,
    variableWidth: true
  };

  addSlide() {
    console.log( 'Slide added' );
    this.slides.push(
      {img: "../../assets/imgs/sample-image-635912088.jpg"}
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
