import { CSSColorHelper } from '../helpers/CSSColorHelper';
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Input, Output } from '@angular/core';
import { ColorEvent, Color } from 'ngx-color';
import * as __color_parse from 'color-parse';
const color_parse = __color_parse;

@Component({
  selector: 'wa-theme-designer-color-picker-input-field',
  templateUrl: './wa-theme-designer-color-picker-input-field.html',
  styleUrls: ['./wa-theme-designer-color-picker-input-field.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPickerInputField {

  @Output() @Input() color: Color;

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

  public get colorStr(): string {
    return this.colorCSS;
  }

  public get colorCSS(): string {
    return CSSColorHelper.toCSSString(this.color);
  }

  private get textColorCSS(): string {
    return CSSColorHelper.invertColor(this.color);
  }

  private invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    let r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    let r1 = (255 - r).toString(16);
    let g1 = (255 - g).toString(16);
    let b1 = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(r1) + this.padZero(g1) + this.padZero(b1);
  }

  private padZero(str:string, len?:number):string {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

}
