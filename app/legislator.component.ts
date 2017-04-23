import { Component, Input, OnInit } from '@angular/core';
import { Legislator } from './object/legislator';
import {BannerGPXComponent} from './banner.component';

@Component({
  selector: 'legislator',
  template: `
    <div *ngIf="legislator" class="partyBoundary" (click)="clickme()">
      <div class="col-xs10 shortProfileInfo">
        <ul style="list-style-type:none">
          <li>First Name: {{legislator.first_name}}</li>   
          <li>Last Name: {{legislator.last_name}}</li>
          <li>Chamber: {{legislator.chamber}}</li>
          <li>District: {{legislator.district}}</li>
          <li>Party: {{legislator.party}}</li>
          <li>State: {{legislator.state}}</li>
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
export class LegislatorComponentGPX implements OnInit{
  @Input() legislator: Legislator;
  imageName:String;

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    //console.log(this.imageName);
  }

  clickme():void{
    alert('clicked');
  }
}
