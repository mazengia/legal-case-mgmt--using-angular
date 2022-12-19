import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAuctionTypeComponent} from './create-auction-type.component';

describe('CreateAuctionTypeComponent', () => {
  let component: CreateAuctionTypeComponent;
  let fixture: ComponentFixture<CreateAuctionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAuctionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuctionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
