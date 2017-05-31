import {Component} from '@angular/core';
import {BannerGPXComponent} from './banner.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {PeopleService} from './service/people.service';
import {PartyService} from './service/party.service';
import {PeopleComponentGPX} from './people.component';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';
import {RatingComponent} from 'ng2-bootstrap/components/rating';
import {NdvEditComponent} from './editableText.component';
import { LegislatorsService } from './service/legislators.service';
import {LegislatorComponentGPX} from './legislator.component';
import { Legislator } from './object/legislator';

//import { NdvEditComponent } from 'angular2-click-to-edit/components';

@Component({
  selector: 'constitutionProfile-gpx',
  templateUrl: 'app/view/constitutionProfile.html',
  directives: [BannerGPXComponent, TAB_DIRECTIVES, LegislatorComponentGPX, PeopleComponentGPX, CollapseDirective, RatingComponent, NdvEditComponent],
  providers:[LegislatorsService, PeopleService, PartyService],
  styles: [`
    .constitutionTop{
      padding: .1px 1.5em;
      background: #f5f2f0;
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    }
    
    .constitutionTop{
      padding-bottom: 5px;
    }

    .constitutionHeader,
    .constitutionDescription{
      border: 1px solid lightblue;
      border-radius: 5px;
    }

    .constitutionProfile .banner{
        max-width: 100%;
        height: auto;
        width:auto/9;
    }

    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .heroes {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;

    }
    .heroes li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      border-radius: 1px;
    }
    .heroes li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .heroes li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .heroes .text {
      position: relative;

    }
    .heroes .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `]
})

export class ConstitutionProfileGPX {
	public isCollapsed:boolean = false;
	public isCMCollapsed:boolean = false;
	public isPartiesCollapsed:boolean = false;

	public electedPersonsOld=[];
  public electedPersons:Array<Legislator>;
	public contestedPersons=[];
	public parties=[];
  name:string = 'Royapuram';
  description:string = 'Royapuram is a legislative assembly constituency, that includes the locality, Royapuram. Royapuram assembly constituency is part of Chennai North Parliamentary constituency.';
  
  selected_permission = 'Editor';
  checkPermissions() {
      if(this.selected_permission == 'Editor') {
        return true;
      } 
      else {
        return false;
      }
    }
	constructor(private legislatorsService:LegislatorsService, private peopleService: PeopleService, private partyService: PartyService) {  
		//this.getElectedMembers("state");
		this.electedPersonsOld = peopleService.getElectedMembers('');
		this.contestedPersons = peopleService.getContestedMembers('');
		this.parties = partyService.getPartiesByParam('');

    legislatorsService.getElectedMembers('').subscribe(res => {
      this.electedPersons = res;
      console.log("Elected persons " + this.electedPersons.length);
    });
	}

    saveMethod(obj) {
      console.log('trying to save'+ JSON.stringify(obj));
    }

	getElectedMembers(type:String){
		//this.electedPersons = this.peopleService.getElectedMembers(type);
		//return this.electedPersons;
	}

	saidHello($event){
	  alert(`You said hello to ${$event}`)
	}


  //START Ratings Component
  public x:number = 5;
  public y:number = 2;
  public max:number = 10;
  public rate:number = 7;
  public isReadonly:boolean = false;
 
  public overStar:number;
  public percent:number;
 
  public ratingStates:any = [
    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
    {stateOn: 'glyphicon-heart'},
    {stateOff: 'glyphicon-off'}
  ];
 
  public hoveringOver(value:number):void {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
  };
 
  public resetStar():void {
    this.overStar = void 0;
  }
  //END Ratings Component
  
}