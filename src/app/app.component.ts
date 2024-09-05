import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { type MatStepper, MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SupabaseService } from './supabase.service';
import hints from './hints';
type PlTyp = {
  nb: number;
  name: string;
};
type abbMap = {
  abbr: string;
  name: string;
};

@Component({
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    CommonModule,
    MatStepperModule,
    AuthComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  supabase = inject(SupabaseService);
  actions = this.supabase.getActions();
  title = 'vbcode-ng';
  codeInFG = new FormGroup({
    pl_date: new FormControl<Date>(new Date(), Validators.required),
    ga_id: new FormControl<string>('', Validators.required),
    pl_number: new FormControl<PlTyp | null>(null, Validators.required),
    kind: new FormControl<abbMap | null>(null, Validators.required),
    char: new FormControl<abbMap | null>(null, Validators.required),
    grade: new FormControl<abbMap | null>(null, Validators.required),
  });

  hint_texts: {
    [kind: string]: {
      [grade: string]: string;
    };
  } = hints;
  pl: PlTyp[] = [
    { nb: 10, name: 'Ben' },
    { nb: 29, name: 'Ka' },
    { nb: 15, name: 'Tu' },
    { nb: 22, name: 'Ma' },
    { nb: 77, name: 'Ba' },
    { nb: 17, name: 'An' },
    { nb: 42, name: 'To' },
    { nb: 14, name: 'Mi' },
    { nb: 7, name: 'Jo' },
    { nb: 4, name: 'Be' },
  ].sort((a, b) => a.nb - b.nb);
  /**
   *
   */
  kind_options: abbMap[] = [
    { abbr: 'S', name: 'Serve' },
    { abbr: 'R', name: 'Recieve' },
    { abbr: 'A', name: 'A' },
    { abbr: 'B', name: 'Block' },
    { abbr: 'D', name: 'Def' },
    { abbr: 'E', name: 'Set' },
    { abbr: 'F', name: 'Free' },
  ];
  /**
   * 
        
   */
  char_options: abbMap[] = [
    { abbr: 'H', name: 'High' },
    { abbr: 'M', name: 'Medium' },
    { abbr: 'Q', name: 'Quick' },
    { abbr: 'T', name: 'Tense' },
    { abbr: 'U', name: 'Super' },
    { abbr: 'F', name: 'Fast' },
    { abbr: 'O', name: 'Other' },
  ];
  /**
   *
   */
  grad_options: abbMap[] = [
    { abbr: '#', name: '#' },
    { abbr: '+', name: '+' },
    { abbr: '!', name: '!' },
    { abbr: '/', name: '/' },
    { abbr: '-', name: '-' },
    { abbr: '=', name: '=' },
  ];
  @ViewChild('stepper') stepper!: MatStepper;
  /**
   *
   */
  async submit() {
    const { pl_number, pl_date } = this.codeInFG.value;
    try {
      const a = await this.supabase.createAction(this.codeInFG.value);
      console.info(a);
      this.codeInFG.reset({ pl_date });
      this.stepper.reset();
    } catch (error) {
      console.error(error);
    }
  }
  session = this.supabase.session;

  ngOnInit() {
    this.supabase.authChanges((_, session) => (this.session = session));
  }
}
