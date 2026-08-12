import type { Topic } from '../../types'

// Unit ES-1 · Primeros pasos
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const ES_U1_TOPICS: Topic[] = [
  {
    id: 'es-noun-gender',
    lang: 'es',
    title: 'Noun gender: el & la',
    ruleSummary: 'Every noun is masculine (el) or feminine (la); -o is usually el, -a usually la.',
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: 'Every Spanish noun has a **gender** — masculine or feminine — even things: *el libro* (the book) is masculine, *la casa* (the house) is feminine. The word for “the” must match.',
      },
      {
        kind: 'table',
        caption: 'The definite article (“the”)',
        header: ['', 'masculine', 'feminine'],
        rows: [
          ['singular', 'el libro', 'la casa'],
          ['typical ending', '-o', '-a'],
        ],
      },
      { kind: 'example', text: 'el libro', gloss: 'the book' },
      { kind: 'example', text: 'la casa', gloss: 'the house' },
      { kind: 'example', text: 'la ciudad', gloss: 'the city', note: '-dad words are feminine' },
      {
        kind: 'callout',
        style: 'warning',
        md: 'Endings are a guide, not a law: *el día* (day) is masculine, *la mano* (hand) is feminine. Feminine nouns starting with a stressed **a-** take *el* in the singular: *el agua*, but *las aguas*. Learn each noun **with its article**.',
      },
    ],
    skillCells: [
      { cellId: 'm', label: 'masculine nouns' },
      { cellId: 'f', label: 'feminine nouns' },
    ],
    introLexemeIds: ['es/noun/libro', 'es/noun/casa', 'es/noun/ciudad', 'es/noun/trabajo', 'es/noun/familia'],
    drillItems: [
      { gen: 'article', nounIds: ['es/noun/libro', 'es/noun/trabajo', 'es/noun/pan', 'es/noun/café'], count: 3, def: true, number: 'sg' },
      { gen: 'article', nounIds: ['es/noun/casa', 'es/noun/ciudad', 'es/noun/familia', 'es/noun/mujer'], count: 3, def: true, number: 'sg' },
      { gen: 'article', nounIds: ['es/noun/agua', 'es/noun/amigo', 'es/noun/manzana', 'es/noun/hombre'], count: 3, def: true, number: 'sg' },
    ],
    errorHints: {
      wrongGenderArticle: 'Check the noun’s gender: -o words usually take el, -a words la.',
      wrongNumber: 'That article is for a different number (singular vs plural).',
    },
  },

  {
    id: 'es-plural-articles',
    lang: 'es',
    title: 'Plurals: los, las, un & una',
    ruleSummary: 'Add -s (vowel) or -es (consonant); articles agree: los/las, un/una → unos/unas.',
    cefr: 'A1',
    dependencies: ['es-noun-gender'],
    explanation: [
      {
        kind: 'prose',
        md: 'To make a noun plural: ends in a **vowel** → add **-s** (*casa → casas*); ends in a **consonant** → add **-es** (*ciudad → ciudades*); ends in **-z** → **-ces** (*lápiz → lápices*). Articles must agree in both gender **and** number.',
      },
      {
        kind: 'table',
        caption: 'All four definite articles + the indefinite ones',
        header: ['', 'masculine', 'feminine'],
        rows: [
          ['the (sg)', 'el', 'la'],
          ['the (pl)', 'los', 'las'],
          ['a / an', 'un', 'una'],
          ['some', 'unos', 'unas'],
        ],
      },
      { kind: 'example', text: 'las casas', gloss: 'the houses' },
      { kind: 'example', text: 'unos libros', gloss: 'some books' },
      { kind: 'example', text: 'las ciudades', gloss: 'the cities' },
      {
        kind: 'callout',
        style: 'tip',
        md: 'A mixed group is masculine: *los amigos* can mean male friends **or** a mixed group of friends.',
      },
    ],
    skillCells: [
      { cellId: 'pl-form', label: 'plural formation' },
      { cellId: 'm', label: 'masculine plural articles' },
      { cellId: 'f', label: 'feminine plural articles' },
    ],
    introLexemeIds: ['es/noun/amigo', 'es/noun/hombre', 'es/noun/mujer'],
    drillItems: [
      { gen: 'plural', nounIds: ['es/noun/casa', 'es/noun/ciudad', 'es/noun/libro', 'es/noun/mujer'], count: 4 },
      { gen: 'article', nounIds: ['es/noun/libro', 'es/noun/casa', 'es/noun/amigo', 'es/noun/ciudad'], count: 3, def: true, number: 'pl' },
      { gen: 'article', nounIds: ['es/noun/pan', 'es/noun/manzana', 'es/noun/hombre', 'es/noun/familia'], count: 3, def: false, number: 'mix' },
    ],
    errorHints: {
      wrongGenderArticle: 'The article must match the noun’s gender — even in the plural.',
      wrongNumber: 'Look at the noun: is it singular or plural?',
    },
  },

  {
    id: 'es-subject-pronouns',
    lang: 'es',
    title: 'Subject pronouns',
    ruleSummary: 'yo, tú, él/ella/usted, nosotros, vosotros, ellos/ellas/ustedes.',
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: 'These little words say **who** does the action. Spanish usually drops them (*hablo* already means “I speak”), but you must know them — every verb ending points back to one.',
      },
      {
        kind: 'table',
        caption: 'Subject pronouns',
        header: ['person', 'singular', 'plural'],
        rows: [
          ['1st', 'yo — I', 'nosotros/as — we'],
          ['2nd (informal)', 'tú — you', 'vosotros/as — you all (Spain)'],
          ['3rd + formal you', 'él, ella, usted', 'ellos, ellas, ustedes'],
        ],
      },
      { kind: 'example', text: 'yo', gloss: 'I' },
      { kind: 'example', text: 'nosotros', gloss: 'we' },
      {
        kind: 'callout',
        style: 'tip',
        md: '**usted** (formal “you”) uses the *él/ella* verb form, and **ustedes** the *ellos* form. In Latin America *ustedes* replaces *vosotros* entirely.',
      },
    ],
    skillCells: [
      { cellId: 'sg', label: 'singular pronouns' },
      { cellId: 'pl', label: 'plural pronouns' },
    ],
    introLexemeIds: [],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'match',
            lang: 'es',
            sentence: [],
            gloss: 'Match each pronoun with its meaning',
            answer: '',
            accepted: [],
            pairs: [
              ['yo', 'I'],
              ['tú', 'you'],
              ['él', 'he'],
              ['nosotros', 'we'],
              ['ellas', 'they (f)'],
            ],
            skillIds: ['es-subject-pronouns:sg', 'es-subject-pronouns:pl'],
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', '= we'],
            gapIndex: 0,
            gloss: 'Which pronoun means “we”?',
            answer: 'nosotros',
            accepted: [],
            options: [
              { text: 'nosotros' },
              { text: 'vosotros', strategy: 'wrongPerson' },
              { text: 'ellos', strategy: 'wrongPerson' },
              { text: 'usted', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-subject-pronouns:pl'],
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', '= you (formal)'],
            gapIndex: 0,
            gloss: 'Which pronoun is the polite “you”?',
            answer: 'usted',
            accepted: [],
            options: [
              { text: 'usted' },
              { text: 'tú', strategy: 'wrongPerson' },
              { text: 'ella', strategy: 'wrongPerson' },
              { text: 'vosotros', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-subject-pronouns:sg'],
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', '= they (all women)'],
            gapIndex: 0,
            gloss: 'A group of women =',
            answer: 'ellas',
            accepted: [],
            options: [
              { text: 'ellas' },
              { text: 'ellos', strategy: 'wrongGenderArticle' },
              { text: 'nosotras', strategy: 'wrongPerson' },
              { text: 'ustedes', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-subject-pronouns:pl'],
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: 'Match person and number: who exactly is doing the action?',
      wrongGenderArticle: 'ellos = mixed/male group, ellas = all female.',
    },
  },

  {
    id: 'es-ser-present',
    lang: 'es',
    title: 'Ser — to be',
    ruleSummary: 'soy, eres, es, somos, sois, son — for identity, origin and profession.',
    cefr: 'A1',
    dependencies: ['es-subject-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: '**Ser** is “to be” for **what something is**: identity, origin, profession, permanent traits. It is completely irregular — memorize the six forms.',
      },
      {
        kind: 'table',
        caption: 'ser — present tense',
        header: ['', 'form'],
        rows: [
          ['yo', 'soy'],
          ['tú', 'eres'],
          ['él / ella / usted', 'es'],
          ['nosotros/as', 'somos'],
          ['vosotros/as', 'sois'],
          ['ellos / ellas / ustedes', 'son'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
        ],
      },
      { kind: 'example', text: 'Yo soy de Italia.', gloss: 'I am from Italy.' },
      { kind: 'example', text: 'Ella es médica.', gloss: 'She is a doctor.' },
      { kind: 'example', text: 'Somos amigos.', gloss: 'We are friends.' },
      {
        kind: 'callout',
        style: 'tip',
        md: 'Ser answers “**what** is it?”. Later you’ll meet *estar*, the other “to be”, for **states and places**.',
      },
    ],
    skillCells: [
      { cellId: '1sg', label: 'yo form' },
      { cellId: '2sg', label: 'tú form' },
      { cellId: '3sg', label: 'él/ella form' },
      { cellId: '1pl', label: 'nosotros form' },
      { cellId: '2pl', label: 'vosotros form' },
      { cellId: '3pl', label: 'ellos form' },
    ],
    introLexemeIds: [],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/ser', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/ser', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/ser', tense: 'pres', persons: ['1pl', '3pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/ser', tense: 'pres', persons: ['2sg', '3sg', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: 'Ser is irregular: soy, eres, es, somos, sois, son.',
      infinitive: '“ser” is the dictionary form — it must be conjugated here.',
    },
  },

  {
    id: 'es-adj-agreement',
    lang: 'es',
    title: 'Adjective agreement',
    ruleSummary: 'Adjectives match the noun’s gender and number and usually follow it.',
    cefr: 'A1',
    dependencies: ['es-noun-gender', 'es-ser-present'],
    explanation: [
      {
        kind: 'prose',
        md: 'Adjectives **agree** with their noun: *el libro blanco*, *la casa blanca*, *las casas blancas*. Adjectives ending in **-o** have four forms; those ending in **-e** or a consonant only change for number (*grande → grandes*). Unlike English, they usually come **after** the noun.',
      },
      {
        kind: 'table',
        caption: 'blanco — four forms',
        header: ['', 'masculine', 'feminine'],
        rows: [
          ['singular', 'blanco', 'blanca'],
          ['plural', 'blancos', 'blancas'],
        ],
      },
      { kind: 'example', text: 'la casa blanca', gloss: 'the white house' },
      { kind: 'example', text: 'los libros nuevos', gloss: 'the new books' },
      { kind: 'example', text: 'la ciudad grande', gloss: 'the big city', note: '-e adjectives don’t change for gender' },
      {
        kind: 'callout',
        style: 'warning',
        md: 'With **ser** the adjective agrees with the subject: *Ella es alta*, *Ellos son altos*.',
      },
    ],
    skillCells: [
      { cellId: 'm', label: 'masculine agreement' },
      { cellId: 'f', label: 'feminine agreement' },
      { cellId: 'm.pl', label: 'masculine plural' },
      { cellId: 'f.pl', label: 'feminine plural' },
    ],
    introLexemeIds: ['es/adj/blanco', 'es/adj/nuevo', 'es/adj/grande', 'es/adj/bonito', 'es/adj/alto'],
    drillItems: [
      {
        gen: 'adj-agree',
        pairs: [
          ['es/adj/blanco', 'es/noun/casa'],
          ['es/adj/nuevo', 'es/noun/libro'],
          ['es/adj/bonito', 'es/noun/ciudad'],
        ],
        count: 3,
      },
      {
        gen: 'adj-agree',
        pairs: [
          ['es/adj/grande', 'es/noun/casa'],
          ['es/adj/alto', 'es/noun/mujer'],
          ['es/adj/viejo', 'es/noun/amigo'],
        ],
        count: 3,
      },
    ],
    errorHints: {
      wrongGenderArticle: 'The adjective must match the noun’s gender: -o with el-words, -a with la-words.',
      wrongNumber: 'Singular noun → singular adjective; plural noun → add -s/-es.',
    },
  },
]
