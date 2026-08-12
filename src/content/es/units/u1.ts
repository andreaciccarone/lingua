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
    title: { en: 'Noun gender: el & la', it: 'Il genere dei nomi: el e la' },
    ruleSummary: {
      en: 'Every noun is masculine (el) or feminine (la); -o is usually el, -a usually la.',
      it: 'Ogni nome è maschile (el) o femminile (la); -o di solito el, -a di solito la.',
    },
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Every Spanish noun has a **gender** — masculine or feminine — even things: *el libro* (the book) is masculine, *la casa* (the house) is feminine. The word for “the” must match.',
          it: 'Ogni nome spagnolo ha un **genere** — maschile o femminile — anche le cose: *el libro* (il libro) è maschile, *la casa* (la casa) è femminile. L’articolo deve concordare.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The definite article (“the”)', it: 'L’articolo determinativo' },
        header: ['', { en: 'masculine', it: 'maschile' }, { en: 'feminine', it: 'femminile' }],
        rows: [
          [{ en: 'singular', it: 'singolare' }, 'el libro', 'la casa'],
          [{ en: 'typical ending', it: 'desinenza tipica' }, '-o', '-a'],
        ],
      },
      { kind: 'example', text: 'el libro', gloss: { en: 'the book', it: 'il libro' } },
      { kind: 'example', text: 'la casa', gloss: { en: 'the house', it: 'la casa' } },
      {
        kind: 'example',
        text: 'la ciudad',
        gloss: { en: 'the city', it: 'la città' },
        note: { en: '-dad words are feminine', it: 'le parole in -dad sono femminili' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Endings are a guide, not a law: *el día* (day) is masculine, *la mano* (hand) is feminine. Feminine nouns starting with a stressed **a-** take *el* in the singular: *el agua*, but *las aguas*. Learn each noun **with its article**.',
          it: 'Le desinenze sono una guida, non una legge: *el día* (giorno) è maschile, *la mano* (mano) è femminile. I nomi femminili che iniziano con **a-** tonica prendono *el* al singolare: *el agua*, ma *las aguas*. Impara ogni nome **insieme al suo articolo**.',
        },
      },
    ],
    skillCells: [
      { cellId: 'm', label: { en: 'masculine nouns', it: 'nomi maschili' } },
      { cellId: 'f', label: { en: 'feminine nouns', it: 'nomi femminili' } },
    ],
    introLexemeIds: ['es/noun/libro', 'es/noun/casa', 'es/noun/ciudad', 'es/noun/trabajo', 'es/noun/familia'],
    drillItems: [
      { gen: 'article', nounIds: ['es/noun/libro', 'es/noun/trabajo', 'es/noun/pan', 'es/noun/café'], count: 3, def: true, number: 'sg' },
      { gen: 'article', nounIds: ['es/noun/casa', 'es/noun/ciudad', 'es/noun/familia', 'es/noun/mujer'], count: 3, def: true, number: 'sg' },
      { gen: 'article', nounIds: ['es/noun/agua', 'es/noun/amigo', 'es/noun/manzana', 'es/noun/hombre'], count: 3, def: true, number: 'sg' },
    ],
    errorHints: {
      wrongGenderArticle: {
        en: 'Check the noun’s gender: -o words usually take el, -a words la.',
        it: 'Controlla il genere del nome: le parole in -o di solito prendono el, quelle in -a la.',
      },
      wrongNumber: {
        en: 'That article is for a different number (singular vs plural).',
        it: 'Quell’articolo corrisponde a un altro numero (singolare vs plurale).',
      },
    },
  },

  {
    id: 'es-plural-articles',
    lang: 'es',
    title: { en: 'Plurals: los, las, un & una', it: 'Il plurale: los, las, un e una' },
    ruleSummary: {
      en: 'Add -s (vowel) or -es (consonant); articles agree: los/las, un/una → unos/unas.',
      it: 'Aggiungi -s (vocale) o -es (consonante); gli articoli concordano: los/las, un/una → unos/unas.',
    },
    cefr: 'A1',
    dependencies: ['es-noun-gender'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'To make a noun plural: ends in a **vowel** → add **-s** (*casa → casas*); ends in a **consonant** → add **-es** (*ciudad → ciudades*); ends in **-z** → **-ces** (*lápiz → lápices*). Articles must agree in both gender **and** number.',
          it: 'Per formare il plurale di un nome: finisce in **vocale** → aggiungi **-s** (*casa → casas*); finisce in **consonante** → aggiungi **-es** (*ciudad → ciudades*); finisce in **-z** → **-ces** (*lápiz → lápices*). Gli articoli devono concordare in genere **e** in numero.',
        },
      },
      {
        kind: 'table',
        caption: {
          en: 'All four definite articles + the indefinite ones',
          it: 'I quattro articoli determinativi + gli indeterminativi',
        },
        header: ['', { en: 'masculine', it: 'maschile' }, { en: 'feminine', it: 'femminile' }],
        rows: [
          [{ en: 'the (sg)', it: 'il/la (sg)' }, 'el', 'la'],
          [{ en: 'the (pl)', it: 'i/le (pl)' }, 'los', 'las'],
          [{ en: 'a / an', it: 'un / una' }, 'un', 'una'],
          [{ en: 'some', it: 'alcuni / alcune' }, 'unos', 'unas'],
        ],
      },
      { kind: 'example', text: 'las casas', gloss: { en: 'the houses', it: 'le case' } },
      { kind: 'example', text: 'unos libros', gloss: { en: 'some books', it: 'alcuni libri' } },
      { kind: 'example', text: 'las ciudades', gloss: { en: 'the cities', it: 'le città' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'A mixed group is masculine: *los amigos* can mean male friends **or** a mixed group of friends.',
          it: 'Un gruppo misto è maschile: *los amigos* può indicare amici maschi **o** un gruppo misto di amici.',
        },
      },
    ],
    skillCells: [
      { cellId: 'pl-form', label: { en: 'plural formation', it: 'formazione del plurale' } },
      { cellId: 'm', label: { en: 'masculine plural articles', it: 'articoli maschili plurali' } },
      { cellId: 'f', label: { en: 'feminine plural articles', it: 'articoli femminili plurali' } },
    ],
    introLexemeIds: ['es/noun/amigo', 'es/noun/hombre', 'es/noun/mujer'],
    drillItems: [
      { gen: 'plural', nounIds: ['es/noun/casa', 'es/noun/ciudad', 'es/noun/libro', 'es/noun/mujer'], count: 4 },
      { gen: 'article', nounIds: ['es/noun/libro', 'es/noun/casa', 'es/noun/amigo', 'es/noun/ciudad'], count: 3, def: true, number: 'pl' },
      { gen: 'article', nounIds: ['es/noun/pan', 'es/noun/manzana', 'es/noun/hombre', 'es/noun/familia'], count: 3, def: false, number: 'mix' },
    ],
    errorHints: {
      wrongGenderArticle: {
        en: 'The article must match the noun’s gender — even in the plural.',
        it: 'L’articolo deve concordare con il genere del nome — anche al plurale.',
      },
      wrongNumber: {
        en: 'Look at the noun: is it singular or plural?',
        it: 'Guarda il nome: è singolare o plurale?',
      },
    },
  },

  {
    id: 'es-subject-pronouns',
    lang: 'es',
    title: { en: 'Subject pronouns', it: 'I pronomi soggetto' },
    ruleSummary: {
      en: 'yo, tú, él/ella/usted, nosotros, vosotros, ellos/ellas/ustedes.',
      it: 'yo, tú, él/ella/usted, nosotros, vosotros, ellos/ellas/ustedes.',
    },
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'These little words say **who** does the action. Spanish usually drops them (*hablo* already means “I speak”), but you must know them — every verb ending points back to one.',
          it: 'Queste piccole parole dicono **chi** compie l’azione. Lo spagnolo di solito le omette (*hablo* significa già “io parlo”), ma bisogna conoscerle — ogni desinenza verbale rimanda a una di esse.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Subject pronouns', it: 'I pronomi soggetto' },
        header: [
          { en: 'person', it: 'persona' },
          { en: 'singular', it: 'singolare' },
          { en: 'plural', it: 'plurale' },
        ],
        rows: [
          [
            { en: '1st', it: '1ª' },
            { en: 'yo — I', it: 'yo — io' },
            { en: 'nosotros/as — we', it: 'nosotros/as — noi' },
          ],
          [
            { en: '2nd (informal)', it: '2ª (informale)' },
            { en: 'tú — you', it: 'tú — tu' },
            { en: 'vosotros/as — you all (Spain)', it: 'vosotros/as — voi (Spagna)' },
          ],
          [
            { en: '3rd + formal you', it: '3ª + forma di cortesia' },
            'él, ella, usted',
            'ellos, ellas, ustedes',
          ],
        ],
      },
      { kind: 'example', text: 'yo', gloss: { en: 'I', it: 'io' } },
      { kind: 'example', text: 'nosotros', gloss: { en: 'we', it: 'noi' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '**usted** (formal “you”) uses the *él/ella* verb form, and **ustedes** the *ellos* form. In Latin America *ustedes* replaces *vosotros* entirely.',
          it: '**usted** (il “lei” di cortesia) usa la forma verbale di *él/ella*, e **ustedes** quella di *ellos*. In America Latina *ustedes* sostituisce completamente *vosotros*.',
        },
      },
    ],
    skillCells: [
      { cellId: 'sg', label: { en: 'singular pronouns', it: 'pronomi singolari' } },
      { cellId: 'pl', label: { en: 'plural pronouns', it: 'pronomi plurali' } },
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
            gloss: {
              en: 'Match each pronoun with its meaning',
              it: 'Abbina ogni pronome al suo significato',
            },
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
            sentence: ['___'],
            gapIndex: 0,
            gloss: { en: 'Which pronoun means “we”?', it: 'Quale pronome significa “noi”?' },
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
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: 'Which pronoun is the polite “you”?',
              it: 'Quale pronome corrisponde al “lei” di cortesia?',
            },
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
            sentence: ['___'],
            gapIndex: 0,
            gloss: { en: 'A group of women =', it: 'Un gruppo di donne =' },
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
      wrongPerson: {
        en: 'Match person and number: who exactly is doing the action?',
        it: 'Fai concordare persona e numero: chi esattamente compie l’azione?',
      },
      wrongGenderArticle: {
        en: 'ellos = mixed/male group, ellas = all female.',
        it: 'ellos = gruppo misto o maschile, ellas = tutte donne.',
      },
    },
  },

  {
    id: 'es-ser-present',
    lang: 'es',
    title: { en: 'Ser — to be', it: 'Ser — essere' },
    ruleSummary: {
      en: 'soy, eres, es, somos, sois, son — for identity, origin and profession.',
      it: 'soy, eres, es, somos, sois, son — per identità, origine e professione.',
    },
    cefr: 'A1',
    dependencies: ['es-subject-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**Ser** is “to be” for **what something is**: identity, origin, profession, permanent traits. It is completely irregular — memorize the six forms.',
          it: '**Ser** è l’“essere” di **ciò che una cosa è**: identità, origine, professione, tratti permanenti. È completamente irregolare — memorizza le sei forme.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'ser — present tense', it: 'ser — presente indicativo' },
        header: ['', { en: 'form', it: 'forma' }],
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
      { kind: 'example', text: 'Yo soy de Italia.', gloss: { en: 'I am from Italy.', it: 'Vengo dall’Italia.' } },
      { kind: 'example', text: 'Ella es médica.', gloss: { en: 'She is a doctor.', it: 'Lei è medico.' } },
      { kind: 'example', text: 'Somos amigos.', gloss: { en: 'We are friends.', it: 'Siamo amici.' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Ser answers “**what** is it?”. Later you’ll meet *estar*, the other “to be”, for **states and places**.',
          it: 'Ser risponde a “**che cosa** è?”. Più avanti incontrerai *estar*, l’altro “essere”, per **stati e luoghi**.',
        },
      },
    ],
    skillCells: [
      { cellId: '1sg', label: { en: 'yo form', it: 'forma di yo' } },
      { cellId: '2sg', label: { en: 'tú form', it: 'forma di tú' } },
      { cellId: '3sg', label: { en: 'él/ella form', it: 'forma di él/ella' } },
      { cellId: '1pl', label: { en: 'nosotros form', it: 'forma di nosotros' } },
      { cellId: '2pl', label: { en: 'vosotros form', it: 'forma di vosotros' } },
      { cellId: '3pl', label: { en: 'ellos form', it: 'forma di ellos' } },
    ],
    introLexemeIds: [],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/ser', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/ser', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/ser', tense: 'pres', persons: ['1pl', '3pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/ser', tense: 'pres', persons: ['2sg', '3sg', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Ser is irregular: soy, eres, es, somos, sois, son.',
        it: 'Ser è irregolare: soy, eres, es, somos, sois, son.',
      },
      infinitive: {
        en: '“ser” is the dictionary form — it must be conjugated here.',
        it: '“ser” è la forma del dizionario — qui va coniugato.',
      },
    },
  },

  {
    id: 'es-adj-agreement',
    lang: 'es',
    title: { en: 'Adjective agreement', it: 'L’accordo dell’aggettivo' },
    ruleSummary: {
      en: 'Adjectives match the noun’s gender and number and usually follow it.',
      it: 'Gli aggettivi concordano in genere e numero con il nome e di solito lo seguono.',
    },
    cefr: 'A1',
    dependencies: ['es-noun-gender', 'es-ser-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Adjectives **agree** with their noun: *el libro blanco*, *la casa blanca*, *las casas blancas*. Adjectives ending in **-o** have four forms; those ending in **-e** or a consonant only change for number (*grande → grandes*). Unlike English, they usually come **after** the noun.',
          it: 'Gli aggettivi **concordano** con il nome: *el libro blanco*, *la casa blanca*, *las casas blancas*. Gli aggettivi in **-o** hanno quattro forme; quelli in **-e** o in consonante cambiano solo per il numero (*grande → grandes*). Come in italiano, di solito vengono **dopo** il nome.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'blanco — four forms', it: 'blanco — le quattro forme' },
        header: ['', { en: 'masculine', it: 'maschile' }, { en: 'feminine', it: 'femminile' }],
        rows: [
          [{ en: 'singular', it: 'singolare' }, 'blanco', 'blanca'],
          [{ en: 'plural', it: 'plurale' }, 'blancos', 'blancas'],
        ],
      },
      { kind: 'example', text: 'la casa blanca', gloss: { en: 'the white house', it: 'la casa bianca' } },
      { kind: 'example', text: 'los libros nuevos', gloss: { en: 'the new books', it: 'i libri nuovi' } },
      {
        kind: 'example',
        text: 'la ciudad grande',
        gloss: { en: 'the big city', it: 'la città grande' },
        note: {
          en: '-e adjectives don’t change for gender',
          it: 'gli aggettivi in -e non cambiano per genere',
        },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'With **ser** the adjective agrees with the subject: *Ella es alta*, *Ellos son altos*.',
          it: 'Con **ser** l’aggettivo concorda con il soggetto: *Ella es alta*, *Ellos son altos*.',
        },
      },
    ],
    skillCells: [
      { cellId: 'm', label: { en: 'masculine agreement', it: 'accordo maschile' } },
      { cellId: 'f', label: { en: 'feminine agreement', it: 'accordo femminile' } },
      { cellId: 'm.pl', label: { en: 'masculine plural', it: 'maschile plurale' } },
      { cellId: 'f.pl', label: { en: 'feminine plural', it: 'femminile plurale' } },
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
      wrongGenderArticle: {
        en: 'The adjective must match the noun’s gender: -o with el-words, -a with la-words.',
        it: 'L’aggettivo deve concordare con il genere del nome: -o con le parole con el, -a con quelle con la.',
      },
      wrongNumber: {
        en: 'Singular noun → singular adjective; plural noun → add -s/-es.',
        it: 'Nome singolare → aggettivo singolare; nome plurale → aggiungi -s/-es.',
      },
    },
  },
]
