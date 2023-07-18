import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@firebase/auth-types';
import { last, switchMap } from 'rxjs';
import { v4 as UUID } from 'uuid';
import { SightService } from 'src/application/sight/sight.service';

@Component({
	selector: 'WS-upLoad',
	templateUrl: './upLoad.component.html',
	styleUrls: ['./upLoad.component.css']
})
export class UpLoadComponent implements OnDestroy {
	constructor(
		private router: Router,
		private authentication: AngularFireAuth,
		private storage: AngularFireStorage,
		private sight: SightService
	) {
		authentication.user.subscribe(user => {this.user = user});
	};

	user: User | null = null;
	draggedOver = false;
	task?: AngularFireUploadTask;
	file: File | null = null;
	nextStep = false;
	progress = 0;
	showProgress = false;

	title = new FormControl('', {
		validators: [Validators.required, Validators.minLength(3)],
		nonNullable: true
	});
	form = new FormGroup({title: this.title});

	pending = false;
	showBanner = false;
	bannerMessage = 'UpLoad in Progress';
	bannerColour = 'blue';

	upLoad(event: Event | DragEvent) {
		this.draggedOver = false;
		this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? (event.target as HTMLInputElement).files?.item(0) ?? null;

		if (!(this.file) || this.file.type !== 'video/mp4') return;

		this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
		this.nextStep = true;
	};

	submit() {
		this.form.disable();
		this.pending = true;
		this.showBanner = true;
		this.bannerMessage = 'UpLoad in Progress';
		this.bannerColour = 'blue';
		this.showProgress = true;

		const name = `${this.file!.name.replace(/\.[^/.]+$/, '')}-${UUID()}.mp4`;
		this.task = this.storage.upload(`sights/${name}`, this.file);

		this.task.percentageChanges().subscribe(percentage => {
			this.progress = (percentage as number) / 100;
		});

		const sightReference = this.storage.ref(`sights/${name}`);

		this.task.snapshotChanges()
			.pipe(last(), switchMap(() => sightReference.getDownloadURL()))
			.subscribe({
				next: async URL => {
					const sight = {
						uID: this.user!.uid,
						displayName: this.user?.displayName as string,
						title: this.title.value,
						name,
						URL
					};

					const sightReference = await this.sight.addSight(sight);

					this.bannerMessage = 'UpLoad Successful';
					this.bannerColour = 'green';
					this.showProgress = false;

					setTimeout(() => {
						this.router.navigate(['sight', sightReference.id]);
					}, 1000);
				},
				error: error => {
					this.form.enable();
					this.pending = false;
					this.bannerMessage = 'Error UpLoading';
					this.bannerColour = 'red';
					this.showProgress = false;
				}
			});
	};

	ngOnDestroy() {
		this.task?.cancel();
	};
};