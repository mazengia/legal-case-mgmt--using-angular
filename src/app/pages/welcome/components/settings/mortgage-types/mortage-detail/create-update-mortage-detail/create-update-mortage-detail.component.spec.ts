import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateMortageDetailComponent} from './create-update-mortage-detail.component';

describe('CreateUpdateMortageDetailComponent', () => {
  let component: CreateUpdateMortageDetailComponent;
  let fixture: ComponentFixture<CreateUpdateMortageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateMortageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateMortageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
