import { CommonModule } from "@angular/common";
import { Component, type OnInit, ViewChild } from "@angular/core";
import {
	FormControl,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {
	MatCommonModule,
	NativeDateAdapter,
	provideNativeDateAdapter,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { type MatStepper, MatStepperModule } from "@angular/material/stepper";
import { RouterModule } from "@angular/router";
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
	],
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {
	title = "vbcode-ng";
	codeInFG = new FormGroup({
		pl_date: new FormControl<Date>(new Date(), Validators.required),
		ga_id: new FormControl<string>("", Validators.required),
		pl_number: new FormControl<PlTyp | null>(null, Validators.required),
		kind: new FormControl<abbMap | null>(null, Validators.required),
		char: new FormControl<abbMap | null>(null, Validators.required),
		grade: new FormControl<abbMap | null>(null, Validators.required),
	});

	hint_texts: {
		[kind: string]: {
			[grade: string]: string;
		};
	} = {
		S: {
			"#": "Punktgewinn",
			"+": "Guter Aufschlag (nur noch Highball beim Gegner möglich)",
			"!": "Akzeptabler Aufschlag (gn. Zuspieler werden Optionen minimiert)",
			"/": "Sehr guter Aufschlag (kein gn. Angriff möglich)",
			"-": "Schlechter Aufschlag (gute oder perfekte gn. Annahme)",
			"=": "Fehler (Punkt Gegner)",
		},
		R: {
			"#": "Perfekte Annahme",
			"+": "Gute Annahme (nähe perfekter Zuspielsituation)",
			"!": "Ausreichende Annahme (Zuspielpos. versetzt)",
			"/": "Sehr schlechte Annahme (kein Angriff möglich)",
			"-": "Schlechte Annahme (nur Highball möglich)",
			"=": "Fehler (Punkt Gegner)",
		},
		A: {
			"#": "Punktgewinn",
			"+": "Guter Angriff (nächste eigene Angriffschance)",
			"!": "Angriff in den Block mit eigener nächsten Angriffschance (Recycle)",
			"/": "Angriff in den Block (direkter gn.Punkt)",
			"-": "Schlechter Angriff (nächste Angriffschance beim Gegner)",
			"=": "Fehler (Punkt Gegner)",
		},
		B: {
			"#": "Punktgewinn",
			"+": "Guter Blocktouch (nächste eigene Angriffschance)",
			"!": "Ball abgewehrt (Recycle des Gegners)",
			"/": "Blocktouch mit Punktfolge Gegner (Block angeschlagen)",
			"-": "Schlechter Blocktouch (nächste Angriffschance beim Gegner)",
			"=": "Fehler (Punkt Gegner)",
		},
		D: {
			"#": "Perfekte Abwehr",
			"+": "Gute Abwehr (nähe perfekter Zuspielsituation)",
			"!": "Ausreichende Abwehr (Zuspielpos. versetzt)",
			"/": "Sehr schlechte Abwehr (kein Angriff möglich)",
			"-": "Schlechte Abwehr (nur Highball möglich)",
			"=": "Fehler (Punkt Gegner)",
		},
		E: {
			"#": "Perfektes Zuspiel",
			"+": "Gutes Zuspiel (minimale Ungenauigkeiten)",
			"!": "Ausreichendes Zuspiel (größere Streuung)",
			"/": "Sehr schlechtes Zuspiel (kein Angriff möglich, ggf Z zum Gegner)",
			"-": "Schlechtes Zuspiel (grobe Abweichung des Zuspiels)",
			"=": "Fehler (Punkt Gegner)",
		},
		F: {
			"#": "Perfekter Dankeball",
			"+": "Guter Dankeball (nähe perfekter Zuspielsituation)",
			"!": "Ausreichender Dankeball (Zuspielpos. versetzt)",
			"/": "Sehr schlechter Dankeball (kein Angriff möglich)",
			"-": "Schlechter Dankeball (nur Highball möglich)",
			"=": "Fehler (Punkt Gegner)",
		},
	};
	pl: PlTyp[] = [
		{ nb: 10, name: "Ben" },
		{ nb: 29, name: "Ka" },
		{ nb: 15, name: "Tu" },
		{ nb: 22, name: "Ma" },
		{ nb: 77, name: "Ba" },
		{ nb: 17, name: "An" },
		{ nb: 42, name: "To" },
		{ nb: 14, name: "Mi" },
		{ nb: 7, name: "Jo" },
		{ nb: 4, name: "Be" },
	].sort((a, b) => a.nb - b.nb);
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
	submit() {
		const { pl_number, pl_date } = this.codeInFG.value;
		this.codeInFG.reset({ pl_date });
		this.stepper.reset();
	}
}
