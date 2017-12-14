import { COMMON_DIRECTIVES } from '@angular/common';
import { Directive, Component } from '@angular/core';

//import { FileDropDirective } from './file-drop.directive';
import { FileSelectDirective } from './file-select.directive';

@Component({

  directives:[FileSelectDirective, COMMON_DIRECTIVES]
})

//NOT USED
export class FileUploadModule {
}