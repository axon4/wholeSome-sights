import { Injectable } from '@angular/core';

type Modal = {
	ID: string;
	open: boolean;
};

@Injectable({providedIn: 'root'})
export class ModalService {
	private modals: Modal[] = [];

	register(ID: string) {
		this.modals.push({ ID, open: false });
	};

	isModalOpen(ID: string) {
		const isOpen = Boolean(this.modals.find(modal => modal.ID === ID)?.open);

		return isOpen;
	};

	toggleModal(ID: string) {
		const modal = this.modals.find(modal => modal.ID === ID);

		if (modal) {
			modal.open = !(modal.open);
		};
	};

	deRegister(ID: string) {
		this.modals = this.modals.filter(modal => modal.ID !== ID);
	};
};