import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { ROUTES } from './ROUTES';
import { dispatch } from '@ngxs/store';
import { setAuthSession } from './session.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule],
})
export class AuthComponent {
  router = inject(Router);
  snack = inject(MatSnackBar);
  supabase = inject(SupabaseService);
  formBuilder = inject(FormBuilder);
  setAuthSession = dispatch(setAuthSession);
  /**
   *
   */
  ROUTES = ROUTES;
  loading = false;
  /**
   *
   */
  googleLogin() {
    try {
      this.supabase.signInGoogle();

      this.router.navigate([ROUTES.root, ROUTES.user]);
    } catch (error) {
      this.snack.open('Error logging in with Google', 'Dismiss');
    }
  }

  signInForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;
      const { error } = await this.supabase.signInPW(email, password);
      this.router.navigate([ROUTES.root, ROUTES.user]);
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
