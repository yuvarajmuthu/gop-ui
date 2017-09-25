import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams  } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {Post} from '../object/post';


@Injectable()
export class PostService {

  constructor (private http: Http, private jsonp:Jsonp) {}	

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

		    postPromise.userName = 'ymuthu';
		    postPromise.txtPost = post['txtPost'];

		    postsPromise.push(postPromise);
		}


	}
  	//typecast to post object
  	console.log('returning posts ' + postsPromise.length);
  	return postsPromise;  
  }


  getActivities(type:String) {
  	 var postJson = {};
  	var posts:JSON[];
	var postsPromise : Post[] = [];

    return this.http.get('/app/data/json/fromService/post.json')
    .map(res => {return res.json()})
    .map((data) => {

		posts = data['results'];
		console.log('from Post Service - parsed Post length ' + posts.length);

		for (var i = 0; i < posts.length; i++) {
		    var post : Post = {} as Post;
		    post = Post.decodePost(posts[i]);
		    console.log('reading properties - ' + post['id']);

		    postsPromise.push(post);
		}

      	return postsPromise;      
          });

  }


}