import { Component, Input, OnInit } from '@angular/core';
import { Legislator } from './object/legislator';
import { LegislatorsService } from './service/legislators.service';
import {BannerGPXComponent} from './banner.component';
import { Router, RouteSegment } from "@angular/router";

@Component({
  selector: 'legislator',
  templateUrl: 'app/view/legislatorProfile.html',
  styles: [`
   .partyBoundary{
      border: 1px solid lightblue;
      border-radius: 5px;
      margin: 10px;
    }

    .partyBoundary:hover{
      border: 2px solid lightblue;
    }

    .shortProfileInfo li{
      border: 1px dotted lightblue; 
    }

    .smProfileImg{
      max-width: 100%;
      height: auto;
    }


    `],
  directives: [BannerGPXComponent]
})
export class LegislatorComponentGPX implements OnInit{
  @Input() legislator: Legislator;
  imageName:string;
  legisID:string;
  resultop:any;

  
  constructor(private legislatorsService: LegislatorsService) {
  }

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    console.log("ngOnInit()");
    if (!this.legislator) {
      //let id = +this._routeParams.get('id');
      //this._heroService.getHero(id).then(legislator => this.legislator = legislator);

          this.legislatorsService.getLegislature(this.legisID, 'bioguide_id')
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              if(result.length > 0){
                this.legislator = result[0];
              }
              console.log("Loading: " + this.legislator);
           
              //this.success.emit({legislators : this.legislators});
            });


    }

  }

  //get invoked automatically before ngOnInit()
  routerOnActivate(curr: RouteSegment): void {
    this.legisID = curr.getParam("id");
    console.log("Param value - id " + this.legisID);
  }


}
