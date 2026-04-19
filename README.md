# Agney & Adithiya Wedding Website

A trendy, stylish, Kerala-inspired wedding invitation website built with React + Vite and prepared for GitHub Pages.

## What changed
- WhatsApp RSVP instead of a regular form
- Kerala wedding theme with kasavu gold + modern romantic styling
- Responsive one-page layout
- Live countdown timer
- Map with directions button
- Pinterest-style photo gallery
- Light/dark theme toggle
- Optional background music toggle
- Welcome modal on first visit

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository named `agney-adithiya-wedding-site`
2. Push this project to that repository
3. Run:

```bash
npm install
npm run deploy
```

4. In GitHub, enable GitHub Pages for the published branch if needed.

## Important customizations

### 1. WhatsApp RSVP number
Open `src/App.jsx` and replace:

```js
const whatsappNumber = '919999999999'
```

Use your WhatsApp number in international format.

### 2. Venue label
In `src/App.jsx`, edit:

```js
const venueLabel = 'Wedding Venue, Kerala'
```

### 3. Images
The gallery currently uses remote photos. Replace the `galleryItems` array with your own image URLs, or place local images in `public/` and reference them like:

```js
image: '/photos/photo1.jpg'
```

### 4. GitHub Pages base path
If your repository name is different, update `vite.config.js`:

```js
base: '/your-repo-name/'
```

## Project structure

- `src/App.jsx` - main page UI
- `src/styles.css` - full styling
- `src/main.jsx` - React entry
- `vite.config.js` - GitHub Pages config

## Notes
- The embedded map uses the coordinates `8.5337564,76.8783493`
- Background music may require a user click before playback due to browser rules
