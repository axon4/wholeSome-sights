import { Component } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
	selector: 'ws-root',
	templateUrl: './application.component.html',
	styleUrls: ['./application.component.css']
})
export class ApplicationComponent {
	constructor(public authentication: AuthenticationService) {};
};