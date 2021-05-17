// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_NAME: 'ONIE - Sitio Web para Solicitudes de Licencia de Pesca',
  APP_VERSION: '1.0.0',
  INC_NAME: 'Empresa de Servicios Automatizados - Alimatic',
  EXP_PASS: 5,
  MAX_ATTEMPTS: 3,
  docsUrl: 'http://localhost:4500/',
  baseUrl: 'http://localhost:4500/api/',
  authUrl: 'http://localhost:4500/api/auth',
  userUrl: 'http://localhost:4500/api/users',
  signUpUrl: 'http://localhost:4500/api/users',
  municipaliteUrl: 'http://localhost:4500/api/utils/municipalites',
  provinceUrl: 'http://localhost:4500/api/utils/provinces',
  fisheryUrl: 'http://localhost:4500/api/utils/fishery',
  fisheryCraftUrl: 'http://localhost:4500/api/utils/fisherycraft',
  requestUrl: 'http://localhost:4500/api/request',
  requestAPUrl: 'http://localhost:4500/api/request-aquaculture-private',
  requestASUrl: 'http://localhost:4500/api/request-aquaculture-state',
  requestPPUrl: 'http://localhost:4500/api/request-platform/private',
  requestPSUrl: 'http://localhost:4500/api/request-platform/state',
  licenseUrl: 'http://localhost:4500/api/license',
  licenseAPUrl: 'http://localhost:4500/api/license/aquaculture-private',
  licenseASUrl: 'http://localhost:4500/api/license/aquaculture-state',
  licensePPUrl: 'http://localhost:4500/api/license/platform-private',
  licensePSUrl: 'http://localhost:4500/api/license/platform-state',
  penaltyUrl: 'http://localhost:4500/api/penalty',
  offenderUrl: 'http://localhost:4500/api/penalty/offender',
  uploadUrl: 'http://localhost:4500/api/uploads'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
