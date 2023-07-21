import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { map, of, switchMap } from 'rxjs';
import Sight from 'src/application/models/sight.model';

@Injectable({providedIn: 'root'})
export class SightService {
	constructor(private authentication: AngularFireAuth, private fireStore: AngularFirestore) {
		this.sightsCollection = fireStore.collection<Sight>('sights');
	};

	sightsCollection: AngularFirestoreCollection<Sight>;

	addSight(sight: Sight) {
		return this.sightsCollection.add(sight);
	};

	getSights() {
		return this.authentication.user.pipe(
			switchMap(user => {
				if (!user) {
					return of([]);
				} else {
					const snapShot = this.sightsCollection.ref.where('uID', '==', user.uid).get();

					return snapShot;
				};
			}),
			map(snapShot => (snapShot as QuerySnapshot<Sight>).docs)
		);
	};

	updateSight(ID: string, title: string) {
		return this.sightsCollection.doc(ID).update({ title });
	};
};