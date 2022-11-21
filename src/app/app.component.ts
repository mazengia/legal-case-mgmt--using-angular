import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from './config/authConfig';
import { AuthService } from './pages/services/auth/auth.service';
import { EmployeeService } from './pages/services/employee/employee.service';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed = true;
  accessRoles: any;
  branchName: any;
  employeeId: any;
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd) {
        this.loading = false;
      }
    });

    this.configure();
  }

  getRoles() {
    this.accessRoles = this.authService.getUserRoles();
    console.log(this.accessRoles);
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.getRoles();
      //  this.getEmployeeId();
      this.getEmployee();
      this.router.navigate(['/home']);
    });
    this.oauthService.setStorage(localStorage);
    this.oauthService.setupAutomaticSilentRefresh();
  }

  ngOnInit() {
    this.getRoles();
  }

  public onLogOut() {
    this.oauthService.logOut();
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public get userName() {
    const cliams = this.oauthService.getIdentityClaims();
    if (!cliams) {
      return null;
    }

    return (cliams as any).given_name;
  }

  public get fullName() {
    return (<any>this.authService.getTokenDetails()).name;
  }

  getEmployee() {
    const employeeId = this.authService.getEmployeeId();
    this.employeeService
      .getEmployeeByemployeeId(employeeId)
      .subscribe((data: any) => {
        this.branchName = data.branch.name;
        this.employeeId = data.id;
      });
  }
}
