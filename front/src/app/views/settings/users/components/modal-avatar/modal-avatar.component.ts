import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal-avatar',
  templateUrl: './modal-avatar.component.html',
  styleUrls: ['./modal-avatar.component.scss']
})
export class ModalAvatarComponent implements OnInit {
  avatars: string[] = [
    '/assets/images/avatars/1.png',
    '/assets/images/avatars/2.png',
    '/assets/images/avatars/3.png',
    '/assets/images/avatars/4.png',
    '/assets/images/avatars/5.png',
    '/assets/images/avatars/6.png',
    '/assets/images/avatars/7.png',
    '/assets/images/avatars/8.png',
    '/assets/images/avatars/9.png',
    '/assets/images/avatars/10.png',
    '/assets/images/avatars/11.png',
    '/assets/images/avatars/12.png',
    '/assets/images/avatars/13.png',
    '/assets/images/avatars/14.png',
    '/assets/images/avatars/15.png',
    '/assets/images/avatars/16.png',
    '/assets/images/avatars/17.png',
    '/assets/images/avatars/18.png',
    '/assets/images/avatars/19.png',
    '/assets/images/avatars/20.png',
  ];

  constructor(private modalRef: NzModalRef) {}

  ngOnInit(): void { }

  selectAvatar(avatar: string) {
    this.modalRef.close(avatar);
  }
}