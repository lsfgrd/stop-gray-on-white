let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

function setPageBackgroundColor() {
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function isItEvenGray(rgbColor) {
    const tolerance = 11; // Arbitrary, ideally configurable
    const { r, g, b } = rgbColor;

    if (r === g === b) {
      return true;
    }
    
    const diff1 = r - g;
    const diff2 = g - b;
    return diff1 >= -tolerance && diff1 <= tolerance && diff2 >= -tolerance && diff2 <= tolerance;
  }
  
  function isTooGrey(rgbColor) {
    const { r, g, b } = rgbColor;
    const grayscale = isItEvenGray(rgbColor);

    if (grayscale) {
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luma > 40 && luma < 95; // Too bright, but not white-bright so it doesn't change white text
    } else {
      return false;
    }
  }
  
  function rgbStringToObject(rgbString) {
    const colors = ['r', 'g', 'b'];
  
    const colorArr = rgbString.slice(
      rgbString.indexOf("(") + 1, 
      rgbString.indexOf(")")
    ).split(", ");
      
    const obj = {};
  
    colorArr.forEach((k, i) => {
      obj[colors[i]] = k;
    });
  
    return obj;
  }

  chrome.storage.sync.get("color", ({ color }) => {
    var all = document.getElementsByTagName("*");
    
    for (var i=0, max=all.length; i < max; i++) {
      const element = all[i];
      const elementColor = getComputedStyle(element).color;
      const isHex = elementColor[0] === '#';
      const elementColorRgb = isHex ? hexToRgb(elementColor) : rgbStringToObject(elementColor);

      if (isTooGrey(elementColorRgb)) {
        all[i].style.color = color;
      }
    }
  });
}
