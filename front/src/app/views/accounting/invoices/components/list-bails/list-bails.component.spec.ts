import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBailsComponent } from './list-bails.component';

describe('ListBailsComponent', () => {
  let component: ListBailsComponent;
  let fixture: ComponentFixture<ListBailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
