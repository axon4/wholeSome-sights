import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import Sight from 'src/application/models/sight.model';

@Injectable({providedIn: 'root'})
export class SightService implements Resolve<Sight | null> {
	constructor(
		private router: Router,
		private authentication: AngularFireAuth,
		private fireStore: AngularFirestore,
		private storage: AngularFireStorage
	) {
		this.sightsCollection = fireStore.collection<Sight>('sights');
	};

	sightsCollection: AngularFirestoreCollection<Sight>;
	sightsList: Sight[] = [];
	pending = false;

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		return this.sightsCollection
			.doc(route.params.ID)
			.get()
			.pipe(
				map(snapShot => {
					const data = snapShot.data();

					if (!data) {
						this.router.navigate(['/']);

						return null;
					} else {
						return data;
					};
				})
			);
	};

	addSight(sight: Sight) {
		return this.sightsCollection.add(sight);
	};

	getSights(sort$: BehaviorSubject<'newest' | 'oldest'>) {
		return combineLatest([this.authentication.user, sort$]).pipe(
			switchMap(([ user, sort ]) => {
				if (!user) {
					return of([]);
				} else {
					const snapShot = this.sightsCollection.ref
						.where('uID', '==', user.uid)
						.orderBy('date', sort === 'oldest' ? 'asc' : 'desc')
						.get();

					return snapShot;
				};
			}),
			map(snapShot => (snapShot as QuerySnapshot<Sight>).docs)
		);
	};

	async getSightsList() {
		if (this.pending) return;

		this.pending = true;

		let query = this.sightsCollection.ref.orderBy('date', 'desc').limit(6);
		const { length } = this.sightsList;

		if (length) {
			const lastDocumentID = this.sightsList[length - 1].documentID;
			const lastDocument = await this.sightsCollection.doc(lastDocumentID).get().toPromise();

			query = query.startAfter(lastDocument);
		};

		const snapShots = await query.get();

		snapShots.forEach(document => {
			this.sightsList.push({documentID: document.id, ...document.data()})
		});

		this.pending = false;
	};

	upDateSight(ID: string, title: string) {
		return this.sightsCollection.doc(ID).update({ title });
	};

	async deleteSight(sight: Sight) {
		const sightReference = this.storage.ref(`sights/${sight.name}`);
		const screenShotReference = this.storage.ref(`screenShots/${sight.screenShotName}`);

		await sightReference.delete();
		await screenShotReference.delete();

		await this.sightsCollection.doc(sight.documentID).delete();
	};
};