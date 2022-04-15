# Pixel Art Project

### Description

This is a NodeJS web page to simulate what happened in r/place in reddit. It is still a WIP, so if you are watching this it's pretty raw :sweat_smile:

**Watch the timelapse here!**
https://www.reddit.com/r/place/comments/txufad/the_complete_rplace_timelapse/

### How it works

Its pretty simple actually. The design has been improved, still much more to do!

#### FrontEnd

- HTML, CSS and JS
- Grid display ( Now not so horrible, but still). Each div represents a pixel which you can change its colour.
- Colour palette to pick desired colour.
- WebSockets implementation for delta updates. It gets a bit laggy if there are lots of containers.
- Handle pixels reset in client side, in case the server fails and returns to a older state.

#### BackEnd

- NodeJS with express under the hood.
- A couple of routes:
  - Get all Pixels
  - Get Delta
  - Get pixels since Delta
  - Post pixel colour change
- Pixels are initially saved in a JSON and read each time the server is up.
- Pixels are handled by containers. Each container handles its own pixels and deltas with simple arrays. Each time you change a pixel you search the _WHOLE_ array, find the pixel and change its colour. Yep, _low budget algorithm_.

### How to run

#### Requirements

- _npm_
- _Postman_

#### Steps

1. Clone the repository
2. Run _npm install_ at the root of the clone repository
3. Create a _.env_ file and add a **PORT** property
4. Run _npm start_
5. Optional import _Postman_ collection for testing
6. Generate the base jsons somehow... (check the routes)
7. Go to localhost:5000 or domain:port or wherever you have set up the server.
8. ?
9. profit (?)

### TODO

- ~~Expand HTML template in order to have more pixels~~ Done
- ~~Redesign pixel handling in backend in order to achieve better performance.~~ Done
- Redesign pixel handling in backend in order to achieve better performance. :point_right::point_left:
- Upper view of whole drawing ( if it doesn't fit the whole page)
- Change to a tree implementation maybe? Reduce iteration searching. Maybe an index? Hash Index?
- Change Backend and replicate NodeJS instances. If it needs to scale it will be difficult by now.
- Add Redis to handle fast pixel changes and persistance among other instances in the future.

Anyway, back to sleep :sleeping:
