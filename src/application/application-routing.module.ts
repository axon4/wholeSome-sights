import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SightComponent } from './sight/sight.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'sight/:ID',
		component: SightComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {};