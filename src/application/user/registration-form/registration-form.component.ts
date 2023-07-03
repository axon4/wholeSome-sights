import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/application/authentication/authentication.service';
import { RegistrationValidator } from '../validators/registration-validator';
import User from '../../models/user.model';

@Component({
	selector: 'ws-registration-form',
	templateUrl: './registration-form.component.html',
	styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
	constructor(private authentication: AuthenticationService) {};

	form = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(72)]),
		eMail: new FormControl('', [Validators.required, Validators.email]),
		age: new FormControl<number | null>(null, [Validators.required, Validators.min(9), Validators.max(70)]),
		passWord: new FormControl('', [Validators.required, /* Validators.pattern(/(.*){7,96}/) */ Validators.minLength(7), Validators.maxLength(96)]),
		confirmPassWord: new FormControl('', [Validators.required])
	}, [RegistrationValidator.match('passWord', 'confirmPassWord')]);
	
	pending = false;
	showBanner = false;
	bannerMessage = 'Registration in Progress';
	bannerColour = 'blue';

	async submit() {
		this.pending = true;
		this.showBanner = true;
		this.bannerMessage = 'Registration in Progress';
		this.bannerColour = 'blue';

		try {
			await this.authentication.register(this.form.value as User);

			this.bannerMessage = 'Registration Successful';
			this.bannerColour = 'green';
		} catch (error) {
			this.pending = false;
			this.bannerMessage = 'Error Registering';
			this.bannerColour = 'red';
		};
	};
};