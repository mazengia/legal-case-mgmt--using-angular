import {Component} from '@angular/core';
import {Event, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {authConfig} from './config/authConfig';
import {AuthService} from './services/auth/auth.service';
import {EmployeeService} from './services/employee/employee.service';
import {JwksValidationHandler} from 'angular-oauth2-oidc-jwks';

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
    // console.log("accessRoles",this.accessRoles);
  }
  hasApprovePriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-approve")) {
      return true;
    }
    return false;
  }
  hasAttorneyPriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-attorney")) {
      return true;
    }
    return false;
  }
  hasSupervisorPriVillage() {
    this.accessRoles = this.authService.getUserRoles();
    if (this.accessRoles && this.accessRoles.includes("litigation-supervisor")) {
      return true;
    }
    return false;
  }
  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndLogin().then(() => {
      this.getRoles();
      //  this.getEmployeeId();
      this.getEmployee();
      this.router.navigate(['/']).then(r => {});
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

    return (cliams as any).email;
  }

  public get fullName() {
    return (<any>this.authService.getTokenDetails()).name;
  }

  getEmployee() {
    const employeeId = this.authService.getEmployeeId();
    this.employeeService
      .getEmployeeByEmployeeId(employeeId)
      .subscribe((data: any) => {
        this.branchName = data.branch.name;
        // console.log("emil=",data.id)
        this.employeeId = data.id;
      });
  }
}
