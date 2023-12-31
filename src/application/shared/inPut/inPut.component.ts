import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'WS-inPut',
	templateUrl: './inPut.component.html',
	styleUrls: ['./inPut.component.css']
})
export class InPutComponent {
	@Input() type = 'text';
	@Input() placeHolder!: string;
	@Input() control = new FormControl();
	@Input() mask = '';

	// TO-DO: convert to pipe
	capitaliseFirstLetter(word: string) {
		const capitalisedWord = word.charAt(0).toUpperCase() + word.slice(1);

		return capitalisedWord;
	};
};