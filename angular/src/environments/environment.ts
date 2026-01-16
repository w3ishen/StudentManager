import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'StudentManager',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44334/',
    redirectUri: baseUrl,
    clientId: 'StudentManager_App',
    responseType: 'code',
    scope: 'offline_access StudentManager',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44334',
      rootNamespace: 'StudentManager',
    },
  },
} as Environment;
