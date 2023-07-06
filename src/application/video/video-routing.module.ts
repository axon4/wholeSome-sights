import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { ManageComponent } from './manage/manage.component';
import { UpLoadComponent } from './upLoad/upLoad.component';

const reDirectUnAuthorisedToHome = () => redirectUnauthorizedTo('/');

const routes: Routes = [
	{
		path: 'manage',
		component: ManageComponent,
		data: {
			authenticationRequired: true,
			authGuardPipe: reDirectUnAuthorisedToHome
		},
		canActivate: [AngularFireAuthGuard]
	},
	{
		path: 'management',
		redirectTo: 'manage'
	},
	{
		path: 'upLoad',
		component: UpLoadComponent,
		data: {
			authenticationRequired: true,
			authGuardPipe: reDirectUnAuthorisedToHome
		},
		canActivate: [AngularFireAuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VideoRoutingModule {};