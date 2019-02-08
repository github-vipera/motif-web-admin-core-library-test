import { Injectable, Inject } from '@angular/core';
import { NGXLogger } from 'web-console-core';
import { GUI } from "dat-gui";
import { DOCUMENT } from '@angular/common';

import * as dat from 'dat.gui'

import * as ControlKit from 'controlkit'

const LOG_TAG = '[WAThemeDesignerService]';

interface ColorItemDef {
  name: string;
  variableName: string;
}

@Injectable()
export class WAThemeDesignerService {

  private themeWrapper: any;

    constructor(private logger: NGXLogger, @Inject(DOCUMENT) private document: any){
      console.log("@Inject(DOCUMENT) private document ", document);
      this.themeWrapper = this.document.querySelector('app-root');
      console.log("this.themeWrapper:", this.themeWrapper);
    }

    private obj:any;

    public showDAT(){
        this.logger.debug(LOG_TAG, 'show called' );

        const gui: GUI = new dat.default.GUI({name: "Theme Designer", width: 400, closed: true, autoPlace: true, hideable:true });
        gui.useLocalStorage = true;

        let colorStr = "#ffae23";//this.getColorProperty('--header-background-color');

        this.obj = {
          main: {
            "Background": this.getColorProperty('--main-background-color'),
            "Title1" : this.getColorProperty('--title-1-color')
          },
            header: {
                "Background": this.getColorProperty('--header-background-color'),
                "Color" : this.getColorProperty('--header-color'),
                "ColorHover" : this.getColorProperty('--header-color-hover')
            },
            Export: () =>{
              let test = this.getColorProperty('--header-background-color');
              alert(test);
              console.log("Color:",test)
            }
          };

          let mainFolder = this.createEmptyFolder(gui, "Main");

          this.createFolder(mainFolder, 'Canvas', [
            { name: 'Background', variableName: '--main-background-color' },
            { name: 'Title1', variableName: '--title-1-color' },
          ], this.obj.main);

          this.createFolder(mainFolder, 'Header', [
            { name: 'Background', variableName: '--header-background-color' },
            { name: 'Color', variableName: '--header-color' },
            { name: 'ColorHover', variableName: '--header-color-hover' }
          ], this.obj.header);


          gui.add(this.obj, "Export");

          this.logger.debug(LOG_TAG, 'show done' );

    }

    private createEmptyFolder(gui: GUI, folderName: string): GUI {
      return gui.addFolder(folderName);
    }

    private createFolder(gui:GUI, folderName:string, colors:ColorItemDef[], target: any){
      let f1 = gui.addFolder(folderName);
      for (var i=0;i<colors.length;i++){
        let colorItemDef: ColorItemDef = colors[i];
        f1.addColor(target, colorItemDef.name).onChange((value) => {
          this.logger.debug(LOG_TAG, 'Set variable name:',colorItemDef.variableName, value );
          this.themeWrapper.style.setProperty(colorItemDef.variableName, value);
        });
      }
    }

    private getColorProperty(variableName: string): string {
      var style = getComputedStyle(this.themeWrapper);
      var ret = style.getPropertyValue(variableName).trim();
      return ret;
    }

    public show(){
      var obj = {
        number : 0,
        string : 'abc',
        color: '#ff00aa'
    };
      var controlKit = new ControlKit();
	    controlKit.addPanel({ fixed: false, width: 400, label: "Theme Editor", dock: false, align: "right", position: [0,50]})
	        .addGroup({label:'Main Colors'})
	            .addSubGroup({label: 'Commons'})
                  .addNumberInput(obj,'number')
                  .addColor(obj,'color',{colorMode:'hex', label: 'Title 1 Color'})
	                .addStringInput(obj,'string');
    }


}
