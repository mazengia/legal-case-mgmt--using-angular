import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTypesComponent } from './auction-types.component';

describe('AuctionTypesComponent', () => {
  let component: AuctionTypesComponent;
  let fixture: ComponentFixture<AuctionTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuctionTypesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
