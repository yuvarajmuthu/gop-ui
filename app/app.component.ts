import { Component } from '@angular/core';
import {TypeaheadGPXComponent} from './typeahead.component'
import {MapGPXComponent} from './map.component'

@Component({
  selector: 'my-app',
  directives: [TypeaheadGPXComponent, MapGPXComponent],
  templateUrl: 'app/view/baseContainer.html'
})
export class AppComponent {
}