import { Component, Input, OnInit } from '@angular/core';
import { Router, RouteSegment } from "@angular/router";
import { Party } from './object/party';
import {BannerGPXComponent} from './banner.component';
import {PartyService} from './service/party.service';

@Component({
  selector: 'party-list-profile',
  template: `
    <div *ngIf="party" class="partyBoundary" (click)="gotoParty(party)">
      <div class="col-xs-2 smProfileImg">
        <banner-gpx [imageUrl]="profileImage" [height]="50" [width]="50"></banner-gpx>
      </div>
      <div class="col-xs10 shortProfileInfo">
        <ul style="list-style-type:none">
          <li>Name: {{party.name}}</li>   
          <li>Type: {{party.type}}</li>
          <li>Established Date: {{party.establishedDate}}</li>
          <li>Registered Address: {{party.registeredAddress}}</li>
          <li>Ideology: {{party.ideology}}</li>
        </ul>
      </div>
  </div>
  `,
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
  directives: [BannerGPXComponent],
  providers:[PartyService]
})
export class PartyListProfileComponentGPX implements OnInit{
  @Input() party: Party;
  profileImage:String;
  partyId:string;
  results = [];
  constructor(private  router: Router, private partyService:PartyService) {
  }


  ngOnInit(): void {
    if(this.partyId){
      console.log("Loading thru routing");
     this.partyService.getParty(this.partyId)
    .map(result => result.results)
    .subscribe((result) => {
              console.log("found parties of length: " + result.length);

              for (var i = 0; i < result.length; ++i) {
                let party = result[i];
                 console.log("party " + JSON.stringify(result[i]));
                 console.log("party: party.partyId " + party.partyId + ", this.partyId " + this.partyId);
                 if(party.partyId == this.partyId){
                  this.party = party;
                  this.profileImage = '../../images/' + this.party.profileImage;
                  break;
                }
              }

           
              //this.success.emit({legislators : this.legislators});
            });

    }else{  
      console.log("Loading thur Non routing");
      this.profileImage = '../../images/'+this.party.profileImage;
  
    }
  }

  //get invoked automatically before ngOnInit()
  routerOnActivate(curr: RouteSegment): void {
    this.partyId = curr.getParam("id");
    console.log("Param value - id " + this.partyId);
  }

  gotoParty(party: Party):void{

    console.log('selected Party - ' +  party);    

    this.router.navigate(['/party', party.id]);

  }
}
