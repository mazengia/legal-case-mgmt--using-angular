import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MortageDetailComponent} from './mortage-detail.component';

describe('MortageDetailComponent', () => {
  let component: MortageDetailComponent;
  let fixture: ComponentFixture<MortageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortageDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
