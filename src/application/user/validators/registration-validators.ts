import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AuthenticationService } from 'src/application/authentication/authentication.service';

@Injectable({providedIn: 'root'})
export class RegistrationValidators implements AsyncValidator {
	constructor(private authentication: AuthenticationService) {};

	static match(control1Name: string, control2Name: string): ValidatorFn {
		return function (formGroup: AbstractControl): ValidationErrors | null {
			const control1 = formGroup.get(control1Name);
			const control2 = formGroup.get(control2Name);
			const error = control1?.value === control2?.value ? null : {misMatch: true};

			control2?.setErrors(error);

			return error;
		};
	};

	validate = (control: AbstractControl): Promise<ValidationErrors | null> => {
		return this.authentication.isEMailTaken(control.value).catch(error => {console.error(error); return null;});
	};
};