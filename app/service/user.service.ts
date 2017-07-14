import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods:
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

	constructor (private http: Http) {}
  
  result:any; 
  resultop:any;

  getUserData(type:String):Observable<any> { 
    /*
    let groupData = this.http.get('/app/data/json/fromService/group.json')
                             .map((response:Response) => response.json());
    console.log("group data " + groupData);
    return groupData;
*/
    return this.http.get('/app/data/json/fromService/user.json')
                             .map((response:Response) => response.json());
  }

}
