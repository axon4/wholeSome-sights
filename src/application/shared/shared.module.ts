import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { ModalComponent } from './modal/modal.component';
// import { ModalService } from '../modal/modal.service';
import { TabsComponent } from './tab/tabs/tabs.component';
import { TabComponent } from './tab/tab/tab.component';
import { InPutComponent } from './inPut/inPut.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';

@NgModule({
	declarations: [ModalComponent, TabsComponent, TabComponent, InPutComponent, BannerComponent],
	imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
	exports: [ModalComponent, TabsComponent, TabComponent, InPutComponent, BannerComponent],
	providers: [provideEnvironmentNgxMask()]
})
export class SharedModule {};