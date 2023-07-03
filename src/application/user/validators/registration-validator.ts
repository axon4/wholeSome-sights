import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class RegistrationValidator {
	static match(control1Name: string, control2Name: string): ValidatorFn {
		return function(formGroup: AbstractControl): ValidationErrors | null {
			const control1 = formGroup.get(control1Name);
			const control2 = formGroup.get(control2Name);
			const error = control1?.value === control2?.value ? null : {misMatch: true};

			control2?.setErrors(error);
	
			return error;
		};
	};
};