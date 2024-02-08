import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBailsComponent } from './form-bails.component';

describe('FormBailsComponent', () => {
  let component: FormBailsComponent;
  let fixture: ComponentFixture<FormBailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormBailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
