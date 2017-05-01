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
  private legislature_by_zipcode_service_url_suffix = '&apikey=fd1d412896f54a8583fd039670983e59';

getLegislature(zipcode:string):Observable<any>{
    //return this.http.get('/app/data/json/legislators.json')
    return this.http.get(this.legislature_by_zipcode_service_url_prefix + zipcode + this.legislature_by_zipcode_service_url_suffix)
                  .map((response:Response) => response.json());
}



   getLegislatureByZipCode(zipcode:string) :any {
       //tmpLegislators:Legislator[];
       //tmpLegislator : Legislator;
         // ...using get request
         /*
         this.http.get('/app/data/json/legislators.json')
                  .map((res:R<>esponse) => res.json())
                  .subscribe(res => this.result,
                             function(response) { console.log("Success Response1 - " + this.result)},
                             function(    ) { console.log("the subscription is completed2" + this.result)});
*/
        console.log("i/p zipcode - " + zipcode);
        this.result = this.getLegislature(zipcode);
        console.log("Success Response1 - " + this.result);
                  return this.result;

     }
}
