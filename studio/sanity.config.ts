import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {frFRLocale} from '@sanity/locale-fr-fr'
import {schemaTypes} from './schemaTypes'

// Le Project ID et le dataset sont lus depuis les variables d'environnement
// (préfixe SANITY_STUDIO_ requis par Sanity pour les exposer au Studio).
const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

const singletonTypes = new Set(['siteInfo', 'pageAccueil', 'pageAPropos', 'pageServices'])

export default defineConfig({
  name: 'origenea',
  title: 'Origenea',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('📋 Informations du cabinet')
              .id('siteInfo')
              .child(
                S.document()
                  .schemaType('siteInfo')
                  .documentId('siteInfo')
                  .title('Informations du cabinet'),
              ),
            S.listItem()
              .title('🏠 Page d\'accueil')
              .id('pageAccueil')
              .child(
                S.document()
                  .schemaType('pageAccueil')
                  .documentId('pageAccueil')
                  .title('Page d\'accueil'),
              ),
            S.listItem()
              .title('👤 Page À propos')
              .id('pageAPropos')
              .child(
                S.document()
                  .schemaType('pageAPropos')
                  .documentId('pageAPropos')
                  .title('Page À propos'),
              ),
            S.listItem()
              .title('🛠 Page Services')
              .id('pageServices')
              .child(
                S.document()
                  .schemaType('pageServices')
                  .documentId('pageServices')
                  .title('Page Services'),
              ),
            S.divider(),
            S.listItem()
              .title('📝 Articles de blog')
              .child(S.documentTypeList('blogPost').title('Articles de blog')),
            S.listItem()
              .title('📄 Pages libres')
              .child(S.documentTypeList('page').title('Pages libres')),
          ]),
    }),
    visionTool(),
    frFRLocale(),
  ],

  schema: {
    types: schemaTypes,
    // Empêche la création de nouveaux documents pour les singletons
    // (les __experimental_actions dans les schémas gèrent ça côté Studio)
    templates: (prev) => prev.filter((t) => !singletonTypes.has(t.schemaType)),
  },
})
