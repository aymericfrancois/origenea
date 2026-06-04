import {defineField, defineType} from 'sanity'

export const pageServices = defineType({
  name: 'pageServices',
  title: 'Page Services',
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'titre', title: 'Titre', type: 'string'}),
            defineField({name: 'lead', title: 'Lead', type: 'text', rows: 2}),
            defineField({name: 'description', title: 'Description', type: 'text', rows: 4}),
            defineField({
              name: 'listeItems',
              title: 'Liste des éléments',
              type: 'array',
              of: [{type: 'string'}],
            }),
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
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'question', title: 'Question', type: 'string'}),
            defineField({name: 'reponse', title: 'Réponse', type: 'text', rows: 4}),
          ],
          preview: {
            select: {question: 'question'},
            prepare({question}) {
              return {title: question}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page Services'}
    },
  },
})
