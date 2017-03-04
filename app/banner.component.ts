import {Component, Input} from '@angular/core';

@Component({
  selector: 'banner-gpx',
  templateUrl: 'app/view/banner.html',
  inputs:['height', 'width']
})

export class BannerGPXComponent {
	@Input() imageUrl:string;
	@Input() height:string; //= "50px";
	//public height:string = "50";
	@Input() width:string; //= "50";


}