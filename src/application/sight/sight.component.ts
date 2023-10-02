import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import VideoJS from 'video.js';

@Component({
	selector: 'WS-sight',
	templateUrl: './sight.component.html',
	styleUrls: ['./sight.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class SightComponent implements OnInit {
	constructor(private route: ActivatedRoute) {
		this.route.params.subscribe(parameter => {this.ID = parameter.ID});
	};

	ID = '';
	@ViewChild('player', {static: true}) target?: ElementRef;
	player?: VideoJS.Player;
	
	ngOnInit() {
		this.player = VideoJS(this.target?.nativeElement);
	};
};