import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateAppointmentComponent} from './create-update-appointment.component';

describe('CreateUpdateAppointmentComponent', () => {
  let component: CreateUpdateAppointmentComponent;
  let fixture: ComponentFixture<CreateUpdateAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
