import type { Topic } from '../../types'

// Unit DE-6 · Komplexe Sätze
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U6_TOPICS: Topic[] = [
  {
    id: 'de-subclause-weil-dass',
    lang: 'de',
    title: { en: 'weil, dass, wenn: verb to the end', it: 'weil, dass, wenn: il verbo in fondo' },
    ruleSummary: {
      en: 'After weil, dass and wenn the conjugated verb moves to the END of its clause: …, weil es schön ist.',
      it: 'Dopo weil, dass e wenn il verbo coniugato va in FONDO alla sua frase: …, weil es schön ist.',
    },
    cefr: 'A2',
    dependencies: ['de-coord-conjunctions', 'de-perfect-haben'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Three little words open a **subordinate clause**: **weil** (because), **dass** (that), **wenn** (if/when). And a subordinate clause plays by a different rule: the conjugated verb is **kicked to the very end**. *Es ist schön* on its own, but *Ich lerne Deutsch, weil es schön **ist***. The main clause before the comma keeps its normal verb-second order — only the clause after *weil/dass/wenn* changes.',
          it: 'Tre piccole parole aprono una **frase subordinata**: **weil** (perché), **dass** (che), **wenn** (se/quando). E la subordinata gioca con una regola diversa: il verbo coniugato viene **spedito proprio in fondo**. *Es ist schön* da sola, ma *Ich lerne Deutsch, weil es schön **ist***. La principale prima della virgola mantiene il normale ordine con il verbo al secondo posto — cambia solo la frase dopo *weil/dass/wenn*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Main clause vs subordinate clause', it: 'Frase principale e frase subordinata' },
        header: [
          { en: 'on its own (V2)', it: 'da sola (verbo 2ª posizione)' },
          { en: 'after weil/dass/wenn (verb last)', it: 'dopo weil/dass/wenn (verbo in fondo)' },
        ],
        rows: [
          ['Es ist schön.', 'Ich lerne Deutsch, weil es schön ist.'],
          ['Er lernt Deutsch.', 'Ich weiß, dass er Deutsch lernt.'],
          ['Du hast Zeit.', 'Wir gehen einkaufen, wenn du Zeit hast.'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
          [2, 1],
        ],
      },
      {
        kind: 'example',
        text: 'Ich lerne Deutsch, weil es schön ist.',
        gloss: { en: 'I am learning German because it is beautiful.', it: 'Imparo il tedesco perché è bello.' },
        note: { en: 'ist goes to the end', it: 'ist va in fondo' },
      },
      {
        kind: 'example',
        text: 'Ich weiß, dass er Deutsch lernt.',
        gloss: { en: 'I know that he is learning German.', it: 'So che lui impara il tedesco.' },
      },
      {
        kind: 'example',
        text: 'Wir gehen einkaufen, wenn du Zeit hast.',
        gloss: { en: 'We’ll go shopping if you have time.', it: 'Andiamo a fare la spesa se hai tempo.' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Italian keeps its normal order after *perché* and *che*: *perché **è** bello*, *che lui **impara** il tedesco*. German does NOT — after *weil/dass/wenn* the verb jumps to the end. This is THE German word-order habit to internalize: hear *weil*, park the verb.',
          it: 'L’italiano mantiene l’ordine normale dopo *perché* e *che*: *perché **è** bello*, *che lui **impara** il tedesco*. Il tedesco NO — dopo *weil/dass/wenn* il verbo salta in fondo. È L’abitudine tedesca sull’ordine delle parole da interiorizzare: senti *weil*, parcheggia il verbo.',
        },
      },
    ],
    skillCells: [{ cellId: 'verbfinal', label: { en: 'verb-final order', it: 'verbo in fondo' } }],
    introLexemeIds: ['de/verb/lernen', 'de/verb/haben', 'de/noun/zeit'],
    drillItems: [
      {
        gen: 'word-order',
        items: [
          {
            answer: 'weil es schön ist',
            gloss: { en: 'because it is nice', it: 'perché è bello' },
            cellId: 'verbfinal',
          },
          {
            answer: 'dass er Deutsch lernt',
            gloss: { en: 'that he learns German', it: 'che lui impara il tedesco' },
            cellId: 'verbfinal',
          },
          {
            answer: 'weil ich müde bin',
            gloss: { en: 'because I am tired', it: 'perché sono stanco' },
            cellId: 'verbfinal',
          },
          {
            answer: 'wenn du Zeit hast',
            gloss: { en: 'if you have time', it: 'se hai tempo' },
            cellId: 'verbfinal',
          },
        ],
      },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: [],
            gloss: {
              en: 'Which sentence is correct? — “I’m staying at home because I’m tired.”',
              it: 'Quale frase è corretta? — “Resto a casa perché sono stanco.”',
            },
            answer: 'Ich bleibe zu Hause, weil ich müde bin.',
            accepted: [],
            options: [
              { text: 'Ich bleibe zu Hause, weil ich müde bin.' },
              { text: 'Ich bleibe zu Hause, weil ich bin müde.', strategy: 'v2Violation' },
              { text: 'Ich bleibe zu Hause, weil bin ich müde.', strategy: 'v2Violation' },
            ],
            skillIds: ['de-subclause-weil-dass:verbfinal'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: [],
            gloss: {
              en: 'Which sentence is correct? — “I know that he is learning German.”',
              it: 'Quale frase è corretta? — “So che lui impara il tedesco.”',
            },
            answer: 'Ich weiß, dass er Deutsch lernt.',
            accepted: [],
            options: [
              { text: 'Ich weiß, dass er Deutsch lernt.' },
              { text: 'Ich weiß, dass er lernt Deutsch.', strategy: 'v2Violation' },
              { text: 'Ich weiß, dass lernt er Deutsch.', strategy: 'v2Violation' },
            ],
            skillIds: ['de-subclause-weil-dass:verbfinal'],
          },
        ],
      },
    ],
    errorHints: {
      v2Violation: {
        en: 'After weil/dass/wenn the conjugated verb goes to the END of the clause.',
        it: 'Dopo weil/dass/wenn il verbo coniugato va in FONDO alla frase.',
      },
    },
  },

  {
    id: 'de-weil-vs-denn',
    lang: 'de',
    title: { en: 'weil vs denn', it: 'weil o denn' },
    ruleSummary: {
      en: 'Both mean “because”: denn keeps normal verb-second order, weil sends the verb to the end.',
      it: 'Significano entrambi “perché”: denn mantiene l’ordine normale con il verbo al secondo posto, weil manda il verbo in fondo.',
    },
    cefr: 'A2',
    dependencies: ['de-subclause-weil-dass'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'German has two everyday words for “because” — and they demand **different word orders**. **denn** is a coordinator at “position zero”: the clause after it stays perfectly normal, subject + verb. **weil** is a subordinator: it kicks the verb to the **end**. Same meaning, two grammars: *Ich bleibe, **denn** ich **bin** müde.* / *Ich bleibe, **weil** ich müde **bin**.*',
          it: 'Il tedesco ha due parole quotidiane per “perché” — e pretendono **ordini diversi**. **denn** è un coordinatore alla “posizione zero”: la frase dopo di lui resta perfettamente normale, soggetto + verbo. **weil** è un subordinatore: spedisce il verbo in **fondo**. Stesso significato, due grammatiche: *Ich bleibe, **denn** ich **bin** müde.* / *Ich bleibe, **weil** ich müde **bin**.*',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Same meaning, different order', it: 'Stesso significato, ordine diverso' },
        header: [
          '',
          { en: 'example', it: 'esempio' },
          { en: 'word order', it: 'ordine delle parole' },
        ],
        rows: [
          ['denn', 'Ich bleibe, denn ich bin müde.', { en: 'verb second — nothing moves', it: 'verbo al 2º posto — non si sposta nulla' }],
          ['weil', 'Ich bleibe, weil ich müde bin.', { en: 'verb at the end', it: 'verbo in fondo' }],
        ],
      },
      {
        kind: 'example',
        text: 'Ich bleibe, denn ich bin müde.',
        gloss: { en: 'I’m staying, because I’m tired.', it: 'Resto, perché sono stanco.' },
        note: { en: 'denn: normal order', it: 'denn: ordine normale' },
      },
      {
        kind: 'example',
        text: 'Ich bleibe, weil ich müde bin.',
        gloss: { en: 'I’m staying because I’m tired.', it: 'Resto perché sono stanco.' },
        note: { en: 'weil: verb at the end', it: 'weil: verbo in fondo' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Both translate your *perché*. Choose **denn** and keep talking as usual; choose **weil** and remember to park the verb at the end. Meaning-wise you can’t go wrong — only the word order can betray you.',
          it: 'Entrambi traducono il tuo *perché*. Scegli **denn** e continua a parlare come al solito; scegli **weil** e ricordati di parcheggiare il verbo in fondo. Sul significato non puoi sbagliare — solo l’ordine delle parole può tradirti.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'weil vs denn order', it: 'ordine con weil e denn' } }],
    introLexemeIds: ['de/verb/sein', 'de/verb/lernen', 'de/noun/bett'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'bleibe', 'zu', 'Hause,', 'denn', '___'],
            gapIndex: 5,
            gloss: { en: 'I’m staying at home because I’m tired.', it: 'Resto a casa perché sono stanco.' },
            answer: 'ich bin müde',
            accepted: [],
            options: [
              { text: 'ich bin müde' },
              { text: 'ich müde bin', strategy: 'weilDennOrderSwap' },
              { text: 'bin ich müde', strategy: 'weilDennOrderSwap' },
            ],
            skillIds: ['de-weil-vs-denn:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'bleibe', 'zu', 'Hause,', 'weil', '___'],
            gapIndex: 5,
            gloss: { en: 'I’m staying at home because I’m tired.', it: 'Resto a casa perché sono stanco.' },
            answer: 'ich müde bin',
            accepted: [],
            options: [
              { text: 'ich müde bin' },
              { text: 'ich bin müde', strategy: 'weilDennOrderSwap' },
              { text: 'bin ich müde', strategy: 'weilDennOrderSwap' },
            ],
            skillIds: ['de-weil-vs-denn:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', 'lernt', 'Deutsch,', 'denn', '___'],
            gapIndex: 4,
            gloss: { en: 'He is learning German because it is beautiful.', it: 'Impara il tedesco perché è bello.' },
            answer: 'es ist schön',
            accepted: [],
            options: [
              { text: 'es ist schön' },
              { text: 'es schön ist', strategy: 'weilDennOrderSwap' },
              { text: 'ist es schön', strategy: 'weilDennOrderSwap' },
            ],
            skillIds: ['de-weil-vs-denn:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', 'lernt', 'Deutsch,', 'weil', '___'],
            gapIndex: 4,
            gloss: { en: 'He is learning German because it is beautiful.', it: 'Impara il tedesco perché è bello.' },
            answer: 'es schön ist',
            accepted: [],
            options: [
              { text: 'es schön ist' },
              { text: 'es ist schön', strategy: 'weilDennOrderSwap' },
              { text: 'ist es schön', strategy: 'weilDennOrderSwap' },
            ],
            skillIds: ['de-weil-vs-denn:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Sie', 'bleibt', 'im', 'Bett,', 'denn', '___'],
            gapIndex: 5,
            gloss: { en: 'She is staying in bed because she is sick.', it: 'Resta a letto perché è malata.' },
            answer: 'sie ist krank',
            accepted: [],
            options: [
              { text: 'sie ist krank' },
              { text: 'sie krank ist', strategy: 'weilDennOrderSwap' },
              { text: 'ist sie krank', strategy: 'v2Violation' },
            ],
            skillIds: ['de-weil-vs-denn:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Sie', 'bleibt', 'im', 'Bett,', 'weil', '___'],
            gapIndex: 5,
            gloss: { en: 'She is staying in bed because she is sick.', it: 'Resta a letto perché è malata.' },
            answer: 'sie krank ist',
            accepted: [],
            options: [
              { text: 'sie krank ist' },
              { text: 'sie ist krank', strategy: 'weilDennOrderSwap' },
              { text: 'ist sie krank', strategy: 'v2Violation' },
            ],
            skillIds: ['de-weil-vs-denn:core'],
          },
        ],
      },
    ],
    errorHints: {
      weilDennOrderSwap: {
        en: 'denn keeps normal order (denn ich bin müde); weil sends the verb to the end (weil ich müde bin).',
        it: 'denn mantiene l’ordine normale (denn ich bin müde); weil manda il verbo in fondo (weil ich müde bin).',
      },
    },
  },

  {
    id: 'de-comparative',
    lang: 'de',
    title: { en: 'Comparative & superlative', it: 'Comparativo e superlativo' },
    ruleSummary: {
      en: 'Compare with -er + als (schneller als), top with am -sten; irregulars: gut → besser, gern → lieber, viel → mehr.',
      it: 'Confronta con -er + als (schneller als), il massimo con am -sten; irregolari: gut → besser, gern → lieber, viel → mehr.',
    },
    cefr: 'A2',
    dependencies: ['de-vowel-change'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'To compare, German glues **-er** onto the adjective and adds **als** (than): *schnell → **schneller als***. This works for EVERY adjective, short or long — there is no “more + adjective” option. The superlative uses **am + -sten**: *am schnellsten* (the fastest). Three heavyweights are irregular: **gut → besser → am besten**, **gern → lieber → am liebsten** (for preferences), **viel → mehr → am meisten**.',
          it: 'Per confrontare, il tedesco incolla **-er** all’aggettivo e aggiunge **als** (di/che): *schnell → **schneller als***. Funziona con OGNI aggettivo, corto o lungo — non esiste l’opzione “more + aggettivo”. Il superlativo usa **am + -sten**: *am schnellsten* (il più veloce). Tre pesi massimi sono irregolari: **gut → besser → am besten**, **gern → lieber → am liebsten** (per le preferenze), **viel → mehr → am meisten**.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The regular pattern', it: 'Lo schema regolare' },
        header: [
          { en: 'base', it: 'base' },
          { en: 'comparative', it: 'comparativo' },
          { en: 'superlative', it: 'superlativo' },
        ],
        rows: [
          ['schnell', 'schneller', 'am schnellsten'],
          ['klein', 'kleiner', 'am kleinsten'],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'The three irregulars to memorize', it: 'I tre irregolari da memorizzare' },
        header: [
          { en: 'base', it: 'base' },
          { en: 'comparative', it: 'comparativo' },
          { en: 'superlative', it: 'superlativo' },
        ],
        rows: [
          [{ en: 'gut (good)', it: 'gut (buono)' }, 'besser', 'am besten'],
          [{ en: 'gern (gladly)', it: 'gern (volentieri)' }, 'lieber', 'am liebsten'],
          [{ en: 'viel (much)', it: 'viel (molto)' }, 'mehr', 'am meisten'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
          [2, 1],
        ],
      },
      {
        kind: 'example',
        text: 'Der Zug ist schneller als das Auto.',
        gloss: { en: 'The train is faster than the car.', it: 'Il treno è più veloce della macchina.' },
      },
      {
        kind: 'example',
        text: 'Ich trinke lieber Tee als Kaffee.',
        gloss: { en: 'I prefer tea to coffee.', it: 'Preferisco il tè al caffè.' },
        note: { en: 'lieber = preference in one word', it: 'lieber = la preferenza in una parola' },
      },
      {
        kind: 'example',
        text: 'Pizza schmeckt am besten.',
        gloss: { en: 'Pizza tastes best.', it: 'La pizza è la più buona.' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Never say *mehr schnell*! Italian builds *più veloce* with two words — German always squeezes it into one ending: **schneller**. Even long adjectives: *interessanter*, not “mehr interessant”.',
          it: 'Non dire mai *mehr schnell*! L’italiano costruisce *più veloce* con due parole — il tedesco lo comprime sempre in una desinenza: **schneller**. Anche con gli aggettivi lunghi: *interessanter*, non “mehr interessant”.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'comparison forms', it: 'forme di comparazione' } }],
    introLexemeIds: ['de/noun/zug', 'de/noun/auto', 'de/noun/tee', 'de/noun/kaffee', 'de/verb/trinken'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Der', 'Zug', 'ist', '___', 'als', 'das', 'Auto.'],
            gapIndex: 3,
            gloss: { en: 'The train is faster than the car.', it: 'Il treno è più veloce della macchina.' },
            answer: 'schneller',
            accepted: [],
            options: [
              { text: 'schneller' },
              { text: 'mehr schnell', strategy: 'vocabConfusable' },
              { text: 'schnell', strategy: 'vocabConfusable' },
              { text: 'am schnellsten', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-comparative:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'trinke', '___', 'Tee', 'als', 'Kaffee.'],
            gapIndex: 2,
            gloss: { en: 'I prefer tea to coffee.', it: 'Preferisco il tè al caffè.' },
            answer: 'lieber',
            accepted: [],
            options: [
              { text: 'lieber' },
              { text: 'gern', strategy: 'vocabConfusable' },
              { text: 'am liebsten', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-comparative:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Pizza', 'schmeckt', '___'],
            gapIndex: 2,
            gloss: { en: 'Pizza tastes best.', it: 'La pizza è la più buona.' },
            answer: 'am besten',
            accepted: [],
            options: [
              { text: 'am besten' },
              { text: 'besser', strategy: 'vocabConfusable' },
              { text: 'am gutesten', strategy: 'vocabConfusable' },
              { text: 'gut', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-comparative:core'],
          },
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['Das', 'Buch', 'ist', '___', 'als', 'der', 'Film.'],
            gapIndex: 3,
            gloss: { en: 'The book is better than the film.', it: 'Il libro è meglio del film.' },
            answer: 'besser',
            accepted: [],
            skillIds: ['de-comparative:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'trinke', '___', 'Wasser', 'als', 'Bier.'],
            gapIndex: 2,
            gloss: { en: 'I drink more water than beer.', it: 'Bevo più acqua che birra.' },
            answer: 'mehr',
            accepted: [],
            options: [
              { text: 'mehr' },
              { text: 'viel', strategy: 'vocabConfusable' },
              { text: 'am meisten', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-comparative:core'],
          },
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['Italien', 'ist', '___', 'als', 'Deutschland.'],
            gapIndex: 2,
            gloss: { en: 'Italy is smaller than Germany.', it: 'L’Italia è più piccola della Germania.' },
            answer: 'kleiner',
            accepted: [],
            skillIds: ['de-comparative:core'],
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'German always uses the -er ending — never “mehr + adjective”. Irregulars: gut → besser → am besten, gern → lieber → am liebsten, viel → mehr.',
        it: 'Il tedesco usa sempre la desinenza -er — mai “mehr + aggettivo”. Irregolari: gut → besser → am besten, gern → lieber → am liebsten, viel → mehr.',
      },
    },
  },

  {
    id: 'de-wo-questions-recap',
    lang: 'de',
    title: { en: 'wo, wohin, woher', it: 'wo, wohin, woher' },
    ruleSummary: {
      en: 'wohin = where to (direction → accusative), wo = where (location → dative), woher = where from (origin).',
      it: 'wohin = dove (moto a luogo → accusativo), wo = dove (stato in luogo → dativo), woher = da dove (provenienza).',
    },
    cefr: 'A2',
    dependencies: ['de-two-way-preps'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Italian *dove* covers three German questions. **Wohin?** asks about **direction** — the answer uses a two-way preposition with the **accusative**: *in **die** Schule*. **Wo?** asks about **location** — the answer takes the **dative**: *in **der** Schule*. **Woher?** asks about **origin** — the answer typically uses *aus* or *von*: *aus Italien*. The question word and the case of the answer always agree.',
          it: 'L’italiano *dove* copre tre domande tedesche. **Wohin?** chiede la **direzione** — la risposta usa una preposizione a doppio caso con l’**accusativo**: *in **die** Schule*. **Wo?** chiede il **luogo** — la risposta prende il **dativo**: *in **der** Schule*. **Woher?** chiede la **provenienza** — la risposta usa in genere *aus* o *von*: *aus Italien*. La parola interrogativa e il caso della risposta vanno sempre d’accordo.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Three questions, three answers', it: 'Tre domande, tre risposte' },
        header: [
          { en: 'question', it: 'domanda' },
          { en: 'asks about', it: 'chiede' },
          { en: 'answer', it: 'risposta' },
        ],
        rows: [
          ['Wohin gehst du?', { en: 'direction → accusative', it: 'moto a luogo → accusativo' }, 'In die Schule.'],
          ['Wo bist du?', { en: 'location → dative', it: 'stato in luogo → dativo' }, 'In der Schule.'],
          ['Woher kommst du?', { en: 'origin (aus/von)', it: 'provenienza (aus/von)' }, 'Aus Italien.'],
        ],
        highlight: [
          [0, 2],
          [1, 2],
        ],
      },
      {
        kind: 'example',
        text: 'Wohin gehst du? — In die Schule.',
        gloss: { en: 'Where are you going? — To school.', it: 'Dove vai? — A scuola.' },
        note: { en: 'movement → accusative die', it: 'moto → accusativo die' },
      },
      {
        kind: 'example',
        text: 'Wo bist du? — In der Schule.',
        gloss: { en: 'Where are you? — At school.', it: 'Dove sei? — A scuola.' },
        note: { en: 'position → dative der', it: 'stato → dativo der' },
      },
      {
        kind: 'example',
        text: 'Woher kommst du? — Aus Italien.',
        gloss: { en: 'Where are you from? — From Italy.', it: 'Da dove vieni? — Dall’Italia.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'One Italian *dove*, three German words — and the case is the giveaway. Going somewhere? **wohin + accusative** (*in die Stadt*). Staying somewhere? **wo + dative** (*in der Stadt*). Coming from somewhere? **woher + aus/von**.',
          it: 'Un solo *dove* italiano, tre parole tedesche — e il caso è l’indizio. Vai da qualche parte? **wohin + accusativo** (*in die Stadt*). Stai da qualche parte? **wo + dativo** (*in der Stadt*). Vieni da qualche parte? **woher + aus/von**.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'wo / wohin / woher', it: 'wo / wohin / woher' } }],
    introLexemeIds: ['de/noun/schule', 'de/noun/stadt', 'de/verb/gehen', 'de/verb/kommen'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'gehst', 'du?', '—', 'In', 'die', 'Schule.'],
            gapIndex: 0,
            gloss: { en: '___ are you going? — To school.', it: '___ vai? — A scuola.' },
            answer: 'Wohin',
            accepted: [],
            options: [
              { text: 'Wohin' },
              { text: 'Wo', strategy: 'vocabConfusable' },
              { text: 'Woher', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-wo-questions-recap:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'bist', 'du?', '—', 'In', 'der', 'Schule.'],
            gapIndex: 0,
            gloss: { en: '___ are you? — At school.', it: '___ sei? — A scuola.' },
            answer: 'Wo',
            accepted: [],
            options: [
              { text: 'Wo' },
              { text: 'Wohin', strategy: 'vocabConfusable' },
              { text: 'Woher', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-wo-questions-recap:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'kommst', 'du?', '—', 'Aus', 'Italien.'],
            gapIndex: 0,
            gloss: { en: '___ are you from? — From Italy.', it: '___ vieni? — Dall’Italia.' },
            answer: 'Woher',
            accepted: [],
            options: [
              { text: 'Woher' },
              { text: 'Wo', strategy: 'vocabConfusable' },
              { text: 'Wohin', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-wo-questions-recap:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'fährst', 'du?', '—', 'Nach', 'Berlin.'],
            gapIndex: 0,
            gloss: { en: '___ are you going (driving)? — To Berlin.', it: '___ vai? — A Berlino.' },
            answer: 'Wohin',
            accepted: [],
            options: [
              { text: 'Wohin' },
              { text: 'Wo', strategy: 'vocabConfusable' },
              { text: 'Woher', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-wo-questions-recap:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Wohin', 'gehst', 'du?', '—', 'In', '___', 'Stadt.'],
            gapIndex: 5,
            gloss: { en: 'Where are you going? — Into town.', it: 'Dove vai? — In città.' },
            answer: 'die',
            accepted: [],
            options: [
              { text: 'die' },
              { text: 'der', strategy: 'wrongCaseArticle' },
              { text: 'dem', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-wo-questions-recap:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Wo', 'bist', 'du?', '—', 'In', '___', 'Stadt.'],
            gapIndex: 5,
            gloss: { en: 'Where are you? — In town.', it: 'Dove sei? — In città.' },
            answer: 'der',
            accepted: [],
            options: [
              { text: 'der' },
              { text: 'die', strategy: 'wrongCaseArticle' },
              { text: 'dem', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-wo-questions-recap:core'],
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'wo = where (location), wohin = where to (direction), woher = where from (origin) — check the answer given.',
        it: 'wo = dove (stato in luogo), wohin = dove (moto a luogo), woher = da dove (provenienza) — controlla la risposta data.',
      },
      wrongCaseArticle: {
        en: 'Wohin → movement → accusative (in die Stadt); wo → position → dative (in der Stadt).',
        it: 'Wohin → moto → accusativo (in die Stadt); wo → stato → dativo (in der Stadt).',
      },
    },
  },
]
