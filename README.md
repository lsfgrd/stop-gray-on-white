# STOP GRAY ON WHITE!

This is a WIP Chrome Extension. I decided to create this to solve my biggest problem with the modern web: **low text contrast**, specifically grey on white background.

They say it looks good and it's easier on the eyes, but I disagree :)

That being said: **#StopGrayOnWhite** :D

## The extension

This is my first ever Chrome extension and I wrote it in the span of 1 hour, so it's not the best code ever and it's not user-friendly at all. I hope to change this reality in the near future (and to also have a Firefox version as well).

### Building & running
TBA

### Known issues
- Extension doesn't consider alpha values in RGB colors, i.e. if you have ``rgb(0, 0, 0, 0.4)`` it won't consider as "too light";
- Probably a lot more;

### Needed improvements to-do list
I consider the extension not usable by anyone but me while I haven't completed the following tasks:

- [X] Allow the user to configure the substitute color to their preference;
- [ ] Toggle to persist the change for a given website;

### Nice-to-have improvements
- [ ] Make the grey/light tolerance level configurable;
- [ ] Allow to change the text font and size;
