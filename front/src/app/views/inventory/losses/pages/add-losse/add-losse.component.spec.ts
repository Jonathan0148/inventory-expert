import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLosseComponent } from './add-losse.component';

describe('AddLosseComponent', () => {
  let component: AddLosseComponent;
  let fixture: ComponentFixture<AddLosseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLosseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLosseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
