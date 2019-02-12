import { WAThemeDesignerToolbox } from './toolbox/WAThemeDesignerToolbox';
import { ThemeModelBuilder, ThemeModel, ThemeItem, ThemeGroup, ThemeColorItem } from './ThemeModel';
import { Injectable, Inject, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
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
  private themeModel: ThemeModel;

    constructor(private logger: NGXLogger, @Inject(DOCUMENT) private document: any,
      private resolver: ComponentFactoryResolver,
      private injector: Injector,
      private app: ApplicationRef
    ){
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

        this.obj = this.createThemeObject();

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

    private createThemeObject() : any {
      return {
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

    public showControljs(){
        this.themeModel = new ThemeModelBuilder(this.logger, this.document).createModel();
        this.logger.debug(LOG_TAG, 'ThemeModelBuilder new model:',this.themeModel);
        let controlKit = new ControlKit({opacity:0.8 });
        let panel = controlKit.addPanel({ fixed: false, width: 400, label: "Theme Editor", dock: false, align: "right", position: [0,50]});

        for (let i=0;i<this.themeModel.items.length;i++){
          let item: ThemeItem = this.themeModel.items[i];
          if (item instanceof ThemeGroup){
            this.addThemeGroupTo(panel, item);
          } else if (item instanceof ThemeColorItem) {
            this.addColorTo(panel, item);
          }
        }

        panel.addButton('Export',() => { alert("TODO!!"); });

    }

    private addThemeGroupTo(ui: any, group: ThemeGroup) {
      let subUI = ui.addSubGroup( { label: group.description, enable: false } );
      for (let i=0;i<group.items.length;i++){
        let item: ThemeItem = group.items[i];
        if (item instanceof ThemeGroup){
          this.addThemeGroupTo(subUI, item);
        } else if (item instanceof ThemeColorItem) {
          this.addColorTo(subUI, item);
        }
      }
    }

    private addColorTo(ui: any, colorItem: ThemeColorItem) {
      ui.addColor(colorItem, 'value', { colorMode:'hex', label: colorItem.description, presets: 'presets' });
    }


    public show(){
      let factory = this.resolver.resolveComponentFactory(WAThemeDesignerToolbox);
      let newNode = document.createElement('div');
      newNode.id = 'wa-theme-editor-container';
      this.document.body.appendChild(newNode);
      const ref = factory.create(this.injector, [], newNode);
      this.app.attachView(ref.hostView);
      this.showControljs();
    }

}

