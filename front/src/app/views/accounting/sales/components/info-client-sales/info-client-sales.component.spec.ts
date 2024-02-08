import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClientSalesComponent } from './info-client-sales.component';

describe('InfoClientSalesComponent', () => {
  let component: InfoClientSalesComponent;
  let fixture: ComponentFixture<InfoClientSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoClientSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoClientSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
