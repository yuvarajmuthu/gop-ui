import {Component} from '@angular/core';
//import {bootstrap} from '@angular/platform-browser-dynamic';

//import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
//import {MapsAPILoader} from 'angular2-google-maps/ts/core/services/maps-api-loader';

@Component({
  selector: 'map-gpx',
  directives: [GOOGLE_MAPS_DIRECTIVES],
  //providers: [GOOGLE_MAPS_PROVIDERS],
  templateUrl: 'app/view/map.html',
  styles: [`
.sebm-google-map-container {
height: 400px;
}`]

})

export class MapGPXComponent {
	lat: number = 44.3;
	lng: number = 33.2;

}

//bootstrap(MapGPXComponent, [GOOGLE_MAPS_PROVIDERS]);