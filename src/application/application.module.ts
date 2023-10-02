import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { ApplicationRoutingModule } from './application-routing.module';
import { UserModule } from './user/user.module';
import { VideoModule } from './video/video.module';
import { ApplicationComponent } from './application.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { SightComponent } from './sight/sight.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TimeStampPipe } from './timeStamp/timeStamp.pipe';

const FireBaseModule = AngularFireModule.initializeApp(environment.fireBase);

@NgModule({
	declarations: [
		ApplicationComponent,
		HeaderComponent,
		HomeComponent,
		ListComponent,
		SightComponent,
		NotFoundComponent,
		TimeStampPipe
	],
	imports: [
		BrowserModule,
		UserModule,
		FireBaseModule,
		AngularFireAuthModule,
		AngularFirestoreModule,
		AngularFireStorageModule,
		VideoModule,
		ApplicationRoutingModule
	],
	providers: [],
	bootstrap: [ApplicationComponent]
})
export class ApplicationModule {};