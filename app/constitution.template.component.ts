import { 
    Component, Input, OnInit, OnDestroy, 
    ViewChild, ViewContainerRef, 
    ComponentRef, ComponentResolver
} from '@angular/core';
import {NdvEditComponent} from './editableText.component';


@Component({
    selector: 'dynamic-content',
    template: `
        <div>
            <div #container></div>
        </div>
    `
})
export class DynamicContentComponent implements OnInit, OnDestroy {

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    @Input()
    type: string;

    @Input()
    context: any;

    private mappings = {
        'sample1': TemplateIntroductionComponent,
        'sample2': TemplateBusinessComponent
    };

    private componentRef: ComponentRef<{}>;

    constructor(
        private componentResolver: ComponentResolver) {
    }

    getComponentType(typeName: string) {
        let type = this.mappings[typeName];
        return type;
    }

    ngOnInit() {
        if (this.type) {
            let componentType = this.getComponentType(this.type);
            
            // note: componentType must be declared within module.entryComponents
            let factory = this.componentResolver.resolveComponent(componentType);
            //this.componentRef = this.container.createComponent(factory);

            // set component context
            //let instance = <DynamicComponent> this.componentRef.instance;
            //instance.context = this.context;
        }
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }

}


/******/
export abstract class AbstractTemplateComponent {
    context: any;
}

@Component({
    selector: 'district-intro',
    directives: [NdvEditComponent],
    template: `<div>Dynamic sample 1 ({{context?.text}})</div>`
})
export class TemplateIntroductionComponent extends AbstractTemplateComponent {}

@Component({
    selector: 'district-business',
    directives: [NdvEditComponent],    
    template: `<div>Dynamic sample 2 ({{context?.text}})</div>`
})
export class TemplateBusinessComponent extends AbstractTemplateComponent {}