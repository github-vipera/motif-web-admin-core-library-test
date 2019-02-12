import { CSSColorHelper } from './helpers/CSSColorHelper';
import { Component, ViewEncapsulation, ViewChild, Output, Input, ElementRef } from '@angular/core';
import { ColorEvent, Color,  RGBA } from 'ngx-color';
import * as __color_string from 'color-string';
//import { ChromeComponent } from 'ngx-color/chrome/chrome.component//';


const colorString = __color_string;


@Component({
  selector: 'wa-theme-designer-color-picker',
  templateUrl: './wa-theme-designer-color-picker.html',
  styleUrls: ['./wa-theme-designer-color-picker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPicker {

  @Input() @Output() colorRaw: Color;

  @Input() label:string;

  @ViewChild("op") overlayPanel: any;
  @ViewChild("pickerButton") pickerButton:ElementRef;
  @ViewChild("colorPanel") colorPanel:any;
  @ViewChild("hiddenInput") hiddenInput:ElementRef;
  //public colorStr:string;

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

  handleChange($event: ColorEvent) {
    this.colorRaw = $event.color;
  }

  public get color():string {
    let ret = CSSColorHelper.toCSSString(this.colorRaw);
    return ret;
  }

  @Input()
  public set color(value:string) {
    if (value){
      let colorComp = colorString.get(value);
      let hexValue = colorString.to.hex(colorComp.value);
      let rgbaValue = colorString.to.rgb(colorComp.value);
      let hslValue = colorString.to.hsl(colorComp.value);
      console.log(">>>> SET COLOR ", value, hexValue, rgbaValue, hslValue);
      this.colorRaw = {
        hex: hexValue,
        rgb: {
          r: colorComp.value[0],
          g: colorComp.value[1],
          b: colorComp.value[2],
          a: colorComp.value[3]
        },
        hsl: {
          h: 0,
          l: 0,
          s: 0,
          a: 0
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

  public get hex():string {
    if (this.colorRaw){
      return this.colorRaw.hex;
    } else {
      return "";
    }
  }

  onInputDblClick(event){
    this.showPickerOverlay(event);
  }

  onPickerButtonClick(event){
    /*
    this.pickerButton.nativeElement.blur();
    event.preventDefault();
    event.stopPropagation();
    */
    this.showPickerOverlay(event);
  }

  private showPickerOverlay(event){
    this.hiddenInput.nativeElement.focus();
    this.overlayPanel.show(event, this.pickerButton.nativeElement);
  }

  onHiddenInputBlur(event){
    this.overlayPanel.hide();
  }


}
