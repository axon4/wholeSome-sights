import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
	declarations: [AuthenticationModalComponent, LogInFormComponent, RegistrationFormComponent],
	imports: [
		CommonModule,
		SharedModule,
		ReactiveFormsModule
	],
	exports: [AuthenticationModalComponent]
})
export class UserModule {};