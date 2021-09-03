import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() list: any[];
  @Output() shareCheckedList = new EventEmitter();

  checkedList: any[];

  constructor() { }
  
  ngOnInit() {
    this.checkedList = this.list
      .map(item => item.checked === true ? item.name : undefined)
      .filter(Boolean);
  }

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }
    this.shareCheckedlist();
  }

  shareCheckedlist() {
    this.shareCheckedList.emit(this.checkedList);
  }

}
