import { 
    Component, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy, 
    ViewChild, ViewContainerRef, 
    ComponentRef, DynamicComponentLoader, Type
} from '@angular/core';
import { Router, RouteSegment } from "@angular/router";

import {NdvEditComponent} from './editableText.component';

import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import {UserService} from './service/user.service';
import { LegislatorsService } from './service/legislators.service';

import { Legislator } from './object/legislator';

/*COMPONENTS
<dynamic-content/>
<user-default-legis/>
<legis-congress/>
<legis-committee/>
*/

@Component({
    selector: 'dynamic-content',
    template: `
            <div #container>
            </div>
    `
})

export class DynamicContentComponent extends Type implements OnChanges {

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @Input()
    type= [];

    @Input()
    context: any;

    @Input()
    data:string;
  

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
        console.log("allowed() - " + permission);

        return permission;
    }

    //all the user profile templates should be mapped here
    private mappings = {
        'upCongressLegislatorDefault': TemplateLegisUserDefaultComponent,
        'upCongressLegislatorExternal': TemplateLegisCongressProfileComponent,
        'upCongressLegislatorCommitteeExternal': TemplateLegisCongressCommitteeComponent 
    };

    private componentRef: ComponentRef<{}>;

    constructor(private loader:DynamicComponentLoader,
                  private viewContainerRef: ViewContainerRef, private dataShareService:DataShareService) {
        super();
    }

    getComponentType(typeName: string) {
        let type = this.mappings[typeName];
        return type;
    }

    ngOnChanges(){
        console.log('userProfile.template.component ngOnChanges() ');
        this.loadComponentTemplate();
    }

  loadComponentTemplate() {

    console.log('in load template ' + this.type);
    if (this.type) {
      for(let compType of this.type){
        let component = this.mappings[compType];
        this.loader.loadNextToLocation(component, this.viewContainerRef);
        /*
        this.loader.loadNextToLocation(component, this.viewContainerRef).then(componentRef=> {
          if(this.isPop(component)){
            componentRef.instance.show = true;}
          });
        */
      }
      
    }

  }

/*  
  isPop(object: any): object is TemplatePopulationComponent {
      return true;
  }


*/

}


/******/
abstract class AbstractTemplateComponent {
  context: any;

  legisId:string = "";
  public profileUserId:string;
  public legislator: Legislator;
  public firstName:string;
  public lastName:string;
  public bioguideImageUrl:string;
  resultop:any;
  public keys = [];
  public displayProperties = [];
  public committeeKeys = [];
  public committees = [];
  public committeesLength:number = 0;
  public viewingUser={};

  constructor(private legislatorsService:LegislatorsService, private userService:UserService, private dataShareService:DataShareService, private missionService: MissionService) {
    this.viewingUser = this.dataShareService.getViewingUser();
    this.profileUserId = this.viewingUser['userId'];
    
    if(this.viewingUser['isLegislator']){
      this.loadLegislator();
    } 
  }
  
  getLegislator():Legislator{
    //this.loadLegislator();
    return this.legislator;
  }

  getKeys():Array<string>{
    return this.keys;
  }

  abstract getData():string;

    setValue(jsonData) {
        console.log(' saved! the obj  - ' + JSON.stringify(jsonData));
        for(var key in jsonData){
          if(jsonData.hasOwnProperty(key)){
            this[key] = jsonData[key];
            console.log('New value  - ' + key + " - " + this[key]);
          }
        }
    }

    loadLegislator(): void {
      console.log("loadLegislator() userProfile.template AbstractTemplateComponent");   
  

                    this.legislator = this.viewingUser['externalData'];
                    this.firstName = this.legislator.first_name;
                    this.lastName = this.legislator.last_name;
                  console.log("Loading: " + JSON.stringify(this.legislator));
               this.keys = Object.keys(this.legislator);
               console.log("keys " + this.keys);    

               this.bioguideImageUrl = this.legislator.photo_url;

         
    /*   
    if(this.viewingUser['userId']){  
      this.legisId = this.viewingUser['userId'];
        console.log("this.legisId " + this.legisId);

          this.legislatorsService.getLegislature(this.legisId, 'bioguide_id')
    .subscribe((result) => {
                this.legislator = result;
                this.firstName = this.legislator.first_name;
                this.lastName = this.legislator.last_name;
              console.log("Loading: " + this.legislator);
           this.keys = Object.keys(this.legislator);
           console.log("keys " + this.keys);    

           this.bioguideImageUrl = this.legislator.photo_url;
            });

          //getting the COMMITTEES
          /*
          this.legislatorsService.getCommittees(this.legisId)
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              console.log("Committees length " + result.length);
              if(result.length > 0){
                //this.legislator.committees = result;
                //this.legislator["committeeKeys"] = Object.keys(result[0]);
                this.committeeKeys = Object.keys(result[0]);
                this.committees = result;
                this.committeesLength = result.length;

                console.log("this.committeeKeys " + this.committeeKeys);
                console.log("this.committees " + this.committees);


              }
            });
    COMMENT HERE FOR COMMITTEES

    }
    */
  }
   
}

/***NEW COMPONENT***/
@Component({
    selector: 'user-default-legis',
    directives: [NdvEditComponent],    
    templateUrl: `/app/view/profileTemplates/userBannerTemplate.html`,
    styleUrls: [`../css/userBannerTemplate.css`]    
})
export class TemplateLegisUserDefaultComponent extends AbstractTemplateComponent implements OnInit{
  //userId = "u001";
  id = "upCongressLegislatorDefault";
  //firstName:string = "";
  //lastName:string = "";
  //userName:string = "";
  //emailId = "";
  //imageUrl:string = "https://unsplash.it/975/300";
  //profileImageUrl:string;
  //legislator: Legislator;

  data = {};
  private userData = {};
  public profilesData = [];
  public profilesTemplates = [];
  private templateProperties = [];
  private templateData = [];
  followers:number = 0;
  connections:number = 0;
  isCreateMode:boolean = false;

  following:boolean = false;
  requestedToFollow:boolean = false;
  followRequestRejected:boolean = false;

  ngOnInit(): void {
    console.log("ngOnInit() userProfile.template TemplateLegisUserDefaultComponent");   

    if(this.viewingUser['operation'] == "CREATE"){
      this.loadTemplate(this.viewingUser['operation']);      
      this.followers = 0;
      this.isCreateMode = true;
    }else{
      //LEGISLATORs
      if (this.viewingUser['isLegislator'] && this.viewingUser['externalData']){
        console.log("this.viewingUser['externalData']['id'] ", this.viewingUser['externalData']['id']);


      }else{//Users
        this.loadTemplateDataV1();
      }

      //get CONNECTIONS count
      if(this.viewingUser['connections']){
        this.connections = this.viewingUser['connections'].length;
      }

      this.getRelation("user", this.profileUserId);

      //get FOLLOWERS count
      if(this.viewingUser['followers']){
        this.followers = this.viewingUser['followers'].length;
      }
    } 
  }
    
  constructor(private legislatorsService1:LegislatorsService, private userService1:UserService, private dataShareService1:DataShareService, private missionService1: MissionService) {
      super(legislatorsService1, userService1, dataShareService1, missionService1);

      missionService1.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);

        this.saveProfile();
      });

      //this.loadTemplateData();  
      //this.firstName = 'first';//this.legislator.getFirstName();
      //this.lastName = 'last';//this.legislator.getLastName();

    //console.log("constructor() userProfile.template TemplateLegisUserDefaultComponent * " + legislator);   


    }

    getRelation(entity:string, profileId:string){
      this.requestedToFollow = false;
      this.following = false;
      this.followRequestRejected = false;
      var isProfileRelated = false;

      console.log("this.viewingUser['connections'].length ", this.viewingUser['connections'].length);

      this.viewingUser['connections'].forEach(connection => {
        if((entity === "user" && connection["users"]) ||
           (entity === "group" && connection["groups"]) ||
           (entity === "position" && connection["positions"])){

          let connectedEntities = null;
          if((entity === "user" && connection["users"])){
            connectedEntities = connection["users"];
           }else if((entity === "group" && connection["groups"])){
            connectedEntities = connection["groups"];
           }else if((entity === "position" && connection["positions"])){
            connectedEntities = connection["positions"];
           }
          
          connectedEntities.forEach(connectedEntity => {      
            if(connectedEntity["entityId"] === profileId){
              isProfileRelated = true;

              if(connectedEntity["connectionStatus"] == "REQUESTED"){
                this.requestedToFollow = true;
              }else if(connectedEntity["connectionStatus"] == "FOLLOWING"){
                this.following = true;
              }else if(connectedEntity["connectionStatus"] == "REJECTED"){
                this.followRequestRejected = true;
              }
  
            }

            if(isProfileRelated){
              //exit the for loop
            }
          });
          //exit the for loop
        }
      });
    }
    
    //load the TEMPLATE for CREATE process
    loadTemplate(operation:string){
      //getting the available profile templates for this user type
      this.profilesTemplates = this.viewingUser['profileTemplates'];
      console.log("loadTemplate()::userprofile.template - profile templates: ", this.profilesTemplates);
      for (let profileTemplates of this.profilesTemplates){
        console.log("loadTemplate()::userprofile.template - reading template component properties: ", profileTemplates['profile_template_id']);
        //this.templateType.push(profileData['profile_template_id']);
        if(this.id == profileTemplates['profile_template_id']){
          this.templateProperties = profileTemplates['properties'];
          break;  
        }
      }


      for (let property of this.templateProperties){
        console.log("loadTemplate()::userprofile.template - Template property " + property);
        this[property] = "TEST";
      }      
      /*
        this.userService1.getUserData(operation).subscribe(
          data => {
          this.userData = data;
          console.log("loadTemplate()::userprofile.template - User data from service: ", this.userData);


            //getting the available profile templates for this user type
            this.profilesTemplates = this.userData['profile'];
            console.log("loadTemplate()::userprofile.template - profile templates: ", this.profilesTemplates);
            for (let profileTemplates of this.profilesTemplates){
              console.log("loadTemplate()::userprofile.template - reading template component properties: ", profileTemplates['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileTemplates['profile_template_id']){
                this.templateProperties = profileTemplates['properties'];
                break;  
              }
            }


            for (let property of this.templateProperties){
              console.log("loadTemplate()::userprofile.template - Template property " + property);
              this[property] = "TEST";
            }

          }
      );
      */
    }

    loadTemplateDataV1(){
            for (let profileTemplate of this.viewingUser['profileTemplates']){
              console.log("reading template component properties: ", profileTemplate['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileTemplate['profile_template_id']){
                this.templateProperties = profileTemplate['properties'];
                break;  
              }
            }


            //getting the data for this user profile
            for (let profileData of this.viewingUser['profilesData']){
              console.log("loading template component: ", profileData['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileData['profile_template_id']){
                this.templateData = profileData['data'];
                break;  
              }
            }

            for (let dataObj of this.templateData){
              let keys = [];
              keys = Object.keys(dataObj);
              console.log("Template data keys " + keys[0] + ":" + dataObj[keys[0]]);
              //this[keys[0]] = dataObj[keys[0]];
              for (let key of keys){
                this[key] = dataObj[key];
              }
            }

    }

/*DEPRECATED - NOT BEING USED*/
    loadTemplateData(){
        this.userService1.getUserData(this.profileUserId, false).subscribe(
          data => {
          this.userData = data;
          console.log("User data from service: ", this.userData);


            //getting the available profile templates for this user type
            this.profilesTemplates = this.userData['profile'];
            console.log("profile templates: ", this.profilesTemplates);
            for (let profileTemplates of this.profilesTemplates){
              console.log("reading template component properties: ", profileTemplates['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileTemplates['profile_template_id']){
                this.templateProperties = profileTemplates['properties'];
                break;  
              }
            }


            //getting the data for this user profile
            this.profilesData = this.userData['profileData'];
            console.log("profile data: ", this.profilesData);

            for (let profileData of this.profilesData){
              console.log("loading template component: ", profileData['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileData['profile_template_id']){
                this.templateData = profileData['data'];
                break;  
              }
            }

            for (let dataObj of this.templateData){
              let keys = [];
              keys = Object.keys(dataObj);
              console.log("Template data keys " + keys[0] + ":" + dataObj[keys[0]]);
              this[keys[0]] = dataObj[keys[0]];
            }

          }
      );

    }

    followPerson(){

      var followURequest = {};      
      followURequest["userId"] = this.dataShareService1.getCurrentUserId();
      followURequest["connectionUserId"] = this.profileUserId;
      followURequest["status"] = "REQUESTED";            
      console.log("Profile data " + JSON.stringify(followURequest));      

      this.userService1.followPerson(JSON.stringify(followURequest))
      .subscribe(
        (result) => {
            console.log("followDistrict response " + result);

            if(result.status == "REQUESTED"){
              this.requestedToFollow = true;
            }else if(result.status == "FOLLOWING"){
              this.following = true;
            }else if(result.status == "REJECTED"){
              this.followRequestRejected = true;
            }

          },
        (err) => {
          console.log("Error ", err);
        });
    }

    allowed():boolean{
        let permission:boolean = this.dataShareService1.checkPermissions();
        //console.log("allowed() from userProfile.template TemplateLegisUserDefaultComponent - " + permission);

        return permission;
    }

    getData():string{
      let data = {};
      data["firstName"] = this.firstName;
      data["lastName"] = this.lastName;


      let dataString:string = JSON.stringify(data);
      console.log("TemplateIntroductionComponent data " + dataString);
      return dataString;
    }

    saveProfile(){
      this.data["profile_template_id"] = this.id;
      this.data["user_id"] = this.profileUserId;
      this.data["data"] = this.getData();

      console.log("Data " + JSON.stringify(this.data));

    }

}

/*NEW COMPONENT*/
/*Legislator C001070*/
@Component({
    selector: 'legis-congress',
    directives: [NdvEditComponent],
    //providers:[DataShareService],
    templateUrl: `/app/view/profileTemplates/userLegisSummaryTemplate.html`,
    styleUrls: [`../css/userLegisSummaryTemplate.css`]
})

export class TemplateLegisCongressProfileComponent extends AbstractTemplateComponent  implements OnInit{
  //userId = "u001";
  //legisId:string = "";

  id = "upCongressLegislatorExternal";
  firstName:string = "";//"Pennsylvania's 14th congressional district";
  lastName:string = "";//"Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";
  userName:string = "";
  emailId = "";
  imageUrl:string = "";

  data = {};
  private userData = {};
  public profilesData = [];
  public profilesTemplates = [];
  private templateProperties = [];
  private templateData = [];

  //legislator: Legislator;
  //resultop:any;
  //keys = [];

//called after the constructor
  ngOnInit(): void {
    console.log("ngOnInit() userProfile.template TemplateLegisCongressProfileComponent");   
    //this.legislator = this.getLegislator();
    //console.log("this.legislator " + this.legislator);  

    //this.keys = this.getKeys();
    //console.log("this.keys " + this.keys);  

/*
   
    if(this.dataShareService2.getSelectedLegislatorId()){  
      this.legisId = this.dataShareService2.getSelectedLegislatorId();
        console.log("this.legisId " + this.legisId);


          this.legislatorsService2.getLegislature(this.legisId, 'bioguide_id')
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              if(result.length > 0){
                this.legislator = result[0];
              }
              console.log("Loading: " + this.legislator);
           this.keys = Object.keys(this.legislator);
           console.log("keys " + this.keys);    

           console.log("this.legislator.bioguide_id " + this.legislator.bioguide_id);
           //retrieving the image from bioguide
           if(this.legislator.bioguide_id){
              let intial = this.legislator.bioguide_id.charAt(0);
              let imageUrl = 'http://bioguide.congress.gov/bioguide/photo/' + intial + '/' + this.legislator.bioguide_id + '.jpg';
              console.log("bioguide image url " + imageUrl);
              this.legislator.bioguideImageUrl = imageUrl;
           }
            });


    }
    */
  }

//called before ngOnInit()
  constructor(private legislatorsService2:LegislatorsService, private userService2:UserService, private dataShareService2:DataShareService, private missionService2: MissionService) {

      super(legislatorsService2, userService2, dataShareService2, missionService2);

      console.log("constructor() userProfile.template");      

      missionService2.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);

        this.saveProfile();
      });

      //this.loadTemplateData();  
      //OVERRIDE KEYS - CUSTOMIZED DISPLAY
      this.loadDisplayProperties();


    }
    
    loadDisplayProperties(){
      for (let profileTemplates of this.viewingUser['profileTemplates']){
        //console.log("reading template component properties: ", profileTemplates['profile_template_id']);
        //this.templateType.push(profileData['profile_template_id']);
        if(this.id == profileTemplates['profile_template_id']){
          this.displayProperties = profileTemplates['properties'];
          break;  
        }
      }

    }

    loadTemplateData(){
        this.userService2.getUserData(this.profileUserId, true).subscribe(
          data => {
          this.userData = data;
          console.log("User data from service: ", this.userData);


            //getting the available profile templates for this user type
            this.profilesTemplates = this.userData['profile'];
            console.log("profile templates: ", this.profilesTemplates);
            for (let profileTemplates of this.profilesTemplates){
              console.log("reading template component properties: ", profileTemplates['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileTemplates['profile_template_id']){
                this.templateProperties = profileTemplates['properties'];
                break;  
              }
            }


            //getting the data for this user profile
            this.profilesData = this.userData['profileData'];
            console.log("profile data: ", this.profilesData);

            for (let profileData of this.profilesData){
              console.log("loading template component: ", profileData['profile_template_id']);
              //this.templateType.push(profileData['profile_template_id']);
              if(this.id == profileData['profile_template_id']){
                this.templateData = profileData['data'];
                break;  
              }
            }

            for (let dataObj of this.templateData){
              let keys = [];
              keys = Object.keys(dataObj);
              console.log("Template data keys " + keys[0] + ":" + dataObj[keys[0]]);
              this[keys[0]] = dataObj[keys[0]];
            }

          }
      );

    }

    allowed():boolean{
        let permission:boolean = this.dataShareService2.checkPermissions();
        //console.log("allowed() - " + permission);

        return permission;
    }

    getData():string{
      let data = {};
      data["firstName"] = this.firstName;
      data["lastName"] = this.lastName;


      let dataString:string = JSON.stringify(data);
      console.log("TemplateIntroductionComponent data " + dataString);
      return dataString;
    }

    saveProfile(){
      this.data["profile_template_id"] = this.id;
      this.data["user_id"] = this.profileUserId;
      this.data["data"] = this.getData();

      console.log("Data " + JSON.stringify(this.data));

    }

}

/* NEW COMPONENT */
/* Legislator L000551 */
@Component({
    selector: 'legis-committee',
    templateUrl: `/app/view/profileTemplates/userLegisCommitteeTemplate.html`,
    styleUrls: [`../css/userLegisCommitteeTemplate.css`]    
})

export class TemplateLegisCongressCommitteeComponent extends AbstractTemplateComponent  implements OnInit{
  //userId = "u001";
  //legisId:string = "";

  id = "upCongressLegislatorCommitteeExternal";
  firstName:string = "";//"Pennsylvania's 14th congressional district";
  lastName:string = "";//"Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";
  userName:string = "";
  emailId = "";
  imageUrl:string = "";

  data = {};
  private userData = {};
  public profilesData = [];
  public profilesTemplates = [];
  private templateProperties = [];
  private templateData = [];


//called after the constructor
  ngOnInit(): void {
    console.log("ngOnInit() userProfile.template TemplateLegisCongressCommitteeComponent");   
  }

//called before ngOnInit()
  constructor(private legislatorsService2:LegislatorsService, private userService2:UserService, private dataShareService2:DataShareService, private missionService2: MissionService) {

      super(legislatorsService2, userService2, dataShareService2, missionService2);

      console.log("constructor() userProfile.template");      

      missionService2.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);

        this.saveProfile();
      });

      //this.loadTemplateData();  



    }

    loadTemplateData(){


    }

    allowed():boolean{
        let permission:boolean = this.dataShareService2.checkPermissions();
        //console.log("allowed() - " + permission);

        return permission;
    }

    getData():string{
      let data = {};


      let dataString:string = JSON.stringify(data);
      console.log("TemplateIntroductionComponent data " + dataString);
      return dataString;
    }

    saveProfile(){
      this.data["profile_template_id"] = this.id;

      console.log("Data " + JSON.stringify(this.data));

    }

}