import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabComponent } from './tab.component';

describe('TabComponent', () => {
	let fixture: ComponentFixture<TabComponent>;
	let component: TabComponent;

	beforeEach(async () => {
		await TestBed
			.configureTestingModule({
				declarations: [TabComponent]
			})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('create', () => {
		expect(component).toBeTruthy();
	});

	it('hidden initially', () => {
		const element = fixture.debugElement.query(By.css('.hidden'));
		// const element = fixture.nativeElement.querySelector('.hidden');
		// const element = document.querySelector('.hidden');

		expect(element).toBeTruthy();
	});

	it('not hidden if active', () => {
		component.active = true;

		fixture.detectChanges();

		const element = fixture.debugElement.query(By.css('.hidden'));
		// const element = fixture.nativeElement.querySelector('.hidden');
		// const element = document.querySelector('.hidden');

		expect(element).toBeFalsy();
	});
});