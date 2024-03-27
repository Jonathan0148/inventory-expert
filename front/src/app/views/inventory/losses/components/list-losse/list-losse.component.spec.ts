import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLosseComponent } from './list-losse.component';

describe('ListLosseComponent', () => {
  let component: ListLosseComponent;
  let fixture: ComponentFixture<ListLosseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLosseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLosseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
