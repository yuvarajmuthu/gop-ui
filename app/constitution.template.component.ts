import { 
    Component, EventEmitter, Input, Output, OnChanges, OnInit, AfterViewInit, OnDestroy, 
    ViewChild, ViewContainerRef, 
    ComponentRef, DynamicComponentLoader, Type
} from '@angular/core';
import {NdvEditComponent} from './editableText.component';
import {DataShareService} from './service/dataShare.service';
import { MissionService }     from './service/compCommunication.service';

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
    type: string = "";

    @Input()
    context: any;

    @Input()
    data:string;
  
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
  //object.show = true;
    return true;
}

  loadComponentTemplate() {
      //this.type = 'districtBusinessTemplate';
      //console.log('in load template ' + this.type);
    if (this.type) {
      //console.log('Dynamic template type ' + this.type);
      //Cleanup the old component
      //if (this.componentRef) {
       // this.componentRef.destroy();
     // }
      let component = this.mappings[this.type];
      /*
      console.log(this.isPop(component));
      if(this.isPop(component)){
        (<TemplatePopulationComponent>component)["show"]=true;
        console.log((<TemplatePopulationComponent>component).femaleCount); 
      }
      */
      //component.show = true;
      //console.log('Dynamic template component ' + component);
      this.loader.loadNextToLocation(component, this.viewContainerRef).then(componentRef=> {
        if(this.isPop(component)){
    componentRef.instance.show = true;}
  });
      /*
      this.loader.loadNextToLocation(component, this.viewContainerRef).then((ref:ComponentRef<Type>) => {
          if (this.data.input) {
              for (let key in this.data.input) {
                  ref.instance[key] = this.data.input[key];
              }
          }
          this.componentRef = ref;
          return ref;
      });
      */
      
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
    selector: 'district-intro',
    directives: [NdvEditComponent],
    //providers:[DataShareService],
    template: `
         <div class="districtTemplate">
 
            <div id="constitutionHeader" class="constitutionHeader">
                  <h5>District Name:</h5>
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'name'" [placeholder]="name" (onSave)="setValue($event)"></ndv-edit>
            </div>

            <div id="constitutionDescription" class="constitutionDescription">
                 <h5>Description:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'description'" [placeholder]="description" (onSave)="setValue($event)"></ndv-edit>                    
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
export class TemplateIntroductionComponent extends AbstractTemplateComponent {
  id = "districtIntroTemplate";
  name:string = "Pennsylvania's 14th congressional district";
  description:string = "Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";

  data = {};

      constructor(private dataShareService:DataShareService, private missionService: MissionService) {
          super();

          missionService.missionAnnounced$.subscribe(
          mission => {
            console.log("Received save Profile message from parent for district " + mission);

            this.saveProfile();
        });
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
      console.log("Data " + this.getData());
      this.data[this.id] = this.getData();
    }

}
/*******************BUSINESS*/
@Component({
    selector: 'district-business',
    directives: [NdvEditComponent],    
    template: `<div>Dynamic Template - Business</div>`
})
export class TemplateBusinessComponent extends AbstractTemplateComponent {

        constructor(private dataShareService:DataShareService, private missionService: MissionService) {
          super();

          missionService.missionAnnounced$.subscribe(
          mission => {
            console.log("Received save Profile message from parent for district " + mission);
            console.log("Data " + this.getData());
        });
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
    //providers:[DataShareService],
    template: `
         <div class="populationTemplate" *ngIf="show">
 
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
                 <h5>Others:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'othersCount'" [placeholder]="othersCount" (onSave)="setValue($event)"></ndv-edit>                    
            </div>

          </div>  
      `,
  styles: [`
    .populationTemplate{
      border: 2px solid lightblue;    
      position: relative;
      padding: 1em;
      margin: 1em;

    }
  `]    

})

export class TemplatePopulationComponent extends AbstractTemplateComponent implements AfterViewInit{
  population:string = "100000";
  maleCount:string = "40000";
  femaleCount:string = "55000";
  othersCount:string = "5000";
  @Input() show:boolean = false;
  @Output() onAdd = new EventEmitter<TemplatePopulationComponent>();

  constructor(private dataShareService:DataShareService, private missionService: MissionService) {
      super();

      missionService.missionAnnounced$.subscribe(
      mission => {
        console.log("Received save Profile message from parent for district " + mission);
        console.log("Data " + this.getData());
    });
  }


ngAfterViewInit(){
  console.log("emitting onAdd()");
  //this.onAdd.emit(this);

  //this.missionService.confirmMission(this.getData());
}

    allowed():boolean{
        let permission:boolean = this.dataShareService.checkPermissions();
        //console.log("allowed() - " + permission);

        return permission;
    }
    
    getData():string{
      let data = {};
      data["population"] = this.population;
      data["maleCount"] = this.maleCount;
      data["femaleCount"] = this.femaleCount;
      data["othersCount"] = this.othersCount;
      data["show"] = this.show;

      let dataString:string = JSON.stringify(data);
      console.log("TemplatePopulationComponent data " + dataString);
      return dataString;
    }
}