"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var typeahead_component_1 = require('./typeahead.component');
var tabs_1 = require('ng2-bootstrap/components/tabs');
var map_component_1 = require('./map.component');
var orgprofile_component_1 = require('./orgprofile.component');
var structure_component_1 = require('./structure.component');
//import {TestComponent} from './test.component';
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            directives: [typeahead_component_1.TypeaheadGPXComponent, tabs_1.TAB_DIRECTIVES, map_component_1.MapGPXComponent, orgprofile_component_1.OrgProfileGPXComponent, structure_component_1.StructureGPXComponent],
            templateUrl: 'app/view/baseContainer.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map