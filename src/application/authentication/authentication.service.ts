import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ValidationErrors } from '@angular/forms';
import { Observable, delay, map } from 'rxjs';
import User from '../models/user.model';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
	constructor(private authentication: AngularFireAuth, private fireStore: AngularFirestore) {
		this.usersCollection = fireStore.collection<User>('users');
		this.loggedIn$ = authentication.user.pipe(map(Boolean));
		this.loggedInDelayed$ = this.loggedIn$.pipe(delay(1000));
	};

	private usersCollection: AngularFirestoreCollection<Omit<User, 'passWord'>>;
	private fireStore2 = this.fireStore;
	public loggedIn$: Observable<boolean>;
	public loggedInDelayed$: Observable<boolean>;

	isEMailTaken(eMail: string): Promise<ValidationErrors | null> {
		return this.authentication.fetchSignInMethodsForEmail(eMail).then(methods => methods.length ? {eMailTaken: true} : null);
	};

	async register({ name, age, eMail, passWord }: User) {
		const credentials = await this.authentication.createUserWithEmailAndPassword(eMail as string, passWord as string);
		await this.usersCollection.doc(credentials.user?.uid).set({ name, age, eMail });
		await credentials.user?.updateProfile({displayName: name});
	};

	async logIn({ eMail, passWord }: {eMail: string; passWord: string}) {
		await this.authentication.signInWithEmailAndPassword(eMail, passWord);
	};

	async logOut() {
		await this.authentication.signOut();
	};
};