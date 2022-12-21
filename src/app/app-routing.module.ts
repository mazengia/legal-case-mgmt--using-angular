import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {ExpensesComponent} from "./pages/welcome/components/settings/expense/expenses.component";
import {
  CreateExpenseTypeComponent
} from "./pages/welcome/components/settings/expense/create-expense-type/create-expense-type.component";
import {CaseTypesComponent} from "./pages/welcome/components/settings/case-type/case-types.component";
import {
  CreateCaseTypeComponent
} from "./pages/welcome/components/settings/case-type/create-case-type/create-case-type.component";
import {AuctionTypesComponent} from "./pages/welcome/components/settings/auction-types/auction-types.component";
import {
  CreateAuctionTypeComponent
} from "./pages/welcome/components/settings/auction-types/create-auction-type/create-auction-type.component";
import {MailTypesComponent} from "./pages/welcome/components/settings/mail-types/mail-types.component";
import {
  CreateMailTypesComponent
} from "./pages/welcome/components/settings/mail-types/create-mail-types/create-mail-types.component";
import {MortgageTypesComponent} from "./pages/welcome/components/settings/mortgage-types/mortgage-types.component";
import {
  CreateMortgageTypeComponent
} from "./pages/welcome/components/settings/mortgage-types/create-mortgage-type/create-mortgage-type.component";
import {LitigationsComponent} from "./pages/welcome/components/litigations/litigation/litigations.component";
import {
  CreateLitigationComponent
} from "./pages/welcome/components/litigations/litigation/create-litigation/create-litigation.component";
import {
  LitigationDetailsComponent
} from "./pages/welcome/components/litigations/litigation/litigation-details/litigation-details.component";
import {AdvocateComponent} from "./pages/advocate/advocate.component";
import {AppointmentComponent} from "./pages/appointment/appointment.component";
import {CommentComponent} from "./pages/comment/comment.component";
import {ForeClosureComponent} from "./pages/foreClosure/fore-closure.component";
import {InterveneComponent} from "./pages/intervene/intervene.component";
import {ReportComponent} from "./pages/report/report.component";
import {
  MortageDetailComponent
} from "./pages/welcome/components/settings/mortgage-types/mortage-detail/mortage-detail.component";
import {
  ExpenseDetailComponent
} from "./pages/welcome/components/settings/expense/expense-detail/expense-detail.component";
import {ForeClosureDetailComponent} from "./pages/foreClosure/foreclosuredetail/fore-closure-detail.component";
import {AppealComponent} from "./pages/welcome/appeal/appeal.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/welcome'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'expenses', component: ExpensesComponent},
  {path: 'create-expense', component: CreateExpenseTypeComponent},
  {path: 'update-expense/:expenseId', component: CreateExpenseTypeComponent},
  {path: 'case-types', component: CaseTypesComponent},
  {path: 'create-case-type', component: CreateCaseTypeComponent},
  {path: 'update-case-type/:caseTypeId', component: CreateCaseTypeComponent},
  {path: 'auction-types', component: AuctionTypesComponent},
  {path: 'create-auction-type', component: CreateAuctionTypeComponent},
  {path: 'update-auction-type/:auctionTypeId', component: CreateAuctionTypeComponent,},
  {path: 'mail-types', component: MailTypesComponent},
  {path: 'create-mail-type', component: CreateMailTypesComponent},
  {path: 'update-mail-type/:mailNotificationTypeId', component: CreateMailTypesComponent,},
  {path: 'mortgage-types', component: MortgageTypesComponent},
  {path: 'create-mortgage-type', component: CreateMortgageTypeComponent},
  {path: 'update-mortgage-type/:mortgageTypeId', component: CreateMortgageTypeComponent,},
  {path: 'litigations', component: LitigationsComponent},
  {path: 'create-litigation', component: CreateLitigationComponent},
  {path: 'update-litigation/:litigationId', component: CreateLitigationComponent,},
  {path: 'litigation-details/:litigationId', component: LitigationDetailsComponent,},
  {path: 'fore-closure-details/:id', component: ForeClosureDetailComponent,},
  {path: 'advocate', component: AdvocateComponent},
  {path: 'appointment', component: AppointmentComponent},
  {path: 'comment', component: CommentComponent},
  {path: 'fore-closure', component: ForeClosureComponent},
  {path: 'intervene', component: InterveneComponent},
  {path: 'report', component: ReportComponent},
  {path: 'mortgage-detail', component: MortageDetailComponent},
  {path: 'expense-detail', component: ExpenseDetailComponent},
  {path: 'appeal', component: AppealComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
