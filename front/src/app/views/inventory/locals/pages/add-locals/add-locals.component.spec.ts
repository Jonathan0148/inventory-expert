import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocalsComponent } from './add-locals.component';

describe('AddLocalsComponent', () => {
  let component: AddLocalsComponent;
  let fixture: ComponentFixture<AddLocalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLocalsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
