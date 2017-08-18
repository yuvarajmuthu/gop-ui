import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { LegislatorsService } from './service/legislators.service';
import { Legislator } from './object/legislator';
import {LegislatorComponentGPX} from './legislator.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";

@Component({
  selector: 'search-legislator',
  directives:[LegislatorComponentGPX],
  templateUrl: 'app/view/searchLegis.html',
  styles: [`
   .legisBoundary{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 10px;
    }

    .legisBoundary:hover{
      border: 2px solid lightblue;
    }

    .searchLegisBox{
      width: 130px;
      -webkit-transition: width 0.4s ease-in-out;
      transition: width 0.4s ease-in-out;
    }

    .searchTip{
      float: right;
      position:relative;
      padding: 1em;
      margin: 1em;

    }

    `]
})
export class SearchLegislatorComponentGPX implements OnInit {
  legislators: Array<Legislator> = [];
  resultop:any;
  ipZipcode:String = '';
  currentLocationZip = '19406';
  public selectedlegislator: Legislator;
  latitude:any;
  longitude:any;

  @Output()
  success = new EventEmitter();
  
  constructor(private  router: Router, private legislatorsService: LegislatorsService) {
    //this.legislators = [];
    //this.getLegislators(this.currentLocationZip, 'zipcode');
    //console.log("constructor()");
    this.getCongressLegislatorsByLatLong();
    //console.log("current position latitude " + this.latitude + ',longitude ' + this.longitude);  
    //this.getLegislators(this.latitude+','+this.longitude, 'latlong');
  }

  ngOnInit(){
    //console.log("ngOnInit - finding current position");
    //this.setCurrentPosition();
  }

  private getCongressLegislatorsByLatLong() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        console.log("current position latitude " + this.latitude + ',longitude ' + this.longitude);
        this.getLegislators(this.latitude+','+this.longitude, 'latlong');
      });
  }

  search(query: string) {
    console.log("Search value: " + query);
    this.currentLocationZip = query;
    this.legislators = [];
    this.getLegislators(query, 'zipcode');
  }

  
  getLegislators(searchParam:string, type:string) {
    this.legislatorsService.getLegislature(searchParam, type)
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              for(var i = 0;i<result.length;i++) {

           //retrieving the image from bioguide
              if(result[i].bioguide_id){
                let intial = result[i].bioguide_id.charAt(0);
                let imageUrl = 'http://bioguide.congress.gov/bioguide/photo/' + intial + '/' + result[i].bioguide_id + '.jpg';
                console.log("bioguide image url " + imageUrl);
                result[i].bioguideImageUrl = imageUrl;
              }

               this.legislators.push(result[i]);
              }
              console.log("Emitting: " + this.legislators);
           
              //this.success.emit({legislators : this.legislators});
            });

    //console.log(this.legislators.length + ' legislators');
  }
/*
  gotoLegislator(legislator: Legislator):void{
    this.selectedlegislator = legislator;

    console.log('selected item - ' +  this.selectedlegislator);    
    console.log('bioguide_id of selected item - ' +  this.selectedlegislator.bioguide_id);

    this.router.navigate(['/legislator', this.selectedlegislator.bioguide_id]);
  }
  */
}