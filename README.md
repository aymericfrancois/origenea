# Origenea
Site web vitrine de généalogie.

Site **Astro** (statique, déployé sur Netlify) avec **Sanity.io** comme CMS headless.

## Démarrage local

```bash
# Site
cp .env.example .env   # renseigner PUBLIC_SANITY_PROJECT_ID=gwoq0e5o
npm install
npm run dev            # http://localhost:4321

# Studio (interface d'édition)
cd studio
cp .env.example .env   # renseigner SANITY_STUDIO_PROJECT_ID=gwoq0e5o
npm install
npm run dev            # http://localhost:3333
```

## Commandes

```bash
npm run dev       # serveur de développement
npm run build     # build statique dans dist/
npm run preview   # prévisualiser le build
```

## Sanity (CMS)

- **Project ID** : `gwoq0e5o` · **dataset** : `production`
- **Studio hébergé** : https://origenea.sanity.studio (interface en français)
- **Déployer le Studio** : `cd studio && npm run deploy`
- **Pré-remplir les documents depuis le contenu actuel** :
  ```bash
  npx sanity login   # une seule fois
  node scripts/create-singletons.mjs
  ```

### Ce que Sanity gère

**Singletons** (un seul document chacun, édités directement dans la sidebar) :

| Document Studio | Page du site | Champs |
|---|---|---|
| 📋 Informations du cabinet | Footer + Contact | Adresse, tél, e-mail, horaires, zone d'intervention |
| 🏠 Page d'accueil | `/` | Hero, chiffres clés, intro, citation, témoignage |
| 👤 Page À propos | `/a-propos` | Bio (Portable Text), valeurs, sources, citation |
| 🛠 Page Services | `/services` | Liste des services, FAQ |

**Collections** :

| Document Studio | URL | Description |
|---|---|---|
| 📝 Articles de blog | `/blog` et `/blog/<slug>` | Titre, slug, date, image, contenu (Portable Text) |
| 📄 Pages libres | `/<slug>` | Pages génériques (mentions légales, CGV…). Ne pas réutiliser un slug déjà pris (`services`, `a-propos`, `contact`, `blog`). |

Toutes les pages **retombent sur leur contenu codé en dur** si le document Sanity correspondant est absent — le build ne casse jamais.

### Variables d'environnement

**Racine (site Astro)** — copier `.env.example` en `.env` :

| Variable | Valeur | Obligatoire |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `gwoq0e5o` | ✅ |
| `PUBLIC_SANITY_DATASET` | `production` | ✅ |
| `SANITY_API_READ_TOKEN` | token de lecture | seulement si dataset privé |

**Netlify** — ajouter dans *Site settings → Environment variables* les mêmes variables.

**Studio** (`studio/.env`) :

| Variable | Valeur |
|---|---|
| `SANITY_STUDIO_PROJECT_ID` | `gwoq0e5o` |
| `SANITY_STUDIO_DATASET` | `production` |

### Redéploiement automatique à la publication

Le contenu étant lu au build, chaque publication Sanity doit déclencher un nouveau build Netlify :

1. **Netlify** → *Site settings → Build & deploy → Build hooks* → créer un hook → copier l'URL.
2. **Sanity** → https://www.sanity.io/manage → projet → *API → Webhooks* → *Create webhook* :
   coller l'URL, méthode `POST`, déclencheurs *Create / Update / Delete*.

## Structure du projet

```
src/
  pages/
    index.astro          → pageAccueil (Sanity)
    a-propos.astro       → pageAPropos (Sanity)
    services.astro       → pageServices (Sanity)
    contact.astro        → siteInfo (Sanity)
    blog.astro           → blogPost[] (Sanity)
    blog/[slug].astro    → blogPost (Sanity)
    [slug].astro         → page (Sanity, pages libres)
  lib/
    sanity.ts            → client, requêtes GROQ, Portable Text, helpers
  components/
    Header.astro
    Footer.astro
  layouts/
    Base.astro
public/
  styles/origenea.css    → CSS du design
  assets/                → JS et images
studio/                  → Sanity Studio (sous-projet indépendant)
  schemaTypes/           → blogPost, page, siteInfo, pageAccueil, pageAPropos, pageServices
scripts/
  create-singletons.mjs  → pré-remplit les singletons Sanity
project/                 → prototypes HTML/CSS/JS d'origine (référence design, ne pas déployer)
chats/                   → transcriptions de la conversation de design
```
