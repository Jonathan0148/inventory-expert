import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBailsComponent } from './add-bails.component';

describe('AddBailsComponent', () => {
  let component: AddBailsComponent;
  let fixture: ComponentFixture<AddBailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
