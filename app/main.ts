import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
//import { TestComponent } from './test.component';
//import { ElementRef} from '@angular/core';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
//bootstrap(TestComponent, [GOOGLE_MAPS_PROVIDERS]);
bootstrap(AppComponent, [GOOGLE_MAPS_PROVIDERS]);