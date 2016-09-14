import {Component} from '@angular/core';
import {BannerGPXComponent} from './banner.component';
import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';
import {PeopleService} from './service/people.service';
import {People} from './object/people';

@Component({
  selector: 'constitutionProfile-gpx',
  templateUrl: 'app/view/constitutionProfile.html',
  directives: [BannerGPXComponent, TAB_DIRECTIVES, People],
  providers:[PeopleService]
})

export class ConstitutionProfileGPX {
	
	public electedPersons=[];

	constructor(private peopleService: PeopleService) {  
		//this.getElectedMembers("state");
		this.electedPersons = peopleService.getElectedMembers('');
	}

	getElectedMembers(type:String){
		//this.electedPersons = this.peopleService.getElectedMembers(type);
		//return this.electedPersons;
	}

	saidHello($event){
    alert(`You said hello to ${$event}`)
  }
  
}