import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/application/modal/modal.service';

@Component({
	selector: 'WS-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnDestroy {
	constructor(private modal: ModalService) {};

	ngOnInit() {
		this.modal.register('edit');
	};

	ngOnDestroy() {
		this.modal.deRegister('edit');
	};
};