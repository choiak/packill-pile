export function scrollToElement(selector) {
	if (selector) {
		document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
	}
}