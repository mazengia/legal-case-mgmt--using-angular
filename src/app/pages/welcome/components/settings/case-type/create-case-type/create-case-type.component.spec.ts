import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaseTypeComponent } from './create-case-type.component';

describe('CreateCaseTypeComponent', () => {
  let component: CreateCaseTypeComponent;
  let fixture: ComponentFixture<CreateCaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCaseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
