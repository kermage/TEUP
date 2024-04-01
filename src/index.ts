import { asPixels, createElement } from './helpers';

const STYLE = {
	boxSizing: 'border-box',
	pointerEvents: 'none',
	position: 'absolute',
	inset: '0',
};

type ListenCallback = (target: HTMLElement) => void;

export default class TEUP {
	private previousElement?: HTMLElement;
	private previousMouseX: number = 0;
	private previousMouseY: number = 0;

	readonly box: HTMLDivElement;
	readonly listeners: {
		changeElement?: ListenCallback;
		mouseMoveHandler: (event: MouseEvent) => void;
		scrollResizeHandler: () => void;
	};

	constructor(className: string) {
		const { width, height } = asPixels(document.body.getBoundingClientRect());

		this.box = createElement('div', { ...STYLE, width, height });
		this.box.className = className;
		this.listeners = {
			mouseMoveHandler: this.handleMouseMove.bind(this),
			scrollResizeHandler: () => {
				this.hint(document.elementFromPoint(this.previousMouseX, this.previousMouseY) as HTMLElement);
			},
		};
	}

	onChange(callback: ListenCallback) {
		this.listeners.changeElement = callback;
	}

	start() {
		document.body.appendChild(this.box);
		document.addEventListener('mousemove', this.listeners.mouseMoveHandler);
		document.addEventListener('scroll', this.listeners.scrollResizeHandler);
		window.addEventListener('resize', this.listeners.scrollResizeHandler);
	}

	stop() {
		document.body.removeChild(this.box);
		document.removeEventListener('mousemove', this.listeners.mouseMoveHandler);
		document.removeEventListener('scroll', this.listeners.scrollResizeHandler);
		window.removeEventListener('resize', this.listeners.scrollResizeHandler);
	}

	private hint(target: HTMLElement) {
		this.previousElement = target;

		const rect = target.getBoundingClientRect();

		rect.x += window.scrollX;
		rect.y += window.scrollY;

		const position = asPixels(rect);

		this.box.style.left = position.x;
		this.box.style.top = position.y;
		this.box.style.width = position.width;
		this.box.style.height = position.height;

		if (this.listeners.changeElement) {
			this.listeners.changeElement(target);
		}
	}

	private handleMouseMove(event: MouseEvent) {
		const target = event.target as HTMLElement;

		this.previousMouseX = event.clientX;
		this.previousMouseY = event.clientY;

		if (target === this.previousElement) {
			return;
		}

		this.hint(target);
	}
}
