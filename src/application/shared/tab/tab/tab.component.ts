import { Component, Input } from '@angular/core';

@Component({
	selector: 'ws-tab',
	templateUrl: './tab.component.html',
	styleUrls: ['./tab.component.css']
})
export class TabComponent {
	@Input() title = '';
};