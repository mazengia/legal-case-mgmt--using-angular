import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageTypesComponent } from './mortgage-types.component';

describe('MortgageTypesComponent', () => {
  let component: MortgageTypesComponent;
  let fixture: ComponentFixture<MortgageTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MortgageTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
