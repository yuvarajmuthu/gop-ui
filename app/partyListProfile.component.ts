import { Component, Input, OnInit } from '@angular/core';
import { Party } from './object/party';
import {BannerGPXComponent} from './banner.component';

@Component({
  selector: 'party-list-profile',
  template: `
    <div *ngIf="party" class="partyBoundary" (click)="clickme()">
      <div class="col-xs-2 smProfileImg">
        <banner-gpx [imageUrl]="imageName" [height]="50" [width]="50"></banner-gpx>
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
  directives: [BannerGPXComponent]
})
export class PartyListProfileComponentGPX implements OnInit{
  @Input() party: Party;
  imageName:String;

  ngOnInit(): void {
    this.imageName = '../../images/'+this.party.profileImage;
    console.log(this.imageName);
  }

  clickme():void{
    alert('clicked');
  }
}
