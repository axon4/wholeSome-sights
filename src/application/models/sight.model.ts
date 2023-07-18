import fireBase from 'firebase/compat/app';

export default interface Sight {
	uID: string;
	documentID?: string;
	displayName: string;
	title: string;
	name: string;
	date: fireBase.firestore.FieldValue;
	URL: string;
};