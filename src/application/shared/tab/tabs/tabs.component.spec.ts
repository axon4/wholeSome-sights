import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TabsComponent } from './tabs.component';
import { TabComponent } from '../tab/tab.component';

@Component({
	template: `
		<WS-tabs>
			<WS-tab title='tab 1' />
			<WS-tab title='tab 2' />
		</WS-tabs>
	`
})
class TestTabsComponent {};

describe('TabsComponent', () => {
	let component: TestTabsComponent;
	let fixture: ComponentFixture<TestTabsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TestTabsComponent, TabsComponent, TabComponent]
		});
		fixture = TestBed.createComponent(TestTabsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('create', () => {
		expect(component).toBeTruthy();
	});

	it('render 2 tabs', () => {
		const elements = fixture.debugElement.queryAll(By.css('li'));

		expect(elements.length).withContext('did not render').toBe(2);

		const component = fixture.debugElement.query(By.directive(TabsComponent));
		const tabs = component.componentInstance.tabs;

		expect(tabs.length).withContext('did not load').toBe(2);
	});
});