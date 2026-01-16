# Chillingo - English Learning App

A React application for learning English, even when you're lazy!

## Getting Started

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
```

## Project Structure

```
chillingo/
├── public/
│   └── index.html
├── src/
│   ├── assets/           # Images and static assets
│   ├── components/       # React components
│   │   ├── Landing.js
│   │   └── Landing.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Features

- Welcome/Landing screen with Vietnamese text
- Clean, modern UI design
- Responsive layout
- Interactive start button

## Note About Assets

The project includes placeholder files for image assets:
- `close-icon.png` - The X/close button icon
- `house-icon.png` - The house illustration

You can:
1. Export these images directly from your Figma design
2. Use any suitable icons/images that match your design
3. Update the import paths in `Landing.js` once you add the actual images

## Next Steps

1. Add actual image assets to `src/assets/`
2. Implement navigation logic for the "Bắt đầu" button
3. Create additional screens for your English learning flow
4. Add state management if needed (Redux, Context API, etc.)
