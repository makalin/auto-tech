# Auto-Tech System v2.1

An automotive database and maintenance manual built with React, TypeScript, Vite, and Tailwind CSS. This app provides a detailed interface for car models, parts, maintenance schedules, diagnostics, and more, with a CRT visual style.

## 🌐 Live Demo

**[View the live application on GitHub Pages](https://makalin.github.io/auto-tech/)**

## Features

- **Car Model Database:** Browse and select different car models.
- **Interactive Parts Diagram:** Clickable car parts with details, maintenance intervals, and pricing.
- **Maintenance Schedules:** View and track maintenance records for each model.
- **Diagnostics:** Lookup diagnostic codes, severity, and solutions.
- **Calculator:** Calculate engine compression ratios and other values.
- **Theme Selector:** Switch between Terminal Green, Cyberpunk, and Amber CRT themes.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd auto-tech
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Project
To start the development server:
```bash
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production
To build the app for production:
```bash
npm run build
```
- Preview the production build:
```bash
npm run preview
```

### Deployment
To deploy to GitHub Pages:
```bash
npm run deploy
```

### Linting
To check code quality:
```bash
npm run lint
```

## Project Structure
```
├── src/
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Entry point
│   ├── index.css       # Global styles (Tailwind)
│   └── vite-env.d.ts   # Vite/TypeScript types
├── index.html          # Main HTML file
├── package.json        # Project metadata and scripts
├── tailwind.config.js  # Tailwind CSS config
├── postcss.config.js   # PostCSS config
└── ...
```

## Technologies Used
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React Icons](https://lucide.dev/icons/)

## Credits
- CRT UI inspired by classic terminal interfaces.
- Icons by [Lucide](https://lucide.dev/).

## License
This project is licensed under the MIT License. 