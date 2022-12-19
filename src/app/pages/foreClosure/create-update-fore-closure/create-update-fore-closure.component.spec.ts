import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateForeClosureComponent} from './create-update-fore-closure.component';

describe('CreateUpdateForeClosureComponent', () => {
  let component: CreateUpdateForeClosureComponent;
  let fixture: ComponentFixture<CreateUpdateForeClosureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateForeClosureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateForeClosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
