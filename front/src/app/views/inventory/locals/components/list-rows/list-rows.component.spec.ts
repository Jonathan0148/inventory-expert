import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRowsComponent } from './list-rows.component';

describe('ListRowsComponent', () => {
  let component: ListRowsComponent;
  let fixture: ComponentFixture<ListRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
