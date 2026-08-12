import type { Topic } from '../../types'

// Unit ES-5 · Mi día
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const ES_U5_TOPICS: Topic[] = [
  {
    id: 'es-reflexives',
    lang: 'es',
    title: { en: 'Reflexive verbs', it: 'I verbi riflessivi' },
    ruleSummary: {
      en: 'me, te, se, nos, os, se before the verb: me levanto, te duchas, se acuesta.',
      it: 'me, te, se, nos, os, se prima del verbo: me levanto, te duchas, se acuesta.',
    },
    cefr: 'A2',
    dependencies: ['es-stem-e-ie'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Some verbs describe actions done to oneself: their dictionary form ends in **-se** — *levantarse* (to get up), *ducharse* (to shower). Conjugate the verb normally and put the matching pronoun **before** it: *me levanto*, *te duchas*, *se acuesta*. It works exactly like Italian *alzarsi → mi alzo*.',
          it: 'Alcuni verbi descrivono azioni fatte su se stessi: la forma del dizionario termina in **-se** — *levantarse* (alzarsi), *ducharse* (farsi la doccia). Coniuga il verbo normalmente e metti il pronome corrispondente **prima** di esso: *me levanto*, *te duchas*, *se acuesta*. Funziona esattamente come l’italiano *alzarsi → mi alzo*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The reflexive pronouns', it: 'I pronomi riflessivi' },
        header: [
          { en: 'subject', it: 'soggetto' },
          { en: 'pronoun', it: 'pronome' },
        ],
        rows: [
          ['yo', 'me'],
          ['tú', 'te'],
          ['él / ella / usted', 'se'],
          ['nosotros/as', 'nos'],
          ['vosotros/as', 'os'],
          ['ellos / ellas / ustedes', 'se'],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'levantarse — present tense', it: 'levantarse — presente indicativo' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['yo', 'me levanto'],
          ['tú', 'te levantas'],
          ['él / ella / usted', 'se levanta'],
          ['nosotros/as', 'nos levantamos'],
          ['vosotros/as', 'os levantáis'],
          ['ellos / ellas / ustedes', 'se levantan'],
        ],
      },
      {
        kind: 'example',
        text: 'Me levanto a las siete.',
        gloss: { en: 'I get up at seven.', it: 'Mi alzo alle sette.' },
      },
      {
        kind: 'example',
        text: '¿Te duchas por la mañana?',
        gloss: { en: 'Do you shower in the morning?', it: 'Ti fai la doccia al mattino?' },
      },
      {
        kind: 'example',
        text: 'Ella se acuesta tarde.',
        gloss: { en: 'She goes to bed late.', it: 'Lei va a letto tardi.' },
        note: { en: 'acostarse also changes o → ue', it: 'acostarse cambia anche o → ue' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Several reflexives are **also** stem-changers: *acostarse* (o → ue) → *me acuesto*, *despertarse* (e → ie) → *te despiertas*. Pronoun and stem change work together — but *nosotros* and *vosotros* keep the plain stem: *nos acostamos*, *os despertáis*.',
          it: 'Diversi riflessivi sono **anche** verbi con cambio di radice: *acostarse* (o → ue) → *me acuesto*, *despertarse* (e → ie) → *te despiertas*. Pronome e cambio di radice lavorano insieme — ma *nosotros* e *vosotros* mantengono la radice normale: *nos acostamos*, *os despertáis*.',
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
    introLexemeIds: ['es/verb/levantar', 'es/verb/duchar', 'es/verb/acostar', 'es/verb/despertar'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/levantar', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/levantar', tense: 'pres', persons: ['1sg', '2sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/duchar', tense: 'pres', persons: ['3sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/acostar', tense: 'pres', persons: ['3sg', '1pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/despertar', tense: 'pres', persons: ['2sg'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Ending and pronoun must both match the subject: yo me levanto, tú te levantas, ella se levanta.',
        it: 'Desinenza e pronome devono concordare entrambi con il soggetto: yo me levanto, tú te levantas, ella se levanta.',
      },
      missingStemChange: {
        en: 'acostarse and despertarse change their stem: me acuesto (o → ue), te despiertas (e → ie).',
        it: 'acostarse e despertarse cambiano la radice: me acuesto (o → ue), te despiertas (e → ie).',
      },
      overStemChange: {
        en: 'nosotros and vosotros keep the plain stem: nos acostamos, os despertáis — no diphthong there.',
        it: 'nosotros e vosotros mantengono la radice normale: nos acostamos, os despertáis — lì niente dittongo.',
      },
    },
  },

  {
    id: 'es-progressive',
    lang: 'es',
    title: { en: 'Estar + gerund (right now)', it: 'Estar + gerundio (proprio ora)' },
    ruleSummary: {
      en: 'estar + -ando/-iendo for actions in progress: estoy hablando, están comiendo.',
      it: 'estar + -ando/-iendo per le azioni in corso: estoy hablando, están comiendo.',
    },
    cefr: 'A2',
    dependencies: ['es-estar-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**Estar + gerund** describes what is happening **right now**: *Estoy comiendo* — I am eating (at this very moment). Build the gerund from the infinitive: **-ar → -ando**, **-er/-ir → -iendo**. Estar carries the person; the gerund never changes.',
          it: '**Estar + gerundio** descrive ciò che sta accadendo **proprio ora**: *Estoy comiendo* — sto mangiando (in questo preciso momento). Il gerundio si forma dall’infinito: **-ar → -ando**, **-er/-ir → -iendo**. Estar indica la persona; il gerundio non cambia mai.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Forming the gerund', it: 'La formazione del gerundio' },
        header: [
          { en: 'infinitive', it: 'infinito' },
          { en: 'gerund', it: 'gerundio' },
          { en: 'rule', it: 'regola' },
        ],
        rows: [
          ['hablar', 'hablando', '-ar → -ando'],
          ['comer', 'comiendo', '-er → -iendo'],
          ['vivir', 'viviendo', '-ir → -iendo'],
          ['leer', 'leyendo', { en: 'vowel + -iendo → -yendo', it: 'vocale + -iendo → -yendo' }],
          ['dormir', 'durmiendo', { en: '-ir stem change: o → u', it: 'cambio di radice -ir: o → u' }],
        ],
        highlight: [
          [3, 1],
          [4, 1],
        ],
      },
      { kind: 'example', text: 'Estoy comiendo.', gloss: { en: 'I am eating.', it: 'Sto mangiando.' } },
      {
        kind: 'example',
        text: 'Están leyendo un libro.',
        gloss: { en: 'They are reading a book.', it: 'Stanno leggendo un libro.' },
        note: { en: 'leer → leyendo', it: 'leer → leyendo' },
      },
      {
        kind: 'example',
        text: '¿Qué estás haciendo?',
        gloss: { en: 'What are you doing?', it: 'Che cosa stai facendo?' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Same recipe as Italian *stare + gerundio*: *sto parlando* = *estoy hablando*. But watch the vowel: -er/-ir verbs take **-iendo** (*comiendo*), not *-endo*.',
          it: 'Stessa ricetta dell’italiano *stare + gerundio*: *sto parlando* = *estoy hablando*. Ma attenzione alla vocale: i verbi in -er/-ir prendono **-iendo** (*comiendo*), non *-endo*.',
        },
      },
    ],
    skillCells: [{ cellId: 'gerund', label: { en: 'estar + gerund', it: 'estar + gerundio' } }],
    introLexemeIds: ['es/verb/leer', 'es/verb/dormir', 'es/verb/hacer'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Estoy', '___', '(hablar).'],
            gapIndex: 1,
            gloss: { en: 'I am speaking.', it: 'Sto parlando.' },
            answer: 'hablando',
            accepted: [],
            skillIds: ['es-progressive:gerund'],
            ttsText: 'Estoy hablando.',
            strictSuffixLen: 4,
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Están', '___', '(comer).'],
            gapIndex: 1,
            gloss: { en: 'They are eating.', it: 'Stanno mangiando.' },
            answer: 'comiendo',
            accepted: [],
            skillIds: ['es-progressive:gerund'],
            ttsText: 'Están comiendo.',
            strictSuffixLen: 5,
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['¿Qué', 'estás', '___', '(hacer)?'],
            gapIndex: 2,
            gloss: { en: 'What are you doing?', it: 'Che cosa stai facendo?' },
            answer: 'haciendo',
            accepted: [],
            skillIds: ['es-progressive:gerund'],
            ttsText: '¿Qué estás haciendo?',
            strictSuffixLen: 5,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Ella', '___', 'un', 'libro.'],
            gapIndex: 1,
            gloss: { en: 'She is reading a book (right now).', it: 'Lei sta leggendo un libro (proprio ora).' },
            answer: 'está leyendo',
            accepted: [],
            options: [
              { text: 'está leyendo' },
              { text: 'está leendo', strategy: 'vocabConfusable' },
              { text: 'está leer', strategy: 'infinitive' },
            ],
            skillIds: ['es-progressive:gerund'],
            ttsText: 'Ella está leyendo un libro.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Los', 'niños', '___', 'ahora.'],
            gapIndex: 2,
            gloss: { en: 'The children are sleeping now.', it: 'I bambini stanno dormendo adesso.' },
            answer: 'están durmiendo',
            accepted: [],
            options: [
              { text: 'están durmiendo' },
              { text: 'están dormiendo', strategy: 'missingStemChange' },
              { text: 'está durmiendo', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-progressive:gerund'],
            ttsText: 'Los niños están durmiendo ahora.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Yo', '___', 'café.'],
            gapIndex: 1,
            gloss: { en: 'I am drinking coffee.', it: 'Sto bevendo un caffè.' },
            answer: 'estoy bebiendo',
            accepted: [],
            options: [
              { text: 'estoy bebiendo' },
              { text: 'está bebiendo', strategy: 'wrongPerson' },
              { text: 'estoy bebando', strategy: 'wrongClass' },
            ],
            skillIds: ['es-progressive:gerund'],
            ttsText: 'Yo estoy bebiendo café.',
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Conjugate estar to match the subject — the gerund never changes: estoy comiendo, están comiendo.',
        it: 'Coniuga estar in base al soggetto — il gerundio non cambia mai: estoy comiendo, están comiendo.',
      },
      infinitive: {
        en: 'After estar you need the gerund (-ando/-iendo), not the infinitive.',
        it: 'Dopo estar serve il gerundio (-ando/-iendo), non l’infinito.',
      },
      missingStemChange: {
        en: '-ir stem-changers shift the vowel in the gerund too: dormir → durmiendo, pedir → pidiendo.',
        it: 'I verbi in -ir con cambio di radice cambiano la vocale anche al gerundio: dormir → durmiendo, pedir → pidiendo.',
      },
      wrongClass: {
        en: '-ar → -ando, -er/-ir → -iendo — don’t swap the families.',
        it: '-ar → -ando, -er/-ir → -iendo — non scambiare le famiglie.',
      },
      vocabConfusable: {
        en: 'When the stem ends in a vowel, -iendo becomes -yendo: leer → leyendo.',
        it: 'Quando la radice termina in vocale, -iendo diventa -yendo: leer → leyendo.',
      },
    },
  },

  {
    id: 'es-obligation',
    lang: 'es',
    title: { en: 'Hay & obligation', it: 'Hay e l’obbligo' },
    ruleSummary: {
      en: 'hay = there is/are; tener que + infinitive = personal duty; hay que + infinitive = impersonal duty.',
      it: 'hay = c’è/ci sono; tener que + infinito = dovere personale; hay que + infinito = dovere impersonale (bisogna).',
    },
    cefr: 'A2',
    dependencies: ['es-tener-venir'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Three everyday tools. **Hay** means “there is / there are” — one invariable form for both. **Tener que + infinitive** expresses personal obligation: *Tengo que trabajar* — I have to work. **Hay que + infinitive** expresses impersonal obligation, with no subject at all: *Hay que estudiar* — one must study.',
          it: 'Tre strumenti quotidiani. **Hay** significa “c’è / ci sono” — un’unica forma invariabile per entrambi. **Tener que + infinito** esprime l’obbligo personale: *Tengo que trabajar* — devo lavorare. **Hay que + infinito** esprime l’obbligo impersonale, senza alcun soggetto: *Hay que estudiar* — bisogna studiare.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'hay, tener que, hay que', it: 'hay, tener que, hay que' },
        header: [
          { en: 'structure', it: 'struttura' },
          { en: 'example', it: 'esempio' },
          { en: 'meaning', it: 'significato' },
        ],
        rows: [
          [{ en: 'hay + noun', it: 'hay + nome' }, 'Hay dos libros.', { en: 'there is / there are', it: 'c’è / ci sono' }],
          [
            { en: 'tener que + infinitive', it: 'tener que + infinito' },
            'Tengo que trabajar.',
            { en: 'I have to…', it: 'devo…' },
          ],
          [
            { en: 'hay que + infinitive', it: 'hay que + infinito' },
            'Hay que pagar.',
            { en: 'one must…', it: 'bisogna…' },
          ],
        ],
      },
      {
        kind: 'example',
        text: 'Hay un libro en la mesa.',
        gloss: { en: 'There is a book on the table.', it: 'C’è un libro sul tavolo.' },
      },
      {
        kind: 'example',
        text: 'Tengo que trabajar hoy.',
        gloss: { en: 'I have to work today.', it: 'Oggi devo lavorare.' },
      },
      {
        kind: 'example',
        text: 'Hay que estudiar mucho.',
        gloss: { en: 'One must study a lot.', it: 'Bisogna studiare molto.' },
        note: { en: 'no subject — it applies to everyone', it: 'senza soggetto — vale per tutti' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: '**Hay** never changes: *hay un libro*, *hay dos libros*. Use it to say something **exists**; use *está/están* to say **where** something known is: *Hay un libro en la mesa* vs *El libro está en la mesa*.',
          it: '**Hay** non cambia mai: *hay un libro*, *hay dos libros*. Usalo per dire che qualcosa **esiste**; usa *está/están* per dire **dove** si trova qualcosa di noto: *Hay un libro en la mesa* vs *El libro está en la mesa*.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'hay & obligation', it: 'hay e obbligo' } }],
    introLexemeIds: ['es/verb/tener', 'es/verb/pagar', 'es/verb/estudiar', 'es/noun/mesa'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['___', 'un', 'libro', 'en', 'la', 'mesa.'],
            gapIndex: 0,
            gloss: { en: 'There is a book on the table.', it: 'C’è un libro sul tavolo.' },
            answer: 'Hay',
            accepted: ['hay'],
            skillIds: ['es-obligation:core'],
            ttsText: 'Hay un libro en la mesa.',
            strictSuffixLen: 0,
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Tengo', '___', 'trabajar.'],
            gapIndex: 1,
            gloss: { en: 'I have to work.', it: 'Devo lavorare.' },
            answer: 'que',
            accepted: [],
            skillIds: ['es-obligation:core'],
            ttsText: 'Tengo que trabajar.',
            strictSuffixLen: 0,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“One must study.” — pick the correct sentence',
              it: '“Bisogna studiare.” — scegli la frase corretta',
            },
            answer: 'Hay que estudiar.',
            accepted: [],
            options: [
              { text: 'Hay que estudiar.' },
              { text: 'Hay estudiar.', strategy: 'vocabConfusable' },
              { text: 'Tengo que estudiar.', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-obligation:core'],
            ttsText: 'Hay que estudiar.',
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['¿', '___', 'que', 'pagar', 'aquí?'],
            gapIndex: 1,
            gloss: { en: 'Does one have to pay here?', it: 'Bisogna pagare qui?' },
            answer: 'Hay',
            accepted: ['hay'],
            skillIds: ['es-obligation:core'],
            ttsText: '¿Hay que pagar aquí?',
            strictSuffixLen: 0,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“We have to buy bread.” — pick the correct sentence',
              it: '“Dobbiamo comprare il pane.” — scegli la frase corretta',
            },
            answer: 'Tenemos que comprar pan.',
            accepted: [],
            options: [
              { text: 'Tenemos que comprar pan.' },
              { text: 'Tenemos comprar pan.', strategy: 'vocabConfusable' },
              { text: 'Tengo que comprar pan.', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-obligation:core'],
            ttsText: 'Tenemos que comprar pan.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', 'dos', 'sillas', 'en', 'la', 'casa.'],
            gapIndex: 0,
            gloss: { en: 'There are two chairs in the house.', it: 'Ci sono due sedie in casa.' },
            answer: 'Hay',
            accepted: [],
            options: [
              { text: 'Hay' },
              { text: 'Están', strategy: 'vocabConfusable' },
              { text: 'Son', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-obligation:core'],
            ttsText: 'Hay dos sillas en la casa.',
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'hay = there is/are (invariable, even with plurals); tener que = personal duty; hay que = impersonal duty — and never drop “que”.',
        it: 'hay = c’è/ci sono (invariabile, anche col plurale); tener que = dovere personale; hay que = dovere impersonale — e non omettere mai “que”.',
      },
      wrongPerson: {
        en: 'Conjugate tener to match the subject: tengo, tienes, tiene, tenemos, tenéis, tienen.',
        it: 'Coniuga tener in base al soggetto: tengo, tienes, tiene, tenemos, tenéis, tienen.',
      },
    },
  },

  {
    id: 'es-comparatives',
    lang: 'es',
    title: { en: 'Comparatives', it: 'I comparativi' },
    ruleSummary: {
      en: 'más/menos + adjective + que; tan + adjective + como; irregular mejor/peor.',
      it: 'más/menos + aggettivo + que; tan + aggettivo + como; irregolari mejor/peor.',
    },
    cefr: 'A2',
    dependencies: ['es-adj-agreement'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'To compare, wrap the adjective: **más … que** (more … than), **menos … que** (less … than), **tan … como** (as … as). The adjective still agrees with its subject: *María es más alta que Juan*. A few comparatives are irregular: **mejor** (better) and **peor** (worse).',
          it: 'Per fare paragoni, incornicia l’aggettivo: **más … que** (più … di), **menos … que** (meno … di), **tan … como** (tanto … quanto). L’aggettivo continua a concordare con il soggetto: *María es más alta que Juan*. Alcuni comparativi sono irregolari: **mejor** (migliore) e **peor** (peggiore).',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Comparison patterns', it: 'Le strutture comparative' },
        header: [
          { en: 'pattern', it: 'struttura' },
          { en: 'example', it: 'esempio' },
          { en: 'meaning', it: 'significato' },
        ],
        rows: [
          ['más + adj. + que', 'más alto que', { en: 'taller than', it: 'più alto di' }],
          ['menos + adj. + que', 'menos caro que', { en: 'less expensive than', it: 'meno caro di' }],
          ['tan + adj. + como', 'tan grande como', { en: 'as big as', it: 'grande quanto' }],
          ['mejor / peor', 'mejor que', { en: 'better than / worse than', it: 'migliore di / peggiore di' }],
        ],
        highlight: [[3, 1]],
      },
      {
        kind: 'example',
        text: 'María es más alta que Juan.',
        gloss: { en: 'María is taller than Juan.', it: 'María è più alta di Juan.' },
      },
      {
        kind: 'example',
        text: 'El café es tan caro como el té.',
        gloss: { en: 'The coffee is as expensive as the tea.', it: 'Il caffè è caro quanto il tè.' },
      },
      {
        kind: 'example',
        text: 'Este libro es mejor que ese.',
        gloss: { en: 'This book is better than that one.', it: 'Questo libro è migliore di quello.' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'The second term takes **que**, not *de*: *más alta que Juan*. And never *más bueno* / *más malo* — say **mejor** and **peor**.',
          it: 'Il secondo termine è introdotto da **que**, non da *de* (l’equivalente dell’italiano “di”): *más alta que Juan*, non *más alta de Juan*. E mai *más bueno* / *más malo* — si dice **mejor** e **peor**.',
        },
      },
    ],
    skillCells: [{ cellId: 'comp', label: { en: 'comparisons', it: 'paragoni' } }],
    introLexemeIds: ['es/adj/alto', 'es/adj/caro', 'es/adj/barato', 'es/adj/grande', 'es/adj/bueno'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'es',
            sentence: ['María', 'es', '___', 'alta', 'que', 'Juan.'],
            gapIndex: 2,
            gloss: { en: 'María is taller than Juan.', it: 'María è più alta di Juan.' },
            answer: 'más',
            accepted: [],
            options: [
              { text: 'más' },
              { text: 'tan', strategy: 'vocabConfusable' },
              { text: 'muy', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-comparatives:comp'],
            ttsText: 'María es más alta que Juan.',
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['El', 'café', 'es', 'tan', 'caro', '___', 'el', 'té.'],
            gapIndex: 5,
            gloss: { en: 'The coffee is as expensive as the tea.', it: 'Il caffè è caro quanto il tè.' },
            answer: 'como',
            accepted: [],
            skillIds: ['es-comparatives:comp'],
            ttsText: 'El café es tan caro como el té.',
            strictSuffixLen: 0,
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Este', 'libro', 'es', '___', 'que', 'ese.'],
            gapIndex: 3,
            gloss: { en: 'This book is better than that one.', it: 'Questo libro è migliore di quello.' },
            answer: 'mejor',
            accepted: [],
            options: [
              { text: 'mejor' },
              { text: 'más bueno', strategy: 'vocabConfusable' },
              { text: 'más mejor', strategy: 'vocabConfusable' },
            ],
            skillIds: ['es-comparatives:comp'],
            ttsText: 'Este libro es mejor que ese.',
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Mi', 'casa', 'es', 'menos', 'grande', '___', 'tu', 'casa.'],
            gapIndex: 5,
            gloss: { en: 'My house is less big than your house.', it: 'La mia casa è meno grande della tua.' },
            answer: 'que',
            accepted: [],
            skillIds: ['es-comparatives:comp'],
            ttsText: 'Mi casa es menos grande que tu casa.',
            strictSuffixLen: 0,
          },
        ],
      },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'María es más alta que Juan',
            gloss: { en: 'María is taller than Juan', it: 'María è più alta di Juan' },
            cellId: 'comp',
          },
          {
            answer: 'El café es tan caro como el té',
            gloss: { en: 'The coffee is as expensive as the tea', it: 'Il caffè è caro quanto il tè' },
            cellId: 'comp',
          },
          {
            answer: 'Mi casa es menos grande que tu casa',
            gloss: { en: 'My house is less big than your house', it: 'La mia casa è meno grande della tua' },
            cellId: 'comp',
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'más … que, menos … que — but tan … como. And never “más bueno”: say mejor.',
        it: 'más … que, menos … que — ma tan … como. E mai “más bueno”: si dice mejor.',
      },
    },
  },
]
