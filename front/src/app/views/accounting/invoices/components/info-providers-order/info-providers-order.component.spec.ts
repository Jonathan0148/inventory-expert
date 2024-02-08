import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProvidersOrderComponent } from './info-providers-order.component';

describe('InfoProvidersOrderComponent', () => {
  let component: InfoProvidersOrderComponent;
  let fixture: ComponentFixture<InfoProvidersOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProvidersOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoProvidersOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
