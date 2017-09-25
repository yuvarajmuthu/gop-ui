import {Component, OnInit} from '@angular/core';

import {PostService} from './service/post.service';
import {DataShareService} from './service/dataShare.service';

import {Post} from './object/post';

import {NewPostGPX} from './newPost';
import {BannerGPXComponent} from './banner.component';
import {PostCardGPX} from './postCard.component';

@Component({
  selector: 'post-gpx',
  templateUrl: 'app/view/post.html',
  directives: [BannerGPXComponent, NewPostGPX, PostCardGPX],
  providers:[PostService],
  styles: [`
  `]
})

export class PostGPX  implements OnInit{

  posts:Post[] = [];
  
  constructor(private postService: PostService, private dataShareService:DataShareService) {
  }

  ngOnInit(): void {
    //this.imageName = '../../images/'+this.party.profileImage;
    console.log("ngOnInit()");

           this.postService.getActivities('').subscribe((result) => {
             this.posts = result;
           });

  }
/*
  comment():void{}

  likePost(post:Post):void{
    console.log('Liked the post ' + post.id);
    console.log('userid ' + this.dataShareService.getCurrentUserId());
    post.likedByCurrentUser = true;
  }  
  */
}