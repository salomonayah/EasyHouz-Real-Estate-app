import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { BasicAuthInterceptor } from './basic-auth.interceptor';
import { ErrorInterceptor } from './error.interceptor';

export const interceptors = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BasicAuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
];

