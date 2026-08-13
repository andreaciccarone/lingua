import type { Topic } from '../../types'

// Unit DE-5 · Vergangenheit
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U5_TOPICS: Topic[] = [
  {
    id: 'de-perfect-haben',
    lang: 'de',
    title: { en: 'The Perfekt with haben', it: 'Il Perfekt con haben' },
    ruleSummary: {
      en: 'Past tense of speech: haben in position 2 + participle at the END — Ich habe Pizza gegessen.',
      it: 'Il passato della lingua parlata: haben in seconda posizione + participio in FONDO — Ich habe Pizza gegessen.',
    },
    cefr: 'A2',
    dependencies: ['de-modal-verbs'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'To talk about the past, spoken German uses the **Perfekt**: a conjugated form of **haben** in position 2 plus a **past participle** parked at the **end** of the sentence: *Ich **habe** Pizza **gegessen***. The participle has two main shapes: weak verbs take **ge…t** (*machen → gemacht*, *kaufen → gekauft*), strong verbs take **ge…en**, often with a vowel change (*essen → gegessen*, *trinken → getrunken*). Separable verbs squeeze **-ge-** between prefix and stem: *einkaufen → ein**ge**kauft*.',
          it: 'Per parlare del passato il tedesco parlato usa il **Perfekt**: una forma coniugata di **haben** in seconda posizione più un **participio passato** parcheggiato in **fondo** alla frase: *Ich **habe** Pizza **gegessen***. Il participio ha due forme principali: i verbi deboli fanno **ge…t** (*machen → gemacht*, *kaufen → gekauft*), i verbi forti fanno **ge…en**, spesso con cambio di vocale (*essen → gegessen*, *trinken → getrunken*). I verbi separabili infilano **-ge-** tra prefisso e radice: *einkaufen → ein**ge**kauft*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Participle patterns', it: 'Gli schemi del participio' },
        header: [
          { en: 'pattern', it: 'schema' },
          { en: 'infinitive', it: 'infinito' },
          { en: 'participle', it: 'participio' },
        ],
        rows: [
          [{ en: 'ge…t (weak)', it: 'ge…t (deboli)' }, 'machen', 'gemacht'],
          [{ en: 'ge…t (weak)', it: 'ge…t (deboli)' }, 'kaufen', 'gekauft'],
          [{ en: 'ge…en (strong)', it: 'ge…en (forti)' }, 'essen', 'gegessen'],
          [{ en: 'ge…en (strong)', it: 'ge…en (forti)' }, 'trinken', 'getrunken'],
          [{ en: '…ge…t (separable)', it: '…ge…t (separabili)' }, 'einkaufen', 'eingekauft'],
        ],
      },
      {
        kind: 'table',
        caption: {
          en: 'The Perfekt of essen: haben + gegessen',
          it: 'Il Perfekt di essen: haben + gegessen',
        },
        header: ['', 'haben', { en: '…at the end', it: '…in fondo' }],
        rows: [
          ['ich', 'habe', '… gegessen'],
          ['du', 'hast', '… gegessen'],
          ['er / sie / es', 'hat', '… gegessen'],
          ['wir', 'haben', '… gegessen'],
          ['ihr', 'habt', '… gegessen'],
          ['sie / Sie', 'haben', '… gegessen'],
        ],
      },
      {
        kind: 'example',
        text: 'Ich habe Pizza gegessen.',
        gloss: { en: 'I ate pizza.', it: 'Ho mangiato la pizza.' },
        note: { en: 'haben in position 2, participle at the end', it: 'haben in seconda posizione, participio in fondo' },
      },
      {
        kind: 'example',
        text: 'Wir haben Deutsch gelernt.',
        gloss: { en: 'We learned German.', it: 'Abbiamo imparato il tedesco.' },
      },
      {
        kind: 'example',
        text: 'Er hat Kaffee getrunken.',
        gloss: { en: 'He drank coffee.', it: 'Ha bevuto il caffè.' },
        note: { en: 'strong participle: trinken → getrunken', it: 'participio forte: trinken → getrunken' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'This is exactly your *passato prossimo*: *ho mangiato* = *ich habe gegessen* — same auxiliary logic. The one German twist: the participle does NOT stay next to *haben*, it goes to the **end** of the sentence — the same bracket you know from the modal verbs.',
          it: 'È esattamente il tuo *passato prossimo*: *ho mangiato* = *ich habe gegessen* — stessa logica dell’ausiliare. L’unico colpo di scena tedesco: il participio NON resta accanto a *haben*, va in **fondo** alla frase — la stessa parentesi che conosci dai verbi modali.',
        },
      },
    ],
    skillCells: [
      { cellId: 'aux', label: { en: 'auxiliary (habe/hast/hat…)', it: 'ausiliare (habe/hast/hat…)' } },
      { cellId: 'part', label: { en: 'participle forms', it: 'forme del participio' } },
      { cellId: 'frame', label: { en: 'sentence bracket', it: 'parentesi verbale' } },
    ],
    introLexemeIds: ['de/verb/machen', 'de/verb/kaufen', 'de/verb/essen', 'de/verb/trinken', 'de/verb/lernen'],
    drillItems: [
      {
        gen: 'perfect',
        verbIds: [
          'de/verb/machen',
          'de/verb/trinken',
          'de/verb/essen',
          'de/verb/kaufen',
          'de/verb/lesen',
          'de/verb/spielen',
        ],
        count: 4,
        mode: 'aux',
        persons: ['1sg', '3sg', '2sg', '1pl'],
        cellId: 'aux',
      },
      {
        gen: 'perfect',
        verbIds: ['de/verb/essen', 'de/verb/trinken', 'de/verb/schreiben', 'de/verb/sehen', 'de/verb/lernen'],
        count: 4,
        mode: 'participle',
        persons: ['1sg', '3sg'],
        cellId: 'part',
      },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ich habe Brot gegessen',
            gloss: { en: 'I ate bread', it: 'Ho mangiato il pane' },
            cellId: 'frame',
          },
          {
            answer: 'Wir haben Deutsch gelernt',
            gloss: { en: 'We learned German', it: 'Abbiamo imparato il tedesco' },
            cellId: 'frame',
          },
        ],
      },
    ],
    errorHints: {
      wrongAux: {
        en: 'This verb builds its perfect with haben.',
        it: 'Questo verbo forma il Perfekt con haben.',
      },
      wrongPerson: {
        en: 'Match haben to the subject: ich habe, du hast, er hat, wir haben.',
        it: 'Accorda haben con il soggetto: ich habe, du hast, er hat, wir haben.',
      },
      v2Violation: {
        en: 'haben stays in position 2; the participle goes to the very end of the sentence.',
        it: 'haben resta in seconda posizione; il participio va proprio in fondo alla frase.',
      },
    },
  },

  {
    id: 'de-perfect-sein',
    lang: 'de',
    title: { en: 'The Perfekt with sein', it: 'Il Perfekt con sein' },
    ruleSummary: {
      en: 'Motion and change-of-state verbs take sein: ich bin gegangen, er ist gekommen — like Italian essere.',
      it: 'I verbi di moto e di cambiamento di stato prendono sein: ich bin gegangen, er ist gekommen — come l’italiano essere.',
    },
    cefr: 'A2',
    dependencies: ['de-perfect-haben'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Verbs of **motion** (going somewhere) and of **change of state** (getting up, becoming) build their Perfekt with **sein** instead of *haben*: *ich **bin** gegangen*, *er **ist** gekommen*, *wir **sind** gefahren*, *sie **ist** aufgestanden*. Everything else stays the same: sein sits in position 2, the participle waits at the end.',
          it: 'I verbi di **moto** (andare da qualche parte) e di **cambiamento di stato** (alzarsi, diventare) formano il Perfekt con **sein** invece di *haben*: *ich **bin** gegangen*, *er **ist** gekommen*, *wir **sind** gefahren*, *sie **ist** aufgestanden*. Tutto il resto non cambia: sein sta in seconda posizione, il participio aspetta in fondo.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The Perfekt of gehen: sein + gegangen', it: 'Il Perfekt di gehen: sein + gegangen' },
        header: ['', 'sein', { en: '…at the end', it: '…in fondo' }],
        rows: [
          ['ich', 'bin', '… gegangen'],
          ['du', 'bist', '… gegangen'],
          ['er / sie / es', 'ist', '… gegangen'],
          ['wir', 'sind', '… gegangen'],
          ['ihr', 'seid', '… gegangen'],
          ['sie / Sie', 'sind', '… gegangen'],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'The sein verbs you know', it: 'I verbi con sein che conosci' },
        header: [
          { en: 'infinitive', it: 'infinito' },
          { en: 'Perfekt', it: 'Perfekt' },
          { en: 'meaning', it: 'significato' },
        ],
        rows: [
          ['gehen', 'ist gegangen', { en: 'went', it: 'è andato' }],
          ['kommen', 'ist gekommen', { en: 'came', it: 'è venuto' }],
          ['fahren', 'ist gefahren', { en: 'went (by vehicle)', it: 'è andato (con un mezzo)' }],
          ['aufstehen', 'ist aufgestanden', { en: 'got up', it: 'si è alzato' }],
          ['mitkommen', 'ist mitgekommen', { en: 'came along', it: 'è venuto insieme' }],
        ],
      },
      {
        kind: 'example',
        text: 'Ich bin nach Berlin gefahren.',
        gloss: { en: 'I went to Berlin.', it: 'Sono andato a Berlino.' },
      },
      {
        kind: 'example',
        text: 'Sie ist um acht aufgestanden.',
        gloss: { en: 'She got up at eight.', it: 'Si è alzata alle otto.' },
        note: { en: 'separable: auf + ge + standen', it: 'separabile: auf + ge + standen' },
      },
      {
        kind: 'example',
        text: 'Wir sind nach Hause gegangen.',
        gloss: { en: 'We went home.', it: 'Siamo andati a casa.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'This is the Italian *essere* rule wearing a German coat: *sono andato* = *ich **bin** gegangen*, *è venuta* = *sie **ist** gekommen*. The auxiliary choice transfers almost 1:1 — if you’d say *essere* in Italian, say **sein** in German.',
          it: 'È la regola italiana di *essere* con un cappotto tedesco: *sono andato* = *ich **bin** gegangen*, *è venuta* = *sie **ist** gekommen*. La scelta dell’ausiliare si trasferisce quasi 1:1 — dove in italiano diresti *essere*, in tedesco di’ **sein**.',
        },
      },
    ],
    skillCells: [
      { cellId: 'aux', label: { en: 'auxiliary (bin/ist/sind…)', it: 'ausiliare (bin/ist/sind…)' } },
      { cellId: 'part', label: { en: 'participle forms', it: 'forme del participio' } },
    ],
    introLexemeIds: [
      'de/verb/gehen',
      'de/verb/kommen',
      'de/verb/fahren',
      'de/verb/aufstehen',
      'de/verb/mitkommen',
    ],
    drillItems: [
      {
        gen: 'perfect',
        verbIds: [
          'de/verb/gehen',
          'de/verb/kommen',
          'de/verb/fahren',
          'de/verb/aufstehen',
          'de/verb/mitkommen',
        ],
        count: 4,
        mode: 'aux',
        persons: ['1sg', '3sg', '1pl', '3pl'],
        cellId: 'aux',
      },
      {
        gen: 'perfect',
        verbIds: ['de/verb/gehen', 'de/verb/kommen', 'de/verb/fahren'],
        count: 3,
        mode: 'participle',
        persons: ['3sg', '1sg'],
        cellId: 'part',
      },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', '___', 'nach', 'Berlin', 'gefahren.'],
            gapIndex: 1,
            gloss: { en: 'I went to Berlin.', it: 'Sono andato a Berlino.' },
            answer: 'bin',
            accepted: [],
            options: [
              { text: 'bin' },
              { text: 'habe', strategy: 'wrongAux' },
              { text: 'ist', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-perfect-sein:aux'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', '___', 'Pizza', 'gegessen.'],
            gapIndex: 1,
            gloss: { en: 'I ate pizza.', it: 'Ho mangiato la pizza.' },
            answer: 'habe',
            accepted: [],
            options: [
              { text: 'habe' },
              { text: 'bin', strategy: 'wrongAux' },
              { text: 'hat', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-perfect-sein:aux'],
          },
        ],
      },
    ],
    errorHints: {
      wrongAux: {
        en: 'Motion and change of state take sein — like Italian essere.',
        it: 'Moto e cambiamento di stato prendono sein — come l’italiano essere.',
      },
      wrongPerson: {
        en: 'Match sein to the subject: ich bin, du bist, er ist, wir sind.',
        it: 'Accorda sein con il soggetto: ich bin, du bist, er ist, wir sind.',
      },
    },
  },

  {
    id: 'de-praeteritum-sein-haben',
    lang: 'de',
    title: { en: 'war & hatte', it: 'war e hatte' },
    ruleSummary: {
      en: 'For sein and haben, spoken German uses the simple past: ich war (I was), ich hatte (I had) — not the Perfekt.',
      it: 'Per sein e haben il tedesco parlato usa il passato semplice: ich war (ero), ich hatte (avevo) — non il Perfekt.',
    },
    cefr: 'A2',
    dependencies: ['de-perfect-haben'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'For nearly every verb, spoken German reaches for the Perfekt — but **sein** and **haben** are the big exception. In speech they use their **Präteritum** (simple past) forms instead: *ich **war*** (I was) and *ich **hatte*** (I had). The endings run in pairs: singular *war/warst/war*, plural *waren/wart/waren* — and *hatte* follows the same melody.',
          it: 'Per quasi tutti i verbi il tedesco parlato ricorre al Perfekt — ma **sein** e **haben** sono la grande eccezione. Nel parlato usano le forme del **Präteritum** (passato semplice): *ich **war*** (ero) e *ich **hatte*** (avevo). Le desinenze vanno in coppia: singolare *war/warst/war*, plurale *waren/wart/waren* — e *hatte* segue la stessa melodia.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'war and hatte — the full paradigm', it: 'war e hatte — il paradigma completo' },
        header: ['', 'sein → war', 'haben → hatte'],
        rows: [
          ['ich', 'war', 'hatte'],
          ['du', 'warst', 'hattest'],
          ['er / sie / es', 'war', 'hatte'],
          ['wir', 'waren', 'hatten'],
          ['ihr', 'wart', 'hattet'],
          ['sie / Sie', 'waren', 'hatten'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
        ],
      },
      {
        kind: 'example',
        text: 'Gestern war ich krank.',
        gloss: { en: 'Yesterday I was sick.', it: 'Ieri ero malato.' },
      },
      {
        kind: 'example',
        text: 'Wir hatten keine Zeit.',
        gloss: { en: 'We had no time.', it: 'Non avevamo tempo.' },
      },
      {
        kind: 'example',
        text: 'Warst du zu Hause?',
        gloss: { en: 'Were you at home?', it: 'Eri a casa?' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '*Ich bin gewesen* and *ich habe gehabt* exist, but nobody says them — **war** and **hatte** are shorter and universal. For you they cover both *ero* and *sono stato*: one German form for both Italian pasts.',
          it: '*Ich bin gewesen* e *ich habe gehabt* esistono, ma non li dice nessuno — **war** e **hatte** sono più corti e universali. Per te coprono sia *ero* sia *sono stato*: una sola forma tedesca per entrambi i passati italiani.',
        },
      },
    ],
    skillCells: [
      { cellId: '1sg', label: { en: 'ich form', it: 'forma di ich' } },
      { cellId: '2sg', label: { en: 'du form', it: 'forma di du' } },
      { cellId: '3sg', label: { en: 'er/sie/es form', it: 'forma di er/sie/es' } },
      { cellId: '1pl', label: { en: 'wir form', it: 'forma di wir' } },
      { cellId: '2pl', label: { en: 'ihr form', it: 'forma di ihr' } },
      { cellId: '3pl', label: { en: 'sie/Sie form', it: 'forma di sie/Sie' } },
    ],
    introLexemeIds: ['de/verb/sein', 'de/verb/haben', 'de/noun/zeit'],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/sein', tense: 'praet' },
      { gen: 'conj', verbId: 'de/verb/sein', tense: 'praet', persons: ['1sg', '3sg', '1pl'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/haben', tense: 'praet', persons: ['1sg', '3sg'], type: 'cloze' },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Gestern', '___', 'ich', 'krank.'],
            gapIndex: 1,
            gloss: { en: 'Yesterday I was sick.', it: 'Ieri ero malato.' },
            answer: 'war',
            accepted: [],
            options: [
              { text: 'war' },
              { text: 'warst', strategy: 'wrongPerson' },
              { text: 'waren', strategy: 'wrongPerson' },
              { text: 'sein', strategy: 'infinitive' },
            ],
            skillIds: ['de-praeteritum-sein-haben:1sg'],
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Same pairs as the present: ich war / er war, du warst, wir waren — and hatte follows suit.',
        it: 'Stesse coppie del presente: ich war / er war, du warst, wir waren — e hatte segue lo stesso schema.',
      },
      infinitive: {
        en: 'That’s the dictionary form — here you need the simple past: war or hatte.',
        it: 'Questa è la forma del dizionario — qui serve il passato semplice: war o hatte.',
      },
    },
  },
]
