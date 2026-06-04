# Origenea — Sanity Studio

Interface d'édition (CMS headless) du site Origenea. Sous-projet **indépendant**
du site Astro : il a son propre `package.json` et n'impacte pas le build du site.

## Démarrage

```bash
cd studio
cp .env.example .env      # renseigner SANITY_STUDIO_PROJECT_ID
npm install
npm run dev               # Studio sur http://localhost:3333
```

> Le `Project ID` se trouve sur https://www.sanity.io/manage (ou via `npx sanity projects list`).

## Contenus gérés

- **Article de blog** (`blogPost`) : titre, slug, date, image, contenu (Portable Text).
- **Page** (`page`) : titre, slug, contenu (Portable Text).

## Déployer le Studio (hébergement Sanity)

```bash
npm run deploy            # déploie sur https://<nom>.sanity.studio
```

## Lien avec le site Astro

Le site (à la racine du repo) lit ces contenus **au moment du build** via `@sanity/client`.
Pour que les modifications apparaissent en ligne, le build Netlify doit être relancé
(automatique via le webhook Sanity → build hook Netlify, cf. README racine).
