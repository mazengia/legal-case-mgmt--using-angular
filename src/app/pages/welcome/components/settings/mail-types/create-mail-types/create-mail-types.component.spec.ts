import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateMailTypesComponent} from './create-mail-types.component';

describe('CreateMailTypesComponent', () => {
  let component: CreateMailTypesComponent;
  let fixture: ComponentFixture<CreateMailTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMailTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMailTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
