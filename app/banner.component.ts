import {Component, Input} from '@angular/core';

@Component({
  selector: 'banner-gpx',
  templateUrl: 'app/view/banner.html'
})

export class BannerGPXComponent {
	@Input() public imageUrl:string;
	@Input() public height:string;
	@Input() public width:string;
}