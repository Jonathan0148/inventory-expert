import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLosseComponent } from './form-losse.component';

describe('FormLosseComponent', () => {
  let component: FormLosseComponent;
  let fixture: ComponentFixture<FormLosseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLosseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLosseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
