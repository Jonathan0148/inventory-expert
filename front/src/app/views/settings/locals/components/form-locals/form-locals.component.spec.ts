import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocalsComponent } from './form-locals.component';

describe('FormLocalsComponent', () => {
  let component: FormLocalsComponent;
  let fixture: ComponentFixture<FormLocalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLocalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
