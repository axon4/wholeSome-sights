import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import User from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
	constructor(private authentication: AngularFireAuth, private fireStore: AngularFirestore) {};

	private usersCollection: AngularFirestoreCollection<Omit<User, 'passWord'>> = this.fireStore.collection<User>('users');

	async register({ name, age, eMail, passWord }: User) {
		const credentials = await this.authentication.createUserWithEmailAndPassword(eMail as string, passWord as string);
		await this.usersCollection.doc(credentials.user?.uid).set({ name, age, eMail });
		await credentials.user?.updateProfile({displayName: name});
	};
};