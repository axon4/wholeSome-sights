import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { FFprobeWorker } from 'ffprobe-wasm';

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

		const FFProbe = new FFprobeWorker();
		const { format: { duration } } = await FFProbe.getFileInfo(file);

		FFProbe.terminate();

		const convertSecondsToTime = (seconds: number) => new Date(seconds * 1000).toISOString().slice(11, 19);

		const keyFrames = [Number(duration) / 4, Number(duration) / 2, (Number(duration) / 4) * 3].map(convertSecondsToTime);
		const commands: string[] = [];

		keyFrames.forEach((keyFrame, index) => {
			commands.push('-i', file.name, '-ss', keyFrame, '-frames:v', '1', '-filter:v', 'scale=510:-1', `screenShot${index + 1}.png`);
		});

		await this.FFMPEG.run(...commands);
	};
};