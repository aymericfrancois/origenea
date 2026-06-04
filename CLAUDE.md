# Origenea

Site web vitrine de généalogie, construit avec [Astro](https://astro.build/).
Le design provient d'un bundle Claude Design (voir `README.md`, `chats/` et
`project/`) qui a été recréé dans `src/`.

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

- `src/pages/` — pages du site (`index`, `services`, `a-propos`, `blog`, `contact`)
- `src/components/` — composants partagés (`Header`, `Footer`)
- `src/layouts/Base.astro` — layout commun
- `public/styles/origenea.css` — CSS du design (repris du bundle Claude Design)
- `public/assets/` — JS et images
- `project/` — prototypes HTML/CSS/JS d'origine (référence design, ne pas déployer)
- `chats/` — transcriptions de la conversation de design
