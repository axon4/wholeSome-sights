import { Component } from '@angular/core';

@Component({
	selector: 'WS-upLoad',
	templateUrl: './upLoad.component.html',
	styleUrls: ['./upLoad.component.css']
})
export class UpLoadComponent {
	draggedOver = false;
	file: File | null = null;

	upLoad(event: DragEvent) {
		this.draggedOver = false;
		this.file = event.dataTransfer?.files.item(0) ?? null;

		if (!(this.file) || this.file.type !== 'video/mp4') return;

		console.log(this.file);
	};
};