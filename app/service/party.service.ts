import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams  } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {PARTIES} from './../data/mock/party-mock';
import { Party } from './../object/party';


@Injectable()
export class PartyService {

	constructor (private http: Http) {}

	getParties(): Party[]{
		return PARTIES;
	}

  getParty(partyId:string):Observable<any> { 
  	console.log("in PartyService getParty() partyId - " + partyId);
    return this.http.get('/app/data/json/party.json')
                             .map((response) => response.json());
  }

  getPartyData(type:String):Observable<any> { 
     return this.http.get('/app/data/json/fromService/party.json')
                             .map((response:Response) => response.json());
  }


    getPartiesByParam(type:string) { 
  	var parties = [
	  { id: 11, name: 'Mr. Nice', designation: 'President' },
	  { id: 12, name: 'Narco', designation: 'General Secretary' },
	  { id: 13, name: 'Bombasto', designation: 'Youth wing secretary' },
	  { id: 14, name: 'Celeritas', designation: 'Women wing secretary'},
	  { id: 15, name: 'Magneta', designation: 'Agricultural secretary' },
	  { id: 16, name: 'RubberMan', designation: 'Sport secretary' },
	  { id: 17, name: 'Dynama', designation: 'Health secretary' },
	  { id: 18, name: 'Dr IQ', designation: 'Finance secretary' },
	  { id: 19, name: 'Magma', designation: 'Telecom secretary' },
	  { id: 20, name: 'Tornado', designation: 'Village development secretary' }
	];

  	return parties;  
  }
}