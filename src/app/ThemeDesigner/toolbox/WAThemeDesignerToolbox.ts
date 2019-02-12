import { DefaultThemeModel, ThemeModelBuilder, ThemeModel } from './../ThemeModel';
import { Component, Input, ViewEncapsulation, Inject } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { DOCUMENT } from '@angular/common';


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

  @Input() themeModel: ThemeModel;// = new ThemeModelBuilder().createModel();

  constructor(private logger: NGXLogger, @Inject(DOCUMENT) private document: any){

  }

  ngOnInit() {
    this.themeModel = new ThemeModelBuilder(this.logger, this.document).createModel();
  }


  ngOnDestroy() {
  }


}
