import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LitigationDetailsComponent} from './litigation-details.component';

describe('LitigationDetailsComponent', () => {
  let component: LitigationDetailsComponent;
  let fixture: ComponentFixture<LitigationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LitigationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LitigationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
