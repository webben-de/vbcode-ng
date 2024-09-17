import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';

export default function authenticationGuard(): CanActivateFn {
  return () => {
    const supabase = inject(SupabaseService);
    const router = inject(Router);

    if (supabase.session) {
      return true;
    }
    return router.navigate(['/login']);
  };
}
