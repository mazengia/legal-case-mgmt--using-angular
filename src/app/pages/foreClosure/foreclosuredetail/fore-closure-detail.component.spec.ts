import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForeClosureDetailComponent} from './fore-closure-detail.component';

describe('ForeclosuredetailComponent', () => {
  let component: ForeClosureDetailComponent;
  let fixture: ComponentFixture<ForeClosureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForeClosureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForeClosureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
