import {Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

import { FileUploader } from './file-uploader.class';
import { FileSelectDirective  } from './file-select.directive';
import { CollapseDirective } from 'ng2-bootstrap/components/collapse';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'file-upload',
  templateUrl: 'app/file-upload/file-upload.html',
  directives: [FileSelectDirective, CollapseDirective],
  styles: [`
label {
   cursor: pointer;
   /* Style as you please, it will become the visible UI component. */
}

#upload-photo {
   opacity: 0;
   position: absolute;
   z-index: -1;
}

.fileUploadStage{
  margin-bottom: 40px;
  
}



  `]
})


export class FileUploadComponent {

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }


}