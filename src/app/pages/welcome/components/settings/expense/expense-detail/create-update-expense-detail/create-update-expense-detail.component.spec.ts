import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateExpenseDetailComponent} from './create-update-expense-detail.component';

describe('CreateUpdateExpenseDetailComponent', () => {
  let component: CreateUpdateExpenseDetailComponent;
  let fixture: ComponentFixture<CreateUpdateExpenseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateExpenseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateExpenseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
