import type { Topic } from '../../types'

// Unit ES-2 · El presente
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const ES_U2_TOPICS: Topic[] = [
  {
    id: 'es-present-ar',
    lang: 'es',
    title: { en: '-ar verbs (present)', it: 'I verbi in -ar (presente)' },
    ruleSummary: {
      en: 'Drop -ar, add -o, -as, -a, -amos, -áis, -an: hablo, hablas, habla…',
      it: 'Togli -ar e aggiungi -o, -as, -a, -amos, -áis, -an: hablo, hablas, habla…',
    },
    cefr: 'A1',
    dependencies: ['es-subject-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Most Spanish verbs end in **-ar**. To conjugate one, cut off **-ar** and add the ending for the person: *hablar* → *habl-* → *hablo* (I speak). The ending does the work of the pronoun, which is why Spanish usually drops *yo*, *tú*, etc.',
          it: 'La maggior parte dei verbi spagnoli termina in **-ar**. Per coniugarne uno, togli **-ar** e aggiungi la desinenza della persona: *hablar* → *habl-* → *hablo* (io parlo). La desinenza fa il lavoro del pronome, ed è per questo che lo spagnolo di solito omette *yo*, *tú*, ecc.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'hablar — present tense', it: 'hablar — presente indicativo' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['yo', 'hablo'],
          ['tú', 'hablas'],
          ['él / ella / usted', 'habla'],
          ['nosotros/as', 'hablamos'],
          ['vosotros/as', 'habláis'],
          ['ellos / ellas / ustedes', 'hablan'],
        ],
      },
      { kind: 'example', text: 'Hablo español.', gloss: { en: 'I speak Spanish.', it: 'Parlo spagnolo.' } },
      { kind: 'example', text: 'Trabajamos en la ciudad.', gloss: { en: 'We work in the city.', it: 'Lavoriamo in città.' } },
      { kind: 'example', text: 'Ella habla mucho.', gloss: { en: 'She talks a lot.', it: 'Lei parla molto.' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'One ending per person, always: *trabajar* works exactly like *hablar* — *trabajo, trabajas, trabaja…* Learn the six endings once and you can conjugate hundreds of verbs.',
          it: 'Una desinenza per persona, sempre: *trabajar* funziona esattamente come *hablar* — *trabajo, trabajas, trabaja…* Impara le sei desinenze una volta sola e potrai coniugare centinaia di verbi.',
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
    introLexemeIds: ['es/verb/hablar', 'es/verb/trabajar'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/hablar', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/hablar', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/trabajar', tense: 'pres', persons: ['1pl', '2pl', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Match the ending to the person: -o (yo), -as (tú), -a (él/ella), -amos, -áis, -an.',
        it: 'Abbina la desinenza alla persona: -o (yo), -as (tú), -a (él/ella), -amos, -áis, -an.',
      },
      wrongClass: {
        en: 'This is an -ar verb — don’t borrow -er/-ir endings.',
        it: 'Questo è un verbo in -ar — non prendere in prestito le desinenze di -er/-ir.',
      },
      infinitive: {
        en: '“hablar” is the dictionary form — it must be conjugated here.',
        it: '“hablar” è la forma del dizionario — qui va coniugato.',
      },
    },
  },

  {
    id: 'es-present-er-ir',
    lang: 'es',
    title: { en: '-er/-ir verbs (present)', it: 'I verbi in -er/-ir (presente)' },
    ruleSummary: {
      en: '-o, -es, -e, -emos/-imos, -éis/-ís, -en — er and ir differ only in nosotros & vosotros.',
      it: '-o, -es, -e, -emos/-imos, -éis/-ís, -en — -er e -ir differiscono solo in nosotros e vosotros.',
    },
    cefr: 'A1',
    dependencies: ['es-present-ar'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'The other two verb families end in **-er** and **-ir**. They share almost all their endings: *-o, -es, -e, …, -en*. Only two forms differ: **nosotros** (*-emos* vs *-imos*) and **vosotros** (*-éis* vs *-ís*).',
          it: 'Le altre due famiglie di verbi terminano in **-er** e **-ir**. Condividono quasi tutte le desinenze: *-o, -es, -e, …, -en*. Solo due forme differiscono: **nosotros** (*-emos* vs *-imos*) e **vosotros** (*-éis* vs *-ís*).',
        },
      },
      {
        kind: 'table',
        caption: { en: 'comer & vivir — present tense', it: 'comer e vivir — presente indicativo' },
        header: ['', 'comer (-er)', 'vivir (-ir)'],
        rows: [
          ['yo', 'como', 'vivo'],
          ['tú', 'comes', 'vives'],
          ['él / ella / usted', 'come', 'vive'],
          ['nosotros/as', 'comemos', 'vivimos'],
          ['vosotros/as', 'coméis', 'vivís'],
          ['ellos / ellas / ustedes', 'comen', 'viven'],
        ],
        highlight: [
          [3, 1],
          [3, 2],
          [4, 1],
          [4, 2],
        ],
      },
      { kind: 'example', text: 'Como pan.', gloss: { en: 'I eat bread.', it: 'Mangio pane.' } },
      {
        kind: 'example',
        text: 'Vivimos en la ciudad.',
        gloss: { en: 'We live in the city.', it: 'Viviamo in città.' },
        note: { en: '-ir: vivimos, not *vivemos', it: '-ir: vivimos, non *vivemos' },
      },
      { kind: 'example', text: 'Bebes café.', gloss: { en: 'You drink coffee.', it: 'Bevi caffè.' } },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Don’t mix the families: -ar verbs use **a**-endings (*hablas, habla*), -er/-ir verbs use **e**-endings (*comes, come*). *Tú comas* is wrong here — that vowel belongs to -ar verbs.',
          it: 'Non mescolare le famiglie: i verbi in -ar usano desinenze in **a** (*hablas, habla*), i verbi in -er/-ir desinenze in **e** (*comes, come*). *Tú comas* qui è sbagliato — quella vocale appartiene ai verbi in -ar.',
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
    introLexemeIds: ['es/verb/comer', 'es/verb/vivir', 'es/verb/beber'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/comer', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/comer', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/vivir', tense: 'pres', persons: ['1pl', '2pl', '3pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/beber', tense: 'pres', persons: ['2sg', '1pl', '3pl'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/vivir', tense: 'pres', persons: ['3sg', '2pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Endings: -o, -es, -e, -emos/-imos, -éis/-ís, -en — match the subject.',
        it: 'Desinenze: -o, -es, -e, -emos/-imos, -éis/-ís, -en — fai concordare con il soggetto.',
      },
      wrongClass: {
        en: 'Careful: -ar endings (-as, -a, -amos) don’t belong on -er/-ir verbs.',
        it: 'Attenzione: le desinenze di -ar (-as, -a, -amos) non vanno sui verbi in -er/-ir.',
      },
      infinitive: {
        en: 'That’s the dictionary form — it needs a person ending.',
        it: 'Quella è la forma del dizionario — serve una desinenza di persona.',
      },
    },
  },

  {
    id: 'es-negation',
    lang: 'es',
    title: { en: 'Negation', it: 'La negazione' },
    ruleSummary: {
      en: 'Put no directly before the conjugated verb; double negatives (no … nada) are normal.',
      it: 'Metti no subito prima del verbo coniugato; le doppie negazioni (no … nada) sono normali.',
    },
    cefr: 'A1',
    dependencies: ['es-present-ar'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'To negate a sentence, put **no** directly before the conjugated verb: *Hablo* → *No hablo*. There is no Spanish “do/does” — *no* alone does the job. And unlike English, **double negatives are correct**: *No como nada* (literally “I don’t eat nothing”) means “I don’t eat anything.”',
          it: 'Per negare una frase, metti **no** subito prima del verbo coniugato: *Hablo* → *No hablo*. Funziona proprio come “non” in italiano — basta *no* da solo. E come in italiano, **la doppia negazione è corretta**: *No como nada* significa “non mangio niente”.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Affirmative → negative', it: 'Affermativa → negativa' },
        header: [
          { en: 'affirmative', it: 'affermativa' },
          { en: 'negative', it: 'negativa' },
        ],
        rows: [
          ['Hablo español.', 'No hablo español.'],
          ['Trabajamos.', 'No trabajamos.'],
          ['Como pan.', 'No como nada.'],
        ],
      },
      { kind: 'example', text: 'No hablo francés.', gloss: { en: 'I don’t speak French.', it: 'Non parlo francese.' } },
      { kind: 'example', text: 'Ella no trabaja hoy.', gloss: { en: 'She isn’t working today.', it: 'Lei oggi non lavora.' } },
      {
        kind: 'example',
        text: 'No como nada.',
        gloss: { en: 'I don’t eat anything.', it: 'Non mangio niente.' },
        note: { en: 'double negative — normal in Spanish', it: 'doppia negazione — normale in spagnolo' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: '*No* must sit **immediately before the verb** — nothing squeezes in between, and it never goes after: *Bebo no café* is wrong; say *No bebo café*.',
          it: '*No* deve stare **immediatamente prima del verbo** — non ci si infila niente in mezzo, e non va mai dopo: *Bebo no café* è sbagliato; si dice *No bebo café*.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'negation', it: 'negazione' } }],
    introLexemeIds: [],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“I don’t drink coffee.” — pick the correct sentence',
              it: '“Non bevo caffè.” — scegli la frase corretta',
            },
            answer: 'No bebo café.',
            accepted: [],
            options: [
              { text: 'No bebo café.' },
              { text: 'Bebo no café.', strategy: 'v2Violation' },
              { text: 'Bebo café no.', strategy: 'v2Violation' },
            ],
            skillIds: ['es-negation:core'],
            ttsText: 'No bebo café.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“We don’t work.” — pick the correct sentence',
              it: '“Non lavoriamo.” — scegli la frase corretta',
            },
            answer: 'No trabajamos.',
            accepted: [],
            options: [
              { text: 'No trabajamos.' },
              { text: 'Trabajamos no.', strategy: 'v2Violation' },
              { text: 'Nosotros trabajamos no.', strategy: 'v2Violation' },
            ],
            skillIds: ['es-negation:core'],
            ttsText: 'No trabajamos.',
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Yo', '___', 'hablo', 'francés.'],
            gapIndex: 1,
            gloss: { en: 'I don’t speak French.', it: 'Non parlo francese.' },
            answer: 'no',
            accepted: [],
            skillIds: ['es-negation:core'],
            ttsText: 'Yo no hablo francés.',
            strictSuffixLen: 0,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“She doesn’t live in the city.” — pick the correct sentence',
              it: '“Lei non vive in città.” — scegli la frase corretta',
            },
            answer: 'Ella no vive en la ciudad.',
            accepted: [],
            options: [
              { text: 'Ella no vive en la ciudad.' },
              { text: 'Ella vive no en la ciudad.', strategy: 'v2Violation' },
              { text: 'No ella vive en la ciudad.', strategy: 'v2Violation' },
            ],
            skillIds: ['es-negation:core'],
            ttsText: 'Ella no vive en la ciudad.',
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['No', 'como', '___', 'por', 'la', 'mañana.'],
            gapIndex: 2,
            gloss: {
              en: 'I don’t eat anything in the morning. (no … nada)',
              it: 'Non mangio niente al mattino. (no … nada)',
            },
            answer: 'nada',
            accepted: [],
            skillIds: ['es-negation:core'],
            ttsText: 'No como nada por la mañana.',
            strictSuffixLen: 0,
          },
        ],
      },
    ],
    errorHints: {
      v2Violation: {
        en: 'Put “no” directly before the conjugated verb: yo no hablo.',
        it: 'Metti “no” subito prima del verbo coniugato: yo no hablo.',
      },
    },
  },

  {
    id: 'es-questions',
    lang: 'es',
    title: { en: 'Questions', it: 'Le domande' },
    ruleSummary: {
      en: 'Rising intonation or verb–subject inversion; question words (qué, dónde…) carry accents and ¿…?',
      it: 'Intonazione ascendente o inversione verbo–soggetto; le parole interrogative (qué, dónde…) portano l’accento e ¿…?',
    },
    cefr: 'A1',
    dependencies: ['es-present-ar'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Yes/no questions need no new grammar: keep the word order and raise your voice — *¿Hablas español?* — or invert verb and subject: *¿Trabaja ella hoy?* For open questions, start with a **question word**. All of them carry a written **accent**, and every question is flanked by **¿ … ?**',
          it: 'Le domande sì/no non richiedono nuova grammatica: mantieni l’ordine delle parole e alza la voce — *¿Hablas español?* — oppure inverti verbo e soggetto: *¿Trabaja ella hoy?* Per le domande aperte, inizia con una **parola interrogativa**. Tutte portano l’**accento** grafico, e ogni domanda è racchiusa tra **¿ … ?**',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Question words', it: 'Parole interrogative' },
        header: [
          { en: 'Spanish', it: 'spagnolo' },
          { en: 'English', it: 'italiano' },
        ],
        rows: [
          ['¿qué?', { en: 'what?', it: 'che cosa?' }],
          ['¿dónde?', { en: 'where?', it: 'dove?' }],
          ['¿quién?', { en: 'who?', it: 'chi?' }],
          ['¿cuándo?', { en: 'when?', it: 'quando?' }],
          ['¿cómo?', { en: 'how?', it: 'come?' }],
          ['¿por qué?', { en: 'why?', it: 'perché?' }],
        ],
      },
      { kind: 'example', text: '¿Dónde vives?', gloss: { en: 'Where do you live?', it: 'Dove vivi?' } },
      {
        kind: 'example',
        text: '¿Hablas español?',
        gloss: { en: 'Do you speak Spanish?', it: 'Parli spagnolo?' },
        note: {
          en: 'a statement plus ¿? and rising intonation',
          it: 'un’affermazione più ¿? e intonazione ascendente',
        },
      },
      { kind: 'example', text: '¿Por qué trabajas hoy?', gloss: { en: 'Why are you working today?', it: 'Perché lavori oggi?' } },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'The accent is not decoration: *dónde* asks, *donde* doesn’t. And don’t drop the opening **¿** — Spanish questions open and close: *¿Cómo estás?*',
          it: 'L’accento non è decorativo: *dónde* domanda, *donde* no. E non omettere il **¿** iniziale — le domande spagnole si aprono e si chiudono: *¿Cómo estás?*',
        },
      },
    ],
    skillCells: [{ cellId: 'qwords', label: { en: 'question words', it: 'parole interrogative' } }],
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
              en: 'Match each question word with its meaning',
              it: 'Abbina ogni parola interrogativa al suo significato',
            },
            answer: '',
            accepted: [],
            pairs: [
              ['qué', 'what'],
              ['dónde', 'where'],
              ['quién', 'who'],
              ['cuándo', 'when'],
              ['cómo', 'how'],
            ],
            skillIds: ['es-questions:qwords'],
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['¿', '___', 'vives?'],
            gapIndex: 1,
            gloss: { en: 'Where do you live?', it: 'Dove vivi?' },
            answer: 'Dónde',
            accepted: [],
            options: [
              { text: 'Dónde' },
              { text: 'Qué', strategy: 'vocabConfusable' },
              { text: 'Cuándo', strategy: 'vocabConfusable' },
              { text: 'Quién', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-questions:qwords'],
            ttsText: '¿Dónde vives?',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['¿', '___', 'comes?'],
            gapIndex: 1,
            gloss: { en: 'What do you eat?', it: 'Che cosa mangi?' },
            answer: 'Qué',
            accepted: [],
            options: [
              { text: 'Qué' },
              { text: 'Dónde', strategy: 'vocabConfusable' },
              { text: 'Cómo', strategy: 'vocabConfusable' },
              { text: 'Cuándo', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-questions:qwords'],
            ttsText: '¿Qué comes?',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['¿', '___', 'trabajas?'],
            gapIndex: 1,
            gloss: { en: 'When do you work?', it: 'Quando lavori?' },
            answer: 'Cuándo',
            accepted: [],
            options: [
              { text: 'Cuándo' },
              { text: 'Dónde', strategy: 'vocabConfusable' },
              { text: 'Qué', strategy: 'vocabConfusable' },
              { text: 'Cómo', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-questions:qwords'],
            ttsText: '¿Cuándo trabajas?',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['¿', '___', 'habla', 'español?'],
            gapIndex: 1,
            gloss: { en: 'Who speaks Spanish?', it: 'Chi parla spagnolo?' },
            answer: 'Quién',
            accepted: [],
            options: [
              { text: 'Quién' },
              { text: 'Qué', strategy: 'vocabConfusable' },
              { text: 'Cómo', strategy: 'vocabConfusable' },
              { text: 'Dónde', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-questions:qwords'],
            ttsText: '¿Quién habla español?',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['¿', '___', 'trabajas', 'en', 'casa?'],
            gapIndex: 1,
            gloss: { en: 'Why do you work at home?', it: 'Perché lavori a casa?' },
            answer: 'Por qué',
            accepted: [],
            options: [
              { text: 'Por qué' },
              { text: 'Porque', strategy: 'vocabConfusable' },
              { text: 'Qué', strategy: 'vocabConfusable' },
              { text: 'Cómo', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-questions:qwords'],
            ttsText: '¿Por qué trabajas en casa?',
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'qué = what, dónde = where, quién = who, cuándo = when, cómo = how, por qué = why.',
        it: 'qué = che cosa, dónde = dove, quién = chi, cuándo = quando, cómo = come, por qué = perché.',
      },
    },
  },

  {
    id: 'es-estar-present',
    lang: 'es',
    title: { en: 'Estar — to be (state/place)', it: 'Estar — essere (stato/luogo)' },
    ruleSummary: {
      en: 'estoy, estás, está, estamos, estáis, están — for location and temporary states.',
      it: 'estoy, estás, está, estamos, estáis, están — per luoghi e stati temporanei.',
    },
    cefr: 'A1',
    dependencies: ['es-ser-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**Estar** is the second “to be” — for **where** something is and **how** it is right now: location, moods, temporary states. It looks like a regular -ar verb but the *yo* form is *estoy*, and four forms carry a written accent.',
          it: '**Estar** è il secondo “essere” — per **dove** si trova qualcosa e **come** sta in questo momento: luoghi, umori, stati temporanei. Sembra un regolare verbo in -ar, ma la forma di *yo* è *estoy*, e quattro forme portano l’accento grafico.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'estar — present tense', it: 'estar — presente indicativo' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['yo', 'estoy'],
          ['tú', 'estás'],
          ['él / ella / usted', 'está'],
          ['nosotros/as', 'estamos'],
          ['vosotros/as', 'estáis'],
          ['ellos / ellas / ustedes', 'están'],
        ],
        highlight: [
          [1, 1],
          [2, 1],
          [4, 1],
          [5, 1],
        ],
      },
      { kind: 'example', text: 'Estoy en casa.', gloss: { en: 'I am at home.', it: 'Sono a casa.' } },
      { kind: 'example', text: '¿Cómo estás?', gloss: { en: 'How are you?', it: 'Come stai?' } },
      { kind: 'example', text: 'Estamos en la ciudad.', gloss: { en: 'We are in the city.', it: 'Siamo in città.' } },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'The accents are part of the word: **estás, está, estáis, están** — writing *esta* instead of *está* turns “he is” into “this”. Only *estoy* and *estamos* go without one.',
          it: 'Gli accenti fanno parte della parola: **estás, está, estáis, están** — scrivere *esta* invece di *está* trasforma “è” in “questa”. Solo *estoy* ed *estamos* ne sono privi.',
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
      { gen: 'match-verb', verbId: 'es/verb/estar', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/estar', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/estar', tense: 'pres', persons: ['1pl', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Estar: estoy, estás, está, estamos, estáis, están — mind the accents.',
        it: 'Estar: estoy, estás, está, estamos, estáis, están — attenzione agli accenti.',
      },
      infinitive: {
        en: '“estar” is the dictionary form — it must be conjugated here.',
        it: '“estar” è la forma del dizionario — qui va coniugato.',
      },
    },
  },

  {
    id: 'es-ser-vs-estar',
    lang: 'es',
    title: { en: 'Ser vs estar', it: 'Ser vs estar' },
    ruleSummary: {
      en: 'ser = what it is (identity, origin, profession); estar = how/where it is (state, location).',
      it: 'ser = che cosa è (identità, origine, professione); estar = come/dove sta (stato, luogo).',
    },
    cefr: 'A1',
    dependencies: ['es-estar-present', 'es-adj-agreement'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Spanish splits “to be” in two. **Ser** answers *what is it?* — identity, origin, profession, lasting traits. **Estar** answers *how is it? where is it?* — moods, temporary states, location. The adjective still agrees with the subject either way.',
          it: 'Lo spagnolo divide “essere” in due. **Ser** risponde a *che cosa è?* — identità, origine, professione, tratti stabili. **Estar** risponde a *come sta? dove sta?* — umori, stati temporanei, luoghi. In entrambi i casi l’aggettivo concorda comunque con il soggetto.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Two verbs, two questions', it: 'Due verbi, due domande' },
        header: [
          { en: 'ser — what it is', it: 'ser — che cosa è' },
          { en: 'estar — how/where it is', it: 'estar — come/dove sta' },
        ],
        rows: [
          [
            { en: 'identity: Soy Ana.', it: 'identità: Soy Ana.' },
            { en: 'state: Estoy cansado.', it: 'stato: Estoy cansado.' },
          ],
          [
            { en: 'origin: Somos de la ciudad.', it: 'origine: Somos de la ciudad.' },
            { en: 'location: Estamos en casa.', it: 'luogo: Estamos en casa.' },
          ],
          [
            { en: 'trait: Ella es inteligente.', it: 'tratto: Ella es inteligente.' },
            { en: 'mood: Ella está contenta.', it: 'umore: Ella está contenta.' },
          ],
        ],
      },
      {
        kind: 'example',
        text: 'Ella es inteligente.',
        gloss: { en: 'She is intelligent.', it: 'Lei è intelligente.' },
        note: { en: 'a lasting trait → ser', it: 'un tratto stabile → ser' },
      },
      {
        kind: 'example',
        text: 'Ella está enferma.',
        gloss: { en: 'She is sick.', it: 'Lei è malata.' },
        note: { en: 'a temporary state → estar', it: 'uno stato temporaneo → estar' },
      },
      {
        kind: 'example',
        text: 'Estamos en la casa.',
        gloss: { en: 'We are in the house.', it: 'Siamo in casa.' },
        note: { en: 'location → estar', it: 'luogo → estar' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Quick test before you speak: *what* is it? → **ser**. *How* or *where* is it? → **estar**.',
          it: 'Test rapido prima di parlare: *che cosa* è? → **ser**. *Come* o *dove* sta? → **estar**.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'ser vs estar choice', it: 'scelta tra ser ed estar' } }],
    introLexemeIds: ['es/adj/cansado', 'es/adj/contento', 'es/adj/enfermo', 'es/adj/feliz'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Yo', '___', 'cansado.'],
            gapIndex: 1,
            gloss: { en: 'I am tired.', it: 'Sono stanco.' },
            answer: 'estoy',
            accepted: [],
            options: [
              { text: 'estoy' },
              { text: 'soy', strategy: 'serEstarSwap' },
              { text: 'estás', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-ser-vs-estar:core'],
            ttsText: 'Yo estoy cansado.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Ella', '___', 'inteligente.'],
            gapIndex: 1,
            gloss: { en: 'She is intelligent.', it: 'Lei è intelligente.' },
            answer: 'es',
            accepted: [],
            options: [
              { text: 'es' },
              { text: 'está', strategy: 'serEstarSwap' },
              { text: 'eres', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-ser-vs-estar:core'],
            ttsText: 'Ella es inteligente.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Nosotros', '___', 'en', 'la', 'casa.'],
            gapIndex: 1,
            gloss: { en: 'We are in the house.', it: 'Siamo in casa.' },
            answer: 'estamos',
            accepted: [],
            options: [
              { text: 'estamos' },
              { text: 'somos', strategy: 'serEstarSwap' },
              { text: 'están', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-ser-vs-estar:core'],
            ttsText: 'Nosotros estamos en la casa.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Tú', '___', 'alto.'],
            gapIndex: 1,
            gloss: { en: 'You are tall.', it: 'Sei alto.' },
            answer: 'eres',
            accepted: [],
            options: [
              { text: 'eres' },
              { text: 'estás', strategy: 'serEstarSwap' },
              { text: 'es', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-ser-vs-estar:core'],
            ttsText: 'Tú eres alto.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Ellos', '___', 'enfermos.'],
            gapIndex: 1,
            gloss: { en: 'They are sick.', it: 'Loro sono malati.' },
            answer: 'están',
            accepted: [],
            options: [
              { text: 'están' },
              { text: 'son', strategy: 'serEstarSwap' },
              { text: 'está', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-ser-vs-estar:core'],
            ttsText: 'Ellos están enfermos.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Mi', 'amigo', '___', 'de', 'la', 'ciudad.'],
            gapIndex: 2,
            gloss: { en: 'My friend is from the city.', it: 'Il mio amico viene dalla città.' },
            answer: 'es',
            accepted: [],
            options: [
              { text: 'es' },
              { text: 'está', strategy: 'serEstarSwap' },
              { text: 'son', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-ser-vs-estar:core'],
            ttsText: 'Mi amigo es de la ciudad.',
          },
        ],
      },
    ],
    errorHints: {
      serEstarSwap: {
        en: 'What it is (identity, origin, trait) → ser; how or where it is (state, location) → estar.',
        it: 'Che cosa è (identità, origine, tratto) → ser; come o dove sta (stato, luogo) → estar.',
      },
      wrongPerson: {
        en: 'Right verb, wrong person — match the form to the subject.',
        it: 'Verbo giusto, persona sbagliata — fai concordare la forma con il soggetto.',
      },
    },
  },
]
