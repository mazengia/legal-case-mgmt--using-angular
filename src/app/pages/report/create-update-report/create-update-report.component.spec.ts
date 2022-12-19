import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateReportComponent} from './create-update-report.component';

describe('CreateUpdateReportComponent', () => {
  let component: CreateUpdateReportComponent;
  let fixture: ComponentFixture<CreateUpdateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
