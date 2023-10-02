import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import fireBase from 'firebase/compat/app';

@Pipe({name: 'timeStamp'})
export class TimeStampPipe implements PipeTransform {
	constructor(private date: DatePipe) {};

	transform(value: fireBase.firestore.FieldValue) {
		const date = (value as fireBase.firestore.Timestamp).toDate();
		const timeStamp = this.date.transform(date, 'dd/mm/yyyy hh:mm:ss zzzz');

		return timeStamp;
	};
};