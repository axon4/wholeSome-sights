import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/application/modal/modal.service';

@Component({
	selector: 'WS-authentication-modal',
	templateUrl: './authentication-modal.component.html',
	styleUrls: ['./authentication-modal.component.css']
})
export class AuthenticationModalComponent implements OnInit, OnDestroy {
	constructor(public modal: ModalService) {};

	ngOnInit() {
		this.modal.register('authentication');
	};

	ngOnDestroy() {
		this.modal.deRegister('authentication');
	};
};