import { Component, Input } from '@angular/core';

@Component({
	selector: 'WS-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.css']
})
export class BannerComponent {
	@Input() colour = 'blue';

	get backGroundColour() {
		return `bg-${this.colour}-400`;
	};
};