import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {AuctionTypeService} from 'src/app/services/auction-type/auction-type.service';
import {AuctionType} from "../../../../../../models/auction-type";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs";
import {ForeClosureService} from "../../../../../../services/foreClosure/advocate.service";
import {ForeClosure} from "../../../../../../models/foreClosure";

@Component({
  selector: 'app-create-auction-type',
  templateUrl: './create-auction-type.component.html',
  styleUrls: ['./create-auction-type.component.scss'],
})
export class CreateAuctionTypeComponent implements OnInit {
  createAuctionTypeForm!: FormGroup;
  pageSize: number = 1000;
  submitted = false;
  foreClosure?: ForeClosure[] | undefined;
  @Input() value?: number;
  isAddMode = true;
  loading = false;
    pageIndex?: 0;

  constructor(
    private auctionTypeService: AuctionTypeService,
    private foreClosureService: ForeClosureService,
    private formBuilder: FormBuilder,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.createAuctionTypeForm = this.formBuilder.group({
      foreClosure: this.formBuilder.group(
        { foreClosureId: [null, Validators.required]} ),
      auctionTypeName: [null, [Validators.required]],
      dateAuctionConducted: [null, [Validators.required]],
      dateAuctionAnnounced: [null, [Validators.required]],
      remark: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getForeClosure( )
    this.isAddMode = !this.value;
    if (this.value) {
      this.getAuctionType();
    }

  }
  getForeClosure = () => {
    this.loading = true;
    this.foreClosureService
      .getForeAllClosure(this.pageIndex, this.pageSize)
      .subscribe(
        (res: any) => {
          setTimeout(() => {
            this.loading = false;
            this.foreClosure = res?._embedded?.foreClosureDtoes;
            console.log(this.foreClosure);
          }, 1000);
        },
        (error: any) => {
          this.loading = false;
        }
      );
  };

  getAuctionType() {
    this.auctionTypeService
      .getAuctionType(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.createAuctionTypeForm.patchValue(res);
        }
      });
  }

  onSubmit() {
    this.submitted = true;
    if (this.createAuctionTypeForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createAuctionType();
    } else {
      this.updateAuctionType();
    }
  }

  createAuctionType(): void {
    for (const key in this.createAuctionTypeForm.controls) {
      if (this.createAuctionTypeForm.controls.hasOwnProperty(key)) {
        this.createAuctionTypeForm.controls[key].markAsDirty();
        this.createAuctionTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.auctionTypeService.createAuctionType(this.createAuctionTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'AuctionType  ',
            'AuctionType  Successfully Created'
          );
        },
        (error) => {
          console.log('error = ', error)
          this.createNotification(
            'error',
            'Error',
            error.apierror.debugMessage);
        }
      );
  }

  updateAuctionType(): void {

    for (const key in this.createAuctionTypeForm.controls) {
      if (this.createAuctionTypeForm.controls.hasOwnProperty(key)) {
        this.createAuctionTypeForm.controls[key].markAsDirty();
        this.createAuctionTypeForm.controls[key].updateValueAndValidity();
      }
    }
    this.auctionTypeService
      .updateAuctionType(this.value, this.createAuctionTypeForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'AuctionType',
            'AuctionType Successfully Updated'
          );
        },
        error => {
          this.createNotification(
            'error',
            'Error',
            error.apierror.debugMessage);
        }
      );
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
