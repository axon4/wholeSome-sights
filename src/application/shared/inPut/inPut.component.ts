import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'ws-inPut',
	templateUrl: './inPut.component.html',
	styleUrls: ['./inPut.component.css']
})
export class InPutComponent {
	@Input() type = 'text';
	@Input() placeHolder!: string;
	@Input() control = new FormControl();
};