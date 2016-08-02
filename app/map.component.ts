import {Component} from '@angular/core';

//import {GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle } from 'angular2-google-maps/core';
import {GOOGLE_MAPS_DIRECTIVES, MouseEvent, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow} from 'angular2-google-maps/core';

@Component({
  selector: 'map-gpx',
  //directives: [GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle ],
  directives: [GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow],
  templateUrl: 'app/view/map.html',
  styles: [`
.sebm-google-map-container {
height: 400px;
}`]

})

export class MapGPXComponent {
	lat: number = 40.4415151;
	lng: number = -79.9967547;
	zoom:number = 17;

	markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  },
	  {
		  lat: 40.441280,
		  lng: -80.000041,
		  label: 'D',
		  draggable: true
	  }
  ]

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    //this.markers.push({
    //  lat: $event.coords.lat,
    //  lng: $event.coords.lng
    //});
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
//bootstrap(MapGPXComponent, [GOOGLE_MAPS_PROVIDERS]);