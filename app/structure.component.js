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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var StructureGPXComponent = (function () {
    function StructureGPXComponent(elementRef) {
        this.height = 500;
        this.width = 960;
        this.i = 0;
        this.e1 = elementRef;
        console.log('in construcor');
    }
    StructureGPXComponent.prototype.afterViewInit = function () {
        console.log('in afterViewInit');
        /*
    var graph:any = d3.select(this.e1.nativeElement);
    console.log(graph);
            this.svg = graph.append("svg")
                .attr("width", 960)
                .attr("height", 500)
                .append("g")
                .attr("transform", "translate(" + 120 + "," + 20 + ")");
    console.log('layout tree');
            this.tree = d3.layout.tree()
                          .size([500, 960]);
    console.log('svg diagonal');
             this.diagonal = d3.svg.diagonal()
                               .projection(function(d) { return [d.y, d.x]; });
    
                               // load the external data
            d3.json("treeData.json", function(error, treeData) {
              this.root = treeData[0];
              this.update(this.root);
            });
            */
    };
    StructureGPXComponent = __decorate([
        core_1.Component({
            selector: 'structure-gpx',
            template: '<h1>D3.js Integrated if background is yellow</h1>',
            providers: [core_1.ElementRef]
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], StructureGPXComponent);
    return StructureGPXComponent;
}());
exports.StructureGPXComponent = StructureGPXComponent;
//# sourceMappingURL=structure.component.js.map