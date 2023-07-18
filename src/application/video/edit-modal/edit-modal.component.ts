import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/application/modal/modal.service';
import Sight from 'src/application/models/sight.model';

@Component({
	selector: 'WS-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnChanges, OnDestroy {
	constructor(private modal: ModalService) {};

	@Input() currentSight: Sight | null = null;

	sightID = new FormControl('', {nonNullable: true});
	title = new FormControl('', {
		validators: [Validators.required, Validators.minLength(3)],
		nonNullable: true
	});
	form = new FormGroup({sightID: this.sightID, title: this.title});

	ngOnInit() {
		this.modal.register('edit');
	};

	ngOnChanges() {
		if (this.currentSight) {
			this.sightID.setValue(this.currentSight.documentID!);
			this.title.setValue(this.currentSight.title);
		};
	};

	ngOnDestroy() {
		this.modal.deRegister('edit');
	};
};