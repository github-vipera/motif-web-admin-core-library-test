import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, Input } from '@angular/core';
import { ColorEvent, Color } from 'ngx-color';


@Component({
  selector: 'wa-theme-designer-color-picker-input-field',
  templateUrl: './wa-theme-designer-color-picker-input-field.html',
  styleUrls: ['./wa-theme-designer-color-picker-input-field.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPickerInputField {

  @Input() color: Color;

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
    return this.toCSSValue(this.color);
  }

  private toCSSValue(color: Color):string {
    if (this.color){
      if (color.rgb.a===1){
        return this.toHexValue(color);
      } else {
        return this.toRGBAValue(color);
      }
    } else {
      return "";
    }
  }

  private toHexValue(color: Color):string {
    return color.hex;
  }

  private toRGBAValue(color: Color):string {
    return "rgba("+ color.rgb.r + "," + color.rgb.g +"," + color.rgb.b +", " + color.rgb.a +")";
  }

  private get textColorCSS(): string {
    if (this.color){
      return this.invertColor(this.color.hex, true);
    } else {
      return "#ddd";
    }
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
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // http://stackoverflow.com/a/3943023/112731
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
  }

  private padZero(str:string, len?:number):string {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }

}
