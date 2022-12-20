import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA,} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {CommonModule, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// NG
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzTagModule} from 'ng-zorro-antd/tag';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {AuthService} from './services/auth/auth.service';
import {AppHttpInterceptor} from './config/AppHttpInterceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerService} from "ng-zorro-antd/drawer";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzTreeViewModule} from "ng-zorro-antd/tree-view";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzStepsModule} from "ng-zorro-antd/steps";
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
import {AppealComponent} from "./pages/welcome/components/litigations/appeal/appeal.component";
import {
  LitigationDetailsComponent
} from "./pages/welcome/components/litigations/litigation/litigation-details/litigation-details.component";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {AdvocateComponent} from "./pages/advocate/advocate.component";
import {CreateUpdateAdvocateComponent} from "./pages/advocate/create-update-advocate/create-update-advocate.component";
import {AppointmentComponent} from "./pages/appointment/appointment.component";
import {CreateUpdateCommentComponent} from "./pages/comment/create-update-comment/create-update-comment.component";
import {
  CreateUpdateAppointmentComponent
} from "./pages/appointment/create-update-appointment/create-update-appointment.component";
import {CreateUpdateReportComponent} from "./pages/report/create-update-report/create-update-report.component";
import {
  CreateUpdateInterveneComponent
} from "./pages/intervene/create-update-intervene/create-update-intervene.component";
import {
  CreateUpdateForeClosureComponent
} from "./pages/foreClosure/create-update-fore-closure/create-update-fore-closure.component";
import {CommentComponent} from "./pages/comment/comment.component";
import {ForeClosureComponent} from "./pages/foreClosure/fore-closure.component";
import {InterveneComponent} from "./pages/intervene/intervene.component";
import {ReportComponent} from "./pages/report/report.component";
import {
  MortageDetailComponent
} from "./pages/welcome/components/settings/mortgage-types/mortage-detail/mortage-detail.component";
import {
  CreateUpdateMortageDetailComponent
} from "./pages/welcome/components/settings/mortgage-types/mortage-detail/create-update-mortage-detail/create-update-mortage-detail.component";
import {
  ExpenseDetailComponent
} from "./pages/welcome/components/settings/expense/expense-detail/expense-detail.component";
import {
  CreateUpdateExpenseDetailComponent
} from "./pages/welcome/components/settings/expense/expense-detail/create-update-expense-detail/create-update-expense-detail.component";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {ForeClosureDetailComponent} from "./pages/foreClosure/foreclosuredetail/fore-closure-detail.component";
// ZORRO

registerLocaleData(en);

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        IconsProviderModule,
        NzLayoutModule,
        NzMenuModule,
        NzDividerModule,
        NzGridModule,
        NzDropDownModule,
        NzAvatarModule,
        NzTagModule,
        CommonModule,
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
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: ['http://10.1.22.72:8083/*', 'http://10.1.12.70:8083/*'],
                sendAccessToken: true,
            },
        }),
        NzCheckboxModule,
        NzBreadCrumbModule,
        NzCardModule,
        NzToolTipModule,
        NzRadioModule,
    ],
  declarations: [
    AppComponent,
    ForeClosureDetailComponent,
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
    AdvocateComponent,
    CreateUpdateAdvocateComponent,
    AppointmentComponent,
    CreateUpdateCommentComponent,
    CreateUpdateAppointmentComponent,
    CreateUpdateReportComponent,
    CreateUpdateInterveneComponent,
    CreateUpdateForeClosureComponent,
    CommentComponent,
    ForeClosureComponent,
    InterveneComponent,
    ReportComponent,
    MortageDetailComponent,
    CreateUpdateMortageDetailComponent,
    CreateUpdateExpenseDetailComponent,
    ExpenseDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    {provide: NZ_I18N, useValue: en_US},
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true},
    NzNotificationService,
    NzMessageService,
    NzDrawerService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
