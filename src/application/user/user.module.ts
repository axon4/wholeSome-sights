import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationModalComponent } from './authentication-modal/authentication-modal.component';

@NgModule({
	declarations: [AuthenticationModalComponent],
	imports: [CommonModule],
	exports: [AuthenticationModalComponent]
})
export class UserModule {};