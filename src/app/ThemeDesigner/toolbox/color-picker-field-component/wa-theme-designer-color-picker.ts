import { Component, ViewEncapsulation, ViewChild, Output, Input } from '@angular/core';
import { ColorEvent, Color,  RGBA } from 'ngx-color';
import * as __color_parse from 'color-parse';
const color_parse = __color_parse;


@Component({
  selector: 'wa-theme-designer-color-picker',
  templateUrl: './wa-theme-designer-color-picker.html',
  styleUrls: ['./wa-theme-designer-color-picker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPicker {

  @Input() @Output() color: Color;

  private _colorCSS: string;

  @ViewChild("op") overlayPanel: any;

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

  handleChange($event: ColorEvent) {
    console.log("Color event: ", $event);
    this.color = $event.color;
    this.colorCSS = $event.color.hex;
  }

  @Output()
  public get colorCSS():string {
    return "";
  }

  public set colorCSS(value:string) {
    color_parse(value);
  }

}
