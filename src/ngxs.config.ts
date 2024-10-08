import { NoopNgxsExecutionStrategy, type NgxsModuleOptions } from '@ngxs/store';

export const ngxsConfig: NgxsModuleOptions = {
  developmentMode: true,
  compatibility: {
    strictContentSecurityPolicy: true,
  },
  selectorOptions: {
    suppressErrors: false,
  },
  executionStrategy: NoopNgxsExecutionStrategy,
};
