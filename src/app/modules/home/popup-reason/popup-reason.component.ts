import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'ngx-popup-reason',
  templateUrl: './popup-reason.component.html',
  styleUrls: ['./popup-reason.component.scss'],
})
export class PopupReasonComponent implements OnInit {
  @Input() displayPosition: boolean ;
  @Input() content: string;
  // @ts-ignore
  @Output() checkedChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  toggle() {
    this.displayPosition = !this.displayPosition;
    this.checkedChange.emit(this.displayPosition);
  }

}
