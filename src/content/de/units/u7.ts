import type { Topic } from '../../types'

// Unit DE-7 · Adjektive, Modalverben im Präteritum, Futur
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U7_TOPICS: Topic[] = [
  {
    id: 'de-adj-endings',
    lang: 'de',
    title: { en: 'Adjective endings', it: 'Le desinenze degli aggettivi' },
    ruleSummary: {
      en: 'An adjective before a noun takes an ending: weak after der-words (der gute Mann), mixed after ein-words (ein guter Mann).',
      it: 'Un aggettivo prima del nome prende una desinenza: debole dopo i der-words (der gute Mann), mista dopo gli ein-words (ein guter Mann).',
    },
    cefr: 'A2',
    dependencies: ['de-nom-acc'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'After *sein* an adjective stays bare: *Der Mann ist gut.* But **before a noun** it must take an **ending**, and the ending depends on three things: the **article type**, the **gender** and the **case**. After **der-words** (der/die/das) the article already tells you everything, so the adjective relaxes into the **weak** endings — just **-e** or **-en**: *der gut**e** Mann, den gut**en** Mann*. After **ein-words** (ein/eine/kein/mein) there’s a catch: *ein* looks the same for masculine and neuter, so the **adjective does the article’s job** and shows the gender — **mixed** endings: *ein gut**er** Mann, ein gut**es** Kind*.',
          it: 'Dopo *sein* l’aggettivo resta nudo: *Der Mann ist gut.* Ma **prima di un nome** deve prendere una **desinenza**, e la desinenza dipende da tre cose: il **tipo di articolo**, il **genere** e il **caso**. Dopo i **der-words** (der/die/das) l’articolo dice già tutto, così l’aggettivo si rilassa nelle desinenze **deboli** — solo **-e** o **-en**: *der gut**e** Mann, den gut**en** Mann*. Dopo gli **ein-words** (ein/eine/kein/mein) c’è un trucco: *ein* è identico per maschile e neutro, quindi è l’**aggettivo a fare il lavoro dell’articolo** e a mostrare il genere — desinenze **miste**: *ein gut**er** Mann, ein gut**es** Kind*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Weak endings — after der-words', it: 'Desinenze deboli — dopo i der-words' },
        header: [
          '',
          { en: 'masculine', it: 'maschile' },
          { en: 'feminine', it: 'femminile' },
          { en: 'neuter', it: 'neutro' },
          { en: 'plural', it: 'plurale' },
        ],
        rows: [
          ['Nominativ', 'der gute Mann', 'die gute Frau', 'das gute Kind', 'die guten Kinder'],
          ['Akkusativ', 'den guten Mann', 'die gute Frau', 'das gute Kind', 'die guten Kinder'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'Mixed endings — after ein-words', it: 'Desinenze miste — dopo gli ein-words' },
        header: [
          '',
          { en: 'masculine', it: 'maschile' },
          { en: 'feminine', it: 'femminile' },
          { en: 'neuter', it: 'neutro' },
        ],
        rows: [
          ['Nominativ', 'ein guter Mann', 'eine gute Frau', 'ein gutes Kind'],
          ['Akkusativ', 'einen guten Mann', 'eine gute Frau', 'ein gutes Kind'],
        ],
        highlight: [
          [0, 1],
          [0, 3],
          [1, 3],
        ],
      },
      {
        kind: 'example',
        text: 'Das ist ein guter Mann.',
        gloss: { en: 'That is a good man.', it: 'Quello è un uomo buono.' },
        note: { en: 'ein doesn’t show masculine — guter does', it: 'ein non mostra il maschile — lo fa guter' },
      },
      {
        kind: 'example',
        text: 'Ich sehe den guten Mann.',
        gloss: { en: 'I see the good man.', it: 'Vedo l’uomo buono.' },
        note: { en: 'den already marks the accusative → weak -en', it: 'den segna già l’accusativo → debole -en' },
      },
      {
        kind: 'example',
        text: 'Das ist ein kleines Kind.',
        gloss: { en: 'That is a small child.', it: 'Quello è un bambino piccolo.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Your adjectives agree too — *buono/buona*, *piccolo/piccola* — so the reflex is already there. German just adds the **case** dimension on top of gender. And remember the *ein* trick: after *ein* the adjective does the article’s job, so it must show the gender the article hides (*ein gut**er** Mann*, *ein gut**es** Kind*).',
          it: 'Anche i tuoi aggettivi concordano — *buono/buona*, *piccolo/piccola* — quindi il riflesso ce l’hai già. Il tedesco aggiunge solo la dimensione del **caso** oltre al genere. E ricorda il trucco di *ein*: dopo *ein* l’aggettivo fa il lavoro dell’articolo, quindi deve mostrare il genere che l’articolo nasconde (*ein gut**er** Mann*, *ein gut**es** Kind*).',
        },
      },
    ],
    skillCells: [
      { cellId: 'mixed.nom', label: { en: 'after ein — nominative', it: 'dopo ein — nominativo' } },
      { cellId: 'weak.nom', label: { en: 'after der/die/das — nominative', it: 'dopo der/die/das — nominativo' } },
      { cellId: 'weak.acc', label: { en: 'after der/die/das — accusative', it: 'dopo der/die/das — accusativo' } },
    ],
    introLexemeIds: ['de/adj/gut', 'de/adj/klein', 'de/adj/neu', 'de/adj/schön', 'de/adj/alt'],
    drillItems: [
      {
        gen: 'adj-ending',
        pairs: [
          ['de/adj/gut', 'de/noun/mann'],
          ['de/adj/klein', 'de/noun/kind'],
          ['de/adj/neu', 'de/noun/tür'],
          ['de/adj/schön', 'de/noun/frau'],
          ['de/adj/alt', 'de/noun/buch'],
        ],
        count: 4,
        case: 'nom',
        det: 'indef',
        cellId: 'mixed.nom',
      },
      {
        gen: 'adj-ending',
        pairs: [
          ['de/adj/gut', 'de/noun/mann'],
          ['de/adj/klein', 'de/noun/kind'],
          ['de/adj/neu', 'de/noun/tür'],
          ['de/adj/schön', 'de/noun/frau'],
          ['de/adj/alt', 'de/noun/buch'],
        ],
        count: 3,
        case: 'nom',
        det: 'def',
        cellId: 'weak.nom',
      },
      {
        gen: 'adj-ending',
        pairs: [
          ['de/adj/gut', 'de/noun/mann'],
          ['de/adj/klein', 'de/noun/kind'],
          ['de/adj/neu', 'de/noun/tür'],
          ['de/adj/schön', 'de/noun/frau'],
          ['de/adj/alt', 'de/noun/buch'],
        ],
        count: 3,
        case: 'acc',
        det: 'def',
        cellId: 'weak.acc',
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'The ending must match the article type, gender and case.',
        it: 'La desinenza deve concordare con tipo di articolo, genere e caso.',
      },
      wrongGenderArticle: {
        en: 'The ending must match the article type, gender and case.',
        it: 'La desinenza deve concordare con tipo di articolo, genere e caso.',
      },
    },
  },

  {
    id: 'de-modal-praeteritum',
    lang: 'de',
    title: { en: 'Modal verbs in the past', it: 'I modali al passato' },
    ruleSummary: {
      en: 'Spoken German uses the Präteritum for modals: konnte, musste, wollte, durfte, sollte — no umlaut, same endings as hatte.',
      it: 'Il tedesco parlato usa il Präteritum per i modali: konnte, musste, wollte, durfte, sollte — niente Umlaut, stesse desinenze di hatte.',
    },
    cefr: 'A2',
    dependencies: ['de-modal-verbs', 'de-praeteritum-sein-haben'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Like *war* and *hatte*, the modal verbs skip the Perfekt in everyday speech: their past is the **Präteritum** — **konnte, musste, wollte, durfte, sollte**. Two things to notice. First: the **umlaut disappears** — *k**ö**nnen → k**o**nnte*, *m**ü**ssen → m**u**sste*, *d**ü**rfen → d**u**rfte*. Second: the endings are exactly the ones you know from **hatte**: *ich konnte, du konntest, er konnte, wir konnten, ihr konntet, sie konnten* — 1st and 3rd singular identical, no ending.',
          it: 'Come *war* e *hatte*, i verbi modali saltano il Perfekt nel parlato quotidiano: il loro passato è il **Präteritum** — **konnte, musste, wollte, durfte, sollte**. Due cose da notare. Primo: l’**Umlaut sparisce** — *k**ö**nnen → k**o**nnte*, *m**ü**ssen → m**u**sste*, *d**ü**rfen → d**u**rfte*. Secondo: le desinenze sono esattamente quelle che conosci da **hatte**: *ich konnte, du konntest, er konnte, wir konnten, ihr konntet, sie konnten* — 1ª e 3ª singolare identiche, senza desinenza.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Modal Präteritum — the pattern', it: 'Präteritum dei modali — lo schema' },
        header: ['', 'können → konnte', 'müssen → musste', 'wollen → wollte'],
        rows: [
          ['ich', 'konnte', 'musste', 'wollte'],
          ['du', 'konntest', 'musstest', 'wolltest'],
          ['er / sie / es', 'konnte', 'musste', 'wollte'],
          ['wir', 'konnten', 'mussten', 'wollten'],
          ['ihr', 'konntet', 'musstet', 'wolltet'],
          ['sie / Sie', 'konnten', 'mussten', 'wollten'],
        ],
        highlight: [
          [0, 1],
          [2, 1],
        ],
      },
      {
        kind: 'example',
        text: 'Ich konnte nicht kommen.',
        gloss: { en: 'I couldn’t come.', it: 'Non potevo / non sono potuto venire.' },
        note: { en: 'one German form for both Italian pasts', it: 'una sola forma tedesca per entrambi i passati italiani' },
      },
      {
        kind: 'example',
        text: 'Wir mussten gestern arbeiten.',
        gloss: { en: 'We had to work yesterday.', it: 'Ieri abbiamo dovuto lavorare.' },
      },
      {
        kind: 'example',
        text: 'Er wollte Deutsch lernen.',
        gloss: { en: 'He wanted to learn German.', it: 'Voleva imparare il tedesco.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '*Ich konnte nicht kommen* covers both *non potevo venire* AND *non sono potuto venire* — German doesn’t split imperfetto and passato prossimo here. One form, both meanings. Just don’t keep the umlaut: *konnte*, never “könnte” (that’s a different form entirely).',
          it: '*Ich konnte nicht kommen* copre sia *non potevo venire* SIA *non sono potuto venire* — qui il tedesco non distingue imperfetto e passato prossimo. Una forma, entrambi i significati. Solo non tenere l’Umlaut: *konnte*, mai “könnte” (è tutta un’altra forma).',
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
    introLexemeIds: ['de/verb/können', 'de/verb/müssen', 'de/verb/wollen', 'de/verb/dürfen'],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/können', tense: 'praet' },
      { gen: 'conj', verbId: 'de/verb/müssen', tense: 'praet', persons: ['1sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/wollen', tense: 'praet', persons: ['3sg', '1pl'], type: 'cloze' },
      { gen: 'conj', verbId: 'de/verb/dürfen', tense: 'praet', persons: ['2sg'], type: 'mc' },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Gestern', '___', 'ich', 'nicht', 'kommen.'],
            gapIndex: 1,
            gloss: { en: 'Yesterday I couldn’t come.', it: 'Ieri non sono potuto venire.' },
            answer: 'konnte',
            accepted: [],
            options: [
              { text: 'konnte' },
              { text: 'kann', strategy: 'wrongTense' },
              { text: 'konntest', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-modal-praeteritum:1sg'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Als', 'Kind', '___', 'er', 'viel', 'spielen.'],
            gapIndex: 2,
            gloss: {
              en: 'As a child he was allowed to play a lot.',
              it: 'Da bambino poteva giocare molto (aveva il permesso).',
            },
            answer: 'durfte',
            accepted: [],
            options: [
              { text: 'durfte' },
              { text: 'darf', strategy: 'wrongTense' },
              { text: 'durftest', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-modal-praeteritum:3sg'],
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Same pairs as hatte: ich konnte / er konnte, du konntest, wir konnten.',
        it: 'Stesse coppie di hatte: ich konnte / er konnte, du konntest, wir konnten.',
      },
      wrongTense: {
        en: 'Past context — use the Präteritum form.',
        it: 'Contesto passato — usa il Präteritum.',
      },
      infinitive: {
        en: 'That’s the dictionary form — here you need the Präteritum: konnte, musste, wollte…',
        it: 'Questa è la forma del dizionario — qui serve il Präteritum: konnte, musste, wollte…',
      },
    },
  },

  {
    id: 'de-future',
    lang: 'de',
    title: { en: 'The future with werden', it: 'Il futuro con werden' },
    ruleSummary: {
      en: 'Future: werden in position 2 + infinitive at the END — Ich werde morgen arbeiten. werden is irregular: werde, wirst, wird.',
      it: 'Futuro: werden al secondo posto + infinito in FONDO — Ich werde morgen arbeiten. werden è irregolare: werde, wirst, wird.',
    },
    cefr: 'A2',
    dependencies: ['de-modal-verbs'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'German has no future ending like Italian *-erò*. Instead it builds the future exactly like a modal sentence: **werden** in **position 2**, and the infinitive parked at the **end**: *Ich **werde** morgen **arbeiten***. The only new thing to learn is *werden* itself, which is irregular in the singular: *ich **werde**, du **wirst**, er **wird*** — the plural is regular (*wir werden, ihr werdet, sie werden*).',
          it: 'Il tedesco non ha una desinenza per il futuro come l’italiano *-erò*. Costruisce invece il futuro esattamente come una frase con i modali: **werden** al **secondo posto**, e l’infinito parcheggiato in **fondo**: *Ich **werde** morgen **arbeiten***. L’unica novità da imparare è *werden* stesso, irregolare al singolare: *ich **werde**, du **wirst**, er **wird*** — il plurale è regolare (*wir werden, ihr werdet, sie werden*).',
        },
      },
      {
        kind: 'table',
        caption: { en: 'werden — the full paradigm', it: 'werden — il paradigma completo' },
        header: ['', 'werden'],
        rows: [
          ['ich', 'werde'],
          ['du', 'wirst'],
          ['er / sie / es', 'wird'],
          ['wir', 'werden'],
          ['ihr', 'werdet'],
          ['sie / Sie', 'werden'],
        ],
        highlight: [
          [1, 1],
          [2, 1],
        ],
      },
      {
        kind: 'example',
        text: 'Ich werde morgen arbeiten.',
        gloss: { en: 'I will work tomorrow.', it: 'Domani lavorerò.' },
        note: { en: 'werde in position 2, arbeiten at the end', it: 'werde al secondo posto, arbeiten in fondo' },
      },
      {
        kind: 'example',
        text: 'Sie wird Deutsch lernen.',
        gloss: { en: 'She will learn German.', it: 'Lei imparerà il tedesco.' },
      },
      {
        kind: 'example',
        text: 'Ich arbeite morgen.',
        gloss: { en: 'I’m working tomorrow.', it: 'Domani lavoro.' },
        note: { en: 'present + time word — often enough', it: 'presente + parola di tempo — spesso basta' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Just like Italian, German often skips the future when a time word makes things clear: *Ich arbeite morgen* = *Domani lavoro*. Use *werden* when you want emphasis or a prediction — and remember it behaves like a modal: conjugated verb in position 2, infinitive at the very end.',
          it: 'Proprio come l’italiano, il tedesco spesso salta il futuro quando una parola di tempo chiarisce tutto: *Ich arbeite morgen* = *Domani lavoro*. Usa *werden* per enfasi o previsioni — e ricorda che si comporta come un modale: verbo coniugato al secondo posto, infinito proprio in fondo.',
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
      { cellId: 'future', label: { en: 'werden + infinitive', it: 'werden + infinito' } },
    ],
    introLexemeIds: ['de/verb/werden', 'de/verb/arbeiten', 'de/verb/fahren', 'de/verb/lernen'],
    drillItems: [
      { gen: 'conj', verbId: 'de/verb/werden', tense: 'pres', persons: ['2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/werden', tense: 'pres', persons: ['1sg'], type: 'cloze' },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ich werde morgen arbeiten',
            gloss: { en: 'I will work tomorrow', it: 'Domani lavorerò' },
            cellId: 'future',
          },
          {
            answer: 'Wir werden nach Berlin fahren',
            gloss: { en: 'We will go to Berlin', it: 'Andremo a Berlino' },
            cellId: 'future',
          },
          {
            answer: 'Sie wird Deutsch lernen',
            gloss: { en: 'She will learn German', it: 'Lei imparerà il tedesco' },
            cellId: 'future',
          },
        ],
      },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', '___', 'morgen', 'kommen.'],
            gapIndex: 1,
            gloss: { en: 'He will come tomorrow.', it: 'Verrà domani.' },
            answer: 'wird',
            accepted: [],
            options: [
              { text: 'wird' },
              { text: 'wirst', strategy: 'wrongPerson' },
              { text: 'werde', strategy: 'wrongPerson' },
              { text: 'werden', strategy: 'infinitive' },
            ],
            skillIds: ['de-future:3sg'],
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'werden is irregular in the singular: ich werde, du wirst, er wird.',
        it: 'werden è irregolare al singolare: ich werde, du wirst, er wird.',
      },
      v2Violation: {
        en: 'werden takes position 2; the infinitive goes to the very END of the sentence.',
        it: 'werden sta al secondo posto; l’infinito va proprio in FONDO alla frase.',
      },
      infinitive: {
        en: 'That’s the infinitive — conjugate werden for the subject: werde, wirst, wird…',
        it: 'Questo è l’infinito — coniuga werden per il soggetto: werde, wirst, wird…',
      },
    },
  },
]
