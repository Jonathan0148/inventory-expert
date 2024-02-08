import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title:string;
  @Input() isVisible:string;
  @Input() btnConfirm:string;
  @Output() handelEmitterCancel = new EventEmitter<boolean>();
  @Output() handelEmitterOk = new EventEmitter<boolean>();
  
  isConfirmLoading = false;

  constructor() { }

  ngOnInit(): void {}

  public handleCancel():void {
    this.handelEmitterCancel.emit(true)
  }

  public handleOk(): void {
    this.handelEmitterOk.emit(true)
  }

}
