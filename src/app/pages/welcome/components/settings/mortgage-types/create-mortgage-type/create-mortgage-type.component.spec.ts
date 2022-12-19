import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateMortgageTypeComponent} from './create-mortgage-type.component';

describe('CreateMortgageTypeComponent', () => {
  let component: CreateMortgageTypeComponent;
  let fixture: ComponentFixture<CreateMortgageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMortgageTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMortgageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
