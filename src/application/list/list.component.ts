import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
	selector: 'WS-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
	ngOnInit() {
		window.addEventListener('scroll', this.handleScroll);
	};

	handleScroll = () => {
		const { innerHeight } = window;
		const { offsetHeight, scrollTop } = document.documentElement;

		const scrolledToBottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

		if (scrolledToBottomOfWindow) {
			console.log('bottom');
		};
	};

	ngOnDestroy() {
		window.removeEventListener('scroll', this.handleScroll);
	};
};