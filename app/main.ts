import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import {HTTP_PROVIDERS} from '@angular/http';

//import { TestComponent } from './test.component';
//import { ElementRef} from '@angular/core';
import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
//bootstrap(TestComponent, [GOOGLE_MAPS_PROVIDERS]);
//import {userAccessComponent} from 'userManagement/app/app.component';
//import {AppModule} from 'userManagement/app/app.module';

bootstrap(AppComponent, [HTTP_PROVIDERS, GOOGLE_MAPS_PROVIDERS]);