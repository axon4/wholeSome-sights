import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/application/modal/modal.service';
import { SightService } from 'src/application/sight/sight.service';
import Sight from 'src/application/models/sight.model';

@Component({
	selector: 'WS-edit-modal',
	templateUrl: './edit-modal.component.html',
	styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit, OnChanges, OnDestroy {
	constructor(private modal: ModalService, private sight: SightService) {};

	@Input() currentSight: Sight | null = null;
	@Output() update = new EventEmitter();

	sightID = new FormControl('', {nonNullable: true});
	title = new FormControl('', {
		validators: [Validators.required, Validators.minLength(3)],
		nonNullable: true
	});
	form = new FormGroup({sightID: this.sightID, title: this.title});

	pending = false;
	showBanner = false;
	bannerMessage = 'Update in Progress';
	bannerColour = 'blue';

	ngOnInit() {
		this.modal.register('edit');
	};

	ngOnChanges() {
		if (this.currentSight) {
			this.sightID.setValue(this.currentSight.documentID!);
			this.title.setValue(this.currentSight.title);
		};

		this.pending = false;
		this.showBanner = false;
	};

	async submit() {
		if (!this.currentSight) return;

		this.pending = true;
		this.showBanner = true;
		this.bannerMessage = 'Update in Progress';
		this.bannerColour = 'blue';

		try {
			await this.sight.updateSight(this.sightID.value, this.title.value);

			this.bannerMessage = 'Update Successful';
			this.bannerColour = 'green';

			this.currentSight.title = this.title.value;
			this.update.emit(this.currentSight);
		} catch (error) {
			this.pending = false;
			this.bannerMessage = 'Error Updating';
			this.bannerColour = 'red';
		};
	};

	ngOnDestroy() {
		this.modal.deRegister('edit');
	};
};