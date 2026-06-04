/**
 * Script de création/mise à jour des documents singletons Sanity.
 * Usage : node scripts/create-singletons.mjs
 */

import {createClient} from '@sanity/client'
import {readFileSync} from 'fs'
import {homedir} from 'os'
import {join} from 'path'

// Lecture du token depuis la config locale Sanity
const configPath = join(homedir(), '.config', 'sanity', 'config.json')
const {authToken} = JSON.parse(readFileSync(configPath, 'utf-8'))

const client = createClient({
  projectId: 'gwoq0e5o',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: authToken,
  useCdn: false,
})

async function upsert(doc) {
  const existing = await client.getDocument(doc._id)
  if (existing) {
    console.log(`  ↻  ${doc._id} — document existant, mise à jour…`)
    const {_id, _type, ...patch} = doc
    await client.patch(doc._id).set(patch).commit()
  } else {
    console.log(`  +  ${doc._id} — création…`)
    await client.createOrReplace(doc)
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// siteInfo
// ──────────────────────────────────────────────────────────────────────────────
const siteInfo = {
  _id: 'siteInfo',
  _type: 'siteInfo',
  adresse_rue: '12 rue Montesquieu',
  adresse_ville: 'Libourne',
  adresse_cp: '33500',
  telephone: '+33557251234',
  telephone_affiche: '05 57 25 12 34',
  email: 'contact@origenea.fr',
  horaires: 'Du lundi au vendredi, 9h–18h',
  horaires_detail: 'Rendez-vous en visioconférence ou sur place',
  zone_intervention: [
    'Libourne',
    'Saint-Émilion',
    'Coutras',
    'Castillon-la-Bataille',
    'Bordeaux',
    'Arcachon',
    'Blaye',
    'Toute la Gironde',
    'Nouvelle-Aquitaine',
  ],
}

// ──────────────────────────────────────────────────────────────────────────────
// pageAccueil
// ──────────────────────────────────────────────────────────────────────────────
const pageAccueil = {
  _id: 'pageAccueil',
  _type: 'pageAccueil',
  heroTitre: 'Retrouvez le fil de votre histoire familiale',
  heroLead:
    "Derrière chaque nom se cache une vie, un lieu, une époque. J'explore les archives pour reconstituer votre ascendance et transmettre, aux générations suivantes, la mémoire des vôtres.",
  citationCatherine:
    "« Comprendre d'où l'on vient, c'est mieux savoir qui l'on est. Mon métier consiste à redonner un visage et une histoire à des noms parfois oubliés. »",
  introParagraphe:
    "Je suis Catherine Fougeray-Imbrechts, généalogiste à Libourne. Patiemment, document après document, je remonte le temps avec vous — registres paroissiaux, actes notariés, recensements, cadastre — pour bâtir un récit fiable, sourcé et transmissible.",
  trustItems: [
    {_key: 'trust1', valeur: '+15 ans', libelle: 'de recherches en archives'},
    {_key: 'trust2', valeur: '4 à 12', libelle: 'générations remontées'},
    {_key: 'trust3', valeur: 'Gironde', libelle: '& Nouvelle-Aquitaine'},
    {_key: 'trust4', valeur: 'Sur devis', libelle: 'étude personnalisée'},
  ],
  temoignage:
    "Catherine a retrouvé la trace de mon arrière-grand-père, parti d'un village du Libournais en 1889. Lire son acte de mariage, c'était comme lui serrer la main.",
  temoignageAuteur: 'Hélène M. — Saint-Émilion',
}

// ──────────────────────────────────────────────────────────────────────────────
// pageAPropos
// ──────────────────────────────────────────────────────────────────────────────
const pageAPropos = {
  _id: 'pageAPropos',
  _type: 'pageAPropos',
  heroLead:
    "Je m'appelle Catherine Fougeray-Imbrechts. Depuis Libourne, j'accompagne les familles dans la redécouverte de leur histoire — avec patience, méthode et beaucoup de cœur.",
  bio: [
    {
      _type: 'block',
      _key: 'bio1',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's1',
          text: "Tout a commencé par une boîte de vieilles lettres, retrouvée dans le grenier de ma grand-mère. Des écritures effacées, des noms inconnus, des dates qui ne disaient plus rien à personne. J'ai voulu comprendre — et je n'ai jamais cessé depuis.",
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'bio2',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's2',
          text: "Pendant plus de quinze ans, j'ai arpenté les salles de lecture des Archives départementales de la Gironde, déchiffré des registres paroissiaux, suivi des familles de village en village le long de la Dordogne et de l'Isle. Ce qui n'était qu'une passion personnelle est devenu un métier : aider les autres à renouer le fil de leur propre histoire.",
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: 'block',
      _key: 'bio3',
      style: 'normal',
      children: [
        {
          _type: 'span',
          _key: 's3',
          text: "Aujourd'hui, le cabinet Origenea met cette expérience au service des particuliers comme des professionnels. Chaque dossier est une enquête, chaque ancêtre retrouvé une petite victoire sur l'oubli.",
          marks: [],
        },
      ],
      markDefs: [],
    },
  ],
  carteItems: [
    'Généalogiste indépendante',
    'Basée à Libourne (Gironde)',
    '+15 ans de recherches en archives',
    'Familiale · foncière · successorale',
    "Membre d'associations généalogiques",
  ],
  valeurs: [
    {
      _key: 'val1',
      titre: 'Rigueur',
      description:
        "Aucune affirmation sans preuve. Chaque filiation est étayée par un acte, daté et référencé, pour vous transmettre un travail fiable et vérifiable.",
    },
    {
      _key: 'val2',
      titre: 'Discrétion',
      description:
        "Votre histoire vous appartient. Vos données et les résultats des recherches demeurent strictement confidentiels.",
    },
    {
      _key: 'val3',
      titre: 'Transmission',
      description:
        "Au-delà des dates, je cherche à raconter des vies — pour que vos enfants et petits-enfants s'approprient, à leur tour, cette mémoire.",
    },
  ],
  sourcesList: [
    'Registres paroissiaux',
    'État civil',
    'Actes notariés',
    'Recensements de population',
    'Cadastre napoléonien',
    'Registres matricules militaires',
    'Archives notariales',
    'Presse ancienne & locale',
  ],
  citation:
    "Un nom sur un registre, c'est une vie qui demande à être racontée. Mon rôle, c'est de tendre l'oreille.",
}

// ──────────────────────────────────────────────────────────────────────────────
// pageServices
// ──────────────────────────────────────────────────────────────────────────────
const pageServices = {
  _id: 'pageServices',
  _type: 'pageServices',
  heroLead:
    "De la quête de vos ancêtres à l'histoire d'une maison, en passant par l'appui aux études notariales : chaque mission est unique, conduite avec rigueur et discrétion, depuis Libourne et partout en Gironde.",
  services: [
    {
      _key: 'svc1',
      titre: 'Généalogie familiale',
      lead: "Reconstituer votre ascendance, génération après génération, et redonner vie au parcours de celles et ceux qui vous ont précédé.",
      description:
        "Je remonte vos lignées à partir des registres paroissiaux, de l'état civil, des recensements et des actes notariés. Que vous souhaitiez explorer une seule branche ou l'ensemble de votre arbre, l'étude est calibrée selon votre objectif et votre budget.",
      listeItems: [
        'Recherches ascendantes en ligne agnatique (paternelle) ou cognatique (maternelle)',
        'Arbres généalogiques sur 4 générations, 5 générations et au-delà',
        "Recherche ciblée sur le parcours d'un ancêtre en particulier",
        'Synthèse narrative et copies des actes sources',
      ],
    },
    {
      _key: 'svc2',
      titre: 'Généalogie foncière',
      lead: "Les maisons aussi ont une généalogie. Découvrez qui a vécu entre vos murs et comment votre propriété a traversé les époques.",
      description:
        "À partir des actes de vente, des partages successoraux et du cadastre ancien, je reconstitue l'histoire d'un domaine, d'une demeure ou d'une parcelle — un récit précieux pour une famille, une transmission ou une restauration.",
      listeItems: [
        "Histoire d'un bâtiment ou d'une propriété",
        'Identification des propriétaires successifs',
        'Lecture du cadastre napoléonien et des matrices',
        'Restitution illustrée de la chaîne de propriété',
      ],
    },
    {
      _key: 'svc3',
      titre: 'Sous-traitance successorale',
      lead: "Un partenaire de confiance pour les notaires et généalogistes successoraux qui ont besoin d'un appui documentaire fiable.",
      description:
        "J'interviens en sous-traitance sur des recherches d'héritiers et la reconstitution de dévolutions. Méthode rigoureuse, sources tracées, confidentialité absolue : vous gardez la main, je sécurise la recherche.",
      listeItems: [
        "Recherches d'héritiers et de filiations",
        'Reconstitution de dévolutions successorales',
        'Appui documentaire pour études notariales',
        'Dossiers sourcés, prêts à intégrer à vos actes',
      ],
    },
  ],
  faq: [
    {
      _key: 'faq1',
      question: 'De quelles informations avez-vous besoin pour démarrer ?',
      reponse:
        "Un nom, une date et un lieu approximatif suffisent souvent à ouvrir une piste. Vos vieux papiers de famille — livret de famille, faire-part, photos annotées — sont de précieux points de départ.",
    },
    {
      _key: 'faq2',
      question: "Jusqu'à quelle époque peut-on remonter ?",
      reponse:
        "En France, l'état civil et les registres paroissiaux permettent souvent d'atteindre le XVIIe siècle, parfois plus tôt. Tout dépend de la conservation des fonds et des aléas de l'histoire locale.",
    },
    {
      _key: 'faq3',
      question: 'Intervenez-vous en dehors de la Gironde ?',
      reponse:
        "Oui. Basée à Libourne, je travaille sur place dans toute la Nouvelle-Aquitaine et mène des recherches à distance partout en France, grâce aux archives numérisées et à mon réseau de correspondants.",
    },
    {
      _key: 'faq4',
      question: 'Mes données restent-elles confidentielles ?',
      reponse:
        "Absolument. Vos informations personnelles et les résultats de recherche ne sont partagés avec personne. La discrétion est au cœur de ma pratique.",
    },
  ],
}

// ──────────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('Création/mise à jour des singletons Sanity…\n')

  for (const doc of [siteInfo, pageAccueil, pageAPropos, pageServices]) {
    await upsert(doc)
  }

  console.log('\nTerminé ✓')
}

main().catch((err) => {
  console.error('Erreur :', err.message)
  process.exit(1)
})
