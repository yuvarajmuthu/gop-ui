import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from '@angular/http';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router";
import {APP_BASE_HREF} from '@angular/common';
//import { TestComponent } from './test.component';
//import { ElementRef} from '@angular/core';
//import {GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
//bootstrap(TestComponent, [GOOGLE_MAPS_PROVIDERS]);
//import {userAccessComponent} from 'userManagement/app/app.component';
//import {AppModule} from 'userManagement/app/app.module';
import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import { AlertService } from './_services/index';
import {UserService} from './service/user.service';


bootstrap(AppComponent, [AlertService, MissionService, DataShareService, UserService, 
	HTTP_PROVIDERS, JSONP_PROVIDERS, ROUTER_PROVIDERS, {provide: APP_BASE_HREF, useValue : '/' }]);