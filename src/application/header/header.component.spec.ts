import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthenticationService } from '../authentication/authentication.service';

describe('HeaderComponent', () => {
	let fixture: ComponentFixture<HeaderComponent>;
	let component: HeaderComponent;
	const mockAuthenticationService = jasmine.createSpyObj('mockAuthenticationService', ['register', 'logOut'], {loggedIn$: of(true)});

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			imports: [RouterTestingModule],
			providers: [{provide: AuthenticationService, useValue: mockAuthenticationService}]
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('create', () => {
		expect(component).toBeTruthy();
	});

	it('log-out', () => {
		const element = fixture.debugElement.query(By.css('li:nth-child(4) a'));

		expect(element).toBeTruthy();

		element.triggerEventHandler('click', new MouseEvent('event'));

		const service = TestBed.inject(AuthenticationService);

		expect(service.logOut).toHaveBeenCalledTimes(1);
	});
});