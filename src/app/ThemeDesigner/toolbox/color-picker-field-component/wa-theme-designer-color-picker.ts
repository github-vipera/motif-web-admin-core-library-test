import { ElementRect } from '@progress/kendo-popup-common';
import { CSSColorHelper } from './helpers/CSSColorHelper';
import { Component, ViewEncapsulation, ViewChild, Output, Input, ElementRef } from '@angular/core';
import { ColorEvent, Color,  RGBA } from 'ngx-color';
import * as __color_string from 'color-string';

const colorString = __color_string;


@Component({
  selector: 'wa-theme-designer-color-picker',
  templateUrl: './wa-theme-designer-color-picker.html',
  styleUrls: ['./wa-theme-designer-color-picker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPicker {

  @Input() @Output() colorRaw: Color;

  @ViewChild("op") overlayPanel: any;
  @ViewChild("pickerButton") pickerButton:ElementRef;
  @ViewChild("colorPanel") colorPanel:ElementRef;

  public colorString:string;

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

  handleChange($event: ColorEvent) {
    this.colorRaw = $event.color;
  }

  @Input()
  public get color():string {
    return CSSColorHelper.toCSSString(this.colorRaw);
  }

  @Input()
  public set color(value:string) {
    this.colorString = this.colorString;
    if (value){
      let colorComp = colorString.get(value);
      console.log("SET COLOR ", value, colorComp);
      let hexValue = colorString.to.hex(colorComp.value);
      let rgbaValue = colorString.to.rgb(colorComp.value);
      let hslValue = colorString.to.hsl(colorComp.value);
      console.log("SET COLOR ", value, hexValue, rgbaValue, hslValue);
      this.colorRaw = {
        hex: hexValue,
        rgb: {
          r: colorComp.value[0],
          g: colorComp.value[1],
          b: colorComp.value[2],
          a: colorComp.value[3]
        },
        hsl: {
          a: 0,
          h: 0,
          l: 0,
          s: 0
        },
        hsv: {
          a:0,
          h:0,
          s:0,
          v:0
        },
        oldHue: 0,
        source: ""
      }
    }
  }

  onInputDblClick(event){
    this.overlayPanel.show(event, this.pickerButton.nativeElement);
  }


}
