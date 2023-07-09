import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'WS-upLoad',
	templateUrl: './upLoad.component.html',
	styleUrls: ['./upLoad.component.css']
})
export class UpLoadComponent {
	draggedOver = false;
	file: File | null = null;
	nextStep = false;

	title = new FormControl('', {
		validators: [Validators.required, Validators.minLength(3)],
		nonNullable: true
	});
	form = new FormGroup({title: this.title});

	upLoad(event: DragEvent) {
		this.draggedOver = false;
		this.file = event.dataTransfer?.files.item(0) ?? null;

		if (!(this.file) || this.file.type !== 'video/mp4') return;

		this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
		this.nextStep = true;
	};

	submit() {
		console.log('SUBMIT');
	};
};