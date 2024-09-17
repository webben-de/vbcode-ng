/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select } from '@ngxs/store';
import { SessionState } from '../app/session.state';
import { TranslocoModule } from '@jsverse/transloco';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { SupabaseService } from '../services/supabase.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-landing-page',
  standalone: true,
  imports: [TranslocoModule, CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <body class="bg-gray-100">
      <header class="bg-blue-500 text-white p-4 text-center">
        <h1 class="text-3xl font-bold">Mein Profil</h1>
      </header>

      <main class="container mx-auto p-4">
        <section class="bg-white rounded-lg shadow-md p-6 my-4">
          <h2 class="text-2xl font-bold mb-4">Persönliche Informationen</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p class="font-bold">Name:</p>
              <p id="username">{{ session()?.user?.email }}</p>
            </div>
            <div>
              <p class="font-bold">E-Mail:</p>
              <p id="email">Lade...</p>
            </div>
            <form [formGroup]="updateProfileForm" (ngSubmit)="updateProfile()" class="form-widget">
              <div>
                <img *ngIf="_avatarUrl" [src]="_avatarUrl" alt="Avatar" class="avatar image" style="height: 150px; width: 150px" />
              </div>
              <div *ngIf="!_avatarUrl" class="avatar no-image" style="height: 150px; width: 150px"></div>
              <div style="width: 150px">
                <label class="button primary block" for="single">
                  {{ uploading ? 'Uploading ...' : 'Upload' }}
                </label>
                <input type="file" formControlName="avatar_url" accept="image/*" (change)="uploadAvatar($event)" />
              </div>
            </form>
          </div>
        </section>

        <section class="bg-white rounded-lg shadow-md p-6 my-4">
          <h2 class="text-2xl font-bold mb-4">Meine Statistiken</h2>
          <p>Hier werden deine persönlichen Statistiken angezeigt, sobald du Spiele erfasst hast.</p>
          <div id="stats-container"></div>
        </section>
      </main>

      <footer class="bg-gray-200 text-center p-4">
        <p>&copy; 2023 SV Beyendorf Volleyball</p>
      </footer>
    </body>
  `,
})
export class UserLandingPageComponent implements OnInit {
  session = select(SessionState.session);
  updateProfileForm = new FormGroup({
    avatar_url: new FormControl<string | null>(null),
  });

  get avatarUrl() {
    return this.updateProfileForm.value.avatar_url as string;
  }

  async updateAvatar(event: string): Promise<void> {
    this.updateProfileForm.patchValue({
      avatar_url: event,
    });
    // await this.updateProfile();
  }
  _avatarUrl: SafeResourceUrl | undefined;
  uploading = false;

  @Input()
  set avatarUrl(url: string | null) {
    if (url) {
      this.downloadImage(url);
    }
  }

  @Output() upload = new EventEmitter<string>();

  constructor(private readonly supabase: SupabaseService, private readonly dom: DomSanitizer) {}
  ngOnInit(): void {
    console.log('juhu');
  }
  updateProfile() {
    // this.supabase.updateProfile(this.updateProfileForm.value);
  }
  async downloadImage(path: string) {
    try {
      const { data } = await this.supabase.downLoadImage(path);
      if (data instanceof Blob) {
        this._avatarUrl = this.dom.bypassSecurityTrustResourceUrl(URL.createObjectURL(data));
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error downloading image: ', error.message);
      }
    }
  }

  async uploadAvatar(event: any) {
    console.log('muh');
    try {
      this.uploading = true;
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      await this.supabase.uploadAvatar(filePath, file);
      this.upload.emit(filePath);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.uploading = false;
    }
  }
}
