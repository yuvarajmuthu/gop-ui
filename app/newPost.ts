import {Component, Input, Output, EventEmitter} from '@angular/core';

import {DataShareService} from './service/dataShare.service';
import {PostService} from './service/post.service';

import {Post} from './object/post';

@Component({
  selector: 'newPost-gpx',
  templateUrl: 'app/view/newPost.html',
  directives: [],
  providers:[PostService],
  styles: [`
  .newPostButton{

  }

  .newPost{
    width:auto;
  }
  `]
})

export class NewPostGPX {
  @Output() postEvent: EventEmitter<any> = new EventEmitter();

  @Input() parentPost:Post;
  txtPost:string = '';
  hideInput:boolean = false;
  //clearInput:boolean = false;

  constructor(private postService: PostService, private dataShareService:DataShareService) {  
  }

  submitPost(text:string){
    console.log("posting the comment " + text);

/*    let posts:string;

    if(posts = localStorage.getItem("userPosts")){
      console.log('Existing posts ' + posts);
      let postObj = {};
      let json = [];  

      postObj = JSON.parse(posts);
      json = postObj['postArray'];

      let post:string;

      post = '{ "txtPost":'+ JSON.stringify(this.txtPost) +'}';
      json.push(JSON.parse(post));
      
      postObj['postArray'] = json;

      localStorage.setItem("userPosts", JSON.stringify(postObj));
      console.log('localStorage posts ' + localStorage.getItem("userPosts"));
    } else{
      console.log('adding new post in localstorage - ' + this.txtPost);
      localStorage.setItem("userPosts", JSON.stringify({'postArray':[{ 'txtPost': this.txtPost}]}));
    } 
*/
    //
    let post = {} as Post;
    post.userName = this.dataShareService.getCurrentUserId();
    post.districtId = this.dataShareService.getCurrentDistrictId();
    post.txtPost = this.txtPost;

    if(this.parentPost != null){
      console.log("parent post " + this.parentPost.txtPost + ", post id " + this.parentPost.id);
      post.parentPostId = this.parentPost.id;    
    }
    
    this.postService.postComment(post);

    if(this.parentPost != null){
       this.postEvent.emit(null);           

       this.hideInput = true; // should be inside subscribe()
    }else{
      this.txtPost = '';
    }  


  }
}