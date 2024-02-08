import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBailsComponent } from './view-bails.component';

describe('ViewBailsComponent', () => {
  let component: ViewBailsComponent;
  let fixture: ComponentFixture<ViewBailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
