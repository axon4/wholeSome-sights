import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'ws-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute) {};

	sortOrder: 'newest' | 'oldest' = 'newest';

	ngOnInit() {
		this.route.queryParams.subscribe(queryParameters => {
			this.sortOrder = queryParameters.sort === 'oldest' ? queryParameters.sort : 'newest';
		});
	};

	sort(event: Event) {
		const { value } = event.target as HTMLSelectElement;

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {sort: value}
		});
	};
};