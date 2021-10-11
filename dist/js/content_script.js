/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./src/content_script.tsx ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
function isItEvenGray(rgbColor) {
    const tolerance = 11; // Arbitrary, ideally configurable
    const { r, g, b } = rgbColor;
    if (r === g && g === b && r === b) {
        return true;
    }
    const diff1 = r - g;
    const diff2 = g - b;
    return diff1 >= -tolerance && diff1 <= tolerance && diff2 >= -tolerance && diff2 <= tolerance;
}
function itsTooGrey(rgbColor) {
    if (rgbColor) {
        const { r, g, b } = rgbColor;
        const grayscale = isItEvenGray(rgbColor);
        if (grayscale) {
            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            // Too bright, but not white-bright so it doesn't change white text
            return luma > 40 && luma < 95;
        }
        return false;
    }
    return false;
}
function rgbStringToObject(rgbString) {
    const colors = ['r', 'g', 'b'];
    const colorArr = rgbString
        .slice(rgbString.indexOf('(') + 1, rgbString.indexOf(')'))
        .split(', ')
        .map((x) => parseInt(x, 10));
    const obj = {
        r: colorArr[0],
        g: colorArr[1],
        b: colorArr[2],
    };
    return obj;
}
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.color) {
        console.log(`Receive color = ${msg.color}`);
        // document.body.style.backgroundColor = msg.color;
        const all = document.getElementsByTagName('*');
        for (let i = 0, max = all.length; i < max; i++) {
            const element = all[i];
            const elementColor = getComputedStyle(element).color;
            const isHex = elementColor[0] === '#';
            const elementColorRgb = isHex ? hexToRgb(elementColor) : rgbStringToObject(elementColor);
            if (itsTooGrey(elementColorRgb)) {
                element.style.color = msg.color;
            }
        }
        sendResponse(`Change color to ${msg.color}`);
    }
    else {
        sendResponse('Color message is none.');
    }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudF9zY3JpcHQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Q7QUFDQSxnQ0FBZ0MsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixZQUFZLFVBQVU7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsVUFBVTtBQUNqRDtBQUNBO0FBQ0EsMENBQTBDLFNBQVM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxVQUFVO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2Nocm9tZS1leHRlbnNpb24tdHlwZXNjcmlwdC1zdGFydGVyLy4vc3JjL2NvbnRlbnRfc2NyaXB0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IC9eIz8oW2EtZlxcZF17Mn0pKFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkkL2kuZXhlYyhoZXgpO1xuICAgIHJldHVybiByZXN1bHRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICByOiBwYXJzZUludChyZXN1bHRbMV0sIDE2KSxcbiAgICAgICAgICAgIGc6IHBhcnNlSW50KHJlc3VsdFsyXSwgMTYpLFxuICAgICAgICAgICAgYjogcGFyc2VJbnQocmVzdWx0WzNdLCAxNiksXG4gICAgICAgIH1cbiAgICAgICAgOiBudWxsO1xufVxuZnVuY3Rpb24gaXNJdEV2ZW5HcmF5KHJnYkNvbG9yKSB7XG4gICAgY29uc3QgdG9sZXJhbmNlID0gMTE7IC8vIEFyYml0cmFyeSwgaWRlYWxseSBjb25maWd1cmFibGVcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IHJnYkNvbG9yO1xuICAgIGlmIChyID09PSBnICYmIGcgPT09IGIgJiYgciA9PT0gYikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgZGlmZjEgPSByIC0gZztcbiAgICBjb25zdCBkaWZmMiA9IGcgLSBiO1xuICAgIHJldHVybiBkaWZmMSA+PSAtdG9sZXJhbmNlICYmIGRpZmYxIDw9IHRvbGVyYW5jZSAmJiBkaWZmMiA+PSAtdG9sZXJhbmNlICYmIGRpZmYyIDw9IHRvbGVyYW5jZTtcbn1cbmZ1bmN0aW9uIGl0c1Rvb0dyZXkocmdiQ29sb3IpIHtcbiAgICBpZiAocmdiQ29sb3IpIHtcbiAgICAgICAgY29uc3QgeyByLCBnLCBiIH0gPSByZ2JDb2xvcjtcbiAgICAgICAgY29uc3QgZ3JheXNjYWxlID0gaXNJdEV2ZW5HcmF5KHJnYkNvbG9yKTtcbiAgICAgICAgaWYgKGdyYXlzY2FsZSkge1xuICAgICAgICAgICAgY29uc3QgbHVtYSA9IDAuMjEyNiAqIHIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogYjtcbiAgICAgICAgICAgIC8vIFRvbyBicmlnaHQsIGJ1dCBub3Qgd2hpdGUtYnJpZ2h0IHNvIGl0IGRvZXNuJ3QgY2hhbmdlIHdoaXRlIHRleHRcbiAgICAgICAgICAgIHJldHVybiBsdW1hID4gNDAgJiYgbHVtYSA8IDk1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gcmdiU3RyaW5nVG9PYmplY3QocmdiU3RyaW5nKSB7XG4gICAgY29uc3QgY29sb3JzID0gWydyJywgJ2cnLCAnYiddO1xuICAgIGNvbnN0IGNvbG9yQXJyID0gcmdiU3RyaW5nXG4gICAgICAgIC5zbGljZShyZ2JTdHJpbmcuaW5kZXhPZignKCcpICsgMSwgcmdiU3RyaW5nLmluZGV4T2YoJyknKSlcbiAgICAgICAgLnNwbGl0KCcsICcpXG4gICAgICAgIC5tYXAoKHgpID0+IHBhcnNlSW50KHgsIDEwKSk7XG4gICAgY29uc3Qgb2JqID0ge1xuICAgICAgICByOiBjb2xvckFyclswXSxcbiAgICAgICAgZzogY29sb3JBcnJbMV0sXG4gICAgICAgIGI6IGNvbG9yQXJyWzJdLFxuICAgIH07XG4gICAgcmV0dXJuIG9iajtcbn1cbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigobXNnLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgIGlmIChtc2cuY29sb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmUgY29sb3IgPSAke21zZy5jb2xvcn1gKTtcbiAgICAgICAgLy8gZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBtc2cuY29sb3I7XG4gICAgICAgIGNvbnN0IGFsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCcqJyk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBhbGwubGVuZ3RoOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhbGxbaV07XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50Q29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmNvbG9yO1xuICAgICAgICAgICAgY29uc3QgaXNIZXggPSBlbGVtZW50Q29sb3JbMF0gPT09ICcjJztcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRDb2xvclJnYiA9IGlzSGV4ID8gaGV4VG9SZ2IoZWxlbWVudENvbG9yKSA6IHJnYlN0cmluZ1RvT2JqZWN0KGVsZW1lbnRDb2xvcik7XG4gICAgICAgICAgICBpZiAoaXRzVG9vR3JleShlbGVtZW50Q29sb3JSZ2IpKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5jb2xvciA9IG1zZy5jb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZW5kUmVzcG9uc2UoYENoYW5nZSBjb2xvciB0byAke21zZy5jb2xvcn1gKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNlbmRSZXNwb25zZSgnQ29sb3IgbWVzc2FnZSBpcyBub25lLicpO1xuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9