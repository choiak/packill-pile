export function checkArraysAreEqual(arr1, arr2) {
	return (arr1.length === arr2.length) && arr1.every(function(element, index) {
		return element === arr2[index];
	});
}