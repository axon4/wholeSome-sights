import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Sight from 'src/application/models/sight.model';

@Injectable({providedIn: 'root'})
export class SightService {
	constructor(private fireStore: AngularFirestore) {
		this.sightsCollection = fireStore.collection<Sight>('sights');
	};

	sightsCollection: AngularFirestoreCollection<Sight>;

	async addSight(sight: Sight) {
		await this.sightsCollection.add(sight);
	};
};