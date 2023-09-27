import { Injectable } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { FFprobeWorker } from 'ffprobe-wasm';

@Injectable({providedIn: 'root'})
export class ScreenShotService {
	constructor() {
		this.FFMPEG = createFFmpeg({log: true});
	};

	initialised = false;
	pending = false;
	private FFMPEG;

	async initialise() {
		if (!(this.initialised)) {
			await this.FFMPEG.load();
			this.initialised = true;
		};
	};

	async getURLs(file: File) {
		this.pending = true;

		const data = await fetchFile(file);

		this.FFMPEG.FS('writeFile', file.name, data);

		const FFProbe = new FFprobeWorker();
		const { format: { duration } } = await FFProbe.getFileInfo(file);

		FFProbe.terminate();

		const convertSecondsToTime = (seconds: number) => new Date(seconds * 1000).toISOString().slice(11, 19);

		const keyFrames = [Number(duration) / 4, Number(duration) / 2, (Number(duration) / 4) * 3].map(convertSecondsToTime);
		const commands = keyFrames.flatMap((keyFrame, index) => ['-i', file.name, '-ss', keyFrame, '-frames:v', '1', '-filter:v', 'scale=510:-1', `screenShot${index + 1}.png`]);

		await this.FFMPEG.run(...commands);

		const screenShotURLS = keyFrames.map((_, index) => {
			const binary = this.FFMPEG.FS('readFile', `screenShot${index + 1}.png`);
			const blob = new Blob([binary.buffer], {type: 'image/png'});
			const imageURL = URL.createObjectURL(blob);

			return imageURL;
		});

		this.pending = false;

		return screenShotURLS;
	};

	async getBlobFromURL(URL: string) {
		const response = await fetch(URL);
		const blob = await response.blob();

		return blob;
	};
};