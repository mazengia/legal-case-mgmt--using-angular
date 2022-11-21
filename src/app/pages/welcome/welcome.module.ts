import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';

// NG
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzStepsModule } from 'ng-zorro-antd/steps';
// ZORRO

import { WelcomeComponent } from './welcome.component';
import { ExpensesComponent } from './components/settings/expense/expenses.component';
import { CreateExpenseTypeComponent } from './components/settings/expense/create-expense-type/create-expense-type.component';
import { CaseTypesComponent } from './components/settings/case-type/case-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CreateCaseTypeComponent } from './components/settings/case-type/create-case-type/create-case-type.component';
import { AuctionTypesComponent } from './components/settings/auction-types/auction-types.component';
import { CreateAuctionTypeComponent } from './components/settings/auction-types/create-auction-type/create-auction-type.component';
import { MailTypesComponent } from './components/settings/mail-types/mail-types.component';
import { CreateMailTypesComponent } from './components/settings/mail-types/create-mail-types/create-mail-types.component';
import { MortgageTypesComponent } from './components/settings/mortgage-types/mortgage-types.component';
import { CreateMortgageTypeComponent } from './components/settings/mortgage-types/create-mortgage-type/create-mortgage-type.component';
import { LitigationsComponent } from './components/litigations/litigation/litigations.component';
import { CreateLitigationComponent } from './components/litigations/litigation/create-litigation/create-litigation.component';
import { AppealComponent } from './components/litigations/appeal/appeal.component';
import { LitigationDetailsComponent } from './components/litigations/litigation/litigation-details/litigation-details.component';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    NzDividerModule,
    NzTableModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSkeletonModule,
    NzTagModule,
    NzIconModule,
    NzSelectModule,
    NzInputNumberModule,
    NzPageHeaderModule,
    NzDescriptionsModule,
    NzDropDownModule,
    NzTreeViewModule,
    NzSwitchModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzStepsModule,
  ],
  declarations: [
    WelcomeComponent,
    ExpensesComponent,
    CreateExpenseTypeComponent,
    CaseTypesComponent,
    CreateCaseTypeComponent,
    AuctionTypesComponent,
    CreateAuctionTypeComponent,
    MailTypesComponent,
    CreateMailTypesComponent,
    MortgageTypesComponent,
    CreateMortgageTypeComponent,
    LitigationsComponent,
    CreateLitigationComponent,
    AppealComponent,
    LitigationDetailsComponent,
  ],
  providers: [NzNotificationService],
  exports: [WelcomeComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class WelcomeModule {}
