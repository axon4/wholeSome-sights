import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';
import { SharedModule } from '../shared/shared.module';
import { LogInFormComponent } from './log-in-form/log-in-form.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

@NgModule({
	declarations: [AuthenticationModalComponent, LogInFormComponent, RegistrationFormComponent],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [AuthenticationModalComponent]
})
export class UserModule {};