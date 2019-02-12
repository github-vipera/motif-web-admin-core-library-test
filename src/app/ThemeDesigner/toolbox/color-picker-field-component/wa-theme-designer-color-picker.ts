import { ElementRect } from '@progress/kendo-popup-common';
import { CSSColorHelper } from './helpers/CSSColorHelper';
import { Component, ViewEncapsulation, ViewChild, Output, Input, ElementRef } from '@angular/core';
import { ColorEvent, Color,  RGBA } from 'ngx-color';

@Component({
  selector: 'wa-theme-designer-color-picker',
  templateUrl: './wa-theme-designer-color-picker.html',
  styleUrls: ['./wa-theme-designer-color-picker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WAThemeDesignerColorPicker {

  @Input() @Output() color: Color;

  @ViewChild("op") overlayPanel: any;
  @ViewChild("pickerButton") pickerButton:ElementRef;

  constructor(){
  }

  ngOnInit() {
  }


  ngOnDestroy() {
  }

  handleChange($event: ColorEvent) {
    this.color = $event.color;
  }

  @Output()
  public get colorCSS():string {
    return CSSColorHelper.toCSSString(this.color);
  }

  public set colorCSS(value:string) {
    //color_parse(value);
  }

  onInputDblClick(event){
    this.overlayPanel.show(event, this.pickerButton.nativeElement);
  }


}
