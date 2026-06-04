# Origenea

Site web vitrine de généalogie, construit avec [Astro](https://astro.build/).
Le design provient d'un bundle Claude Design (voir `README.md`, `chats/` et
`project/`) qui a été recréé dans `src/`. Le contenu (blog + pages) est géré
via **Sanity.io** (CMS headless), lu au build. Détails dans `README.md`.

## Préférences de travail (IMPORTANT)

- **Travailler uniquement sur la branche `main`.** Je ne veux pas avoir à gérer
  de merges ni de suppressions de branches. Committer et pousser directement
  sur `main`, sans créer de branche de feature ni ouvrir de pull request, sauf
  demande explicite de ma part.

## Commandes

- `npm install` — installer les dépendances
- `npm run dev` — serveur de développement local
- `npm run build` — build statique dans `dist/`
- `npm run preview` — prévisualiser le build

## Structure

- `src/pages/` — pages du site (`index`, `services`, `a-propos`, `blog`, `contact`),
  `blog/[slug].astro` (articles) et `[slug].astro` (pages CMS)
- `src/lib/sanity.ts` — client Sanity, requêtes GROQ, rendu Portable Text, helpers
- `src/components/` — composants partagés (`Header`, `Footer`)
- `src/layouts/Base.astro` — layout commun
- `public/styles/origenea.css` — CSS du design (repris du bundle Claude Design)
- `public/assets/` — JS et images
- `studio/` — Sanity Studio (sous-projet indépendant, propre `package.json`)
- `project/` — prototypes HTML/CSS/JS d'origine (référence design, ne pas déployer)
- `chats/` — transcriptions de la conversation de design

## Sanity (CMS)

- Variables d'env racine : `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`
  (cf. `.env.example`). Mêmes variables à configurer dans Netlify.
- Studio : `cd studio && npm install && npm run dev` (port 3333).
- Le contenu est lu **au build** → un webhook Sanity → build hook Netlify
  redéclenche le déploiement à chaque publication (cf. `README.md`).
