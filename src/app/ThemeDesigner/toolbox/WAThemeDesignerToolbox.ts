import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'wa-theme-designer-toolbox',
  templateUrl: './wa-theme-designer-toolbox.html',
  styleUrls: ['./wa-theme-designer-toolbox.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerToolbox {

  title = 'motif-web-admin-core-library-test';
  display = true;
  myClassName = "wa-theme-editor-toolbox";

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }


}
