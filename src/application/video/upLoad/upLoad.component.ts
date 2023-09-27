import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import fireBase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '@firebase/auth-types';
import { combineLatest, last, switchMap } from 'rxjs';
import { v4 as UUID } from 'uuid';
import { SightService } from 'src/application/sight/sight.service';
import { ScreenShotService } from 'src/application/screenShot/screenShot.service';

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
		private sight: SightService,
		public screenShot: ScreenShotService
	) {
		authentication.user.subscribe(user => {this.user = user});
		screenShot.initialise();
	};

	user: User | null = null;
	draggedOver = false;
	sightTask?: AngularFireUploadTask;
	file: File | null = null;
	nextStep = false;
	progress = 0;
	showProgress = false;
	screenShotURLs: string[] = [];
	selectedScreenShotURL = '';
	screenShotTask?: AngularFireUploadTask;

	title = new FormControl('', {
		validators: [Validators.required, Validators.minLength(3)],
		nonNullable: true
	});
	form = new FormGroup({title: this.title});

	pending = false;
	showBanner = false;
	bannerMessage = 'UpLoad in Progress';
	bannerColour = 'blue';

	async upLoad(event: Event | DragEvent) {
		if (this.screenShot.pending) return;

		this.draggedOver = false;
		this.file = (event as DragEvent).dataTransfer?.files.item(0) ?? (event.target as HTMLInputElement).files?.item(0) ?? null;

		if (!(this.file) || this.file.type !== 'video/mp4') return;

		this.screenShotURLs = await this.screenShot.getURLs(this.file);
		this.selectedScreenShotURL = this.screenShotURLs[1];
		this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
		this.nextStep = true;
	};

	async submit() {
		this.form.disable();
		this.pending = true;
		this.showBanner = true;
		this.bannerMessage = 'UpLoad in Progress';
		this.bannerColour = 'blue';
		this.showProgress = true;

		const name = `${this.file!.name.replace(/\.[^/.]+$/, '')}-${UUID()}.mp4`;

		this.sightTask = this.storage.upload(`sights/${name}`, this.file);

		const screenShotBlob = await this.screenShot.getBlobFromURL(this.selectedScreenShotURL);
		
		this.screenShotTask = this.storage.upload(`screenShots/${name}`, screenShotBlob);

		combineLatest([this.sightTask.percentageChanges(), this.screenShotTask.percentageChanges()]).subscribe(([ sightPercentage, screenShotPercentage]) => {
			if (!sightPercentage || !screenShotPercentage) return;

			const totalPercentage = sightPercentage + screenShotPercentage;

			this.progress = (totalPercentage as number) / 200;
		});

		const sightReference = this.storage.ref(`sights/${name}`);

		this.sightTask.snapshotChanges()
			.pipe(last(), switchMap(() => sightReference.getDownloadURL()))
			.subscribe({
				next: async URL => {
					const sight = {
						uID: this.user!.uid,
						displayName: this.user?.displayName as string,
						title: this.title.value,
						name,
						date: fireBase.firestore.FieldValue.serverTimestamp(),
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
		this.sightTask?.cancel();
	};
};