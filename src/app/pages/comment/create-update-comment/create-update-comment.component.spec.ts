import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateCommentComponent} from './create-update-comment.component';

describe('CreateUpdateCommentComponent', () => {
  let component: CreateUpdateCommentComponent;
  let fixture: ComponentFixture<CreateUpdateCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
