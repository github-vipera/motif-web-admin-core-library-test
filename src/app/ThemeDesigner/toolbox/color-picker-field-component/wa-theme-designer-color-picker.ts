import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ColorEvent, Color,  RGBA } from 'ngx-color';


@Component({
  selector: 'wa-theme-designer-color-picker',
  templateUrl: './wa-theme-designer-color-picker.html',
  styleUrls: ['./wa-theme-designer-color-picker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPicker {

  color:string = "#ff00ff";
  colorRaw: Color;

  @ViewChild("op") overlayPanel: any;

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

  handleChange($event: ColorEvent) {
    console.log("Color event: ", $event);
    this.colorRaw = $event.color;
    this.color = $event.color.hex;
  }

}
