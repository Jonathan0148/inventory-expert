import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCardReportComponent } from './detail-card-report.component';

describe('DetailCardReportComponent', () => {
  let component: DetailCardReportComponent;
  let fixture: ComponentFixture<DetailCardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCardReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailCardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
