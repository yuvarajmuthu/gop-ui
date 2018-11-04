import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {DataShareService} from "./dataShare.service";

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {
  serviceUrl:string;// = "http://127.0.0.1:8080/profile/template";

  constructor (private http: Http, private dataShareService:DataShareService) {
    this.serviceUrl = dataShareService.getServiceUrl() + "/profile/template";
  }
  
  result:any; 
  resultop:any;

  getProfileTemplateData(profileTemplateId:String):Observable<any> {    
      let serviceUrl = this.serviceUrl + "/getProfileTemplate/" + profileTemplateId;
      console.log("getProfileTemplateData profile.service this.serviceUrl " + serviceUrl);
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options       = new RequestOptions({ headers: headers }); // Create a request option

      return this.http.get(serviceUrl, options) // ...using post request
                       .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                       .catch((error:any) => {
                         console.error('UI error handling' + JSON.stringify(error));
                         return Observable.throw(error.json().error || 'Server error')
                       });
    
  }


}
