import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'ws-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
	form = new FormGroup({
		name: new FormControl('', Validators.required),
		eMail: new FormControl(''),
		age: new FormControl(''),
		passWord: new FormControl(''),
		confirmPassWord: new FormControl('')
	});
};