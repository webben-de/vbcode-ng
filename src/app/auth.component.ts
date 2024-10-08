import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { dispatch } from '@ngxs/store';
import { SupabaseService } from '../services/supabase.service';
import { SVB_APP_ROUTES } from './ROUTES';
import { setAuthSession } from './session.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule],
})
export class AuthComponent {
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  private readonly supabase = inject(SupabaseService);
  private readonly formBuilder = inject(FormBuilder);
  /**
   *
   */
  setAuthSession = dispatch(setAuthSession);
  /**
   *
   */
  ROUTES = SVB_APP_ROUTES;
  loading = false;
  /**
   *
   */
  googleLogin() {
    try {
      this.supabase.signInGoogle();

      this.router.navigate([SVB_APP_ROUTES.root, SVB_APP_ROUTES.user]);
    } catch (error) {
      this.snack.open('Error logging in with Google', 'Dismiss');
    }
  }
  /**
   *
   */
  signInForm = this.formBuilder.group({
    email: '',
    password: '',
  });
  /**
   *
   */
  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      const { error } = await this.supabase.signInPW(email, password);
      this.router.navigate([SVB_APP_ROUTES.root, SVB_APP_ROUTES.user]);
      if (error) throw error;
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
