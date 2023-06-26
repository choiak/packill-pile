export function normalize(str) {
	if (str && str.length) {
		return str.toLowerCase().replace(/\s/g, '-');
	} else {
		return str;
	}
}
