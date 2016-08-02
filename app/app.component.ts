import { Component, Directive, Attribute, ElementRef } from '@angular/core';
import {TypeaheadGPXComponent} from './typeahead.component'
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {MapGPXComponent} from './map.component'
import {OrgProfileGPXComponent} from './orgprofile.component'
import {StructureGPXComponent} from './structure.component'
import {TestComponent} from './test.component';

@Component({
  selector: 'my-app',
  directives: [TypeaheadGPXComponent, TAB_DIRECTIVES, MapGPXComponent, OrgProfileGPXComponent, StructureGPXComponent, TestComponent],
  templateUrl: 'app/view/baseContainer.html'
})
export class AppComponent {

}