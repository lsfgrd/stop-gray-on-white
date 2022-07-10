import { hexToRgb, itsTooGrey, rgbStringToObject } from './helpers/color-helpers';

const setColor = (element: HTMLElement, color: string): void => {
  const elementColor = getComputedStyle(element).color;

  const isHex = elementColor[0] === '#';
  const elementColorRgb = isHex ? hexToRgb(elementColor) : rgbStringToObject(elementColor);

  if (itsTooGrey(elementColorRgb)) {
    element.style.setProperty('color', color, 'important');
  }
};

chrome.runtime.onMessage.addListener(({ color }, sender, sendResponse) => {
  if (color) {
    const all = document.getElementsByTagName('*') as any as HTMLElement[];

    for (let i = 0; i < all.length; i += 1) {
      const element = all[i];
      setColor(element, color);
    }

    sendResponse(`Change color to ${color}`);
  } else {
    sendResponse('Color message is none.');
  }
});
