import {Component, ViewContainerRef, ViewChild, ElementRef, Renderer, ChangeDetectorRef, ComponentRef, OnInit} from '@angular/core';
import { Router, RouteSegment, OnActivate } from "@angular/router";

import {BannerGPXComponent} from './banner.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import { TabsetComponent } from 'ng2-bootstrap/components/tabs';
import {PeopleComponentGPX} from './people.component';
import {RatingComponent} from 'ng2-bootstrap/components/rating';
import {NdvEditComponent} from './editableText.component';
import {LegislatorComponentGPX} from './legislator.component';
import {DynamicContentComponent} from './constitution.template.component';
//import { NdvEditComponent } from 'angular2-click-to-edit/components';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
import {TemplatePopulationComponent} from './constitution.template.component';
import {PartyListComponentGPX} from './partyList.component';
import {PostCardGPX} from './postCard.component';

import {PeopleService} from './service/people.service';
import {PartyService} from './service/party.service';
import { LegislatorsService } from './service/legislators.service';
import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import {GroupService} from './service/group.service';
import {UserService} from './service/user.service';

import { Legislator } from './object/legislator';
import {Post} from './object/post';


@Component({
  selector: 'constitutionProfile-gpx',
  templateUrl: 'app/view/constitutionProfile.html',
  directives: [DynamicContentComponent, TemplatePopulationComponent, BannerGPXComponent, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, LegislatorComponentGPX, PeopleComponentGPX, CollapseDirective, RatingComponent, NdvEditComponent, PartyListComponentGPX, PostCardGPX],
  providers:[LegislatorsService, PeopleService, PartyService, GroupService, UserService],
  styles: [`

     .legisBoundary{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 10px;
    }

    .legisBoundary:hover{
      border: 2px solid lightblue;
    }


    .constitutionTop{
      padding: .1px 1.5em;
      background: #f5f2f0;
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    }
    
    .constitutionTop{
      padding-bottom: 5px;
    }

    .constitutionHeader,
    .constitutionDescription{
      border: 1px solid lightblue;
      border-radius: 5px;
    }

    .constitutionProfile .banner{
        max-width: 100%;
        height: auto;
        width:auto/9;
    }

    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;

    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      border-radius: 1px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;

    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }


    .districtTemplate{
      border: 2px solid lightblue;    
      position: relative;
      padding: 1em;
      margin: 1em;
    }

html,body {
    background: #efefef;
}

.activityDiv{
  border: 2px solid lightblue;   
}


header {
  background: #eee;
  background-image: url("https://ballotpedia.s3.amazonaws.com/images/thumb/8/86/PA_18th_congressional_district.png/250px-PA_18th_congressional_district.png?AWSAccessKeyId=AKIAJYSMGSWZEGREQP4Q&Expires=1507362459&Signature=PaPu90WJJt%2FTYATkX6i8V%2FMXRR4%3D");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  height: 250px;
}

header i {
  position: relative;
  cursor: pointer;
  right: -96%;
  top: 25px;
  font-size: 18px !important;
  color: #fff;
}

@media (max-width:800px) {
  header {
    height: 150px;
  } 
  
  header i {
    right: -90%;
  }
}

main {
      padding: 20px 20px 0px 20px;
}

.left {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
}

.activePhoto {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  position: absolute;
  right: calc(50% - 70px);
  top: 75px;
  background-color: #FFC107;
  border: 3px solid #fff;
}

@media (max-width:990px) {
  .activePhoto {
    right: calc(50% - 60px);
    top: 50px;
  } 
}

.name {
  margin-top: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  font-size: 18pt;
  color: #777;
}

.info {
  margin-top: -5px;
  margin-bottom: 5px;
  font-family: 'Montserrat', sans-serif;
  font-size: 11pt;
  color: #aaa;
}

.stats {
  margin-top: 25px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
  font-family: 'Montserrat', sans-serif;
}


.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  color: #aaa;
}

.desc-stat {
  margin-top: -15px;
  font-size: 10pt;
  color: #bbb;
}

.desc {
  text-align: center;
  margin-top: 25px;
  margin: 25px 40px;
  color: #999;
  font-size: 11pt;
  font-family: "Open Sans";
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
}

.social {
  margin: 5px 0 12px 0;
  text-align: center;
  display: inline-block;
  font-size: 20pt;
}

.social i {
  cursor: pointer;
  margin: 0 15px;
}

.social i:nth-child(1)  { color: #4267b2; }
.social i:nth-child(2)  { color: #1da1f2; }
.social i:nth-child(3)  { color: #bd081c; }
.social i:nth-child(4)  { color: #36465d; }

.right {
  padding: 0 25px 0 25px !important;
}

.nav {
  display: inline-flex;
}

.nav li {
  margin: 40px 30px 0 10px;
  cursor: pointer;
  font-size: 13pt;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  color: #888;
}

.nav li:hover, .nav li:nth-child(1)  { 
  color: #999;
  border-bottom: 2px solid #999;
}

.follow {
  position: absolute;
  right: 8%;
  top: 35px;
  font-size: 11pt;
  background-color: #42b1fa;
  color: #fff;
  padding: 8px 15px;
  cursor: pointer;
  transition: all .4s;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
}

.follow:hover {
  box-shadow: 0 0 15px rgba(0,0,0,0.2), 0 0 15px rgba(0,0,0,0.2);
}

@media (max-width:990px) {
  .nav {
    display: none;
  }
  
  .follow {
    width: 50%;
    margin-left: 25%;
    display: block;
    position: unset;
    text-align: center;
  }
}
.gallery  {
  margin-top: 35px;
}

.gallery div {
  margin-bottom: 30px;
}

.gallery img {
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
  width: auto; 
  height: auto;
  cursor: pointer;
  max-width: 100%;
} 

.constitutionDetail{
}
  `]
}
)

export class ConstitutionProfileGPX implements OnActivate, OnInit{
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
	public isCollapsed:boolean = true;
	public isCMCollapsed:boolean = true;
	public isPartiesCollapsed:boolean = true;

	public electedPersonsOld=[];
  public electedPersons:Array<any>=[];
	public contestedPersons=[];
	public parties=[];
  templateType = [];
  private componentRef: ComponentRef<{}>;
  private groupData = {};
  public profilesTemplates = [];
  public profilesData = [];
  private viewingDistrict={};  
    public connected:boolean = false;
  posts:Post[] = [];
  operation:string = "";
  followers:number = 0;
  activities:number = 0;
  //public connected:boolean = false;
      //private populationComponent: TemplatePopulationComponent;

  //get invoked automatically before ngOnInit()
  routerOnActivate(curr: RouteSegment): void {
    if(curr.getParam("id")){
      this.operation = curr.getParam("id");
      console.log("from routerOnActivate()::constitutionProfile Param value - operation " + this.operation);
    }
  }
  
  ngOnInit(){
    console.log("ngOnInit()");
    if(this.operation == "CREATE"){
//      this.loadProfileTemplate();      
      this.dataShareService.setPermission("Editor");   

      this.groupService.getGroupData('').subscribe(
          data => {
            this.groupData = data;
            console.log("Group data from service: ", this.groupData);

            //getting the available profile templates for this group type
            this.viewingDistrict['profileTemplates'] = this.profilesTemplates = this.groupData['profile'];
            console.log("profile templates: ", this.profilesTemplates);

            this.dataShareService.setViewingDistrict(this.viewingDistrict);


            console.log("this.viewingDistrict['profileTemplates']" + this.viewingDistrict['profileTemplates']);
            if(this.viewingDistrict['profileTemplates']){
                  for (let profileTemplate of this.viewingDistrict['profileTemplates']){
                    console.log("reading profileTemplates properties: " + profileTemplate['profile_template_id']);
                    if("districtIntroTemplate" == profileTemplate['profile_template_id']){
                      let templateProperties = [];
                      templateProperties = profileTemplate['properties'];

                      for (let property of templateProperties){
                        console.log("Template property " + property);
                        this[property] = "Enter data here";
                      }

                      break;  
                    }
                  }
            }

          }
      );
    }else{
      this.loadData();
    }

  }

  constructor(private userService:UserService, private groupService:GroupService, private missionService: MissionService, private elementRef:ElementRef, private renderer: Renderer, private legislatorsService:LegislatorsService, private peopleService: PeopleService, private partyService: PartyService, private dataShareService:DataShareService) {  
      console.log("constructor()::constitutionProfile");
  }

  loadData(){
      this.parties = this.partyService.getPartiesByParam('');
      this.connected = this.userService.getRelation(this.dataShareService.getCurrentUserId(), this.dataShareService.getCurrentDistrictId());

      //GETTING PROFILE DATA
      this.groupService.getGroupData('').subscribe(
          data => {
            this.groupData = data;
            console.log("Group data from service: ", this.groupData);

            //getting the available profile templates for this group type
            this.viewingDistrict['profileTemplates'] = this.profilesTemplates = this.groupData['profile'];
            console.log("profile templates: ", this.profilesTemplates);

            //getting the data for this group profile
            this.viewingDistrict['profilesData'] = this.profilesData = this.groupData['profileData'];
            console.log("profile data: ", this.profilesData);

            //getting the data for this group activities
            //SHALL BE REFACTORED TO GET THIS DATA FROM POSTSERVICE
            this.posts = this.viewingDistrict['activities'] = this.groupData['activities'];
            console.log("profile activities: ", this.viewingDistrict['activities']);

            //identifying the profile selected for this group profile, so those components shall be loaded
            let compTypes = [];
            for (let profileData of this.profilesData){
              console.log("loading template component1: ", profileData['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              

              //display the intro template data - districtIntroTemplate
              console.log("profileData['profile_template_id'] " + profileData['profile_template_id']);

              if("districtIntroTemplate" == profileData['profile_template_id']){
                for (let dataObj of profileData['data']){
                  let keys = [];
                  keys = Object.keys(dataObj);
                  console.log("Template data keys " + keys[0] + ":" + dataObj[keys[0]]);
                  this[keys[0]] = dataObj[keys[0]];
                }
              }else{
                console.log("Adding dynamic Template");              
                compTypes.push(profileData['profile_template_id']);
              }

            }

            if(compTypes.length > 0){
              this.templateType = compTypes;
            }

            //setting here so it can be accessed globally
            this.viewingDistrict['id'] = this.groupData['id'];
            this.dataShareService.setViewingDistrict(this.viewingDistrict);

          }
      );

      //GETTING CURRENT REPRESENTATIVES DATA
      this.getCurrentRepresentatives("byCongressDistrict");

  }

  loadProfileTemplate(){
      //GETTING PROFILE DATA
      this.groupService.getGroupData('').subscribe(
          data => {
            this.groupData = data;
            console.log("Group data from service: ", this.groupData);

            //getting the available profile templates for this group type
            this.viewingDistrict['profileTemplates'] = this.profilesTemplates = this.groupData['profile'];
            console.log("profile templates: ", this.profilesTemplates);

            this.dataShareService.setViewingDistrict(this.viewingDistrict);

          }
      );


  }

  @ViewChild('district-population')
  set populationComponent(content:TemplatePopulationComponent) {
    console.log('setting viewchild ' + content);
    //this.populationComponent = content;
 }

/*
      set populationTemplate(v: TemplatePopulationComponent) {
        console.log("set populationTemplate() " + v);
        setTimeout(() => { this.populationComponent = v }, 100);
      }


  
    ngOnChanges(){
        console.log('constitutionProfile ngOnChanges() ');
    }
*/
    showActivities(){
      console.log("show activities ");  
    }

getCurrentRepresentatives(type:string){
  //let legislator = {};

  let searchParam:string = "ocd-division/country:us/state:pa/cd:6";
    //this.legislators = [];
    this.legislatorsService.getLegislature(searchParam, type)
    //.map(result => this.resultop = result.results)
    .subscribe((result) => {
      console.log("result for type " + type + JSON.stringify(result));
      if(type == 'byCongressDistrict'){
        if(!result['error']){
          let offices = [];
          offices = result['offices'];
          
          let officials = [];
          officials = result['officials'];

         for(var i = 0;i<officials.length;i++) {
           let legislator = {};
           if(offices[i] && offices[i]['name'] && 
             (offices[i]['name'].indexOf('United States Senate') != -1 || 
               offices[i]['name'].indexOf('United States House of Representatives') != -1)){
          // console.log("offices[i]['name'] " + offices[i]['name']);
         //console.log("offices[i]['name'].indexOf('United States Senate') " + offices[i]['name'].indexOf('United States Senate'));
         //console.log("offices[i]['name'].indexOf('United States House of Representatives') " + offices[i]['name'].indexOf('United States House of Representatives'));
         //console.log("flag " + (offices[i]['name'] && 
          //   (offices[i]['name'].indexOf('United States Senate') != -1 || offices[i]['name'].indexOf('United States House of Representatives') != -1)));

           legislator['full_name'] = officials[i]['name'];
           legislator['party'] = officials[i]['party'];
           legislator['photo_url'] = officials[i]['photoUrl'];  

           if(offices[i]['name'])
             legislator['role'] = offices[i]['name'];

           //STATE
           let division:string = offices[i]['divisionId'];
           if(division.indexOf('state:') != -1){
             legislator['state'] = division.substr(division.indexOf('state:')+6, 2).toUpperCase();
           }

           //CONGRESS DISTRICT
          if(division.indexOf('cd:') != -1){
             legislator['district'] = division.substr(division.indexOf('cd:')+3, 2);
           }

          if(offices[i]['roles'] && offices[i]['roles'].length > 0){
            legislator['chamber'] = offices[i]['roles'][0];
          }

          console.log("legislator " + legislator);
          this.electedPersons.push(legislator);
          console.log("this.electedPersons.length " + this.electedPersons.length);
          //this.legislator = legislator;
          }
         }
       }
       else{
         console.log('Error in getting');
         //this.alertService.error('Error in getting data');
       }
      }

           

            },
            (error)=>{
              console.log('Error in getting data');
            });

  
}

saveProfile(){
      console.log("Saving Profile");
      this.missionService.announceMission("{'districtID':'d001'}");
      //console.log("printing female count " + this.populationComponent.femaleCount);
      //this.populationComponent.getData();  
}

followDistrict(){
  console.log("followDistrict this.dataShareService.getCurrentUserId() " + this.dataShareService.getCurrentUserId());
  this.userService.followDistrict(this.dataShareService.getCurrentUserId(), this.dataShareService.getCurrentDistrictId());
}


ngAfterViewChecked(){
  //console.log("constitutionProfile ngAfterViewChecked()");
  if(this.elementRef.nativeElement.querySelector('district-population')){
    //console.log("District population template found ");
/*
        this.renderer.listenGlobal('district-population', 'onAdd', (event)=>{
        console.log("onAdd event handled");
    });
    */

   //console.log("adding handler " + (<TemplatePopulationComponent>(this.elementRef.nativeElement.querySelector('district-population'))).femaleCount);
   //this.componentRef = (<TemplatePopulationComponent>(this.elementRef.nativeElement.querySelector('district-population'))).instance;
    //this.elementRef.nativeElement.querySelector('district-population').addEventListener('ngAfterViewInit', this.onAddHandler.bind(this));
  }
}

onAdd(event){
  //console.log("onAdd event handled");
  //this.populationComponent = event;
}

ngAfterViewInit (){ //not called
  //console.log("constitutionProfile ngAfterViewInit ()");
}

ngAfterContentInit (){ //not called
  //console.log("constitutionProfile ngAfterContentInit ()");
}

  /*
  name:string = 'Royapuram';
  description:string = 'Royapuram is a legislative assembly constituency, that includes the locality, Royapuram. Royapuram assembly constituency is part of Chennai North Parliamentary constituency.';
     
  selected_permission = 'Editor';
  checkPermissions() {
      if(this.selected_permission == 'Editor') {
        return true;
      } 
      else {
        return false;
      }
    }

        saveMethod(obj) {
      console.log('trying to save'+ JSON.stringify(obj));
    }
*/ 




      getPermission():string{
                //console.log("calling getter");
          let data = this.dataShareService.getPermission();
      //console.log("getPermission() " + data);
      return data;
  }

  setPermission(data:string){
      //console.log("calling setter");
      this.dataShareService.setPermission(data);    
 
  }


  allowed():boolean{
      let permission:boolean = this.dataShareService.checkPermissions();
      //console.log("allowed() - " + permission);

      return permission;
  }

  loadTemplate(type:string){
    console.log("constitutionProfile Loading Template " + type);
    let compTypes = [];
    compTypes.push(type);
    this.templateType = compTypes;
  }



	getElectedMembers(type:String){
		//this.electedPersons = this.peopleService.getElectedMembers(type);
		//return this.electedPersons;
	}

	saidHello($event){
	  alert(`You said hello to ${$event}`)
	}


  //START Ratings Component
  public x:number = 5;
  public y:number = 2;
  public max:number = 10;
  public rate:number = 7;
  public isReadonly:boolean = false;
 
  public overStar:number;
  public percent:number;
 
  public ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
 
  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };
 
  public resetStar():void {
    this.overStar = void 0;
  }
  //END Ratings Component
  
}