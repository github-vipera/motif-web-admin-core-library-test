

export interface ThemeItem {
  description: string
}

export class ThemeGroup implements ThemeItem {
  items: ThemeItem[];
  description: string;
}

export class ThemeModel extends ThemeGroup {
  description: string;
}



const LOG_TAG = '[DefaultThemeModel]';

export class ThemeColorItem implements ThemeItem {

  private _value: string;

  public presets = [ '#00000000'];

  constructor(public name: string,
    public description: string,
    public cssPropertyName: string,
    private themeWrapper: any,
    private logger: NGXLogger) {
      this._value = this.getColorProperty(cssPropertyName);
  }

  public get value(){
    return this._value;
  }

  public set value(colorValue:string) {
    this._value = colorValue;
    this.themeWrapper.style.setProperty(this.cssPropertyName, colorValue);
  }

  private getColorProperty(variableName: string): string {
    var style = getComputedStyle(this.themeWrapper);
    var ret = style.getPropertyValue(variableName).trim();
    return ret;
  }


}


export class DefaultThemeModel implements ThemeModel {

  private themeWrapper: any;

  items: ThemeItem[] = [];
  description: "Theme Model";

  constructor(private logger: NGXLogger, private document: any){
    this.logger.debug(LOG_TAG, 'Initializing' );
    console.log("@Inject(DOCUMENT) private document ", document);
    this.themeWrapper = this.document.querySelector('app-root');
    this.createModel();
    console.log("this.themeWrapper:", this.themeWrapper);
  }

  private createModel(){
    this.items.push(this.createMainGroup());
    this.items.push(this.createHeaderGroup());
    this.items.push(this.createFooterGroup());
    this.items.push(this.createGridGroup());
  }

  private createMainGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Main";
    ret.items = [

      // Main Colors
      this.createColorItem('background', 'Main Background', '--main-background-color'),
        //Titles
        this.createColorItem('background', 'Title 1 Color', '--title-1-color'),
    ];
    return ret;
  }


  private createHeaderGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Header";
    ret.items = [
      // Header Colors
      this.createColorItem('header', 'Header Background', '--header-background-color'),
      this.createColorItem('header', 'Header Color', '--header-color'),
      this.createColorItem('header', 'Header Hover', '--header-color-hover')
    ];
    return ret;
  }

  private createFooterGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Footer";
    ret.items = [
      // Footer Colors
      this.createColorItem('footer', 'Footer Background', '--footer-background-color'),
      this.createColorItem('footer', 'Footer Color', '--footer-color')
    ];
    return ret;
  }


  private createGridGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Grid";
    ret.items = [
      // Grid Colors
      this.createColorItem('grid', 'Grid Background', '--grid-background-color'),
      this.createColorItem('grid', 'Grid Color', '--grid-color'),
      this.createColorItem('grid', 'Grid Border Color', '--grid-border-color'),
      this.createColorItem('grid', 'Grid Header Color', '--grid-header-color'),
      this.createColorItem('grid', 'Grid Header Border', '--grid-header-border-color')
    ];
    return ret;
  }



  private createColorItem(name: string, description:string, cssPropertyName: string): ThemeColorItem {
    return new ThemeColorItem(name, description, cssPropertyName, this.themeWrapper, this.logger);
  }

}


import { Inject, destroyPlatform } from '@angular/core';
import { NGXLogger } from 'web-console-core';
import { DOCUMENT } from '@angular/common';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

export class ThemeModelBuilder {

    constructor(private logger: NGXLogger, @Inject(DOCUMENT) private document: any){
      this.logger.debug(LOG_TAG, 'Initializing Theme Builder' );
    }

    public createModel(): ThemeModel {
      let model: ThemeModel = new DefaultThemeModel(this.logger, this.document);
      return model;
    }


}
