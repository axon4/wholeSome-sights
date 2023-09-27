import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { BehaviorSubject, combineLatest, map, of, switchMap } from 'rxjs';
import Sight from 'src/application/models/sight.model';

@Injectable({providedIn: 'root'})
export class SightService {
	constructor(private authentication: AngularFireAuth, private fireStore: AngularFirestore, private storage: AngularFireStorage) {
		this.sightsCollection = fireStore.collection<Sight>('sights');
	};

	sightsCollection: AngularFirestoreCollection<Sight>;

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

	updateSight(ID: string, title: string) {
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