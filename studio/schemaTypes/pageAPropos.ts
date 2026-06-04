import {defineField, defineType} from 'sanity'

export const pageAPropos = defineType({
  name: 'pageAPropos',
  title: 'Page À propos',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroLead',
      title: 'Hero — Lead',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bio',
      title: 'Biographie (Portable Text)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'carteItems',
      title: 'Carte "En quelques mots" — items',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'valeurs',
      title: 'Valeurs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'titre', title: 'Titre', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 3}),
          ],
          preview: {
            select: {titre: 'titre'},
            prepare({titre}) {
              return {title: titre}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sourcesList',
      title: 'Liste des sources',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'citation',
      title: 'Citation finale',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page À propos'}
    },
  },
})
