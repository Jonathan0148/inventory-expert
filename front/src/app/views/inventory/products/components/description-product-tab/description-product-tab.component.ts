import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-description-product-tab',
  templateUrl: './description-product-tab.component.html',
  styleUrls: ['./description-product-tab.component.scss']
})
export class DescriptionProductTabComponent implements OnInit {
  
  @Input() form:FormGroup;

  editorConfig = {
      toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],  
          [{ 'align': [] }],
          ['link', 'image']                        
      ]
  };
  constructor() { }

  ngOnInit(): void {}

}
