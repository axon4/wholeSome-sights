import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { of, switchMap } from 'rxjs';
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
			})
		);
	};
};