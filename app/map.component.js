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
//import {GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle } from 'angular2-google-maps/core';
var core_2 = require('angular2-google-maps/core');
var MapGPXComponent = (function () {
    function MapGPXComponent() {
        this.lat = 40.4415151;
        this.lng = -79.9967547;
        this.zoom = 17;
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
                label: 'A',
                draggable: true
            },
            {
                lat: 51.373858,
                lng: 7.215982,
                label: 'B',
                draggable: false
            },
            {
                lat: 51.723858,
                lng: 7.895982,
                label: 'C',
                draggable: true
            },
            {
                lat: 40.441280,
                lng: -80.000041,
                label: 'D',
                draggable: true
            }
        ];
    }
    MapGPXComponent.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker: " + (label || index));
    };
    MapGPXComponent.prototype.mapClicked = function ($event) {
        //this.markers.push({
        //  lat: $event.coords.lat,
        //  lng: $event.coords.lng
        //});
    };
    MapGPXComponent.prototype.markerDragEnd = function (m, $event) {
        console.log('dragEnd', m, $event);
    };
    MapGPXComponent = __decorate([
        core_1.Component({
            selector: 'map-gpx',
            //directives: [GOOGLE_MAPS_DIRECTIVES, SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapInfoWindow, SebmGoogleMapCircle ],
            directives: [core_2.GOOGLE_MAPS_DIRECTIVES, core_2.SebmGoogleMap, core_2.SebmGoogleMapMarker, core_2.SebmGoogleMapInfoWindow],
            templateUrl: 'app/view/map.html',
            styles: ["\n.sebm-google-map-container {\nheight: 400px;\n}"]
        }), 
        __metadata('design:paramtypes', [])
    ], MapGPXComponent);
    return MapGPXComponent;
}());
exports.MapGPXComponent = MapGPXComponent;
//bootstrap(MapGPXComponent, [GOOGLE_MAPS_PROVIDERS]); 
//# sourceMappingURL=map.component.js.map