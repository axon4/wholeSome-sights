import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationComponent } from './application.component';

describe('ApplicationComponent', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [RouterTestingModule],
		declarations: [ApplicationComponent]
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(ApplicationComponent);
		const application = fixture.componentInstance;

		expect(application).toBeTruthy();
	});

	it('should have as title \'wholesome-sights\'', () => {
		const fixture = TestBed.createComponent(ApplicationComponent);
		const application = fixture.componentInstance;
		
		expect(application.title).toEqual('wholesome-sights');
	});

	it('should render title', () => {
		const fixture = TestBed.createComponent(ApplicationComponent);

		fixture.detectChanges();

		const compiled = fixture.nativeElement as HTMLElement;

		expect(compiled.querySelector('.content span')?.textContent).toContain('wholesome-sights app is running!');
	});
});