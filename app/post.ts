import {Component} from '@angular/core';

import {BannerGPXComponent} from './banner.component';
//import {PartyService} from './service/party.service';

@Component({
  selector: 'post-gpx',
  templateUrl: 'app/view/post.html',
  directives: [BannerGPXComponent],
  providers:[],
  styles: [`
    .post{
      margin: 5px;
      padding: 5px; 
      border-bottom: 1px solid lightgreen;
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
      border: 1px solid lightblue;
      border-radius: 5px;
      margin:0.5em;
    }

    .postAction{
      margin:0.5em;
    }
  `]
})

export class PostGPX {

}