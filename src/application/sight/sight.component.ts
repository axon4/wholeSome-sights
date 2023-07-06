import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'ws-sight',
	templateUrl: './sight.component.html',
	styleUrls: ['./sight.component.css']
})
export class SightComponent {
	constructor(private route: ActivatedRoute) {
		this.ID = this.route.snapshot.params.ID;
	};

	ID: string;
};