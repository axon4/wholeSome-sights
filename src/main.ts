import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApplicationModule } from './application/application.module';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { environment } from './environments/environment';

firebase.initializeApp(environment.fireBase);

let applicationInitialised = false;

firebase.auth().onAuthStateChanged(() => {
	if (!applicationInitialised) {
		platformBrowserDynamic()
			.bootstrapModule(ApplicationModule)
			.catch(console.error);
			
		applicationInitialised = true;
	};
});