import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UpLoadComponent } from './upLoad/upLoad.component';

const routes: Routes = [
	{
		path: 'manage',
		component: ManageComponent,
		data: {authenticationRequired: true}
	},
	{
		path: 'management',
		redirectTo: 'manage'
	},
	{
		path: 'upLoad',
		component: UpLoadComponent,
		data: {authenticationRequired: true}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class VideoRoutingModule {};