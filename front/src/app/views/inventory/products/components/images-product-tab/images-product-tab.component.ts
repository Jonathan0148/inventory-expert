import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-images-product-tab',
  templateUrl: './images-product-tab.component.html',
  styleUrls: ['./images-product-tab.component.scss']
})
export class ImagesProductTabComponent implements OnInit {

  @Input() form:FormGroup;
  previewImage: string = '';
  previewVisible: boolean = false;
  fileList = [];

  constructor() { }

  ngOnInit(): void {
  }

  
  handlePreview = (file: NzUploadFile) => {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
  }


}
