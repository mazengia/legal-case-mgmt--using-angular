import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateAdvocateComponent} from './create-update-advocate.component';

describe('CreateUpdateAdvocateComponent', () => {
  let component: CreateUpdateAdvocateComponent;
  let fixture: ComponentFixture<CreateUpdateAdvocateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAdvocateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAdvocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
