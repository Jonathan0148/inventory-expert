import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment.prod';
@Component({
  selector: 'app-images-product-tab',
  templateUrl: './images-product-tab.component.html',
  styleUrls: ['./images-product-tab.component.scss']
})
export class ImagesProductTabComponent implements OnInit {
  @Input() form:FormGroup;
  @Input() setImagesUrl:NzUploadFile[];
  @Input() id:number;
  serverURL: string = environment.serverUrl;
  fileList:NzUploadFile[] = [];
  @Output() images: EventEmitter<NzUploadFile[]> = new EventEmitter<NzUploadFile[]>();

  constructor() { }

  ngOnInit(): void {
    if (this.id){
      this.fileList = this.setImagesUrl;
    }
   }

  handleChange(event: any){
    if (event?.type === 'success' || event?.type === 'removed'){
      const doneFiles = this.fileList.filter(file => file.status === "done");
      this.images.emit(doneFiles);
    }
  }
}