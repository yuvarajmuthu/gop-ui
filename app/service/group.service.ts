import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GroupService {
  serviceUrl:string = "http://127.0.0.1:8080/group";

	constructor (private http: Http) {}
  
  result:any; 
  resultop:any;

  getGroupData(type:String):Observable<any> { 
    /*
    let groupData = this.http.get('/app/data/json/fromService/group.json')
                             .map((response:Response) => response.json());
    console.log("group data " + groupData);
    return groupData;
*/  if(type == "CREATE"){
      return this.http.get('/app/data/json/fromService/group.json')
                               .map((response:Response) => response.json());  
    }else{
      let serviceUrl = this.serviceUrl + "/" + type;
      //this.serviceUrl = this.serviceUrl + "/" + type;
      console.log("getGroup group.service this.serviceUrl " + serviceUrl);
     //let bodyString = JSON.stringify(post); // Stringify payload
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

  createGroup(request:string):Observable<any>{
    console.log("createGroup group.service " + request + " this.serviceUrl " + this.serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this.serviceUrl, request, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateGroup(groupId:string, request:string):Observable<any>{
    let serviceUrl = this.serviceUrl + "/" + groupId;
    console.log("updateGroup group.service " + request + " this.serviceUrl " + serviceUrl);
   //let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(serviceUrl, request, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

}
