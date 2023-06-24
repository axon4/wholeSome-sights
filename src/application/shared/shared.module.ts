import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabsComponent } from './tab/tabs/tabs.component';
import { TabComponent } from './tab/tab/tab.component';
// import { ModalService } from '../modal/modal.service';

@NgModule({
	declarations: [ModalComponent, TabsComponent, TabComponent],
	imports: [CommonModule],
	exports: [ModalComponent, TabsComponent, TabComponent]
	// providers: [ModalService]
})
export class SharedModule {};