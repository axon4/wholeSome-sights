import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoRoutingModule } from './video-routing.module';
import { ManageComponent } from './manage/manage.component';
import { UpLoadComponent } from './upLoad/upLoad.component';

@NgModule({
	declarations: [
		ManageComponent,
		UpLoadComponent
	],
	imports: [
		CommonModule,
		VideoRoutingModule
	]
})
export class VideoModule {};