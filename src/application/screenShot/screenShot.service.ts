import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

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

	async getScreenShots(file: File) {
		const data = await fetchFile(file);

		this.FFMPEG.FS('writeFile', file.name, data);
		await this.FFMPEG.run('-i', file.name, '-ss', '00:00:01', '-frames:v', '1', '-filter:v', 'scale=510:-1', 'screenShot1.png');
	};
};