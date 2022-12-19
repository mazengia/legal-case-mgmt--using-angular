import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MailTypesComponent} from './mail-types.component';

describe('MailTypesComponent', () => {
  let component: MailTypesComponent;
  let fixture: ComponentFixture<MailTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MailTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
