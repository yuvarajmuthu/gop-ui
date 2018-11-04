import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams,RequestOptionsArgs } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {DataShareService} from "./dataShare.service";

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  serviceUrl:string;// = "http://127.0.0.1:8080/api/social";

	constructor (private http: Http, private dataShareService:DataShareService) {
    this.serviceUrl = dataShareService.getServiceUrl() + "/api/social";
  }
  
  result:any; 
  resultop:any;

  getUserData(userId:String):Observable<any> { 
    /*
    let groupData = this.http.get('/app/data/json/fromService/group.json')
                             .map((response:Response) => response.json());
    console.log("group data " + groupData);
    return groupData;
*/
    let url:string;
    
    //bioguideId is of length 7 - sunfoundataion
    //if(userId.length == 7){

    //legis represent legislator      
    if(userId == 'legis'){  
      url = '/app/data/json/fromService/user-legis.json';
    }else{
      url = '/app/data/json/fromService/user.json';
    }
    console.log("getUserData() " + url);
    return this.http.get(url)
                             .map((response:Response) => response.json());
  }

  followDistrict(request:string):Observable<any>{
    let serviceUrl = this.serviceUrl+"/followDistrict";
    console.log("follow district user.service " + request + " this.serviceUrl " + serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(serviceUrl, request, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  followPerson(request:string):Observable<any>{
    let serviceUrl = this.serviceUrl+"/followPerson";
    console.log("follow User user.service " + request + " this.serviceUrl " + serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(serviceUrl, request, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
/*
  getRelation(userId:string, groupId:string):Observable<any>{
    console.log("getRelation()::UserService " + userId + " , " + groupId);
    let response = {};
    response['data'] = true;
    return response.json();

  }
  */
  getRelation(userId:string, districtId:string):Observable<any>{
    let serviceUrl = this.serviceUrl+"/getRelation";
    //console.log("follow district user.service " + request + " this.serviceUrl " + serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let myParams = new URLSearchParams();
    myParams.append('userId', userId);
    myParams.append('districtId', districtId);
    let options       = new RequestOptions({ headers: headers, search:myParams }); // Create a request option

    return this.http.get(serviceUrl, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
