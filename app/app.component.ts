import { Component, Directive, Attribute, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from "@angular/router";

import {TypeaheadGPXComponent} from './typeahead.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import { TabsetComponent } from 'ng2-bootstrap/components/tabs';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';
import {MapGPXComponent} from './map.component';
import {OrgProfileGPXComponent} from './orgprofile.component';
import {StructureGPXComponent} from './structure.component';
//import {TestComponent} from './test.component';
import {ConstitutionProfileGPX} from './constitutionProfile';
import {UserProfileGPX} from './userProfile';
import {PostGPX} from './post.component';
import {NewPostGPX} from './newPost';
import {PartyListComponentGPX} from './partyList.component';
import {PartyListProfileComponentGPX} from './partyListProfile.component';
import {LegislatorComponentGPX} from './legislator.component';
import { LegislatorsService } from './service/legislators.service';
//import { Legislator } from './object/legislator';
import {PartyProfileGPX} from './partyProfile.component';
import {SearchLegislatorComponentGPX} from './search.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//import { NDV_DIRECTIVES } from 'angular2-click-to-edit/components';
//import {DataShareService} from './service/dataShare.service';


//import {CongressMapComponent} from './congressmap.component';
//import {AppModule} from 'register';
//import {AppModule} from 'userManagement/app/app.module';
//import {AppComponent as idm} from '../node_modules/identitymgmt';
//import '../node_modules/identitymgmt/app.43a45297bc7249e35ee9.js';
//import '../node_modules/identitymgmt/polyfills.43a45297bc7249e35ee9.js';
//import '../node_modules/identitymgmt/vendor.43a45297bc7249e35ee9.js';

@Component({
  selector: 'my-app',
  directives: [ROUTER_DIRECTIVES, TypeaheadGPXComponent, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, MapGPXComponent, OrgProfileGPXComponent, 
  StructureGPXComponent, ConstitutionProfileGPX, UserProfileGPX, PostGPX, NewPostGPX, LegislatorComponentGPX, PartyListComponentGPX, PartyListProfileComponentGPX, PartyProfileGPX, SearchLegislatorComponentGPX],
  templateUrl: 'app/view/baseContainer.html',
  providers: [ LegislatorsService],
  styles:[`

  `],

})

@Routes([
    {path: "/", component: SearchLegislatorComponentGPX },
    {path: "/legislator/:id", component: LegislatorComponentGPX },
    {path: "/district", component: ConstitutionProfileGPX },
    {path: "/user", component: UserProfileGPX },
    {path: "/map", component: MapGPXComponent },
    {path: "/parties", component: PartyListComponentGPX },
    {path: "/party/:id", component: PartyListProfileComponentGPX },    
    {path: "/partyProfile", component: PartyProfileGPX },    
    {path: "/post", component: NewPostGPX},
    {path: "/news", component: PostGPX }    


])


export class AppComponent  implements OnInit, AfterViewInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
    //legislators: Array<Legislator> = [];
    //public selectedlegislator: Legislator;
    constructor(private  router: Router) {}

    clickTab(event: String){
      console.log("tab button clicked - " + event);
      //console.log("event.target.value " + event.target);
      if(event === 'District'){
        localStorage.setItem('currentUser', JSON.stringify('Me'))
        console.log("Test Localstorage - " + localStorage.getItem('currentUser'));
        console.log("Routing " + event);
        //this.staticTabs.tabs[6].active = true;
        this.router.navigate(['/district']);
      }else if(event === 'News'){
        console.log("Routing " + event);
        //this.staticTabs.tabs[6].active = true;
        this.router.navigate(['/news']);
      }else if(event === 'Post'){
        console.log("Routing " + event);
        //this.staticTabs.tabs[6].active = true;
        this.router.navigate(['/post']);
      }else if(event === 'Search'){
        console.log("Routing " + event);
        //this.staticTabs.tabs[6].active = true;
        this.router.navigate(['/']);
      }else if(event === 'Parties'){
        console.log("Routing " + event);
        //this.staticTabs.tabs[6].active = true;
        this.router.navigate(['/parties']);
      }else if(event === 'Map'){
        console.log("Routing " + event);
        //this.staticTabs.tabs[6].active = true;
        this.router.navigate(['/map']);
      }else if(event === 'User'){
        console.log("Routing " + event);
        this.router.navigate(['/user']);
      }else if(event === 'Party'){
        console.log("Routing " + event);
        this.router.navigate(['/partyProfile']);
      }
    }

createPage(event: String){
  console.log("creating page - " + event);
  //console.log("event.target.value " + event.target);
  if(event === 'District'){
    this.router.navigate(['/district']);
  }else if(event === 'Legislator'){
    this.router.navigate(['/legislator/B001296']);
  }else if(event === 'User'){
    this.router.navigate(['user']);
  }else if(event === 'Party'){
    this.router.navigate(['partyProfile']);
  }
}    
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

onSearch(legislators: Array<Legislator>){
  console.log(legislators);
  this.legislators = legislators;
}

  gotoLegislator(legislator: Legislator):void{
    this.selectedlegislator = legislator;

    console.log('selected item - ' +  this.selectedlegislator);    
    console.log('bioguide_id of selected item - ' +  this.selectedlegislator.bioguide_id);

    this.router.navigate(['/legislator', this.selectedlegislator.bioguide_id]);
  }

toLegis(r:any){
  let person = <Legislator>(r);
  //this.legislators.push(person);
  console.log('Parsed person:', person);
 
}
*/
  ngOnInit(): void {

    //this.getLegislatorsByZipCode('15220');
  }

  ngAfterViewInit() {
    this.staticTabs.tabs[0].active = true;
  }
}