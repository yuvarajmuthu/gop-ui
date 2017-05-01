import { Component, Directive, Attribute, ElementRef, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router";

import {TypeaheadGPXComponent} from './typeahead.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {MapGPXComponent} from './map.component';
import {OrgProfileGPXComponent} from './orgprofile.component';
import {StructureGPXComponent} from './structure.component';
//import {TestComponent} from './test.component';
import {ConstitutionProfileGPX} from './constitutionProfile';
import {PostGPX} from './post';
import {NewPostGPX} from './newPost';
import {PartyListComponentGPX} from './partyList.component';
import { LegislatorsService } from './service/legislators.service';
import { Legislator } from './object/legislator';
import {LegislatorComponentGPX} from './legislator.component';
import {SearchLegislatorComponentGPX} from './search.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

//import {CongressMapComponent} from './congressmap.component';
//import {AppModule} from 'register';
//import {AppModule} from 'userManagement/app/app.module';
//import {AppComponent as idm} from '../node_modules/identitymgmt';
//import '../node_modules/identitymgmt/app.43a45297bc7249e35ee9.js';
//import '../node_modules/identitymgmt/polyfills.43a45297bc7249e35ee9.js';
//import '../node_modules/identitymgmt/vendor.43a45297bc7249e35ee9.js';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, TypeaheadGPXComponent, TAB_DIRECTIVES, MapGPXComponent, OrgProfileGPXComponent, 
  StructureGPXComponent, ConstitutionProfileGPX, PostGPX, NewPostGPX, PartyListComponentGPX, LegislatorComponentGPX, SearchLegislatorComponentGPX],
  templateUrl: 'app/view/baseContainer.html',
   providers: [ LegislatorsService],
  styles: [`
   .legisBoundary{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 10px;
    }

    .legisBoundary:hover{
      border: 2px solid lightblue;
    }


    `]

})

@Routes([
    {path: "/search", component: SearchLegislatorComponentGPX }
])


export class AppComponent  implements OnInit{
    legislators: Array<Legislator> = [];
    constructor(private  router: Router) {}
  /*
  legislators: Array<Legislator> = [];
  resultop:any;
  constructor(private legislatorsService: LegislatorsService) { }

  
  getLegislatorsByZipCode(zipcode:string) {
    this.legislatorsService.getLegislature()
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
    					for(var i = 0;i<result.length;i++) {
    					 this.legislators.push(result[i]);
    					}
    				//this.resultop = result;
						  //this.legislators = result.map(this.toLegis);
						   //result.map(this.toLegis);
							console.log(this.legislators);
						});

    //console.log(this.legislators.length + ' legislators');
  }
*/
onSearch(legislators: Array<Legislator>){
  console.log(legislators);
  this.legislators = legislators;
}
/*
toLegis(r:any){
  let person = <Legislator>(r);
  //this.legislators.push(person);
  console.log('Parsed person:', person);
 
}
*/
  ngOnInit(): void {
    //this.getLegislatorsByZipCode('15220');
  }
}