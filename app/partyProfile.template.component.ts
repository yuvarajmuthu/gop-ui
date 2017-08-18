import { 
    Component, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy, 
    ViewChild, ViewContainerRef, 
    ComponentRef, DynamicComponentLoader, Type
} from '@angular/core';
import {NdvEditComponent} from './editableText.component';
import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';
import {PartyService} from './service/party.service';

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
        'partyProfileDefault': TemplatePartyDefaultComponent
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
    selector: 'party-default',
    directives: [NdvEditComponent],
    //providers:[DataShareService],
    template: `
         <div class="partyDefaultTemplate">
 
            <div id="name" class="constitutionHeader">
                  <h5>Party Name:</h5>
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'name'" [placeholder]="name" (onSave)="setValue($event)"></ndv-edit>
            </div>

            <div id="type" class="constitutionDescription">
                 <h5>Type:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'type'" [placeholder]="type" (onSave)="setValue($event)"></ndv-edit>                    
            </div>
            
            <div id="establishedDate" class="constitutionDescription">
                 <h5>Established Date:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'establishedDate'" [placeholder]="establishedDate" (onSave)="setValue($event)"></ndv-edit>                    
            </div>

            <div id="registeredAddress" class="constitutionDescription">
                 <h5>Address:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'registeredAddress'" [placeholder]="registeredAddress" (onSave)="setValue($event)"></ndv-edit>                    
            </div>

            <div id="ideology" class="constitutionDescription">
                 <h5>Ideology:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'ideology'" [placeholder]="ideology" (onSave)="setValue($event)"></ndv-edit>                    
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
export class TemplatePartyDefaultComponent extends AbstractTemplateComponent {
  partyId = "p001";
  id = "partyProfileDefault";
  name:string = "";//"Pennsylvania's 14th congressional district";
  type:string = "";//"Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";
  establishedDate:string = "";
  registeredAddress = "";
  ideology:string="";
  profileImage:string = "";

  data = {};
  private partyData = {};
  public profilesData = [];
  public profilesTemplates = [];
  private templateProperties = [];
  private templateData = [];

  constructor(private partyService:PartyService, private dataShareService:DataShareService, private missionService: MissionService) {
      super();

      missionService.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);

        this.saveProfile();
      });

      this.loadTemplateData();  



    }

    loadTemplateData(){
        this.partyService.getPartyData(this.partyId).subscribe(
          data => {
          this.partyData = data;
          console.log("Party data from service: ", this.partyData);

            //getting the available profile templates for this user type
            this.profilesTemplates = this.partyData['profile'];
            console.log("profile templates: ", this.profilesTemplates);
            for (let profileTemplates of this.profilesTemplates){
              console.log("reading template component properties: ", profileTemplates['profile_template_id']);

              if(this.id == profileTemplates['profile_template_id']){
                this.templateProperties = profileTemplates['properties'];
                break;  
              }
            }


            //getting the data for this party profile
            this.profilesData = this.partyData['profileData'];
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
      data["type"] = this.type;
      data["establishedDate"] = this.establishedDate;
      data["registeredAddress"] = this.registeredAddress;
      data["ideology"] = this.ideology;


      let dataString:string = JSON.stringify(data);
      console.log("TemplateIntroductionComponent data " + dataString);
      return dataString;
    }

    saveProfile(){
      this.data["profile_template_id"] = this.id;
      this.data["party_id"] = this.partyId;
      this.data["data"] = this.getData();

      console.log("Data " + JSON.stringify(this.data));

    }

}
