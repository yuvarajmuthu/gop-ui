import {Component, ViewContainerRef, ViewChild, ElementRef, Renderer, ChangeDetectorRef, ComponentRef, OnInit} from '@angular/core';
import {BannerGPXComponent} from './banner.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {PeopleService} from './service/people.service';
import {PartyService} from './service/party.service';
import {PeopleComponentGPX} from './people.component';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
import {RatingComponent} from 'ng2-bootstrap/components/rating';
import {NdvEditComponent} from './editableText.component';
import { LegislatorsService } from './service/legislators.service';
import {LegislatorComponentGPX} from './legislator.component';
import { Legislator } from './object/legislator';
import {DynamicContentComponent} from './constitution.template.component';
//import { NdvEditComponent } from 'angular2-click-to-edit/components';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';
import {DataShareService} from './service/dataShare.service';
import {TemplatePopulationComponent} from './constitution.template.component';
import { MissionService }     from './service/compCommunication.service';
import {GroupService} from './service/group.service';
import {PartyListComponentGPX} from './partyList.component';
import {UserService} from './service/user.service';

@Component({
  selector: 'constitutionProfile-gpx',
  templateUrl: 'app/view/constitutionProfile.html',
  directives: [DynamicContentComponent, TemplatePopulationComponent, BannerGPXComponent, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, LegislatorComponentGPX, PeopleComponentGPX, CollapseDirective, RatingComponent, NdvEditComponent, PartyListComponentGPX],
  providers:[LegislatorsService, PeopleService, PartyService, GroupService, MissionService, UserService],
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

  `]
})

export class ConstitutionProfileGPX {
	public isCollapsed:boolean = true;
	public isCMCollapsed:boolean = true;
	public isPartiesCollapsed:boolean = true;

	public electedPersonsOld=[];
  public electedPersons:Array<Legislator>;
	public contestedPersons=[];
	public parties=[];
  templateType = [];
  private componentRef: ComponentRef<{}>;
  private groupData = {};
  public profilesTemplates = [];
  public profilesData = [];
  public connected:boolean = false;
      //private populationComponent: TemplatePopulationComponent;

  constructor(private userService:UserService, private groupService:GroupService, private missionService: MissionService, private elementRef:ElementRef, private renderer: Renderer, private legislatorsService:LegislatorsService, private peopleService: PeopleService, private partyService: PartyService, private dataShareService:DataShareService) {  
    //this.getElectedMembers("state");
    //this.electedPersonsOld = peopleService.getElectedMembers('');
    //this.contestedPersons = peopleService.getContestedMembers('');
    this.parties = partyService.getPartiesByParam('');

    groupService.getGroupData('').subscribe(
        data => {
          this.groupData = data;
          console.log("Group data from service: ", this.groupData);

          //getting the available profile templates for this group type
          this.profilesTemplates = this.groupData['profile'];
          console.log("profile templates: ", this.profilesTemplates);

          //getting the data for this group profile
          this.profilesData = this.groupData['profileData'];
          console.log("profile data: ", this.profilesData);

          //identifying the profile selected for this group profile, so those components shall be loaded
          let compTypes = [];
          for (let profileData of this.profilesData){
            console.log("loading template component: ", profileData['profile_template_id']);
            //this.templateType.push(profileData['profile_template_id']);
            compTypes.push(profileData['profile_template_id']);
          }

          if(compTypes.length > 0){
            this.templateType = compTypes;
          }

        }
    );

/*
    userService.getRelation(this.dataShareService.getCurrentUserId(), this.dataShareService.getCurrentDistrictId()).subscribe(
        data => {
          this.connected = data;
          console.log("Connected? : ", data);

        }
    );
*/
this.connected = userService.getRelation(this.dataShareService.getCurrentUserId(), this.dataShareService.getCurrentDistrictId());


    legislatorsService.getElectedMembers('').subscribe(res => {
      this.electedPersons = res;
      console.log("Elected persons " + this.electedPersons);
    });

    legislatorsService.getContestedMembers('').subscribe(res => {
      this.contestedPersons = res;
      console.log("Contested persons " + this.contestedPersons);
    });

/*
    missionService.missionConfirmed$.subscribe(
      astronaut => {
        console.log("Received message from child" + astronaut);
      });
    */
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

  ngOnInit(){
    console.log("ngOnInit()");
  }
  
    ngOnChanges(){
        console.log('constitutionProfile ngOnChanges() ');
    }
*/
  
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