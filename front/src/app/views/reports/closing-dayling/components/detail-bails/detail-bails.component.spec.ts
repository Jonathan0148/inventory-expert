import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBailsComponent } from './detail-bails.component';

describe('DetailBailsComponent', () => {
  let component: DetailBailsComponent;
  let fixture: ComponentFixture<DetailBailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
