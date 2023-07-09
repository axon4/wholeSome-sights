import { Component, Input } from '@angular/core';

@Component({
	selector: 'WS-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.css']
})
export class TabComponent {
	@Input() title = '';
	
	active = false;
};