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
  `blog/[slug].astro` (articles) et `[slug].astro` (pages libres CMS)
- `src/lib/sanity.ts` — client Sanity, requêtes GROQ, rendu Portable Text, helpers
  (`getSiteInfo`, `getPageAccueil`, `getPageAPropos`, `getPageServices`, `getPosts`…)
- `src/components/` — composants partagés (`Header`, `Footer`)
- `src/layouts/Base.astro` — layout commun
- `public/styles/origenea.css` — CSS du design (repris du bundle Claude Design)
- `public/assets/` — JS et images
- `studio/` — Sanity Studio (sous-projet indépendant, propre `package.json`)
- `scripts/create-singletons.mjs` — pré-remplit les documents singletons Sanity
  avec le contenu actuel du site (`node scripts/create-singletons.mjs`, nécessite
  `npx sanity login` au préalable)
- `project/` — prototypes HTML/CSS/JS d'origine (référence design, ne pas déployer)
- `chats/` — transcriptions de la conversation de design

## Sanity (CMS)

- Project ID `gwoq0e5o`, dataset `production`.
- Le contenu est lu **au build** (fetch GROQ dans `src/lib/sanity.ts`, avec
  **fallback sur les valeurs en dur** d'origine si Sanity est injoignable ou si
  un document n'existe pas encore — le build ne casse jamais).
- Variables d'env racine : `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET`
  (+ `SANITY_API_READ_TOKEN` si le dataset est privé). cf. `.env.example`.
  Mêmes variables à configurer dans Netlify.
- Studio hébergé : **https://origenea.sanity.studio** (`studioHost: 'origenea'`).
  Local : `cd studio && npm install && npm run dev` (port 3333).
  Déploiement : `cd studio && npm run deploy`. Interface en français (`@sanity/locale-fr-fr`).
- Le contenu est lu au build → un webhook Sanity → build hook Netlify redéclenche
  le déploiement à chaque publication (cf. `README.md`).

### Schémas (`studio/schemaTypes/`)

**Singletons** (un seul document chacun, édités directement dans la sidebar du
Studio ; création/suppression bloquées via `__experimental_actions`) :

- `siteInfo` — Informations du cabinet (adresse, téléphone, e-mail, horaires,
  zone d'intervention). Utilisé par le footer et la page Contact.
- `pageAccueil` — textes de la page d'accueil (hero, chiffres clés, intro,
  citation, témoignage).
- `pageAPropos` — page À propos (bio en Portable Text, carte « en quelques mots »,
  valeurs, liste des sources, citation finale).
- `pageServices` — page Services (liste des services, FAQ).

**Collections** :

- `blogPost` — Articles de blog (titre, slug, date, image, contenu Portable Text).
- `page` — « **Pages libres** » : pages génériques servies à `/<slug>`
  (mentions légales, CGV…), créées de A à Z depuis le Studio. Ne pas réutiliser
  un slug déjà pris par une page fixe (`services`, `a-propos`, `contact`, `blog`).

### Pages Astro alimentées par Sanity

- `index.astro` → `pageAccueil` · `a-propos.astro` → `pageAPropos` ·
  `services.astro` → `pageServices` · `contact.astro` → `siteInfo`
- `blog.astro` + `blog/[slug].astro` → `blogPost`
- `[slug].astro` → `page` (pages libres)

Toutes ces pages **retombent sur leur contenu en dur d'origine** si le document
Sanity correspondant est absent.
