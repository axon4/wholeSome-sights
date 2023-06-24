import { Component, Input } from '@angular/core';
import { ModalService } from 'src/application/modal/modal.service';

@Component({
	selector: 'ws-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
	// providers: [ModalService]
})
export class ModalComponent {
	constructor(public modal: ModalService) {};

	@Input() ID = '';

	closeModal() {
		this.modal.toggleModal(this.ID);
	};
};