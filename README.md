# Layers of Knowledge

dev/creator = **tubakhxn**

A hand-controlled 3D map of modern knowledge that runs fully in the browser. Ten layers, from the Internet up to Future Technologies, are drawn as a stack of cards. You move through them with your index finger in front of your webcam.

Built with **Three.js** (3D), **MediaPipe Hand Landmarker** (hand tracking) and **Vite** (dev server and build). It is portrait (9:16), made for reels and screen recordings.

## The 10 layers

1. Internet & Web
2. Computer Science
3. Mathematics
4. Physics
5. Artificial Intelligence
6. Machine Learning
7. Computer Vision
8. Robotics
9. Scientific Research
10. Future Technologies

## What you get

- **Opening simulation (about 10 s):** black screen, wireframe layers rise one by one with their labels, fill with images, then the cards stand up into a collage and hand over to the interactive scene. Tap, Space or Enter skips it. The replay button or the `R` key plays it again.
- **Interactive scene:** webcam on top, the 3D layer card in the middle, the topic index at the bottom. Everything builds in on load and reacts while you swipe.
- **Fast, smooth swipe:** the cards follow your finger directly and settle on the nearest layer when you pause.

## Controls

| Gesture | What it does |
| --- | --- |
| Point + move index finger up / down | Travel between layers |
| Quick sideways flick while pointing | Next / previous layer |
| Pinch | Focus the current layer |
| Open palm | Expand the related concepts |
| Hand left / right, closer / farther | Parallax and zoom |

No camera? Use `Arrow Up` / `Arrow Down` or the mouse wheel to move, hold `P` to pinch and hold `O` for open palm.

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`) and allow the webcam. `localhost` counts as a secure origin, so the camera works. The hand model and its WASM files load from jsDelivr and Google storage on the first run, so you need internet once.

Production build:

```bash
npm run build
npm run preview
```

## How to fork it

1. Click **Fork** on the GitHub repository page (top right).
2. Clone your fork:
   ```bash
   git clone https://github.com/<your-username>/knowledge-layers.git
   cd knowledge-layers
   ```
3. Install and run:
   ```bash
   npm install
   npm run dev
   ```
4. Make your changes on a branch:
   ```bash
   git checkout -b my-changes
   git add .
   git commit -m "describe your change"
   git push origin my-changes
   ```
5. Optional: open a pull request back to the original repository, or deploy your fork (see below).

Please keep the `dev/creator=tubakhxn` credit when you share or build on this project.

## Make it yours

| What | Where |
| --- | --- |
| Topics, descriptions, related concepts | `src/knowledgeData.js` (edit the `LAYERS` array) |
| Layer images | Drop `layer-01.jpg` to `layer-10.jpg` (jpg, png or webp) into `src/images/` |
| Opening simulation timings | `T` object at the top of `src/intro.js` |
| Swipe speed | `GAIN` in `src/gestureEngine.js` (higher = faster) |
| How big the card is on screen | `FITW` in `src/main.js` (lower = bigger) |
| Colours and index text size | `src/style.css` |

## Project structure

```
knowledge-layers/
├── index.html
├── package.json
└── src/
    ├── main.js             app loop, wires everything together
    ├── intro.js            opening simulation
    ├── knowledgeLayers.js  3D scene: sediment layers, card stack, text panels
    ├── knowledgeData.js    the 10 topics
    ├── gestureEngine.js    hand pose detection and swipe logic
    ├── handTracker.js      MediaPipe hand landmarker
    ├── interaction.js      keyboard and wheel fallback
    ├── camera.js           webcam setup
    ├── scene.js            Three.js renderer and camera
    ├── stackLayers.js      alternate stack view
    ├── style.css
    └── images/             layer-01.jpg ... layer-10.jpg
```

## Deploy

It is a static site, so any static host works. On Vercel or Netlify, import the repository and use:

- Build command: `npm run build`
- Output directory: `dist`

The site must be served over HTTPS (or `localhost`) for the webcam to work.

## Troubleshooting

- **Camera does not start:** allow camera access in the browser, close other apps that use the camera, and check that you are on HTTPS or `localhost`.
- **"loading hand model" never finishes:** check your internet connection, the model is downloaded on first run.
- **Hand is not detected:** use good front lighting and keep your hand fully in frame.
- **Swipe feels too slow or too fast:** change `GAIN` in `src/gestureEngine.js`.

## Credits

Made by **tubakhxn** — [github.com/tubakhxn](https://github.com/tubakhxn)
