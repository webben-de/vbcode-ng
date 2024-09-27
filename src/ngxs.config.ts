import type { NgxsModuleOptions } from '@ngxs/store';

export const ngxsConfig: NgxsModuleOptions = {
  compatibility: {
    strictContentSecurityPolicy: true,
  },
  selectorOptions: {
    suppressErrors: false,
  },
};
