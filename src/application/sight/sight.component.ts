import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import VideoJS from 'video.js';
import Sight from '../models/sight.model';

@Component({
	selector: 'WS-sight',
	templateUrl: './sight.component.html',
	styleUrls: ['./sight.component.css'],
	providers: [DatePipe],
	encapsulation: ViewEncapsulation.None
})
export class SightComponent implements OnInit {
	constructor(private route: ActivatedRoute) {};

	sight?: Sight;
	@ViewChild('player', {static: true}) target?: ElementRef;
	player?: VideoJS.Player;

	ngOnInit() {
		this.player = VideoJS(this.target?.nativeElement);
		this.route.data.subscribe(data => {
			this.sight = data.sight as Sight;

			this.player?.src({
				src: this.sight.URL,
				type: 'video/mp4'
			});
		});
	};
};