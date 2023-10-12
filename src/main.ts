import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import FireBase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { ApplicationModule } from './application/application.module';
import { environment } from './environments/environment';

FireBase.initializeApp(environment.fireBase);

let applicationInitialised = false;

FireBase.auth().onAuthStateChanged(() => {
	if (!applicationInitialised) {
		platformBrowserDynamic()
			.bootstrapModule(ApplicationModule)
			.catch(console.error);

		applicationInitialised = true;
	};
});