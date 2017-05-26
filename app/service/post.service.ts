import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Post} from '../object/post';


@Injectable()
export class PostService {
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

}