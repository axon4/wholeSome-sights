import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({providedIn: 'root'})
export class ScreenShotService {
	constructor() {
		this.FFMPEG = createFFmpeg({log: true});
	};

	initialised = false;
	private FFMPEG;

	async initialise() {
		if (!(this.initialised)) {
			await this.FFMPEG.load();
			this.initialised = true;
		};
	};
};