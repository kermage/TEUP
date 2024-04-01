export function fixedPixel(number: number) {
	return number.toFixed() + 'px';
}

export function asPixels(domRect: DOMRect) {
	return {
		x: fixedPixel(domRect.x),
		y: fixedPixel(domRect.y),
		width: fixedPixel(domRect.width),
		height: fixedPixel(domRect.height),
	};
}

export function createElement<T extends keyof HTMLElementTagNameMap>(
	tagName: T,
	styles?: Partial<CSSStyleDeclaration>,
): HTMLElementTagNameMap[T] {
	const container = document.createElement(tagName);

	for (const key in styles) {
		// @ts-ignore
		container.style[key] = styles[key];
	}

	return container;
}
