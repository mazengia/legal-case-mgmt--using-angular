import {AuthConfig} from 'angular-oauth2-oidc';
import {environment} from 'src/environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.ISSUER_URL,

  redirectUri: window.location.origin + '/welcome',
  clientId: 'frontend',
  responseType: 'code',
  requireHttps: false,
  showDebugInformation: true,
  scope: 'openid profile email',
  //   scope : 'profile',
  timeoutFactor: 0.01,

  clearHashAfterLogin: false,
};
