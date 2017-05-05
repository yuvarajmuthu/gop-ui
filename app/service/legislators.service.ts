import { Injectable } from '@angular/core';
import { Legislator } from './../object/legislator';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LegislatorsService {

	constructor (private http: Http) {}
  
	resultOP:Observable<Legislator[]>;
  result:any; 
	private legislature_by_zipcode_service_url_prefix = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=';
  private legislature_service_url_prefix = 'https://congress.api.sunlightfoundation.com/legislators';//?bioguide_id=B001296&apikey=fd1d412896f54a8583fd039670983e59
  private legislature_service_url_suffix = '&apikey=fd1d412896f54a8583fd039670983e59';

/*
getLegislature(zipcode:string):Observable<any>{
    //return this.http.get('/app/data/json/legislators.json')
    return this.http.get(this.legislature_by_zipcode_service_url_prefix + zipcode + this.legislature_service_url_suffix)
                  .map((response:Response) => response.json());
}  
*/
getLegislature(searchParam:string, type:string):Observable<any>{
    //return this.http.get('/app/data/json/legislators.json')

    let url:string;
    if(type == 'zipcode'){
      url = this.legislature_service_url_prefix + '/locate?zip=' + searchParam + this.legislature_service_url_suffix;
    }
    else if(type == 'bioguide_id'){
      url = this.legislature_service_url_prefix + '?bioguide_id=' + searchParam + this.legislature_service_url_suffix;
    }

    console.log('getLegislature API - ' + url);  
    return this.http.get(url)
                  .map((response:Response) => response.json());
} 

}
