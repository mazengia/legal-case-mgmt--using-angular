import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InterveneComponent} from './intervene.component';

describe('InterveneComponent', () => {
  let component: InterveneComponent;
  let fixture: ComponentFixture<InterveneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterveneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterveneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
