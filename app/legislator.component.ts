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
  @Input() legisId:string;
  resultop:any;
  keys = [];

  
  constructor(private  router: Router, private legislatorsService: LegislatorsService) {
  }

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    console.log("ngOnInit() legislator " + this.legisId);
    //if (!this.legislator) {
    if(this.legisId){  
        console.log("this.legisId " + this.legisId);
      //let id = +this._routeParams.get('id');
      //this._heroService.getHero(id).then(legislator => this.legislator = legislator);

          this.legislatorsService.getLegislature(this.legisId, 'bioguide_id')
    .map(result => this.resultop = result.results)
    .subscribe((result) => {
              if(result.length > 0){
                this.legislator = result[0];
              }
              console.log("Loading: " + this.legislator);
           this.keys = Object.keys(this.legislator);
           console.log("keys " + this.keys);    

           console.log("this.legislator.bioguide_id " + this.legislator.bioguide_id);
           //retrieving the image from bioguide
           if(this.legislator.bioguide_id){
              let intial = this.legislator.bioguide_id.charAt(0);
              let imageUrl = 'http://bioguide.congress.gov/bioguide/photo/' + intial + '/' + this.legislator.bioguide_id + '.jpg';
              console.log("bioguide image url " + imageUrl);
              this.legislator.bioguideImageUrl = imageUrl;
           }
            });


    }else if(this.legislator){
      this.keys = Object.keys(this.legislator);
      console.log("keys " + this.keys);
      console.log("this.legislator.bioguideImageUrl " + this.legislator.bioguideImageUrl);
    }


  }

  //get invoked automatically before ngOnInit()
  routerOnActivate(curr: RouteSegment): void {
    this.legisId = curr.getParam("id");
    console.log("Param value - id " + this.legisId);
  }

  gotoLegislator(legislator: Legislator):void{
    //this.selectedlegislator = legislator;

    console.log('selected legislator - ' +  legislator);    
    console.log('bioguide_id of selected item - ' +  legislator.bioguide_id);

    this.router.navigate(['/legislator', legislator.bioguide_id]);
  }

}
