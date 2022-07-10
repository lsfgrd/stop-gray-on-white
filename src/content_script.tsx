import { RGB } from './types/rgb.type';

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

function isItEvenGray(rgbColor: RGB): boolean {
  const tolerance = 11; // Arbitrary, ideally configurable
  const { r, g, b } = rgbColor;

  if (r === g && g === b && r === b) {
    return true;
  }

  const diff1 = r - g;
  const diff2 = g - b;
  return diff1 >= -tolerance && diff1 <= tolerance && diff2 >= -tolerance && diff2 <= tolerance;
}

function itsTooGrey(rgbColor: RGB | null): boolean {
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

function rgbStringToObject(rgbString: string): RGB {
  const colorArr = rgbString
    .slice(rgbString.indexOf('(') + 1, rgbString.indexOf(')'))
    .split(', ')
    .map((x) => parseInt(x, 10));

  const obj: RGB = {
    r: colorArr[0],
    g: colorArr[1],
    b: colorArr[2],
  };

  return obj;
}

const setColor = (element: HTMLElement, color: string): void => {
  const elementColor = getComputedStyle(element).color;

  const isHex = elementColor[0] === '#';
  const elementColorRgb = isHex ? hexToRgb(elementColor) : rgbStringToObject(elementColor);

  if (itsTooGrey(elementColorRgb)) {
    element.style.setProperty('color', color, 'important');
  }
};

chrome.runtime.onMessage.addListener(({ color }, sender, sendResponse) => {
  console.log('message triggered');

  if (color) {
    const all = document.getElementsByTagName('*') as any as HTMLElement[];

    for (let i = 0; i < all.length; i += 1) {
      const element = all[i];
      setColor(element, color);
    }

    console.log('Finished running');

    sendResponse(`Change color to ${color}`);
  } else {
    sendResponse('Color message is none.');
  }
});
