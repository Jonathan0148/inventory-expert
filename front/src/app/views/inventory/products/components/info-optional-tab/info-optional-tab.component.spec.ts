import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOptionalTabComponent } from './info-optional-tab.component';

describe('InfoOptionalTabComponent', () => {
  let component: InfoOptionalTabComponent;
  let fixture: ComponentFixture<InfoOptionalTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoOptionalTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoOptionalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
