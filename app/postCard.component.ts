import {Component, Input, OnInit} from '@angular/core';

import {PostService} from './service/post.service';
import {DataShareService} from './service/dataShare.service';

import {Post} from './object/post';

import {NewPostGPX} from './newPost';
import {BannerGPXComponent} from './banner.component';

@Component({
  selector: 'postCard-gpx',
  templateUrl: 'app/view/postCard.html',
  directives: [BannerGPXComponent, NewPostGPX],
  providers:[PostService],
  styles: [`
    .post{
      margin: 5px;
      padding: 5px; 
     /* border-bottom: 1px solid lightgreen; */
      border-radius: 5px;
      overflow: auto;
    }

    .smTagImg{
      max-width: 100%;
      height: auto;
    }

    .postDetail{
      border: 1px solid lightblue;
      border-radius: 5px;

    }

    .postText{

      margin:0.5em;
    }

    .postAction{
      margin:0.5em;
    }
  `]
})

export class PostCardGPX {
  @Input() post: Post;
  commentPost:boolean = false;

  constructor(private postService: PostService, private dataShareService:DataShareService) {
  }

  postEvent():void{
    this.commentPost = false;  
  }

  comment():void{
    this.commentPost = true;
    //child hideInput set to false
    console.log("this.commentPost " + this.commentPost);
  }

  likePost():void{
    console.log('Liked the post ' + this.post.id);
    console.log('userid ' + this.dataShareService.getCurrentUserId());
    this.post.likedByCurrentUser = true;
    console.log('this.post.likedByCurrentUser ' + this.post.likedByCurrentUser);
  }  

}