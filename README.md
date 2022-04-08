# Pixel Art Project

### Description

This is a NodeJS web page to simulate what happened in r/place in reddit. It is still a WIP, so if you are watching this it's pretty raw :sweat_smile:

**Watch the timelapse here!**
https://www.reddit.com/r/place/comments/txufad/the_complete_rplace_timelapse/

### How it works

Its pretty simple actually. Though im not happy with the actual design.

#### FrontEnd

- Pure HTML and CSS
- Grid display ( I know..., horrible). Each div represents a pixel which you can change its colour.
- JS to repeatedly hit the backend to update. Polling every x time. NASA performance implementation. :sunglasses:

#### BackEnd

- NodeJS with express under the hood.
- A couple of routes:
  - Get all Pixels
  - Get Delta
  - Get pixels since Delta
  - Post pixel colour change
- Pixels are initially saved in a JSON and read each time the server is up.
- Pixels are handled by a simple array. Each time you change a pixel you search the _WHOLE_ array, find the pixel and change its colour. Yep, _low budget algorithm_.

### TODO

- Expand HTML template in order to have more pixels
- Redesign pixel handling in backend in order to achieve better performance.
- Add colour palette.
- Upper view of whole drawing ( if it doesn't fit the whole page)
- Change to a tree implementation maybe? Reduce iteration searching. Maybe an index? Hash Index?
- Change Backend and replicate NodeJS instances. If it needs to scale it will be difficult by now.
- Add Redis to handle fast pixel changes and persistance among other instances in the future.
- Handle pixels reset in client side, in case the server fails and returns to a older state.

Anyway, back to sleep :sleeping:
