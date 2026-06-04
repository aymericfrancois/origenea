import {defineField, defineType} from 'sanity'

export const siteInfo = defineType({
  name: 'siteInfo',
  title: 'Informations du cabinet',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'adresse_rue',
      title: 'Adresse — rue',
      type: 'string',
    }),
    defineField({
      name: 'adresse_ville',
      title: 'Adresse — ville',
      type: 'string',
    }),
    defineField({
      name: 'adresse_cp',
      title: 'Adresse — code postal',
      type: 'string',
    }),
    defineField({
      name: 'telephone',
      title: 'Téléphone (format international)',
      type: 'string',
      description: 'Ex : +33557251234',
    }),
    defineField({
      name: 'telephone_affiche',
      title: 'Téléphone (format affiché)',
      type: 'string',
      description: 'Ex : 05 57 25 12 34',
    }),
    defineField({
      name: 'email',
      title: 'E-mail',
      type: 'string',
    }),
    defineField({
      name: 'horaires',
      title: 'Horaires',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'horaires_detail',
      title: 'Horaires — détail',
      type: 'string',
    }),
    defineField({
      name: 'zone_intervention',
      title: 'Zone d\'intervention (pills)',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Informations du cabinet'}
    },
  },
})
