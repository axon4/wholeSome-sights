import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[ws-event-blocker]'
})
export class EventBlockerDirective {
	@HostListener('dragover', ['$event'])
	@HostListener('drop', ['$event'])
	handleDragDrop(event: DragEvent) {
		event.preventDefault();
	};
};