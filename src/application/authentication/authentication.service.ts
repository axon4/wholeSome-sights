import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import User from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
	constructor(private authentication: AngularFireAuth, private fireStore: AngularFirestore) {
		this.usersCollection = fireStore.collection<User>('users');
		this.loggedIn$ = authentication.user.pipe(map(Boolean));
	};

	private usersCollection: AngularFirestoreCollection<Omit<User, 'passWord'>>;
	public loggedIn$: Observable<boolean>;

	async register({ name, age, eMail, passWord }: User) {
		const credentials = await this.authentication.createUserWithEmailAndPassword(eMail as string, passWord as string);
		await this.usersCollection.doc(credentials.user?.uid).set({ name, age, eMail });
		await credentials.user?.updateProfile({displayName: name});
	};

	async logIn({ eMail, passWord }: {eMail: string; passWord: string}) {
		await this.authentication.signInWithEmailAndPassword(eMail, passWord);
	};
};