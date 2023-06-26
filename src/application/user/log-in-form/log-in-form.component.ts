import { Component } from '@angular/core';

@Component({
	selector: 'ws-log-in-form',
	templateUrl: './log-in-form.component.html',
	styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent {
	credentials = {eMail: '', passWord: ''};
};