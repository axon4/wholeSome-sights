import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [AuthenticationModalComponent],
	imports: [
		CommonModule,
		SharedModule
	],
	exports: [AuthenticationModalComponent]
})
export class UserModule {};