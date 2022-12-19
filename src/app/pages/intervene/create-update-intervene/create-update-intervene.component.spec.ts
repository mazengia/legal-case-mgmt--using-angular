import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateInterveneComponent} from './create-update-intervene.component';

describe('CreateUpdateInterveneComponent', () => {
  let component: CreateUpdateInterveneComponent;
  let fixture: ComponentFixture<CreateUpdateInterveneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateInterveneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateInterveneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
