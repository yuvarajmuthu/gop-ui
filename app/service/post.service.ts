import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams  } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {Post} from '../object/post';
import {DataShareService} from "./dataShare.service";


@Injectable()
export class PostService {
  serviceUrl:string;// = "http://127.0.0.1:8080/post";	

  constructor (private http: Http, private jsonp:Jsonp, private dataShareService:DataShareService) {
    this.serviceUrl = dataShareService.getServiceUrl() + "/post";
  }

  //deprecated
  getPost():Post[] { 
  	var postJson = {};
  	var posts:JSON[];
	var postsPromise : Post[] = [];
	

	var localPost:string;
	if(localPost = localStorage.getItem("userPosts")){
		console.log('from Post Service - localPost ' + localPost);
		postJson = JSON.parse(localPost);
		posts = postJson['postArray'];
		console.log('from Post Service - parsed Post ' + posts);

		for (var i = 0; i < posts.length; i++) {
		    var post = {};
		    var postPromise : Post = {} as Post;
		    post = posts[i];
		    console.log('reading properties - ' + post['txtPost']);

		    postPromise.userId = 'ymuthu';
		    postPromise.postText = post['txtPost'];

		    postsPromise.push(postPromise);
		}


	}
  	//typecast to post object
  	console.log('returning posts ' + postsPromise.length);
  	return postsPromise;  
  }


  getActivities(requestData:string) {
    var postJson = {};
  	var posts:JSON[];
	  var postsPromise : Post[] = [];
    
    var serviceUrl = this.serviceUrl + "/getAllPosts";

/////////
    let requestJson = JSON.parse(requestData);
    let requestParams = new URLSearchParams();
    requestParams.set("entityId", requestJson['entityId']);
    requestParams.set("entityType", requestJson['entityType']);

    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers, search:requestParams }); // Create a request option
    console.log("gonna get posts");
    return this.http.get(serviceUrl, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                    .map((posts) => {

                    //posts = data['results'];
                    console.log('from Post Service - parsed Post length ' + posts.length);

                    for (var i = 0; i < posts.length; i++) {
                        var post : Post = {} as Post;
                        console.log('reading properties - ' + JSON.stringify(posts[i]));                        
                        //post = Post.decodePost(posts[i]);
                        //console.log('reading properties - ' + post.id);

                        postsPromise.push(posts[i]);
                    }

                        return postsPromise;      
                          })                     
                     .catch((error:any) => {
                       console.error('UI error handling' + JSON.stringify(error));
                       return Observable.throw(error.json().error || 'Server error')
                     });
 
/////////
/*
    return this.http.get('/app/data/json/fromService/post.json')
    .map(res => {return res.json()})
    .map((posts) => {

		//posts = data['results'];
		console.log('from Post Service - parsed Post length ' + posts.length);

		for (var i = 0; i < posts.length; i++) {
		    var post : Post = {} as Post;
		    post = Post.decodePost(posts[i]);
		    console.log('reading properties - ' + post['id']);

		    postsPromise.push(post);
		}

      	return postsPromise;      
          })
    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    */

  }

  //post the comment to the server
  postComment(post:Post):Observable<any>{
  	console.log("postComment post.service " + JSON.stringify(post));
 	let bodyString = JSON.stringify(post); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

	console.log("postComment::post.service invoking service " + this.serviceUrl);
    return this.http.post(this.serviceUrl, bodyString, options) // ...using post request
                     .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}