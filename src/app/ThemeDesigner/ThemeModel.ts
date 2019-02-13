

export interface ThemeItem {
  description: string
}

export class ThemeGroup implements ThemeItem {
  items: ThemeItem[];
  description: string;
}

export abstract class ThemeModel extends ThemeGroup {
  description: string;
  abstract exportTheme(): string;
}



const LOG_TAG = '[DefaultThemeModel]';

export class ThemeColorItem implements ThemeItem {

  private _value: string;

  public presets = [ '#00000000'];

  constructor(public name: string,
    public description: string,
    public cssPropertyName: string,
    public scssVariableName,
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
    //console.log(">>>>> Set color value: ", colorValue);
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
    this.themeWrapper = this.document.querySelector('app-root');
    this.createModel();
  }

  private createModel(){
    this.items.push(this.createMainGroup());
    this.items.push(this.createToolbarGroup());
    this.items.push(this.createHeaderGroup());
    this.items.push(this.createFooterGroup());
    this.items.push(this.createGridGroup());
  }

  private createMainGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Main";
    ret.items = [

      // Main Colors
      this.createColorItem('background', 'Main Background', '--main-background-color', '$main_background_color'),
        //Titles
        this.createColorItem('background', 'Title 1 Color', '--title-1-color', '$title1_color'),
    ];
    return ret;
  }


  private createHeaderGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Header";
    ret.items = [
      // Header Colors
      this.createColorItem('header', 'Header Background', '--header-background-color', '$header_background_color'),
      this.createColorItem('header', 'Header Color', '--header-color', '$header_description_color'),
      this.createColorItem('header', 'Header Hover', '--header-color-hover', '$header_description_hover_color')
    ];
    return ret;
  }

  private createFooterGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Footer";
    ret.items = [
      // Footer Colors
      this.createColorItem('footer', 'Footer Background', '--footer-background-color','$footer_background_color'),
      this.createColorItem('footer', 'Footer Color', '--footer-color','$footer_color')
    ];
    return ret;
  }


  private createGridGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Grid";
    ret.items = [
      // Grid Colors
      this.createColorItem('grid', 'Grid Background', '--grid-background-color','$grid_background_color'),
      this.createColorItem('grid', 'Grid Color', '--grid-color', '$grid_color'),
      this.createColorItem('grid', 'Grid Border Color', '--grid-border-color', '$grid_border_color'),
      this.createColorItem('grid', 'Grid Header Color', '--grid-header-color', '$grid_header_color'),
      this.createColorItem('grid', 'Grid Header Border', '--grid-header-border-color', '$grid_header_border_color'),
      this.createColorItem('grid', 'Grid Hover Backgorund', '--grid-row-hover-background-color', '$grid_tr_hover_background_color'),
      this.createColorItem('grid', 'Grid Hover Color', '--grid-row-hover-color', '$grid_tr_hover_color')
    ];
    return ret;
  }


  private createToolbarGroup(): ThemeGroup {
    let ret = new ThemeGroup();
    ret.description = "Main Toolbar";
    ret.items = [
      // Toolbar Colors
      this.createColorItem('mainToolbar', 'Background', '--nav-background-color', '$nav_background_color'),
      this.createColorItem('mainToolbar', 'Border', '--nav-border-color', '$nav_a_a_border_color'),
      this.createColorItem('mainToolbar', 'Color', '--nav-color', '$nav_color'),
      this.createColorItem('mainToolbar', 'Background Hover', '--nav-hover-background-color','$nav_hover_background_color'),
      this.createColorItem('mainToolbar', 'Color Hover', '--nav-hover-color','$nav_hover_color'),
    ];
    return ret;
  }

  public exportTheme(): string {
    let retStr = "";
    for (var i=0; i < this.items.length;i++){
      const groupItem : ThemeGroup = this.items[i] as ThemeGroup;
      for(var k=0;k<groupItem.items.length;k++){
        const item:ThemeColorItem = groupItem.items[k] as ThemeColorItem;
        retStr += "\n" + item.scssVariableName +":" + item.value + ";";
      }
    }
    return retStr;
  }


  private createColorItem(name: string, description:string, cssPropertyName: string, scssVariableName:string): ThemeColorItem {
    return new ThemeColorItem(name, description, cssPropertyName, scssVariableName, this.themeWrapper, this.logger);
  }

}


import { Inject, destroyPlatform } from '@angular/core';
import { NGXLogger } from 'web-console-core';
import { DOCUMENT } from '@angular/common';

export class ThemeModelBuilder {

    constructor(private logger: NGXLogger, @Inject(DOCUMENT) private document: any){
      this.logger.debug(LOG_TAG, 'Initializing Theme Builder' );
    }

    public createModel(): ThemeModel {
      let model: ThemeModel = new DefaultThemeModel(this.logger, this.document);
      //console.log("createModel :", model);
      return model;
    }


}
