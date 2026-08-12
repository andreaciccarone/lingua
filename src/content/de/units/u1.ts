import type { Topic } from '../../types'

// Unit DE-1 · Erste Schritte
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U1_TOPICS: Topic[] = [
  {
    id: 'de-noun-gender',
    lang: 'de',
    title: 'der, die, das',
    ruleSummary: {
      en: 'Every noun has a gender — der (m), die (f), das (n); learn noun + article as one unit.',
      it: 'Ogni sostantivo ha un genere — der (m), die (f), das (n); impara sostantivo e articolo come un tutt’uno.',
    },
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Every German noun has one of **three genders** — masculine, feminine or neuter — and the word for “the” shows it: *der Mann*, *die Frau*, *das Kind*. Gender is part of the word itself, so never learn a bare noun: learn **noun + article as one unit**. Nouns are always **capitalized** in German.',
          it: 'Ogni sostantivo tedesco ha uno dei **tre generi** — maschile, femminile o neutro — e l’articolo determinativo lo indica: *der Mann*, *die Frau*, *das Kind*. Il genere fa parte della parola stessa: non imparare mai un sostantivo da solo, impara **sostantivo e articolo come un tutt’uno**. In tedesco i sostantivi hanno sempre l’**iniziale maiuscola**.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The definite article (“the”)', it: 'L’articolo determinativo' },
        header: [
          '',
          { en: 'masculine', it: 'maschile' },
          { en: 'feminine', it: 'femminile' },
          { en: 'neuter', it: 'neutro' },
        ],
        rows: [
          [{ en: 'singular', it: 'singolare' }, 'der Mann', 'die Frau', 'das Kind'],
          [
            { en: 'typical cues', it: 'indizi tipici' },
            { en: 'male people, days', it: 'persone di sesso maschile, giorni' },
            { en: '-ung, -in, often -e', it: '-ung, -in, spesso -e' },
            '-chen, -lein',
          ],
        ],
      },
      { kind: 'example', text: 'der Mann', gloss: { en: 'the man', it: 'l’uomo' } },
      {
        kind: 'example',
        text: 'die Zeitung',
        gloss: { en: 'the newspaper', it: 'il giornale' },
        note: { en: '-ung words are always die', it: 'le parole in -ung sono sempre die' },
      },
      {
        kind: 'example',
        text: 'das Mädchen',
        gloss: { en: 'the girl', it: 'la ragazza' },
        note: { en: '-chen words are always das', it: 'le parole in -chen sono sempre das' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Gender is **grammatical**, not natural: *das Mädchen* (the girl) is neuter because of **-chen**, and *der Tisch* (the table) is masculine for no reason at all. Suffix cues help, but for most nouns the article simply has to be memorized **with the word**.',
          it: 'Il genere è **grammaticale**, non naturale: *das Mädchen* (la ragazza) è neutro per via di **-chen**, e *der Tisch* (il tavolo) è maschile senza alcun motivo. I suffissi aiutano, ma per la maggior parte dei sostantivi l’articolo va semplicemente memorizzato **insieme alla parola**.',
        },
      },
    ],
    skillCells: [
      { cellId: 'nom.m', label: { en: 'masculine (der)', it: 'maschile (der)' } },
      { cellId: 'nom.f', label: { en: 'feminine (die)', it: 'femminile (die)' } },
      { cellId: 'nom.n', label: { en: 'neuter (das)', it: 'neutro (das)' } },
    ],
    introLexemeIds: ['de/noun/mann', 'de/noun/frau', 'de/noun/kind', 'de/noun/tisch', 'de/noun/buch', 'de/noun/stadt'],
    drillItems: [
      {
        gen: 'case-article',
        nounIds: ['de/noun/mann', 'de/noun/tisch', 'de/noun/kaffee', 'de/noun/park'],
        count: 3,
        case: 'nom',
        det: 'def',
        number: 'sg',
        frames: [{ tokens: ['___', '{noun}'], gloss: { en: 'the {gloss}', it: '{gloss}' } }],
        cellId: 'nom.m',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/frau', 'de/noun/tür', 'de/noun/stadt', 'de/noun/milch'],
        count: 3,
        case: 'nom',
        det: 'def',
        number: 'sg',
        frames: [{ tokens: ['___', '{noun}'], gloss: { en: 'the {gloss}', it: '{gloss}' } }],
        cellId: 'nom.f',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/kind', 'de/noun/buch', 'de/noun/haus', 'de/noun/auto'],
        count: 3,
        case: 'nom',
        det: 'def',
        number: 'sg',
        frames: [{ tokens: ['___', '{noun}'], gloss: { en: 'the {gloss}', it: '{gloss}' } }],
        cellId: 'nom.n',
      },
    ],
    errorHints: {
      wrongGenderArticle: {
        en: 'Check the noun’s gender: der for masculine, die for feminine, das for neuter — it’s part of the word.',
        it: 'Controlla il genere del sostantivo: der per il maschile, die per il femminile, das per il neutro — fa parte della parola.',
      },
    },
  },

  {
    id: 'de-personal-pronouns',
    lang: 'de',
    title: { en: 'Personal pronouns', it: 'I pronomi personali' },
    ruleSummary: {
      en: 'ich, du, er/sie/es, wir, ihr, sie — plus capitalized Sie for polite “you”.',
      it: 'ich, du, er/sie/es, wir, ihr, sie — più Sie maiuscolo per il “Lei” di cortesia.',
    },
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'These little words say **who** does the action, and unlike Spanish, German almost never drops them. Note that *sie* does triple duty — **she**, **they**, and (capitalized) polite **you** — the verb form and the capital letter tell you which one you’re hearing.',
          it: 'Queste piccole parole dicono **chi** compie l’azione e, a differenza dell’italiano, il tedesco non le omette quasi mai. Nota che *sie* svolge un triplo ruolo — **lei**, **loro** e (con la maiuscola) il **Lei** di cortesia — la forma del verbo e la maiuscola ti dicono di quale si tratta.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Personal pronouns', it: 'I pronomi personali' },
        header: [
          { en: 'person', it: 'persona' },
          { en: 'singular', it: 'singolare' },
          { en: 'plural', it: 'plurale' },
        ],
        rows: [
          [
            { en: '1st', it: '1ª' },
            { en: 'ich — I', it: 'ich — io' },
            { en: 'wir — we', it: 'wir — noi' },
          ],
          [
            { en: '2nd (informal)', it: '2ª (informale)' },
            { en: 'du — you', it: 'du — tu' },
            { en: 'ihr — you all', it: 'ihr — voi' },
          ],
          [
            { en: '3rd', it: '3ª' },
            { en: 'er, sie, es — he, she, it', it: 'er, sie, es — lui, lei, esso' },
            { en: 'sie — they', it: 'sie — loro' },
          ],
          [{ en: 'formal “you”', it: '“Lei” di cortesia' }, 'Sie', 'Sie'],
        ],
      },
      { kind: 'example', text: 'wir', gloss: { en: 'we', it: 'noi' } },
      { kind: 'example', text: 'ihr', gloss: { en: 'you all (informal)', it: 'voi (informale)' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '**Sie** (always capitalized) is the polite “you”, for one person or several, and it takes the same verb form as *sie* = “they”. Use **du** with friends, family and children; **Sie** with strangers and in formal situations.',
          it: '**Sie** (sempre maiuscolo) è il “Lei” di cortesia, per una o più persone, e prende la stessa forma verbale di *sie* = “loro”. Usa **du** con amici, familiari e bambini; **Sie** con gli sconosciuti e nelle situazioni formali.',
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
            lang: 'de',
            sentence: [],
            gloss: { en: 'Match each pronoun with its meaning', it: 'Abbina ogni pronome al suo significato' },
            answer: '',
            accepted: [],
            pairs: [
              ['ich', 'I'],
              ['du', 'you'],
              ['er', 'he'],
              ['wir', 'we'],
              ['ihr', 'you all'],
            ],
            skillIds: ['de-personal-pronouns:sg', 'de-personal-pronouns:pl'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___'],
            gapIndex: 0,
            gloss: { en: 'Which pronoun means “we”?', it: 'Quale pronome significa “noi”?' },
            answer: 'wir',
            accepted: [],
            options: [
              { text: 'wir' },
              { text: 'ihr', strategy: 'wrongPerson' },
              { text: 'sie', strategy: 'wrongPerson' },
              { text: 'es', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-personal-pronouns:pl'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___'],
            gapIndex: 0,
            gloss: { en: 'Which pronoun is the polite “you”?', it: 'Quale pronome è il “Lei” di cortesia?' },
            answer: 'Sie',
            accepted: [],
            options: [
              { text: 'Sie' },
              { text: 'du', strategy: 'wrongPerson' },
              { text: 'ihr', strategy: 'wrongPerson' },
              { text: 'er', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-personal-pronouns:sg'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___'],
            gapIndex: 0,
            gloss: { en: 'Talking to several friends =', it: 'Parlando con più amici =' },
            answer: 'ihr',
            accepted: [],
            options: [
              { text: 'ihr' },
              { text: 'du', strategy: 'wrongPerson' },
              { text: 'wir', strategy: 'wrongPerson' },
              { text: 'Sie', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-personal-pronouns:pl'],
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Match person and number — and remember: capitalized Sie is polite “you”, lowercase sie is “she” or “they”.',
        it: 'Fai corrispondere persona e numero — e ricorda: Sie maiuscolo è il “Lei” di cortesia, sie minuscolo è “lei” o “loro”.',
      },
    },
  },

  {
    id: 'de-sein-present',
    lang: 'de',
    title: { en: 'sein — to be', it: 'sein — essere' },
    ruleSummary: {
      en: 'bin, bist, ist, sind, seid, sind — completely irregular; memorize all six.',
      it: 'bin, bist, ist, sind, seid, sind — del tutto irregolare; impara a memoria tutte e sei le forme.',
    },
    cefr: 'A1',
    dependencies: ['de-personal-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**sein** (to be) is the most used verb in German — and the most irregular. None of its present-tense forms look like the infinitive, so memorize all six as a chant: *bin, bist, ist, sind, seid, sind*.',
          it: '**sein** (essere) è il verbo più usato del tedesco — e il più irregolare. Nessuna delle sue forme del presente assomiglia all’infinito: imparale tutte e sei a memoria come una filastrocca: *bin, bist, ist, sind, seid, sind*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'sein — present tense', it: 'sein — presente' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['ich', 'bin'],
          ['du', 'bist'],
          ['er / sie / es', 'ist'],
          ['wir', 'sind'],
          ['ihr', 'seid'],
          ['sie / Sie', 'sind'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
        ],
      },
      {
        kind: 'example',
        text: 'Ich bin Lehrer.',
        gloss: { en: 'I am a teacher.', it: 'Sono insegnante.' },
        note: { en: 'no article before professions', it: 'niente articolo davanti alle professioni' },
      },
      { kind: 'example', text: 'Du bist nett.', gloss: { en: 'You are nice.', it: 'Sei simpatico.' } },
      { kind: 'example', text: 'Wir sind Freunde.', gloss: { en: 'We are friends.', it: 'Siamo amici.' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '**sind** appears twice: *wir sind* (we are) and *sie/Sie sind* (they are / you are, polite). Only *ihr* gets its own form, **seid**.',
          it: '**sind** compare due volte: *wir sind* (noi siamo) e *sie/Sie sind* (loro sono / Lei è, di cortesia). Solo *ihr* ha una forma tutta sua, **seid**.',
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
    introLexemeIds: [],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/sein', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/sein', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/sein', tense: 'pres', persons: ['1pl', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'sein is irregular: bin, bist, ist, sind, seid, sind.',
        it: 'sein è irregolare: bin, bist, ist, sind, seid, sind.',
      },
      infinitive: {
        en: '“sein” is the dictionary form — it must be conjugated here.',
        it: '“sein” è la forma del dizionario — qui va coniugato.',
      },
    },
  },

  {
    id: 'de-haben-present',
    lang: 'de',
    title: { en: 'haben — to have', it: 'haben — avere' },
    ruleSummary: {
      en: 'habe, hast, hat, haben, habt, haben — the b drops in du hast and er hat.',
      it: 'habe, hast, hat, haben, habt, haben — la b cade in du hast e er hat.',
    },
    cefr: 'A1',
    dependencies: ['de-sein-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**haben** (to have) is almost regular — with one twist: in the *du* and *er/sie/es* forms the **b drops**. Not *du habst* but **du hast**; not *er habt* but **er hat**. Every other form keeps the full stem *hab-*.',
          it: '**haben** (avere) è quasi regolare — con un’insidia: nelle forme di *du* e *er/sie/es* la **b cade**. Non *du habst* ma **du hast**; non *er habt* ma **er hat**. Tutte le altre forme mantengono la radice completa *hab-*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'haben — present tense', it: 'haben — presente' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['ich', 'habe'],
          ['du', 'hast'],
          ['er / sie / es', 'hat'],
          ['wir', 'haben'],
          ['ihr', 'habt'],
          ['sie / Sie', 'haben'],
        ],
        highlight: [
          [1, 1],
          [2, 1],
        ],
      },
      { kind: 'example', text: 'Ich habe ein Buch.', gloss: { en: 'I have a book.', it: 'Ho un libro.' } },
      { kind: 'example', text: 'Du hast Zeit.', gloss: { en: 'You have time.', it: 'Hai tempo.' } },
      { kind: 'example', text: 'Sie hat einen Bruder.', gloss: { en: 'She has a brother.', it: 'Lei ha un fratello.' } },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'The two highlighted forms are the trap: **hast** and **hat** lose the *b*. If you catch yourself writing *habst* or *habt* for *er*, stop — *habt* exists, but it belongs to **ihr**.',
          it: 'Le due forme evidenziate sono la trappola: **hast** e **hat** perdono la *b*. Se ti sorprendi a scrivere *habst* o *habt* per *er*, fermati — *habt* esiste, ma appartiene a **ihr**.',
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
    introLexemeIds: [],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/haben', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/haben', tense: 'pres', persons: ['2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/haben', tense: 'pres', persons: ['1sg', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'haben drops the b in two forms: du hast, er hat — the rest are regular.',
        it: 'haben perde la b in due forme: du hast, er hat — le altre sono regolari.',
      },
      infinitive: {
        en: '“haben” is the dictionary form — it must be conjugated here.',
        it: '“haben” è la forma del dizionario — qui va coniugato.',
      },
    },
  },

  {
    id: 'de-regular-present',
    lang: 'de',
    title: { en: 'Regular present', it: 'Il presente regolare' },
    ruleSummary: {
      en: 'Stem + -e, -st, -t, -en, -t, -en; stems in -t/-d insert an e: du arbeitest.',
      it: 'Radice + -e, -st, -t, -en, -t, -en; le radici in -t/-d inseriscono una e: du arbeitest.',
    },
    cefr: 'A1',
    dependencies: ['de-personal-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Regular verbs all work the same way: take the infinitive (*machen*), drop **-en** to get the **stem** (*mach-*), and add the endings **-e, -st, -t, -en, -t, -en**. One refinement: if the stem ends in **-t** or **-d** (*arbeit-*, *find-*), insert an **e** before *-st* and *-t* so you can pronounce it.',
          it: 'I verbi regolari funzionano tutti allo stesso modo: prendi l’infinito (*machen*), togli **-en** per ottenere la **radice** (*mach-*) e aggiungi le desinenze **-e, -st, -t, -en, -t, -en**. Un dettaglio: se la radice termina in **-t** o **-d** (*arbeit-*, *find-*), inserisci una **e** prima di *-st* e *-t* per poterla pronunciare.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'machen — the regular pattern', it: 'machen — lo schema regolare' },
        header: ['', { en: 'form', it: 'forma' }, { en: 'ending', it: 'desinenza' }],
        rows: [
          ['ich', 'mache', '-e'],
          ['du', 'machst', '-st'],
          ['er / sie / es', 'macht', '-t'],
          ['wir', 'machen', '-en'],
          ['ihr', 'macht', '-t'],
          ['sie / Sie', 'machen', '-en'],
        ],
      },
      {
        kind: 'table',
        caption: {
          en: 'arbeiten — stem ends in -t, so an e slips in',
          it: 'arbeiten — la radice termina in -t, quindi si inserisce una e',
        },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['ich', 'arbeite'],
          ['du', 'arbeitest'],
          ['er / sie / es', 'arbeitet'],
          ['wir', 'arbeiten'],
          ['ihr', 'arbeitet'],
          ['sie / Sie', 'arbeiten'],
        ],
        highlight: [
          [1, 1],
          [2, 1],
          [4, 1],
        ],
      },
      { kind: 'example', text: 'Ich wohne in Berlin.', gloss: { en: 'I live in Berlin.', it: 'Abito a Berlino.' } },
      {
        kind: 'example',
        text: 'Du arbeitest viel.',
        gloss: { en: 'You work a lot.', it: 'Lavori molto.' },
        note: { en: 'not “arbeitst” — the e is required', it: 'non “arbeitst” — la e è obbligatoria' },
      },
      {
        kind: 'example',
        text: 'Wir lernen Deutsch.',
        gloss: { en: 'We are learning German.', it: 'Stiamo imparando il tedesco.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'The *wir* and *sie/Sie* forms are always identical to the **infinitive** (*wir machen*, *sie machen*) — two forms for free.',
          it: 'Le forme di *wir* e *sie/Sie* sono sempre identiche all’**infinito** (*wir machen*, *sie machen*) — due forme gratis.',
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
    introLexemeIds: ['de/verb/machen', 'de/verb/wohnen', 'de/verb/arbeiten'],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/machen', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/machen', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/wohnen', tense: 'pres', persons: ['2sg', '3sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'de/verb/arbeiten', tense: 'pres', persons: ['2sg', '2pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Endings by person: -e, -st, -t, -en, -t, -en. Stems in -t/-d add an e: du arbeitest.',
        it: 'Desinenze per persona: -e, -st, -t, -en, -t, -en. Le radici in -t/-d aggiungono una e: du arbeitest.',
      },
      infinitive: {
        en: 'That’s the dictionary form — drop -en and add the personal ending.',
        it: 'Questa è la forma del dizionario — togli -en e aggiungi la desinenza personale.',
      },
    },
  },

  {
    id: 'de-word-order-v2',
    lang: 'de',
    title: { en: 'Verb second (V2)', it: 'Verbo in seconda posizione (V2)' },
    ruleSummary: {
      en: 'In a statement the conjugated verb is ALWAYS the second element — even after a fronted time word.',
      it: 'In una frase affermativa il verbo coniugato è SEMPRE il secondo elemento — anche dopo un’espressione di tempo in prima posizione.',
    },
    cefr: 'A1',
    dependencies: ['de-regular-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'German statements obey one iron rule: the **conjugated verb is the second element** — always. Usually the subject comes first (*Ich trinke Kaffee*), but German loves to start with a time or place word instead. When that happens, the verb **stays** in position 2 and the subject slides behind it: *Heute trinke ich Kaffee* — literally “Today drink I coffee”.',
          it: 'Le frasi affermative tedesche obbediscono a una regola ferrea: il **verbo coniugato è il secondo elemento** — sempre. Di solito il soggetto viene per primo (*Ich trinke Kaffee*), ma il tedesco ama iniziare con un’espressione di tempo o di luogo. In quel caso il verbo **resta** in seconda posizione e il soggetto slitta subito dopo: *Heute trinke ich Kaffee* — letteralmente “Oggi bevo io caffè”.',
        },
      },
      {
        kind: 'table',
        caption: {
          en: 'Whatever fills position 1, the verb holds position 2',
          it: 'Qualunque cosa occupi la posizione 1, il verbo tiene la posizione 2',
        },
        header: [
          { en: 'position 1', it: 'posizione 1' },
          { en: 'position 2 — verb', it: 'posizione 2 — verbo' },
          { en: 'rest', it: 'resto' },
        ],
        rows: [
          ['Ich', 'trinke', 'heute Kaffee'],
          ['Heute', 'trinke', 'ich Kaffee'],
        ],
      },
      { kind: 'example', text: 'Ich trinke Kaffee.', gloss: { en: 'I drink coffee.', it: 'Bevo il caffè.' } },
      {
        kind: 'example',
        text: 'Heute trinke ich Kaffee.',
        gloss: { en: 'Today I drink coffee.', it: 'Oggi bevo il caffè.' },
        note: { en: 'verb before subject!', it: 'verbo prima del soggetto!' },
      },
      { kind: 'example', text: 'Wir wohnen in Berlin.', gloss: { en: 'We live in Berlin.', it: 'Abitiamo a Berlino.' } },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Never copy the English order after a fronted word: *Heute ich trinke Kaffee* is wrong. “Second element” means second **unit**, not second word — a phrase like *in Berlin* counts as one element.',
          it: 'Non copiare mai l’ordine italiano dopo un elemento in prima posizione: *Heute ich trinke Kaffee* è sbagliato. “Secondo elemento” significa seconda **unità**, non seconda parola — un sintagma come *in Berlin* conta come un solo elemento.',
        },
      },
    ],
    skillCells: [
      { cellId: 'v2.basic', label: { en: 'basic order', it: 'ordine di base' } },
      { cellId: 'v2.fronted', label: { en: 'fronted element', it: 'elemento in prima posizione' } },
    ],
    introLexemeIds: ['de/verb/trinken', 'de/verb/essen', 'de/verb/lesen', 'de/noun/tee', 'de/noun/brot'],
    drillItems: [
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ich trinke Kaffee',
            gloss: { en: 'I drink coffee', it: 'Bevo il caffè' },
            cellId: 'v2.basic',
          },
          {
            answer: 'Wir wohnen in Berlin',
            gloss: { en: 'We live in Berlin', it: 'Abitiamo a Berlino' },
            cellId: 'v2.basic',
          },
          { answer: 'Ich esse Brot', gloss: { en: 'I eat bread', it: 'Mangio il pane' }, cellId: 'v2.basic' },
          { answer: 'Er liest ein Buch', gloss: { en: 'He reads a book', it: 'Legge un libro' }, cellId: 'v2.basic' },
          {
            answer: 'Heute arbeite ich',
            also: ['Ich arbeite heute'],
            gloss: { en: 'Today I work', it: 'Oggi lavoro' },
            cellId: 'v2.fronted',
          },
          {
            answer: 'Heute trinken wir Tee',
            also: ['Wir trinken heute Tee'],
            gloss: { en: 'Today we drink tea', it: 'Oggi beviamo il tè' },
            cellId: 'v2.fronted',
          },
        ],
      },
    ],
    errorHints: {
      v2Violation: {
        en: 'The conjugated verb must be the SECOND element — even when the sentence starts with a time word.',
        it: 'Il verbo coniugato deve essere il SECONDO elemento — anche quando la frase inizia con un’espressione di tempo.',
      },
    },
  },
]
