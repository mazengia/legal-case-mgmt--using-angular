import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LitigationDetailsComponent } from './components/litigations/litigation/litigation-details/litigation-details.component';
import { CreateLitigationComponent } from './components/litigations/litigation/create-litigation/create-litigation.component';
import { LitigationsComponent } from './components/litigations/litigation/litigations.component';
import { AuctionTypesComponent } from './components/settings/auction-types/auction-types.component';
import { CreateAuctionTypeComponent } from './components/settings/auction-types/create-auction-type/create-auction-type.component';
import { CaseTypesComponent } from './components/settings/case-type/case-types.component';
import { CreateCaseTypeComponent } from './components/settings/case-type/create-case-type/create-case-type.component';
import { CreateExpenseTypeComponent } from './components/settings/expense/create-expense-type/create-expense-type.component';
import { ExpensesComponent } from './components/settings/expense/expenses.component';
import { CreateMailTypesComponent } from './components/settings/mail-types/create-mail-types/create-mail-types.component';
import { MailTypesComponent } from './components/settings/mail-types/mail-types.component';
import { CreateMortgageTypeComponent } from './components/settings/mortgage-types/create-mortgage-type/create-mortgage-type.component';
import { MortgageTypesComponent } from './components/settings/mortgage-types/mortgage-types.component';
import { WelcomeComponent } from './welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  // Expense
  { path: 'expenses', component: ExpensesComponent },
  { path: 'create-expense', component: CreateExpenseTypeComponent },
  { path: 'update-expense/:expenseId', component: CreateExpenseTypeComponent },
  // case type
  { path: 'case-types', component: CaseTypesComponent },
  { path: 'create-case-type', component: CreateCaseTypeComponent },
  { path: 'update-case-type/:caseTypeId', component: CreateCaseTypeComponent },
  // auction
  { path: 'auction-types', component: AuctionTypesComponent },
  { path: 'create-auction-type', component: CreateAuctionTypeComponent },
  {
    path: 'update-auction-type/:auctionTypeId',
    component: CreateAuctionTypeComponent,
  },

  // mail-type
  { path: 'mail-types', component: MailTypesComponent },
  { path: 'create-mail-type', component: CreateMailTypesComponent },
  {
    path: 'update-mail-type/:mailNotificationTypeId',
    component: CreateMailTypesComponent,
  },

  // mortgage type
  { path: 'mortgage-types', component: MortgageTypesComponent },
  { path: 'create-mortgage-type', component: CreateMortgageTypeComponent },
  {
    path: 'update-mortgage-type/:mortgageTypeId',
    component: CreateMortgageTypeComponent,
  },

  // litigations
  { path: 'litigations', component: LitigationsComponent },
  { path: 'create-litigation', component: CreateLitigationComponent },
  {
    path: 'update-litigation/:litigationId',
    component: CreateLitigationComponent,
  },
  {
    path: 'litigation-details/:litigationId',
    component: LitigationDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
