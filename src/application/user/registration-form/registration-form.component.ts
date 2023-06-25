import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'ws-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(72)]),
		eMail: new FormControl('', [Validators.required, Validators.email]),
		age: new FormControl('', [Validators.required, Validators.min(9), Validators.max(70)]),
		passWord: new FormControl('', [Validators.required, Validators.pattern(/(.*){7,96}/)]),
		confirmPassWord: new FormControl('', [Validators.required])
	});
};