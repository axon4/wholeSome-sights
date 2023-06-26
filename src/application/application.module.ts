import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { UserModule } from './user/user.module';
import { HeaderComponent } from './header/header.component';

const FireBaseModule = AngularFireModule.initializeApp(environment.fireBase);

@NgModule({
	declarations: [
		ApplicationComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		ApplicationRoutingModule,
		UserModule,
		FireBaseModule,
		AngularFireAuthModule
	],
	providers: [],
	bootstrap: [ApplicationComponent]
})
export class ApplicationModule {};