/** Used to `btoa` and `atob` honks for the URL. */
export interface HonkData {
	sound: string,
	message: string
}

export interface Honk {
	sound: string,
	message: string,
	url: string
}

export interface AudioElement {
	element: null | HTMLAudioElement
}