
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { dispatch } from '@ngxs/store';
import { SupabaseService } from '../services/supabase.service';
import { SVB_APP_ROUTES } from './ROUTES';
import { setAuthSession } from './session.state';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <!-- Logo/Header Section -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mb-4">
            <mat-icon class="!text-4xl !w-10 !h-10 text-white">sports_volleyball</mat-icon>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">S(VB) Code</h1>
          <p class="text-gray-600">Melde dich an, um fortzufahren</p>
        </div>

        <!-- Login Card -->
        <mat-card class="!p-8 !shadow-xl">
          <mat-card-content>
            <!-- Email/Password Login Form -->
            <form [formGroup]="signInForm" (ngSubmit)="onSubmit()" class="space-y-6">
              <div>
                <mat-form-field class="w-full" appearance="outline">
                  <mat-label>E-Mail</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="deine@email.de" [disabled]="isLoading()" />
                  <mat-icon matPrefix class="mr-2">email</mat-icon>
                  @if (signInForm.get('email')?.hasError('required') && signInForm.get('email')?.touched) {
                  <mat-error>E-Mail ist erforderlich</mat-error>
                  } @if (signInForm.get('email')?.hasError('email') && signInForm.get('email')?.touched) {
                  <mat-error>Bitte gültige E-Mail eingeben</mat-error>
                  }
                </mat-form-field>
              </div>

              <div>
                <mat-form-field class="w-full" appearance="outline">
                  <mat-label>Passwort</mat-label>
                  <input
                    matInput
                    [type]="hidePassword() ? 'password' : 'text'"
                    formControlName="password"
                    placeholder="Dein Passwort"
                    [disabled]="isLoading()"
                  />
                  <mat-icon matPrefix class="mr-2">lock</mat-icon>
                  <button mat-icon-button matSuffix type="button" (click)="hidePassword.set(!hidePassword())" [disabled]="isLoading()">
                    <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                  @if (signInForm.get('password')?.hasError('required') && signInForm.get('password')?.touched) {
                  <mat-error>Passwort ist erforderlich</mat-error>
                  } @if (signInForm.get('password')?.hasError('minlength') && signInForm.get('password')?.touched) {
                  <mat-error>Passwort muss mindestens 6 Zeichen lang sein</mat-error>
                  }
                </mat-form-field>
              </div>

              @if (errorMessage()) {
              <div class="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <mat-icon class="text-red-600">error</mat-icon>
                <div class="flex-1">
                  <p class="text-sm text-red-800 font-medium">Anmeldefehler</p>
                  <p class="text-sm text-red-600">{{ errorMessage() }}</p>
                </div>
              </div>
              }

              <button mat-raised-button color="primary" type="submit" class="w-full !py-3 !text-lg" [disabled]="signInForm.invalid || isLoading()">
                @if (isLoading()) {
                <ng-container>
                  <mat-spinner diameter="20" class="inline-block mr-2"></mat-spinner>
                  <span>Anmelden...</span>
                </ng-container>
                } @else {
                <ng-container>
                  <mat-icon class="mr-2">login</mat-icon>
                  <span>Anmelden</span>
                </ng-container>
                }
              </button>
            </form>

            <!-- Divider -->
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-white text-gray-500">oder</span>
              </div>
            </div>

            <!-- Google Login -->
            <button mat-stroked-button class="w-full !py-3 !text-base" (click)="googleLogin()" [disabled]="isLoading()">
              <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Mit Google anmelden
            </button>
          </mat-card-content>
        </mat-card>

        <!-- Back to Home Link -->
        <div class="text-center mt-6">
          <a [routerLink]="[ROUTES.root]" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
            <mat-icon class="!text-sm !w-4 !h-4 align-middle mr-1">arrow_back</mat-icon>
            Zurück zur Startseite
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      mat-card {
        border-radius: 16px !important;
      }

      mat-spinner {
        display: inline-block;
        vertical-align: middle;
      }
    `,
  ],
})
export class AuthComponent {
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  private readonly supabase = inject(SupabaseService);
  private readonly formBuilder = inject(FormBuilder);

  readonly ROUTES = SVB_APP_ROUTES;
  setAuthSession = dispatch(setAuthSession);

  // State
  isLoading = signal(false);
  hidePassword = signal(true);
  errorMessage = signal<string>('');

  // Form
  signInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async googleLogin(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const { error } = await this.supabase.signInGoogle();

      if (error) {
        throw error;
      }

      // Only navigate on success
      await this.router.navigate([this.ROUTES.root, this.ROUTES.user]);
      this.snack.open('Erfolgreich mit Google angemeldet', 'Schließen', { duration: 3000 });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Fehler bei der Anmeldung mit Google';
      this.errorMessage.set(message);
      this.snack.open(message, 'Schließen', { duration: 5000 });
    } finally {
      this.isLoading.set(false);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    try {
      this.isLoading.set(true);
      this.errorMessage.set('');

      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;

      // Attempt login
      const { error } = await this.supabase.signInPW(email, password);

      // Check for error BEFORE navigating
      if (error) {
        throw error;
      }

      // Only navigate on successful login
      await this.router.navigate([this.ROUTES.root, this.ROUTES.user]);
      this.snack.open('Erfolgreich angemeldet', 'Schließen', { duration: 3000 });
    } catch (error) {
      // Handle login error
      let message = 'Ein unbekannter Fehler ist aufgetreten';

      if (error instanceof Error) {
        // Provide user-friendly error messages
        if (error.message.includes('Invalid login credentials')) {
          message = 'Ungültige E-Mail oder Passwort';
        } else if (error.message.includes('Email not confirmed')) {
          message = 'Bitte bestätige deine E-Mail-Adresse';
        } else {
          message = error.message;
        }
      }

      this.errorMessage.set(message);
      this.snack.open(message, 'Schließen', { duration: 5000 });
    } finally {
      this.isLoading.set(false);
    }
  }
}
