import { Component } from '@angular/core';
import { ModalService } from '../modal/modal.service';

@Component({
	selector: 'ws-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(public modal: ModalService) {};

	openModal($event: MouseEvent) {
		$event.preventDefault();

		this.modal.toggleModal();
	};
};