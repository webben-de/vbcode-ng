import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SessionState } from '../session.state';

export default function authenticationGuard(): CanActivateFn {
  return () => {
    const store = inject(Store);
    const router = inject(Router);
    const user = store.selectOnce(SessionState.session);
    return true;
    // return user.pipe(
    //   filter((user) => !!user),
    //   map((d) => {
    //     if (!d) {
    //       router.navigate([ROUTES.root, ROUTES.login]);
    //       return false;
    //     } else {
    //       return true;
    //     }
    //   })
    // );
  };
}
