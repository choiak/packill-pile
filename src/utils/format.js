export function normalize(str) {
	if (str && str.length) {
		return s.toLowerCase().replace(/\s/g, '-');
	} else {
		return str;
	}
}