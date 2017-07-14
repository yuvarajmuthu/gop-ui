import { 
    Component, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy, 
    ViewChild, ViewContainerRef, 
    ComponentRef, DynamicComponentLoader, Type
} from '@angular/core';
import {NdvEditComponent} from './editableText.component';
import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import {UserService} from './service/user.service';

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


    private mappings = {
        'upDefault': TemplateUserDefaultComponent
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
        console.log('constitution.template.component ngOnChanges() ');
        this.loadComponentTemplate();
    }

  isPop(object: any): object is TemplatePopulationComponent {
      return true;
  }

  loadComponentTemplate() {
    /*
    console.log('in load template ' + this.type);
    if (this.type) {

      let component = this.mappings[this.type];

      this.loader.loadNextToLocation(component, this.viewContainerRef).then(componentRef=> {
        if(this.isPop(component)){
          componentRef.instance.show = true;}
        });

      
    }
    */
    console.log('in load template ' + this.type);
    if (this.type) {
      for(let compType of this.type){
        let component = this.mappings[compType];

        this.loader.loadNextToLocation(component, this.viewContainerRef).then(componentRef=> {
          if(this.isPop(component)){
            componentRef.instance.show = true;}
          });
      }
      
    }

  }


}


/******/
abstract class AbstractTemplateComponent {
    context: any;
/*
    constructor(private dataShareService:DataShareService) {

    }
*/
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
   
}

@Component({
    selector: 'user-default',
    directives: [NdvEditComponent],
    //providers:[DataShareService],
    template: `
         <div class="districtTemplate">
 
            <div id="constitutionHeader" class="constitutionHeader">
                  <h5>First Name:</h5>
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'firstName'" [placeholder]="firstName" (onSave)="setValue($event)"></ndv-edit>
            </div>

            <div id="constitutionDescription" class="constitutionDescription">
                 <h5>Last Name:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'lastName'" [placeholder]="lastName" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
          </div>  
    `,
  styles: [`
    .districtTemplate{
      border: 2px solid lightblue;    
      position: relative;
      padding: 1em;
      margin: 1em;

    }
  `]    
})
export class TemplateUserDefaultComponent extends AbstractTemplateComponent {
  userId = "u001";
  id = "upDefault";
  firstName:string = "";//"Pennsylvania's 14th congressional district";
  lastName:string = "";//"Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";
  imageUrl:string = "";

  data = {};
  private userData = {};
  public profilesData = [];
  public profilesTemplates = [];
  private templateProperties = [];
  private templateData = [];

  constructor(private userService:UserService, private dataShareService:DataShareService, private missionService: MissionService) {
      super();

      missionService.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);

        this.saveProfile();
      });

      this.loadTemplateData();  



    }

    loadTemplateData(){
        this.userService.getUserData(this.userId).subscribe(
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
        let permission:boolean = this.dataShareService.checkPermissions();
        //console.log("allowed() - " + permission);

        return permission;
    }

    getData():string{
      let data = {};
      data["name"] = this.name;
      data["description"] = this.description;

      let dataString:string = JSON.stringify(data);
      console.log("TemplateIntroductionComponent data " + dataString);
      return dataString;
    }

    saveProfile(){
      this.data["profile_template_id"] = this.id;
      this.data["user_id"] = this.userId;
      this.data["data"] = this.getData();

      console.log("Data " + JSON.stringify(this.data));

    }

}
