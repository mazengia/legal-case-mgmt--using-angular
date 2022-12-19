import {Component, OnInit} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {AuthService} from '../../services/auth/auth.service';
import {EmployeeService} from '../../services/employee/employee.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  branchName: string = '';
  branchCode: string = '';
  greetingText: string = '';

  constructor(
    private authService: AuthService,
    private oauthService: OAuthService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployee();
    const currentTime = new Date().getHours();

    if (currentTime < 12) {
      this.greetingText = 'Good Morning';
    } else if (currentTime < 18) {
      this.greetingText = 'Good Afternoon';
    } else {
      this.greetingText = 'Good Evening';
    }
  }

  public get fullName() {
    return (<any>this.authService.getTokenDetails()).name;
  }

  public get userName() {
    const cliams = this.oauthService.getIdentityClaims();
    if (!cliams) {
      return null;
    }

    return (cliams as any).given_name;
  }

  getEmployee() {
    const employeeId = this.authService.getEmployeeId();
    this.employeeService
      .getEmployeeByEmployeeId(employeeId)
      .subscribe((data: any) => {
        this.branchName = data.branch.name;
        this.branchCode = data.branch.code;
      });
  }
}
