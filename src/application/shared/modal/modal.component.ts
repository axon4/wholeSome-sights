import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'src/application/modal/modal.service';

@Component({
	selector: 'ws-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css']
	// providers: [ModalService]
})
export class ModalComponent implements OnInit, OnDestroy {
	constructor(public modal: ModalService, public rootNode: ElementRef) {};

	ngOnInit() {
		document.body.appendChild(this.rootNode.nativeElement);
	};

	@Input() ID = '';

	closeModal() {
		this.modal.toggleModal(this.ID);
	};

	ngOnDestroy() {
		document.body.removeChild(this.rootNode.nativeElement);
	};
};