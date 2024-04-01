import TEUP from '../index';

declare global {
	interface Window {
		TEUP: TEUP;
	}
}

window.TEUP = new TEUP('teup-showcase');

queueMicrotask(() => window.TEUP.start());
