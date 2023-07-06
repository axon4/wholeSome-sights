import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ApplicationRoutingModule } from './application-routing.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { ApplicationComponent } from './application.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SightComponent } from './sight/sight.component';
import { NotFoundComponent } from './not-found/not-found.component';

const FireBaseModule = AngularFireModule.initializeApp(environment.fireBase);

@NgModule({
	declarations: [
		ApplicationComponent,
		HeaderComponent,
		HomeComponent,
		SightComponent,
		NotFoundComponent
	],
	imports: [
		BrowserModule,
		ApplicationRoutingModule,
		UserModule,
		FireBaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule,
		VideoModule
	],
	providers: [],
	bootstrap: [ApplicationComponent]
})
export class ApplicationModule {};