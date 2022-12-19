import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CaseTypesComponent} from './case-types.component';

describe('CaseTypesComponent', () => {
  let component: CaseTypesComponent;
  let fixture: ComponentFixture<CaseTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
