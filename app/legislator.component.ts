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

    .legisProfileImg{ 
      float:left;
    }
    .legisProfileData{
      display:inline-block;
    }


.snip1344 {
  font-family: 'Open Sans', Arial, sans-serif;
  position: relative;
  float: left;
  overflow: hidden;
  margin: 10px 1%;
  min-width: 230px;
  max-width: 315px;
  width: 100%;
  color: #ffffff;
  text-align: center;
  line-height: 1.4em;
  background-color: #141414;
}
.snip1344 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.snip1344 .background {
  width: 100%;
  vertical-align: top;
  opacity: 0.2;
  -webkit-filter: grayscale(100%) blur(10px);
  filter: grayscale(100%) blur(10px);
  -webkit-transition: all 2s ease;
  transition: all 2s ease;
}
.snip1344 figcaption {
  width: 100%;
  padding: 15px 25px;
  position: absolute;
  left: 0;
  top: 50%;
}
.snip1344 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;
  max-width: 100px;
  opacity: 1;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
.snip1344 h3 {
  margin: 0 0 5px;
  font-weight: 400;
}
.snip1344 h3 span {
  display: block;
  font-size: 0.6em;
  color: #f39c12;
  opacity: 0.75;
}
.snip1344 i {
  padding: 10px 5px;
  display: inline-block;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  opacity: 0.65;
}
.snip1344 a {
  text-decoration: none;
}
.snip1344 i:hover {
  opacity: 1;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.snip1344:hover .background,
.snip1344.hover .background {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
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

           //console.log("this.legislator.bioguide_id " + this.legislator.bioguide_id);
           //retrieving the image from bioguide
           /*
           if(this.legislator.bioguide_id){
              let intial = this.legislator.bioguide_id.charAt(0);
              let imageUrl = 'http://bioguide.congress.gov/bioguide/photo/' + intial + '/' + this.legislator.bioguide_id + '.jpg';
              console.log("bioguide image url " + imageUrl);
              this.legislator.bioguideImageUrl = imageUrl;
           }
           */
            });


    }else if(this.legislator){
      this.keys = Object.keys(this.legislator);
      console.log("keys " + this.keys);
      //console.log("this.legislator.bioguideImageUrl " + this.legislator.bioguideImageUrl);
    }


  }

  //get invoked automatically before ngOnInit()
  routerOnActivate(curr: RouteSegment): void {
    this.legisId = curr.getParam("id");
    console.log("Param value - id " + this.legisId);
  }

  gotoLegislator(legislator: Legislator):void{
    console.log('selected legislator - ' +  legislator);    
    this.router.navigate(['/user', legislator.leg_id]);
  }

}
