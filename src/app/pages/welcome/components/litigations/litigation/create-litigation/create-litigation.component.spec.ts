import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateLitigationComponent} from './create-litigation.component';

describe('CreateLitigationComponent', () => {
  let component: CreateLitigationComponent;
  let fixture: ComponentFixture<CreateLitigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLitigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLitigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
