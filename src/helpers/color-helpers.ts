import { RGB } from '../types/rgb.type';

const hexToRgb = (hex: string): RGB | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

const isItEvenGray = (rgbColor: RGB): boolean => {
  const tolerance = 11; // Arbitrary, ideally configurable
  const { r, g, b } = rgbColor;

  if (r === g && g === b && r === b) {
    return true;
  }

  const diff1 = r - g;
  const diff2 = g - b;
  return diff1 >= -tolerance && diff1 <= tolerance && diff2 >= -tolerance && diff2 <= tolerance;
};

const itsTooGrey = (rgbColor: RGB | null): boolean => {
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
};

const rgbStringToObject = (rgbString: string): RGB => {
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
};

export {
  hexToRgb, itsTooGrey, rgbStringToObject,
};
