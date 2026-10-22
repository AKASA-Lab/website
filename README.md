# Smart Aeroponics System

Research documentation for a fenugreek aeroponics study using controlled fertilizer-omission treatments and a time-series image dataset.

## Local development

Requirements: Node.js 20 or later and npm.

```sh
npm install
npm run dev
```

Vite prints the local development URL. Documentation content lives in `docs/` as Markdown; navigation, project media references, and milestone data are maintained in `src/content.js`. Project-provided photos, video, and presentation are kept in `data/` and bundled into the production site. The theme toggle switches between light and dark mode and remembers the selection in the browser.

## Build and preview

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`. Deploy the contents of that directory to any static host. For GitHub Pages, configure the repository to publish `dist/` using the deployment workflow or hosting setup used by the project.

## Updating content

- Add or edit Markdown files in `docs/` and register new pages in `src/content.js`.
- Keep confirmed project facts distinct from placeholders.
- Update the milestone entries in `src/content.js` when project status changes.
- Replace or add supplied media in `data/` and update its corresponding import and description in `src/content.js`.
