import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTypeSimpleReportComponent } from './detail-type-simple-report.component';

describe('DetailTypeSimpleReportComponent', () => {
  let component: DetailTypeSimpleReportComponent;
  let fixture: ComponentFixture<DetailTypeSimpleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTypeSimpleReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTypeSimpleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
