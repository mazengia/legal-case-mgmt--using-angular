import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuctionTypeService} from 'src/app/services/auction-type/auction-type.service';

@Component({
  selector: 'app-create-auction-type',
  templateUrl: './create-auction-type.component.html',
  styleUrls: ['./create-auction-type.component.scss'],
})
export class CreateAuctionTypeComponent implements OnInit {
  createAuctionTypeForm!: FormGroup;
  loading!: boolean;
  isCreateMode!: boolean;

  auctionTypeId!: number;

  constructor(
    private auctionTypeService: AuctionTypeService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute
  ) {
    this.auctionTypeId = Number(
      this.activatedRoute.snapshot.paramMap.get('auctionTypeId')
    );
    console.log('Auction type Id: ', this.auctionTypeId);
    this.createAuctionTypeForm = this.formBuilder.group({
      auctionTypeName: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.isCreateMode = !this.auctionTypeId;
    this.auctionTypeService
      .getAuctionType(Number(this.auctionTypeId))
      .subscribe((res: any) => {
        console.log(res);
        this.createAuctionTypeForm.patchValue(res);
      });
  }

  submitAuction = () => {
    if (this.isCreateMode) {
      this.saveAuctionType();
      console.log('creating');
    } else {
      this.updateAuctionType();
      console.log('updating');
    }
  };

  updateAuctionType = () => {
    this.loading = true;
    this.auctionTypeService
      .updateAuctionType(this.auctionTypeId, this.createAuctionTypeForm?.value)
      .subscribe(
        (res: any) => {
          this.loading = false;
          this.notification.create(
            'success',
            'Success!',
            `You have successfully updated auction type ${this.auctionTypeId}`
          );
        },
        (error: any) => {
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Expense Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };

  saveAuctionType = () => {
    this.loading = true;
    console.log(this.createAuctionTypeForm?.value);
    this.auctionTypeService
      .createAuctionType(this.createAuctionTypeForm?.value)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.createAuctionTypeForm.reset();
        },
        (error: any) => {
          console.log(error);
          this.loading = false;
          this.notification.create(
            'error',
            'Creating Expense Type Failed!',
            `error.error.apierror.message`
          );
        }
      );
  };
}
