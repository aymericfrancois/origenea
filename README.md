# origenea
Site web vitrine de généalogie pour maman

Site **Astro** (statique, déployé sur Netlify) avec **Sanity.io** comme CMS headless.

## CMS — Sanity.io

Le contenu (articles de blog et pages) est édité dans **Sanity Studio** (dossier
`studio/`, voir `studio/README.md`) et récupéré par Astro **au moment du build**.

### Configuration locale

1. Copier `.env.example` en `.env` à la racine et renseigner :
   - `PUBLIC_SANITY_PROJECT_ID` — l'ID du projet Sanity (https://www.sanity.io/manage)
   - `PUBLIC_SANITY_DATASET` — en général `production`
   - `SANITY_API_READ_TOKEN` — **uniquement** si le dataset est privé
2. `npm install && npm run dev`
3. Studio : `cd studio && cp .env.example .env && npm install && npm run dev` (http://localhost:3333)

### Variables à ajouter dans Netlify

Dans *Site settings → Environment variables* :

| Variable | Valeur | Obligatoire |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | l'ID du projet Sanity | ✅ |
| `PUBLIC_SANITY_DATASET` | `production` | ✅ |
| `SANITY_API_READ_TOKEN` | token de lecture | seulement si dataset privé |

### Redéploiement automatique à la publication

Comme le contenu est lu au build, il faut relancer le build quand le contenu change :

1. **Netlify** → *Site settings → Build & deploy → Build hooks* → créer un hook → copier l'URL.
2. **Sanity** → https://www.sanity.io/manage → projet → *API → Webhooks* → *Create webhook* :
   coller l'URL du build hook Netlify, méthode `POST`, déclencheurs *Create / Update / Delete*.

### Pages dynamiques

- Blog : `/blog` (liste) et `/blog/<slug>` (article) — type Sanity `blogPost`.
- Pages CMS : `/<slug>` (catch-all racine) — type Sanity `page`.
  ⚠️ Ne pas réutiliser un slug déjà pris par une page existante (`services`,
  `a-propos`, `contact`, `blog`) pour éviter une collision de route au build.

---

# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/index.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Origenea` project files (HTML prototypes, assets, components)
