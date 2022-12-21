import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateAppealComponent} from './create-update-appeal.component';

describe('CreateUpdateAppealComponent', () => {
  let component: CreateUpdateAppealComponent;
  let fixture: ComponentFixture<CreateUpdateAppealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateAppealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateAppealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
