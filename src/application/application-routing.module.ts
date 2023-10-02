import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SightComponent } from './sight/sight.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SightService } from './sight/sight.service';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'sight/:ID',
		component: SightComponent,
		resolve: {
			sight: SightService
		}
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class ApplicationRoutingModule {};