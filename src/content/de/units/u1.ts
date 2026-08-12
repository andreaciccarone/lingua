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
    ruleSummary: 'Every noun has a gender — der (m), die (f), das (n); learn noun + article as one unit.',
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: 'Every German noun has one of **three genders** — masculine, feminine or neuter — and the word for “the” shows it: *der Mann*, *die Frau*, *das Kind*. Gender is part of the word itself, so never learn a bare noun: learn **noun + article as one unit**. Nouns are always **capitalized** in German.',
      },
      {
        kind: 'table',
        caption: 'The definite article (“the”)',
        header: ['', 'masculine', 'feminine', 'neuter'],
        rows: [
          ['singular', 'der Mann', 'die Frau', 'das Kind'],
          ['typical cues', 'male people, days', '-ung, -in, often -e', '-chen, -lein'],
        ],
      },
      { kind: 'example', text: 'der Mann', gloss: 'the man' },
      { kind: 'example', text: 'die Zeitung', gloss: 'the newspaper', note: '-ung words are always die' },
      { kind: 'example', text: 'das Mädchen', gloss: 'the girl', note: '-chen words are always das' },
      {
        kind: 'callout',
        style: 'warning',
        md: 'Gender is **grammatical**, not natural: *das Mädchen* (the girl) is neuter because of **-chen**, and *der Tisch* (the table) is masculine for no reason at all. Suffix cues help, but for most nouns the article simply has to be memorized **with the word**.',
      },
    ],
    skillCells: [
      { cellId: 'nom.m', label: 'masculine (der)' },
      { cellId: 'nom.f', label: 'feminine (die)' },
      { cellId: 'nom.n', label: 'neuter (das)' },
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
        frames: [{ tokens: ['___', '{noun}'], gloss: 'the {gloss}' }],
        cellId: 'nom.m',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/frau', 'de/noun/tür', 'de/noun/stadt', 'de/noun/milch'],
        count: 3,
        case: 'nom',
        det: 'def',
        number: 'sg',
        frames: [{ tokens: ['___', '{noun}'], gloss: 'the {gloss}' }],
        cellId: 'nom.f',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/kind', 'de/noun/buch', 'de/noun/haus', 'de/noun/auto'],
        count: 3,
        case: 'nom',
        det: 'def',
        number: 'sg',
        frames: [{ tokens: ['___', '{noun}'], gloss: 'the {gloss}' }],
        cellId: 'nom.n',
      },
    ],
    errorHints: {
      wrongGenderArticle: 'Check the noun’s gender: der for masculine, die for feminine, das for neuter — it’s part of the word.',
    },
  },

  {
    id: 'de-personal-pronouns',
    lang: 'de',
    title: 'Personal pronouns',
    ruleSummary: 'ich, du, er/sie/es, wir, ihr, sie — plus capitalized Sie for polite “you”.',
    cefr: 'A1',
    dependencies: [],
    explanation: [
      {
        kind: 'prose',
        md: 'These little words say **who** does the action, and unlike Spanish, German almost never drops them. Note that *sie* does triple duty — **she**, **they**, and (capitalized) polite **you** — the verb form and the capital letter tell you which one you’re hearing.',
      },
      {
        kind: 'table',
        caption: 'Personal pronouns',
        header: ['person', 'singular', 'plural'],
        rows: [
          ['1st', 'ich — I', 'wir — we'],
          ['2nd (informal)', 'du — you', 'ihr — you all'],
          ['3rd', 'er, sie, es — he, she, it', 'sie — they'],
          ['formal “you”', 'Sie', 'Sie'],
        ],
      },
      { kind: 'example', text: 'wir', gloss: 'we' },
      { kind: 'example', text: 'ihr', gloss: 'you all (informal)' },
      {
        kind: 'callout',
        style: 'tip',
        md: '**Sie** (always capitalized) is the polite “you”, for one person or several, and it takes the same verb form as *sie* = “they”. Use **du** with friends, family and children; **Sie** with strangers and in formal situations.',
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
            lang: 'de',
            sentence: [],
            gloss: 'Match each pronoun with its meaning',
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
            sentence: ['___', '= we'],
            gapIndex: 0,
            gloss: 'Which pronoun means “we”?',
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
            sentence: ['___', '= you (polite)'],
            gapIndex: 0,
            gloss: 'Which pronoun is the polite “you”?',
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
            sentence: ['___', '= you all (informal)'],
            gapIndex: 0,
            gloss: 'Talking to several friends =',
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
      wrongPerson: 'Match person and number — and remember: capitalized Sie is polite “you”, lowercase sie is “she” or “they”.',
    },
  },

  {
    id: 'de-sein-present',
    lang: 'de',
    title: 'sein — to be',
    ruleSummary: 'bin, bist, ist, sind, seid, sind — completely irregular; memorize all six.',
    cefr: 'A1',
    dependencies: ['de-personal-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: '**sein** (to be) is the most used verb in German — and the most irregular. None of its present-tense forms look like the infinitive, so memorize all six as a chant: *bin, bist, ist, sind, seid, sind*.',
      },
      {
        kind: 'table',
        caption: 'sein — present tense',
        header: ['', 'form'],
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
      { kind: 'example', text: 'Ich bin Lehrer.', gloss: 'I am a teacher.', note: 'no article before professions' },
      { kind: 'example', text: 'Du bist nett.', gloss: 'You are nice.' },
      { kind: 'example', text: 'Wir sind Freunde.', gloss: 'We are friends.' },
      {
        kind: 'callout',
        style: 'tip',
        md: '**sind** appears twice: *wir sind* (we are) and *sie/Sie sind* (they are / you are, polite). Only *ihr* gets its own form, **seid**.',
      },
    ],
    skillCells: [
      { cellId: '1sg', label: 'ich form' },
      { cellId: '2sg', label: 'du form' },
      { cellId: '3sg', label: 'er/sie/es form' },
      { cellId: '1pl', label: 'wir form' },
      { cellId: '2pl', label: 'ihr form' },
      { cellId: '3pl', label: 'sie/Sie form' },
    ],
    introLexemeIds: [],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/sein', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/sein', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/sein', tense: 'pres', persons: ['1pl', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: 'sein is irregular: bin, bist, ist, sind, seid, sind.',
      infinitive: '“sein” is the dictionary form — it must be conjugated here.',
    },
  },

  {
    id: 'de-haben-present',
    lang: 'de',
    title: 'haben — to have',
    ruleSummary: 'habe, hast, hat, haben, habt, haben — the b drops in du hast and er hat.',
    cefr: 'A1',
    dependencies: ['de-sein-present'],
    explanation: [
      {
        kind: 'prose',
        md: '**haben** (to have) is almost regular — with one twist: in the *du* and *er/sie/es* forms the **b drops**. Not *du habst* but **du hast**; not *er habt* but **er hat**. Every other form keeps the full stem *hab-*.',
      },
      {
        kind: 'table',
        caption: 'haben — present tense',
        header: ['', 'form'],
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
      { kind: 'example', text: 'Ich habe ein Buch.', gloss: 'I have a book.' },
      { kind: 'example', text: 'Du hast Zeit.', gloss: 'You have time.' },
      { kind: 'example', text: 'Sie hat einen Bruder.', gloss: 'She has a brother.' },
      {
        kind: 'callout',
        style: 'warning',
        md: 'The two highlighted forms are the trap: **hast** and **hat** lose the *b*. If you catch yourself writing *habst* or *habt* for *er*, stop — *habt* exists, but it belongs to **ihr**.',
      },
    ],
    skillCells: [
      { cellId: '1sg', label: 'ich form' },
      { cellId: '2sg', label: 'du form' },
      { cellId: '3sg', label: 'er/sie/es form' },
      { cellId: '1pl', label: 'wir form' },
      { cellId: '2pl', label: 'ihr form' },
      { cellId: '3pl', label: 'sie/Sie form' },
    ],
    introLexemeIds: [],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/haben', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/haben', tense: 'pres', persons: ['2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/haben', tense: 'pres', persons: ['1sg', '3pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: 'haben drops the b in two forms: du hast, er hat — the rest are regular.',
      infinitive: '“haben” is the dictionary form — it must be conjugated here.',
    },
  },

  {
    id: 'de-regular-present',
    lang: 'de',
    title: 'Regular present',
    ruleSummary: 'Stem + -e, -st, -t, -en, -t, -en; stems in -t/-d insert an e: du arbeitest.',
    cefr: 'A1',
    dependencies: ['de-personal-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: 'Regular verbs all work the same way: take the infinitive (*machen*), drop **-en** to get the **stem** (*mach-*), and add the endings **-e, -st, -t, -en, -t, -en**. One refinement: if the stem ends in **-t** or **-d** (*arbeit-*, *find-*), insert an **e** before *-st* and *-t* so you can pronounce it.',
      },
      {
        kind: 'table',
        caption: 'machen — the regular pattern',
        header: ['', 'form', 'ending'],
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
        caption: 'arbeiten — stem ends in -t, so an e slips in',
        header: ['', 'form'],
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
      { kind: 'example', text: 'Ich wohne in Berlin.', gloss: 'I live in Berlin.' },
      { kind: 'example', text: 'Du arbeitest viel.', gloss: 'You work a lot.', note: 'not “arbeitst” — the e is required' },
      { kind: 'example', text: 'Wir lernen Deutsch.', gloss: 'We are learning German.' },
      {
        kind: 'callout',
        style: 'tip',
        md: 'The *wir* and *sie/Sie* forms are always identical to the **infinitive** (*wir machen*, *sie machen*) — two forms for free.',
      },
    ],
    skillCells: [
      { cellId: '1sg', label: 'ich form' },
      { cellId: '2sg', label: 'du form' },
      { cellId: '3sg', label: 'er/sie/es form' },
      { cellId: '1pl', label: 'wir form' },
      { cellId: '2pl', label: 'ihr form' },
      { cellId: '3pl', label: 'sie/Sie form' },
    ],
    introLexemeIds: ['de/verb/machen', 'de/verb/wohnen', 'de/verb/arbeiten'],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/machen', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/machen', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/wohnen', tense: 'pres', persons: ['2sg', '3sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'de/verb/arbeiten', tense: 'pres', persons: ['2sg', '2pl'], type: 'cloze' },
    ],
    errorHints: {
      wrongPerson: 'Endings by person: -e, -st, -t, -en, -t, -en. Stems in -t/-d add an e: du arbeitest.',
      infinitive: 'That’s the dictionary form — drop -en and add the personal ending.',
    },
  },

  {
    id: 'de-word-order-v2',
    lang: 'de',
    title: 'Verb second (V2)',
    ruleSummary: 'In a statement the conjugated verb is ALWAYS the second element — even after a fronted time word.',
    cefr: 'A1',
    dependencies: ['de-regular-present'],
    explanation: [
      {
        kind: 'prose',
        md: 'German statements obey one iron rule: the **conjugated verb is the second element** — always. Usually the subject comes first (*Ich trinke Kaffee*), but German loves to start with a time or place word instead. When that happens, the verb **stays** in position 2 and the subject slides behind it: *Heute trinke ich Kaffee* — literally “Today drink I coffee”.',
      },
      {
        kind: 'table',
        caption: 'Whatever fills position 1, the verb holds position 2',
        header: ['position 1', 'position 2 — verb', 'rest'],
        rows: [
          ['Ich', 'trinke', 'heute Kaffee'],
          ['Heute', 'trinke', 'ich Kaffee'],
        ],
      },
      { kind: 'example', text: 'Ich trinke Kaffee.', gloss: 'I drink coffee.' },
      { kind: 'example', text: 'Heute trinke ich Kaffee.', gloss: 'Today I drink coffee.', note: 'verb before subject!' },
      { kind: 'example', text: 'Wir wohnen in Berlin.', gloss: 'We live in Berlin.' },
      {
        kind: 'callout',
        style: 'warning',
        md: 'Never copy the English order after a fronted word: *Heute ich trinke Kaffee* is wrong. “Second element” means second **unit**, not second word — a phrase like *in Berlin* counts as one element.',
      },
    ],
    skillCells: [
      { cellId: 'v2.basic', label: 'basic order' },
      { cellId: 'v2.fronted', label: 'fronted element' },
    ],
    introLexemeIds: ['de/verb/trinken', 'de/verb/essen', 'de/verb/lesen', 'de/noun/tee', 'de/noun/brot'],
    drillItems: [
      {
        gen: 'word-order',
        items: [
          { answer: 'Ich trinke Kaffee', gloss: 'I drink coffee', cellId: 'v2.basic' },
          { answer: 'Wir wohnen in Berlin', gloss: 'We live in Berlin', cellId: 'v2.basic' },
          { answer: 'Ich esse Brot', gloss: 'I eat bread', cellId: 'v2.basic' },
          { answer: 'Er liest ein Buch', gloss: 'He reads a book', cellId: 'v2.basic' },
          { answer: 'Heute arbeite ich', also: ['Ich arbeite heute'], gloss: 'Today I work', cellId: 'v2.fronted' },
          { answer: 'Heute trinken wir Tee', also: ['Wir trinken heute Tee'], gloss: 'Today we drink tea', cellId: 'v2.fronted' },
        ],
      },
    ],
    errorHints: {
      v2Violation: 'The conjugated verb must be the SECOND element — even when the sentence starts with a time word.',
    },
  },
]
