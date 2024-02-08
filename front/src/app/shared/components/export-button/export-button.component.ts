import { Component, Input, OnInit } from '@angular/core';
import { FilesService } from '../../services/file.service';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.scss']
})
export class ExportButtonComponent implements OnInit {

  @Input() type:string;
  @Input() path:string;
  @Input() nameFile:string;

  constructor(
    private _fileSvC:FilesService
  ) { }

  ngOnInit(): void {
  }

  public downloadReport():void {  
    this._fileSvC.exportFile(this.path, this.nameFile);
  }

}
