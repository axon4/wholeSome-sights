import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
	selector: 'ws-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
	@ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();

	ngAfterContentInit() {
		console.log(this.tabs);
	};
};