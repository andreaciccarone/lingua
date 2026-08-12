import type { Topic } from '../../types'

// Unit ES-6 · Ayer
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const ES_U6_TOPICS: Topic[] = [
  {
    id: 'es-preterite-regular',
    lang: 'es',
    title: { en: 'Preterite: regular verbs', it: 'Il passato remoto: verbi regolari' },
    ruleSummary: {
      en: 'hablé, hablaste, habló… / comí, comiste, comió… — the everyday Spanish past.',
      it: 'hablé, hablaste, habló… / comí, comiste, comió… — il passato di tutti i giorni.',
    },
    cefr: 'A2',
    dependencies: ['es-present-er-ir'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'The **pretérito indefinido** is the everyday past: it reports finished actions with a clear end. Where Spanish says *hablé*, English says “I spoke” or “I have spoken”. Verbs in **-ar** take **-é, -aste, -ó, -amos, -asteis, -aron**; **-er** and **-ir** verbs share a single set: **-í, -iste, -ió, -imos, -isteis, -ieron**. Written accents on the yo and él forms are not decoration — they carry the tense.',
          it: 'Il **pretérito indefinido** è il passato di tutti i giorni: racconta azioni concluse. Dove lo spagnolo dice *hablé*, in italiano dirai quasi sempre il **passato prossimo**: *hablé* = “ho parlato” (la forma *parlai* esiste, ma in italiano suona letteraria). I verbi in **-ar** prendono **-é, -aste, -ó, -amos, -asteis, -aron**; quelli in **-er** e **-ir** condividono un’unica serie: **-í, -iste, -ió, -imos, -isteis, -ieron**. Gli accenti scritti su yo ed él non sono un ornamento: sono il tempo verbale.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Preterite endings', it: 'Le desinenze del passato' },
        header: ['', '-ar', '-er / -ir'],
        rows: [
          ['yo', '-é', '-í'],
          ['tú', '-aste', '-iste'],
          ['él / ella / usted', '-ó', '-ió'],
          ['nosotros/as', '-amos', '-imos'],
          ['vosotros/as', '-asteis', '-isteis'],
          ['ellos / ellas / ustedes', '-aron', '-ieron'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
          [2, 1],
          [2, 2],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'hablar & comer — preterite', it: 'hablar e comer — passato' },
        header: ['', 'hablar', 'comer'],
        rows: [
          ['yo', 'hablé', 'comí'],
          ['tú', 'hablaste', 'comiste'],
          ['él / ella / usted', 'habló', 'comió'],
          ['nosotros/as', 'hablamos', 'comimos'],
          ['vosotros/as', 'hablasteis', 'comisteis'],
          ['ellos / ellas / ustedes', 'hablaron', 'comieron'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
          [2, 1],
          [2, 2],
        ],
      },
      {
        kind: 'example',
        text: 'Ayer hablé con mi madre.',
        gloss: { en: 'Yesterday I spoke with my mother.', it: 'Ieri ho parlato con mia madre.' },
      },
      {
        kind: 'example',
        text: 'Comimos en un restaurante.',
        gloss: { en: 'We ate in a restaurant.', it: 'Abbiamo mangiato in un ristorante.' },
        note: {
          en: '-er/-ir nosotros: comimos, vivimos — the same form as the present',
          it: 'nosotros in -er/-ir: comimos, vivimos — identico al presente',
        },
      },
      {
        kind: 'example',
        text: 'Llegué tarde al trabajo.',
        gloss: { en: 'I arrived late to work.', it: 'Sono arrivato tardi al lavoro.' },
        note: {
          en: 'llegar → llegué: the g picks up a u to keep its hard sound (also buscar → busqué, empezar → empecé)',
          it: 'llegar → llegué: la g prende una u per conservare il suono duro (così anche buscar → busqué, empezar → empecé)',
        },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'The accent **is** the meaning: *hablo* = I speak, *habló* = he spoke; *trabajo* = I work, *trabajó* = she worked. And watch the ambiguous forms: *hablamos*, *comimos*, *vivimos* are present **and** past — only the context (or an *ayer*) tells them apart.',
          it: 'L’accento **è** il significato: *hablo* = parlo, *habló* = parlò (ha parlato); *trabajo* = lavoro, *trabajó* = ha lavorato. Esattamente come in italiano *parlo* vs *parlò*. Attenzione poi alle forme ambigue: *hablamos*, *comimos*, *vivimos* valgono sia per il presente sia per il passato — è il contesto (o un *ayer*) a distinguerle.',
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
    introLexemeIds: [
      'es/verb/hablar',
      'es/verb/comer',
      'es/verb/vivir',
      'es/verb/trabajar',
      'es/verb/llegar',
    ],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/hablar', tense: 'pret' },
      { gen: 'conj', verbId: 'es/verb/trabajar', tense: 'pret', persons: ['1sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/comer', tense: 'pret', persons: ['1sg', '3sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/vivir', tense: 'pret', persons: ['2sg', '3pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/llegar', tense: 'pret', persons: ['1sg'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Match the ending to the subject: hablé, hablaste, habló, hablamos, hablasteis, hablaron.',
        it: 'Fai concordare la desinenza con il soggetto: hablé, hablaste, habló, hablamos, hablasteis, hablaron.',
      },
      wrongClass: {
        en: '-ar verbs take -é/-aste/-ó; -er and -ir verbs share -í/-iste/-ió.',
        it: 'I verbi in -ar prendono -é/-aste/-ó; quelli in -er e -ir condividono -í/-iste/-ió.',
      },
      infinitive: {
        en: 'That’s the dictionary form — the past needs a person ending.',
        it: 'Quella è la forma del dizionario — al passato serve una desinenza di persona.',
      },
    },
  },

  {
    id: 'es-preterite-irregular',
    lang: 'es',
    title: { en: 'Preterite: core irregulars', it: 'Il passato remoto: irregolari fondamentali' },
    ruleSummary: {
      en: 'hice, tuve, estuve, vine, dije, puse, supe, di, vi — own stem, endings with no accents.',
      it: 'hice, tuve, estuve, vine, dije, puse, supe, di, vi — radice propria, desinenze senza accento.',
    },
    cefr: 'A2',
    dependencies: ['es-preterite-regular'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'A small, very frequent group builds the preterite on **its own stem** and takes **unstressed endings**: **-e, -iste, -o, -imos, -isteis, -ieron** — with **no written accents** (*hice*, *hizo*, never *hicé*, *hizó*). The stems are worth memorising: *hacer → hic-*, *tener → tuv-*, *estar → estuv-*, *venir → vin-*, *poner → pus-*, *saber → sup-*, *decir → dij-* (and *dij-* absorbs the i: *dijeron*, not *dijieron*). *Dar* and *ver* simply drop their accents: *di, dio* — *vi, vio*.',
          it: 'Un piccolo gruppo, molto frequente, costruisce il passato su **una radice propria** e prende **desinenze atone**: **-e, -iste, -o, -imos, -isteis, -ieron** — **senza accento scritto** (*hice*, *hizo*, mai *hicé*, *hizó*). Le radici vanno imparate a memoria: *hacer → hic-*, *tener → tuv-*, *estar → estuv-*, *venir → vin-*, *poner → pus-*, *saber → sup-*, *decir → dij-* (e *dij-* si mangia la i: *dijeron*, non *dijieron*). *Dar* e *ver* si limitano a perdere gli accenti: *di, dio* — *vi, vio*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'ser / ir, hacer & tener — preterite', it: 'ser / ir, hacer e tener — passato' },
        header: ['', 'ser / ir', 'hacer', 'tener'],
        rows: [
          ['yo', 'fui', 'hice', 'tuve'],
          ['tú', 'fuiste', 'hiciste', 'tuviste'],
          ['él / ella / usted', 'fue', 'hizo', 'tuvo'],
          ['nosotros/as', 'fuimos', 'hicimos', 'tuvimos'],
          ['vosotros/as', 'fuisteis', 'hicisteis', 'tuvisteis'],
          ['ellos / ellas / ustedes', 'fueron', 'hicieron', 'tuvieron'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
          [0, 3],
          [2, 1],
          [2, 2],
          [2, 3],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'The irregular stems', it: 'Le radici irregolari' },
        header: [
          { en: 'infinitive', it: 'infinito' },
          { en: 'stem', it: 'radice' },
          'yo',
          'él / ella',
        ],
        rows: [
          ['hacer', 'hic-', 'hice', 'hizo'],
          ['tener', 'tuv-', 'tuve', 'tuvo'],
          ['estar', 'estuv-', 'estuve', 'estuvo'],
          ['venir', 'vin-', 'vine', 'vino'],
          ['poner', 'pus-', 'puse', 'puso'],
          ['saber', 'sup-', 'supe', 'supo'],
          ['decir', 'dij-', 'dije', 'dijo'],
          ['dar', '—', 'di', 'dio'],
          ['ver', '—', 'vi', 'vio'],
        ],
      },
      {
        kind: 'example',
        text: 'Ayer fui al mercado.',
        gloss: { en: 'Yesterday I went to the market.', it: 'Ieri sono andato al mercato.' },
      },
      {
        kind: 'example',
        text: 'Fui estudiante en Madrid.',
        gloss: { en: 'I was a student in Madrid.', it: 'Sono stato studente a Madrid.' },
        note: {
          en: 'same form, other verb: here fui is ser, not ir',
          it: 'stessa forma, altro verbo: qui fui è ser, non ir',
        },
      },
      {
        kind: 'example',
        text: 'Ella hizo la cena y puso la mesa.',
        gloss: { en: 'She made dinner and set the table.', it: 'Lei ha preparato la cena e ha apparecchiato la tavola.' },
        note: {
          en: 'hacer → hizo: the c turns into z before o',
          it: 'hacer → hizo: la c diventa z davanti alla o',
        },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: '**ser and ir share the whole preterite**: *fui, fuiste, fue, fuimos, fuisteis, fueron*. So *fui* means both “I was” and “I went”, and only the context decides — *fui médico* (I was a doctor) vs *fui a casa* (I went home). Italian keeps the two apart (*fui* / *andai*); Spanish does not, so look for the **a** that follows *ir*.',
          it: '**ser e ir hanno lo stesso passato**: *fui, fuiste, fue, fuimos, fuisteis, fueron*. Quindi *fui* vale sia “fui / sono stato” sia “andai / sono andato”, e decide soltanto il contesto — *fui médico* (facevo il medico) vs *fui a casa* (sono andato a casa). L’italiano tiene distinti *fui* e *andai*; lo spagnolo no, perciò cerca la **a** che segue *ir*.',
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
    introLexemeIds: [
      'es/verb/hacer',
      'es/verb/tener',
      'es/verb/ir',
      'es/verb/venir',
      'es/verb/dar',
    ],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/ir', tense: 'pret' },
      { gen: 'conj', verbId: 'es/verb/hacer', tense: 'pret', persons: ['1sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/tener', tense: 'pret', persons: ['1sg', '3sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/ir', tense: 'pret', persons: ['3sg', '3pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/dar', tense: 'pret', persons: ['3sg'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Irregular stem, but one person each: hice, hiciste, hizo, hicimos, hicisteis, hicieron.',
        it: 'Radice irregolare, ma una persona per forma: hice, hiciste, hizo, hicimos, hicisteis, hicieron.',
      },
      wrongClass: {
        en: 'These verbs ignore the regular endings: it is hice, not *hací; tuvo, not *tenió.',
        it: 'Questi verbi ignorano le desinenze regolari: si dice hice, non *hací; tuvo, non *tenió.',
      },
      infinitive: {
        en: 'That’s the dictionary form — use the irregular preterite stem instead.',
        it: 'Quella è la forma del dizionario — usa invece la radice irregolare del passato.',
      },
    },
  },

  {
    id: 'es-past-time',
    lang: 'es',
    title: { en: 'Talking about the past', it: 'Raccontare il passato' },
    ruleSummary: {
      en: 'ayer, anoche, la semana pasada, el año pasado, hace dos días — the words that anchor a story in the past.',
      it: 'ayer, anoche, la semana pasada, el año pasado, hace dos días — le parole che ancorano il racconto al passato.',
    },
    cefr: 'A2',
    dependencies: ['es-preterite-irregular'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'A handful of time markers announce the preterite before the verb even arrives: **ayer**, **anoche**, **la semana pasada**, **el mes / el año pasado**, **hace dos días**. They sit comfortably at the start of the sentence or at the end — *Ayer trabajé mucho* and *Trabajé mucho ayer* are both natural. What they must not do is sit next to a present tense.',
          it: 'Poche espressioni di tempo annunciano il passato prima ancora che arrivi il verbo: **ayer**, **anoche**, **la semana pasada**, **el mes / el año pasado**, **hace dos días**. Stanno bene all’inizio o alla fine della frase — *Ayer trabajé mucho* e *Trabajé mucho ayer* sono entrambe naturali. L’unica cosa che non possono fare è accompagnare un presente.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Time markers for the past', it: 'Espressioni di tempo al passato' },
        header: [
          { en: 'Spanish', it: 'spagnolo' },
          { en: 'English', it: 'italiano' },
        ],
        rows: [
          ['ayer', { en: 'yesterday', it: 'ieri' }],
          ['anoche', { en: 'last night', it: 'ieri sera / stanotte' }],
          ['la semana pasada', { en: 'last week', it: 'la settimana scorsa' }],
          ['el mes pasado', { en: 'last month', it: 'il mese scorso' }],
          ['el año pasado', { en: 'last year', it: 'l’anno scorso' }],
          ['hace dos días', { en: 'two days ago', it: 'due giorni fa' }],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'hace + time = “… ago”', it: 'hace + tempo = “… fa”' },
        header: [
          { en: 'Spanish', it: 'spagnolo' },
          { en: 'English', it: 'italiano' },
        ],
        rows: [
          ['hace un momento', { en: 'a moment ago', it: 'un momento fa' }],
          ['hace dos días', { en: 'two days ago', it: 'due giorni fa' }],
          ['hace una semana', { en: 'a week ago', it: 'una settimana fa' }],
          ['hace tres años', { en: 'three years ago', it: 'tre anni fa' }],
        ],
      },
      {
        kind: 'example',
        text: 'Ayer comí en un restaurante.',
        gloss: { en: 'Yesterday I ate in a restaurant.', it: 'Ieri ho mangiato in un ristorante.' },
      },
      {
        kind: 'example',
        text: 'Anoche fuimos a la playa.',
        gloss: { en: 'Last night we went to the beach.', it: 'Ieri sera siamo andati in spiaggia.' },
      },
      {
        kind: 'example',
        text: 'Hace dos días llegué a Madrid.',
        gloss: { en: 'Two days ago I arrived in Madrid.', it: 'Due giorni fa sono arrivato a Madrid.' },
        note: {
          en: 'hace comes before the amount of time, unlike English “ago”',
          it: 'hace precede la quantità di tempo, al contrario di “fa”',
        },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Two habits to copy: *hace* goes **before** the amount (*hace dos días*), where Italian puts *fa* after (*due giorni fa*); and *la semana pasada* needs **no preposition** — never *en la semana pasada*, exactly like Italian *la settimana scorsa*.',
          it: 'Due abitudini da copiare: *hace* va **prima** della quantità (*hace dos días*), mentre in italiano *fa* viene dopo (*due giorni fa*); e *la semana pasada* non vuole **nessuna preposizione** — mai *en la semana pasada*, proprio come diciamo *la settimana scorsa*.',
        },
      },
    ],
    skillCells: [{ cellId: 'narrate', label: { en: 'past narration', it: 'raccontare al passato' } }],
    introLexemeIds: [
      'es/verb/visitar',
      'es/noun/semana',
      'es/noun/año',
      'es/noun/noche',
      'es/noun/playa',
    ],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Ayer', '___', 'en', 'un', 'restaurante'],
            gapIndex: 1,
            gloss: { en: 'Yesterday I ate in a restaurant', it: 'Ieri ho mangiato in un ristorante' },
            answer: 'comí',
            accepted: [],
            skillIds: ['es-past-time:narrate'],
            ttsText: 'Ayer comí en un restaurante.',
            strictSuffixLen: 1,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“Last night we went to the beach.” — pick the correct sentence',
              it: '“Ieri sera siamo andati in spiaggia.” — scegli la frase corretta',
            },
            answer: 'Anoche fuimos a la playa.',
            accepted: [],
            options: [
              { text: 'Anoche fuimos a la playa.' },
              { text: 'Anoche vamos a la playa.', strategy: 'wrongTense' },
              { text: 'Anoche fue a la playa.', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-past-time:narrate'],
            ttsText: 'Anoche fuimos a la playa.',
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['La', 'semana', 'pasada', '___', 'a', 'mi', 'abuela'],
            gapIndex: 3,
            gloss: {
              en: 'Last week I visited my grandmother',
              it: 'La settimana scorsa ho fatto visita a mia nonna',
            },
            answer: 'visité',
            accepted: [],
            skillIds: ['es-past-time:narrate'],
            ttsText: 'La semana pasada visité a mi abuela.',
            strictSuffixLen: 1,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Hace', 'dos', 'días', '___', 'a', 'Madrid.'],
            gapIndex: 3,
            gloss: { en: 'Two days ago I arrived in Madrid.', it: 'Due giorni fa sono arrivato a Madrid.' },
            answer: 'llegué',
            accepted: [],
            options: [
              { text: 'llegué' },
              { text: 'llego', strategy: 'wrongTense' },
              { text: 'llegó', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-past-time:narrate'],
            ttsText: 'Hace dos días llegué a Madrid.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', 'trabajé', 'ocho', 'horas.'],
            gapIndex: 0,
            gloss: {
              en: '“… I worked eight hours.” — pick the time marker that fits the past',
              it: '“… ho lavorato otto ore.” — scegli l’espressione di tempo adatta al passato',
            },
            answer: 'Ayer',
            accepted: [],
            options: [
              { text: 'Ayer' },
              { text: 'Mañana', strategy: 'wrongTense' },
              { text: 'Ahora', strategy: 'wrongTense' },
            ],
            skillIds: ['es-past-time:narrate'],
            ttsText: 'Ayer trabajé ocho horas.',
          },
        ],
      },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ayer trabajé mucho',
            also: ['Trabajé mucho ayer'],
            gloss: { en: 'Yesterday I worked a lot', it: 'Ieri ho lavorato molto' },
            cellId: 'narrate',
          },
          {
            answer: 'Anoche fuimos a la playa',
            gloss: { en: 'Last night we went to the beach', it: 'Ieri sera siamo andati in spiaggia' },
            cellId: 'narrate',
          },
          {
            answer: 'La semana pasada visité a mi abuela',
            gloss: {
              en: 'Last week I visited my grandmother',
              it: 'La settimana scorsa ho fatto visita a mia nonna',
            },
            cellId: 'narrate',
          },
        ],
      },
    ],
    errorHints: {
      wrongTense: {
        en: 'ayer, anoche, la semana pasada and hace… all demand the preterite, never the present.',
        it: 'ayer, anoche, la semana pasada e hace… richiedono il passato, mai il presente.',
      },
      wrongPerson: {
        en: 'Right tense, wrong person — match the ending to who did it.',
        it: 'Tempo giusto, persona sbagliata — fai concordare la desinenza con chi ha compiuto l’azione.',
      },
    },
  },
]
