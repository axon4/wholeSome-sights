import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SightService } from '../sight/sight.service';

@Component({
	selector: 'WS-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
	providers: [DatePipe]
})
export class ListComponent implements OnInit, OnDestroy {
	constructor(public sight: SightService) {
		sight.getSightsList();
	};

	@Input() scrollAble = true;

	ngOnInit() {
		if (this.scrollAble) {
			window.addEventListener('scroll', this.handleScroll);
		};
	};

	handleScroll = () => {
		const { innerHeight } = window;
		const { offsetHeight, scrollTop } = document.documentElement;

		const scrolledToBottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

		if (scrolledToBottomOfWindow) {
			this.sight.getSightsList();
		};
	};

	ngOnDestroy() {
		if (this.scrollAble) {
			window.removeEventListener('scroll', this.handleScroll);
		};

		this.sight.sightsList = [];
	};
};