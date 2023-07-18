import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SightService } from 'src/application/sight/sight.service';

@Component({
	selector: 'WS-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute, private sight: SightService) {};

	sortOrder: 'newest' | 'oldest' = 'newest';

	ngOnInit() {
		this.route.queryParams.subscribe(queryParameters => {
			this.sortOrder = queryParameters.sort === 'oldest' ? queryParameters.sort : 'newest';
		});
		this.sight.getSights().subscribe(console.log);
	};

	sort(event: Event) {
		const { value } = event.target as HTMLSelectElement;

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {sort: value}
		});
	};
};