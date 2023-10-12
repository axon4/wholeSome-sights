import { Component } from '@angular/core';
import { AuthenticationService } from 'src/application/authentication/authentication.service';

@Component({
	selector: 'WS-log-in-form',
	templateUrl: './log-in-form.component.html',
	styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent {
	constructor(private authentication: AuthenticationService) {};

	credentials = {eMail: '', passWord: ''};

	pending = false;
	showBanner = false;
	bannerMessage = 'Log-In in-Progress';
	bannerColour = 'blue';

	async submit() {
		this.pending = true;
		this.showBanner = true;
		this.bannerMessage = 'Log-In in-Progress';
		this.bannerColour = 'blue';

		try {
			await this.authentication.logIn(this.credentials);

			this.bannerMessage = 'Log-In Successful';
			this.bannerColour = 'green';
		} catch (error) {
			this.pending = false;
			this.bannerMessage = 'Error Logging-In';
			this.bannerColour = 'red';
		};
	};
};