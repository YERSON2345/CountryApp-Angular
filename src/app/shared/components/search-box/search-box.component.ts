import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent {

  @Input()
  placeholder:string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  emitValue(value:string): void{
    
    this.onValue.emit(value);
  }
}
