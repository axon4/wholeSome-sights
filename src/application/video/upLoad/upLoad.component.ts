import { Component } from '@angular/core';

@Component({
	selector: 'WS-upLoad',
	templateUrl: './upLoad.component.html',
	styleUrls: ['./upLoad.component.css']
})
export class UpLoadComponent {
	draggedOver = false;

	upLoad(event: DragEvent) {
		this.draggedOver = false;
	};
};