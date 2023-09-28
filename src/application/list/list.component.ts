import { Component, OnDestroy, OnInit } from '@angular/core';
import { SightService } from '../sight/sight.service';

@Component({
	selector: 'WS-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
	constructor(public sight: SightService) {
		sight.getSightsList();
	};

	ngOnInit() {
		window.addEventListener('scroll', this.handleScroll);
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
		window.removeEventListener('scroll', this.handleScroll);
	};
};