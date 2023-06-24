import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/application/modal/modal.service';

@Component({
	selector: 'ws-authentication-modal',
	templateUrl: './authentication-modal.component.html',
	styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit {
	constructor(public modal: ModalService) {};

	ngOnInit() {
		this.modal.register('authentication');
	};
};