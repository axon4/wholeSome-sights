import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
// import { ModalService } from '../modal/modal.service';
import { TabsComponent } from './tab/tabs/tabs.component';
import { TabComponent } from './tab/tab/tab.component';
import { InPutComponent } from './inPut/inPut.component';

@NgModule({
	declarations: [ModalComponent, TabsComponent, TabComponent, InPutComponent],
	imports: [CommonModule],
	exports: [ModalComponent, TabsComponent, TabComponent, InPutComponent]
	// providers: [ModalService]
})
export class SharedModule {};