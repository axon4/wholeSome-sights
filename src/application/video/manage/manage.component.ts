import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SightService } from 'src/application/sight/sight.service';
import { ModalService } from 'src/application/modal/modal.service';
import Sight from 'src/application/models/sight.model';

@Component({
	selector: 'WS-manage',
	templateUrl: './manage.component.html',
	styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private sight: SightService,
		private modal: ModalService
	) {};

	sights: Sight[] = [];
	currentSight: Sight | null = null;
	sortOrder: 'newest' | 'oldest' = 'newest';
	sort$ = new BehaviorSubject(this.sortOrder);

	ngOnInit() {
		this.route.queryParams.subscribe(queryParameters => {
			this.sortOrder = queryParameters.sort === 'oldest' ? queryParameters.sort : 'newest';
			this.sort$.next(this.sortOrder);
		});
		this.sight.getSights(this.sort$).subscribe(documents => {
			this.sights = [];
			
			documents.forEach(document => {
				this.sights.push({
					documentID: document.id,
					...document.data()
				});
			});
		});
	};

	sort(event: Event) {
		const { value } = event.target as HTMLSelectElement;

		this.router.navigate([], {
			relativeTo: this.route,
			queryParams: {sort: value}
		});
	};

	openModal(event: MouseEvent, sight: Sight) {
		event.preventDefault();

		this.currentSight = sight;
		this.modal.toggleModal('edit');
	};

	update(event: Sight) {
		const updatedSight = this.sights.find(sight => sight.documentID === event.documentID);

		if (updatedSight) {
			updatedSight.title = event.title;
		};
	};

	async copyLink(event: MouseEvent, documentID: string | undefined) {
		event.preventDefault();

		if (!documentID) return;

		const link = `${location.origin}/sight/${documentID}`;

		await navigator.clipboard.writeText(link);
		alert('Link Copied to ClipBoard');
	};

	delete(event: MouseEvent, sight: Sight) {
		event.preventDefault();

		this.sight.deleteSight(sight);

		const deletedSightIndex = this.sights.findIndex(({ documentID }) => documentID === sight.documentID);

		if (deletedSightIndex !== -1) {
			this.sights.splice(deletedSightIndex, 1);
		};
	};
};