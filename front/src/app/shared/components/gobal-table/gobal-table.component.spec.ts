import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GobalTableComponent } from './gobal-table.component';

describe('GobalTableComponent', () => {
  let component: GobalTableComponent;
  let fixture: ComponentFixture<GobalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GobalTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GobalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
