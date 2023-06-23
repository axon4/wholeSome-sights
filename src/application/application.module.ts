import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';

@NgModule({
	declarations: [ApplicationComponent],
	imports: [
		BrowserModule,
		ApplicationRoutingModule
	],
	providers: [],
	bootstrap: [ApplicationComponent]
})
export class ApplicationModule {};