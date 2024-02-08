import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTypeActivityComponent } from './info-type-activity.component';

describe('InfoTypeActivityComponent', () => {
  let component: InfoTypeActivityComponent;
  let fixture: ComponentFixture<InfoTypeActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTypeActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTypeActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
