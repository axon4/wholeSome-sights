import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ApplicationRoutingModule } from './application-routing.module';
import { UserModule } from './user/user.module';
import { ApplicationComponent } from './application.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const FireBaseModule = AngularFireModule.initializeApp(environment.fireBase);

@NgModule({
	declarations: [
		ApplicationComponent,
		HeaderComponent,
  		HomeComponent
	],
	imports: [
		BrowserModule,
		ApplicationRoutingModule,
		UserModule,
		FireBaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule
	],
	providers: [],
	bootstrap: [ApplicationComponent]
})
export class ApplicationModule {};