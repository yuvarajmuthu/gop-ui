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
import {DynamicContentComponent} from './userProfile.template.component';
//import { NdvEditComponent } from 'angular2-click-to-edit/components';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';
import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import {UserService} from './service/user.service';

@Component({
  selector: 'userProfile-gpx',
  templateUrl: 'app/view/userProfile.html',
  directives: [DynamicContentComponent, BannerGPXComponent, TAB_DIRECTIVES, DROPDOWN_DIRECTIVES, LegislatorComponentGPX, PeopleComponentGPX, CollapseDirective, RatingComponent, NdvEditComponent],
  providers:[LegislatorsService, PeopleService, PartyService, UserService, MissionService],
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

export class UserProfileGPX {
	public isCollapsed:boolean = false;
	public isCMCollapsed:boolean = false;
	public isPartiesCollapsed:boolean = false;

	public electedPersonsOld=[];
  public electedPersons:Array<Legislator>;
	public contestedPersons=[];
	public parties=[];
  templateType = [];
  private componentRef: ComponentRef<{}>;
  private userData = {};
  public profilesTemplates = [];
  public profilesData = [];
      //private populationComponent: TemplatePopulationComponent;

  constructor(private userService:UserService, private missionService: MissionService, private elementRef:ElementRef, private renderer: Renderer, private legislatorsService:LegislatorsService, private peopleService: PeopleService, private partyService: PartyService, private dataShareService:DataShareService) {  

    userService.getUserData('').subscribe(
        data => {
          this.userData = data;
          console.log("User data from service: ", this.userData);

          //getting the available profile templates for this user type - publicUser
          this.profilesTemplates = this.userData['profile'];
          console.log("profile templates: ", this.profilesTemplates);

          //getting the data for this user profile
          this.profilesData = this.userData['profileData'];
          console.log("profile data: ", this.profilesData);

          //identifying the profile selected for this user profile, so those components shall be loaded
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



  }


  saveProfile(){
      console.log("Saving Profile");
      this.missionService.announceMission("{'districtID':'d001'}");
      //console.log("printing female count " + this.populationComponent.femaleCount);
      //this.populationComponent.getData();  
    }



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


  
}