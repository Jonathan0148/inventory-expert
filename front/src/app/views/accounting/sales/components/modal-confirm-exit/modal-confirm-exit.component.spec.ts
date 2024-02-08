import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmExitComponent } from './modal-confirm-exit.component';

describe('ModalConfirmExitComponent', () => {
  let component: ModalConfirmExitComponent;
  let fixture: ComponentFixture<ModalConfirmExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfirmExitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfirmExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
