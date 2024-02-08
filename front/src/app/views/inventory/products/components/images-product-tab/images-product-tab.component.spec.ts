import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesProductTabComponent } from './images-product-tab.component';

describe('ImagesProductTabComponent', () => {
  let component: ImagesProductTabComponent;
  let fixture: ComponentFixture<ImagesProductTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagesProductTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesProductTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
