import { 
    Component, Input, OnChanges, OnInit, AfterViewInit, OnDestroy, 
    ViewChild, ViewContainerRef, 
    ComponentRef, DynamicComponentLoader, Type
} from '@angular/core';
import {NdvEditComponent} from './editableText.component';
import {DataShareService} from './service/dataShare.service';

@Component({
    selector: 'dynamic-content',
    //providers:[DataShareService],
    template: `
        <div>
            <div #container>
                <div class='row'>
                    <div class='col-xs-12'>
                      <h5>View Mode:</h5>
                      <select [ngModel]="getPermission()" (ngModelChange)="setPermission($event)">
                        <option>Editor</option>
                        <option>Viewer</option>
                      </select>
                    </div>
                </div>            
            </div>

            <div class="dropdown" *ngIf="allowed()">
              <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Dropdown Example
              <span class="caret"></span></button>
              <ul class="dropdown-menu">
                <li><a href="#">Intro Template</a></li>
                <li><a href="#">Business Template</a></li>
              </ul>
            </div>

            <div *ngIf="!allowed()">
                 <button type="button" class="btn btn-primary">Follow</button>
            </div>    

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

      getPermission():string{
                console.log("calling getter");
          let data = this.dataShareService.getPermission();
      console.log("getPermission() " + data);
      return data;
  }

  setPermission(data:string){
      console.log("calling setter");
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
        'districtBusinessTemplate': TemplateBusinessComponent
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
        console.log('template AfterViewInit ngOnChanges() ');
        this.loadComponentTemplate();
    }

  loadComponentTemplate() {
      //this.type = 'districtBusinessTemplate';
      console.log('in load template ' + this.type);
    if (this.type) {
      console.log('Dynamic template type ' + this.type);
      //Cleanup the old component
      //if (this.componentRef) {
       // this.componentRef.destroy();
     // }
      let component = this.mappings[this.type];
      console.log('Dynamic template component ' + component);
      this.loader.loadNextToLocation(component, this.viewContainerRef);
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
export class AbstractTemplateComponent {
    context: any;
/*
    constructor(private dataShareService:DataShareService) {

    }
*/
    saveMethod(obj) {
      console.log('trying to save'+ JSON.stringify(obj));
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
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'name'" [placeholder]="name" (onSave)="saveMethod($event)"></ndv-edit>
            </div>

            <div id="constitutionDescription" class="constitutionDescription">
                 <h5>Description:</h5>           
                 <ndv-edit [permission]="allowed()" [min]="2" [max]="50"  [title]="'description'" [placeholder]="description" (onSave)="saveMethod($event)"></ndv-edit>                    
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
  name:string = "Pennsylvania's 14th congressional district";
  description:string = "Pennsylvania's 14th congressional district includes the entire city of Pittsburgh and parts of surrounding suburbs. A variety of working class and majority black suburbs located to the east of the city are included, such as McKeesport and Wilkinsburg. Also a major part of the district are number of middle class suburbs that have historic Democratic roots, such as Pleasant Hills and Penn Hills. The seat has been held by Democrat Mike Doyle since 1995. In the 2006 election, he faced Green Party candidate Titus North and returned to the house with 90% of the vote.";

      constructor(private dataShareService:DataShareService) {
          super();
    }

    allowed():boolean{
        let permission:boolean = this.dataShareService.checkPermissions();
        console.log("allowed() - " + permission);

        return permission;
    }

}

@Component({
    selector: 'district-business',
    directives: [NdvEditComponent],    
    template: `<div>Dynamic Template - Business</div>`
})
export class TemplateBusinessComponent extends AbstractTemplateComponent {

}