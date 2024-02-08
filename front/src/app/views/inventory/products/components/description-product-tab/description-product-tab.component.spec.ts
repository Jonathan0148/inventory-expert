import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionProductTabComponent } from './description-product-tab.component';

describe('DescriptionProductTabComponent', () => {
  let component: DescriptionProductTabComponent;
  let fixture: ComponentFixture<DescriptionProductTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionProductTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionProductTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
