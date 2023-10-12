import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { ModalComponent } from './modal/modal.component';
// import { ModalService } from '../modal/modal.service';
import { TabsComponent } from './tab/tabs/tabs.component';
import { TabComponent } from './tab/tab/tab.component';
import { InPutComponent } from './inPut/inPut.component';
import { BannerComponent } from './banner/banner.component';
import { EventBlockerDirective } from './event-blocker/event-blocker.directive';

const NGXMaskProvider = provideEnvironmentNgxMask();

@NgModule({
	declarations: [
		ModalComponent,
		TabsComponent,
		TabComponent,
		InPutComponent,
		BannerComponent,
		EventBlockerDirective
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		NgxMaskDirective
	],
	exports: [
		ModalComponent,
		TabsComponent,
		TabComponent,
		InPutComponent,
		BannerComponent,
		EventBlockerDirective
	],
	providers: [NGXMaskProvider]
})
export class SharedModule {};