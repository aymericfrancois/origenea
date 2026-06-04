import {defineField, defineType} from 'sanity'

export const pageAccueil = defineType({
  name: 'pageAccueil',
  title: 'Page d\'accueil',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroTitre',
      title: 'Hero — Titre',
      type: 'string',
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero — Lead',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'citationCatherine',
      title: 'Citation de Catherine',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'introParagraphe',
      title: 'Paragraphe d\'introduction',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'trustItems',
      title: 'Chiffres clés (trust bar)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'valeur', title: 'Valeur', type: 'string'}),
            defineField({name: 'libelle', title: 'Libellé', type: 'string'}),
          ],
          preview: {
            select: {valeur: 'valeur', libelle: 'libelle'},
            prepare({valeur, libelle}) {
              return {title: valeur, subtitle: libelle}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'temoignage',
      title: 'Témoignage client (citation)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'temoignageAuteur',
      title: 'Témoignage — Auteur',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page d\'accueil'}
    },
  },
})
