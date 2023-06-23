import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ModalService {
	constructor() {};

	private open = false;

	get isModalOpen() {
		return this.open;
	};

	toggleModal() {
		this.open = !(this.open);
	};
};