import { CommonModule } from "@angular/common";
import { Component, type OnInit, ViewChild, inject } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { type MatStepper, MatStepperModule } from "@angular/material/stepper";
import { RouterModule } from "@angular/router";
import { AuthComponent } from "./auth.component";
import hints from "./hints";
import { SupabaseService } from "./supabase.service";

type PlTyp = {
	id: string;
	trikot: number;
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
		MatSelectModule,
		CommonModule,
		MatStepperModule,
		AuthComponent,
	],
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent implements OnInit {
	supabase = inject(SupabaseService);
	actions = this.supabase.getActions();
	title = "vbcode-ng";
	codeInFG = new FormGroup({
		pl_date: new FormControl<Date>(new Date(), Validators.required),
		game_id: new FormControl<string>("", Validators.required),
		player_id: new FormControl<PlTyp | null>(null, Validators.required),
		kind: new FormControl<abbMap | null>(null, Validators.required),
		char: new FormControl<abbMap | null>(null, Validators.required),
		grade: new FormControl<abbMap | null>(null, Validators.required),
	});

	hint_texts: {
		[kind: string]: {
			[grade: string]: string;
		};
	} = hints;
	player = this.supabase.getPlayers();
	events = this.supabase.getEvents();
	/**
	 *
	 */
	kind_options: abbMap[] = [
		{ abbr: "S", name: "Serve" },
		{ abbr: "R", name: "Recieve" },
		{ abbr: "A", name: "A" },
		{ abbr: "B", name: "Block" },
		{ abbr: "D", name: "Def" },
		{ abbr: "E", name: "Set" },
		{ abbr: "F", name: "Free" },
	];
	/**
   * 
        
   */
	char_options: abbMap[] = [
		{ abbr: "H", name: "High" },
		{ abbr: "M", name: "Medium" },
		{ abbr: "Q", name: "Quick" },
		{ abbr: "T", name: "Tense" },
		{ abbr: "U", name: "Super" },
		{ abbr: "F", name: "Fast" },
		{ abbr: "O", name: "Other" },
	];
	/**
	 *
	 */
	grad_options: abbMap[] = [
		{ abbr: "#", name: "#" },
		{ abbr: "+", name: "+" },
		{ abbr: "!", name: "!" },
		{ abbr: "/", name: "/" },
		{ abbr: "-", name: "-" },
		{ abbr: "=", name: "=" },
	];
	@ViewChild("stepper") stepper!: MatStepper;
	/**
	 *
	 */
	async submit() {
		const { pl_date, game_id } = this.codeInFG.value;
		const payload = {
			player_id: this.codeInFG.controls.player_id.value?.id,
			kind: this.codeInFG.controls.kind.value?.abbr,
			character: this.codeInFG.controls.char.value?.abbr,
			grade: this.codeInFG.controls.grade.value?.abbr,
			game_id: this.codeInFG.controls.game_id.value,
		};
		try {
			const a = await this.supabase.createAction(payload);
			this.actions = this.supabase.getActions();
			this.codeInFG.reset({ pl_date, game_id });
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
