import {Component, Input} from '@angular/core';

@Component({
  selector: 'banner-gpx',
  templateUrl: 'app/view/banner.html',
  inputs:['height', 'width'],
  styles: [`

    img{
      max-width: 100%;
      height: auto;
      border-radius: 50%;
    }

    `],
})

export class BannerGPXComponent {
	@Input() imageUrl:string;
	@Input() height:string; //= "50px";
	@Input() width:string; //= "50";


}