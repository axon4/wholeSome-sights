import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../modal/modal.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
	selector: 'ws-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(
		private router: Router,
		public modal: ModalService,
		public authentication: AuthenticationService
	) {};

	openModal($event: MouseEvent) {
		$event.preventDefault();

		this.modal.toggleModal('authentication');
	};

	async logOut($event: MouseEvent) {
		$event.preventDefault();

		try {
			await this.authentication.logOut();

			this.router.navigateByUrl('/')
		} catch (error) {
			console.error(error);
		};
	};
};