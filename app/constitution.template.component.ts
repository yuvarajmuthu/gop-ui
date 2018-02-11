import { 
    Component, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy, 
    ViewChild, ViewContainerRef, ViewRef,
    ComponentRef, TemplateRef, EmbeddedViewRef, DynamicComponentLoader, Type
} from '@angular/core';

//import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
//import { TabsetComponent } from 'ng2-bootstrap/components/tabs';
import {NdvEditComponent} from './editableText.component';

import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import {GroupService} from './service/group.service';
import {UserService} from './service/user.service';
import {ProfileService} from './service/profile.service';

@Component({
    selector: 'dynamic-content',
  //directives: [TemplatePopulationComponent],  
    //providers:[DataShareService],
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

    comp:any;
  
/*    @ViewChild(TemplatePopulationComponent)
    populationComponent: TemplatePopulationComponent;
  
    callChild(){
      console.log("calling child ");
      console.log("printing female count " + this.populationComponent.femaleCount);
      this.populationComponent.getData();  
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
        console.log("allowed() - " + permission);

        return permission;
    }

/*
  selected_permission = 'Editor';
  checkPermissions() {
      if(this.selected_permission == 'Editor') {
        return true;
      } 
      else {
        return false;
      }
    } 
    */

    private mappings = {
        'districtIntroTemplate': TemplateIntroductionComponent,
        'districtBusinessTemplate': TemplateBusinessComponent,
        'districtPopulationTemplate': TemplatePopulationComponent
    };

    private componentRef: ComponentRef<{}>;

    constructor(private missionService:MissionService, private loader:DynamicComponentLoader,
                  private viewContainerRef: ViewContainerRef, private dataShareService:DataShareService) {
        super();
        missionService.missionProfileTemplateRemoved$.subscribe(
        mission => {
          console.log("mission confirmed " + mission);
          console.log("this.viewContainerRef.length " + this.viewContainerRef.length);
          console.log("this.viewContainerRef.indexOf(mission) " + this.viewContainerRef.indexOf(mission));
          let index:number = this.viewContainerRef.indexOf(mission);
          this.viewContainerRef.remove(index);
          //this.viewContainerRef.remove(0);
        });
    }

    getComponentType(typeName: string) {
        let type = this.mappings[typeName];
        return type;
    }

    ngOnChanges(){
        console.log('constitution.template.component ngOnChanges() ');
        this.loadComponentTemplate();
    }
/*
  isPop(object: any): object is TemplatePopulationComponent {
      return true;
  }
*/

  loadComponentTemplate() {
    console.log('loadComponentTemplate() ' + this.type);
    let cRef:Promise<ComponentRef<any>>;
    if (this.type) {
      for(let compType of this.type){
        let component = this.mappings[compType];
        this.comp = component;
        cRef = this.loader.loadNextToLocation(component, this.viewContainerRef);
        cRef.then((cRef) => {
          let vRef:ViewRef = cRef.hostView;
          console.log("vRef " + vRef);
          this.dataShareService.setDistrictViews(this.comp, vRef);
        });
        //component.instance._ref = component;
        /*
        this.loader.loadNextToLocation(component, this.viewContainerRef).then(componentRef=> {
          if(this.isPop(component)){
            componentRef.instance.show = true;}
          });
        */
      }
      
    }

  }


}


/******/
abstract class AbstractTemplateComponent {
    context: any;
    public viewingDistrict={};
  public templateProperties = [];
  public templateData = [];

//  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(public dataShareService:DataShareService) {
    this.viewingDistrict = this.dataShareService.getViewingDistrict();
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

    loadTemplateData(id:string){

         //getting the available profile templates for this group type
            console.log("loadTemplateData() for template: " +  id);
            //TODO
            //call profile service to get the template data
            /*
      this.groupService.updateGroup(groupId, JSON.stringify(profileRequest))
      .subscribe((result) => {
        console.log("update group response " + result);
      });
      */

            for (let profileTemplate of this.viewingDistrict['profileTemplates']){
              console.log("reading profileTemplates properties: " + profileTemplate['profileTemplateId']);
              console.log("JSON.stringify(this.viewingDistrict['profileTemplates'])" + JSON.stringify(this.viewingDistrict['profileTemplates']));
              //this.templateType.push(profileData['profileTemplateId']);
              if(id == profileTemplate['profileTemplateId']){
                this.templateProperties = profileTemplate['properties'];
/*
                for (let property of this.templateProperties){
                  console.log("Template property name " + property);
                  this[property] = "";
                }
*/
                break;  
              }
            }


            //getting the data for this group profile
           if(this.viewingDistrict['profilesData']){ 
            for (let profileData of this.viewingDistrict['profilesData']){
              console.log("reading profileData properties: " +  profileData['profileTemplateId']);
              //this.templateType.push(profileData['profile_template_id']);
              if(id == profileData['profileTemplateId']){
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
    

    }

   
}

@Component({
    selector: 'district-intro',
    directives: [NdvEditComponent],
    providers:[UserService],
    template: `
  <div class="container">
  <header>

  </header>
  <main>
    <div class="row">
      <div class="left col-lg-10">
        <div class="photo-left">
           <div class="active"></div>
        </div>
        <h4 class="name">{{name}}</h4>
        <div class="stats row">
          <div class="stat col-xs-6" style="padding-right: 50px;">
            <p class="number-stat">3,619</p>
            <p class="desc-stat">Followers</p>
          </div>
          <div class="activityDiv stat col-xs-6" style="padding-left: 50px;" (click)="showActivities()">
            <p class="number-stat">38</p>
            <p class="desc-stat">Activities</p>
          </div>
        </div>
        <p class="desc">{{description}}</p>
      </div>

      <div class="right col-lg-2" *ngIf="!allowed()">

       <button *ngIf="!connected" type="button" class="btn btn-primary">Follow</button>
       <button *ngIf="connected" type="button" class="btn btn-success glyphicon glyphicon-ok">Following</button>       
        
      </div>
     </div> 
  </main>

</div>
    `,
  styles: [`
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

.container {
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
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

.active {
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
  .active {
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
  `]    
})

//DEPRECATED
export class TemplateIntroductionComponent extends AbstractTemplateComponent {

  groupId = "g0010";
  id:string = "districtIntroTemplate";
  //name:string = "";//"Pennsylvania's 14th congressional district";
  //description:string = "";//"Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";

  data = {};
  private groupData = {};
  public profilesData = [];
  public profilesTemplates = [];
  //private templateProperties = [];
  //private templateData = [];
  public connected:boolean = false;

  constructor(private userService:UserService, private profileService:ProfileService, private groupService:GroupService, private dataShareService1:DataShareService, private missionService: MissionService) {
      super(dataShareService1);

      missionService.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);

        this.saveProfile();
      });

      this.loadTemplateData(this.id);  
      this.connected = userService.getRelation(this.dataShareService.getCurrentUserId(), this.dataShareService.getCurrentDistrictId());



    }

    showActivities(){
      console.log("show activities ");  
    }

    allowed():boolean{
        let permission:boolean = this.dataShareService1.checkPermissions();
        //console.log("allowed() - " + permission);

        return permission;
    }

    getData():string{
      let data = {};
  /*    data["name"] = this.name;
      data["description"] = this.description;
*/
      let dataString:string = JSON.stringify(data);
      console.log("TemplateIntroductionComponent data " + dataString);
      return dataString;
    }

    saveProfile(){
/*      this.data["profile_template_id"] = this.id;
      this.data["group_id"] = this.groupId;
      this.data["data"] = this.getData();
*/
      console.log("Data " + JSON.stringify(this.data));

    }

}
/*******************BUSINESS*/
@Component({
    selector: 'district-business',
    directives: [NdvEditComponent],    
    template: `<div>Dynamic Template - Business</div>`
})
export class TemplateBusinessComponent extends AbstractTemplateComponent {


  id:string = "districtBusinessTemplate";
        constructor(private dataShareService2:DataShareService, private missionService: MissionService) {
          super(dataShareService2);

          missionService.missionAnnounced$.subscribe(
          mission => {
            console.log("Received save Profile message from parent for district " + mission);
            console.log("Data " + this.getData());
        });

          this.loadTemplateData(this.id);
    }


      getData():string{
        let data = {};
       
        let dataString:string = JSON.stringify(data);
        console.log("TemplateBusinessComponent data " + dataString);
        return dataString;
    }

}

/*******************POPULATION*/
@Component({
    selector: 'district-population',
    directives: [NdvEditComponent],
    providers:[ProfileService],
    template: `
<ng-template #tpl>
         <div class="container" *ngIf="show">
           <div>
             Population Template:
             <!--<button type="button" class="btn btn-success" (click)="saveTemplateData()">Save</button>-->
             <button type="button" *ngIf="allowed()" class="btn btn-danger glyphicon glyphicon-trash" (click)="removeTemplateData()">Remove</button>
           </div>
 
            <div>
                  <h5>Population:</h5>
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'population'" [placeholder]="population" (onSave)="setValue($event)"></ndv-edit>
            </div>

            <div>
                 <h5>Male:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'maleCount'" [placeholder]="maleCount" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
            <div>
                 <h5>Female:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'femaleCount'" [placeholder]="femaleCount" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
            <div>
                 <h5>Race:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'race'" [placeholder]="race" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
            <div>
                 <h5>Unemployment:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'unemployment'" [placeholder]="unemployment" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
            <div>
                 <h5>High School Graduation Rate:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'highSchoolGraduationRate'" [placeholder]="highSchoolGraduationRate" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
            <div>
                 <h5>College Graduation Rate:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'collegeGraduationRate'" [placeholder]="collegeGraduationRate" (onSave)="setValue($event)"></ndv-edit>                    
            </div>

          </div>  
          </ng-template>

      `,
  styles: [`
    .populationTemplate{
      border: 2px solid lightblue;    
      position: relative;
      padding: 1em;
      margin: 1em;

    }

 .container {
  max-width: 1250px;
  margin: 30px auto 30px;
  padding: 0 !important;
  width: 90%;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.10);
}
   
  `]    

})

export class TemplatePopulationComponent extends AbstractTemplateComponent implements AfterViewInit{
    obj:any=TemplatePopulationComponent;
    id:string = "districtPopulationTemplate";
  //population:string = "100000";
  //maleCount:string = "40000";
  //femaleCount:string = "55000";
  //othersCount:string = "5000";
  @Input() show:boolean = true;
  @Output() onAdd = new EventEmitter<TemplatePopulationComponent>();

    @ViewChild('tpl', { read: TemplateRef }) tpl: TemplateRef<any>;

view:EmbeddedViewRef<TemplatePopulationComponent>; 

  constructor(private viewContainerRef:ViewContainerRef, private profileService:ProfileService, private dataShareService3:DataShareService, private missionService: MissionService) {
      super(dataShareService3);

      missionService.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);
        //console.log("Data " + this.getData()); 
    });

    this.loadTemplateData(this.id);  

  }

    loadTemplateData(id:string){

         //getting the available profile templates for this group type
            console.log("loadTemplateData() for template: " +  id);
            //TODO
            //call profile service to get the template data
      this.profileService.getProfileTemplateData(id)
      .subscribe((result) => {
        console.log("profile template response " + result[0]);
        this.templateProperties = result[0]['properties'];

      });



            //getting the data for this group profile
           if(this.viewingDistrict['profilesData']){ 
            for (let profileData of this.viewingDistrict['profilesData']){
              console.log("reading profileData properties: " +  profileData['profileTemplateId']);
              //this.templateType.push(profileData['profile_template_id']);
              if(id == profileData['profileTemplateId']){
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
    

    }

//notify when templatepopulationcomponent is added, 
//so an instance would be added to constitutionProfile and would be used for saving the profile
ngAfterViewInit(){
  console.log("ngAfterViewInit() TemplatePopulationComponent");
  this.missionService.newProfileTemplateAddedMission(this);
  //this.view= this.tpl.createEmbeddedView(this.tpl);
  //this.view = this.tpl.createEmbeddedView(this.viewContainerRef);
        //this.view = this.viewContainerRef.createEmbeddedView(this.tpl);
    //this.tpl.createEmbeddedView('this is a embedded view')
//this.viewContainerRef.get()
}


    allowed():boolean{
        let permission:boolean = this.dataShareService3.checkPermissions();
        //console.log("allowed() - " + permission);

        return permission;
    }
    
    public getData():string{
      let data = {};
      var templateData = [];

      for (let key of this.templateProperties){
        let property = {};
        //console.log("Key " + key);
        if(this[key]){
          property[key] = this[key];
        }else{
          property[key] = '';          
        }
        templateData.push(property);        
      }

      data["profileTemplateId"] = this.id;      
      data["data"] = templateData;

      let dataString:string = JSON.stringify(data);
      console.log("TemplatePopulationComponent data " + JSON.stringify(dataString));
      return dataString;
    }

    removeTemplateData(){
      let vRef:ViewRef = this.dataShareService.getDistrictView(this.obj);
      this.missionService.removeProfileTemplateMission(vRef);
      this.missionService.newProfileTemplateAddedMission(null);
    }


}