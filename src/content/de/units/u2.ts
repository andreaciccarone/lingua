import type { Topic } from '../../types'

// Unit DE-2 · Sätze bauen
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U2_TOPICS: Topic[] = [
  {
    id: 'de-questions',
    lang: 'de',
    title: { en: 'Questions', it: 'Le domande' },
    ruleSummary: {
      en: 'Yes/no questions start with the verb (Trinkst du Kaffee?); W-questions: W-word + verb + subject.',
      it: 'Le domande sì/no iniziano con il verbo (Trinkst du Kaffee?); domande con W: parola in W + verbo + soggetto.',
    },
    cefr: 'A1',
    dependencies: ['de-word-order-v2'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'German questions come in two shapes, and neither needs a helper like English “do”. A **yes/no question** simply puts the conjugated verb **first**: *Trinkst du Kaffee?* — literally “Drink you coffee?”. A **W-question** starts with a question word, and the verb stays right behind it in position 2: *Wo wohnst du?* (Where do you live?).',
          it: 'Le domande tedesche hanno due forme, e nessuna delle due richiede un ausiliare come il “do” inglese. Una **domanda sì/no** mette semplicemente il verbo coniugato **al primo posto**: *Trinkst du Kaffee?* — letteralmente “Bevi tu caffè?”. Una **domanda con W** inizia con una parola interrogativa, e il verbo le resta subito dietro, in seconda posizione: *Wo wohnst du?* (Dove abiti?).',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The six W-words', it: 'Le sei parole in W' },
        header: [
          { en: 'W-word', it: 'parola in W' },
          { en: 'meaning', it: 'significato' },
          { en: 'example', it: 'esempio' },
        ],
        rows: [
          ['wer', { en: 'who', it: 'chi' }, 'Wer bist du?'],
          ['was', { en: 'what', it: 'che cosa' }, 'Was isst du?'],
          ['wo', { en: 'where', it: 'dove' }, 'Wo wohnst du?'],
          ['wann', { en: 'when', it: 'quando' }, 'Wann arbeitest du?'],
          ['wie', { en: 'how', it: 'come' }, 'Wie heißt du?'],
          ['warum', { en: 'why', it: 'perché' }, 'Warum lernst du Deutsch?'],
        ],
      },
      {
        kind: 'example',
        text: 'Trinkst du Kaffee?',
        gloss: { en: 'Do you drink coffee?', it: 'Bevi caffè?' },
        note: { en: 'verb first — no “do”', it: 'verbo al primo posto — niente ausiliare' },
      },
      { kind: 'example', text: 'Wo wohnst du?', gloss: { en: 'Where do you live?', it: 'Dove abiti?' } },
      { kind: 'example', text: 'Was isst du?', gloss: { en: 'What are you eating?', it: 'Che cosa mangi?' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'No do-support, ever: to ask a yes/no question, just **flip verb and subject** — *Du trinkst Kaffee.* → *Trinkst du Kaffee?* The W-words all start with **w** (English flipped them to “wh”).',
          it: 'Niente ausiliari, mai: per fare una domanda sì/no basta **invertire verbo e soggetto** — *Du trinkst Kaffee.* → *Trinkst du Kaffee?* Le parole interrogative iniziano tutte con **w** (l’inglese le ha rovesciate in “wh”).',
        },
      },
    ],
    skillCells: [
      { cellId: 'q.yesno', label: { en: 'yes/no questions', it: 'domande sì/no' } },
      { cellId: 'q.wword', label: { en: 'W-questions', it: 'domande con W' } },
    ],
    introLexemeIds: [],
    drillItems: [
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Trinkst du Kaffee',
            gloss: { en: 'Do you drink coffee?', it: 'Bevi caffè?' },
            cellId: 'q.yesno',
          },
          {
            answer: 'Arbeitest du heute',
            gloss: { en: 'Are you working today?', it: 'Lavori oggi?' },
            cellId: 'q.yesno',
          },
          { answer: 'Wo wohnst du', gloss: { en: 'Where do you live?', it: 'Dove abiti?' }, cellId: 'q.wword' },
          { answer: 'Was isst du', gloss: { en: 'What are you eating?', it: 'Che cosa mangi?' }, cellId: 'q.wword' },
        ],
      },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'wohnst', 'du?', '—', 'In', 'Berlin.'],
            gapIndex: 0,
            gloss: { en: '___ do you live? — In Berlin.', it: '___ abiti? — A Berlino.' },
            answer: 'Wo',
            accepted: [],
            options: [
              { text: 'Wo' },
              { text: 'Was', strategy: 'vocabConfusable' },
              { text: 'Wann', strategy: 'vocabConfusable' },
              { text: 'Wer', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-questions:q.wword'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'trinkst', 'du?', '—', 'Tee.'],
            gapIndex: 0,
            gloss: { en: '___ are you drinking? — Tea.', it: '___ bevi? — Tè.' },
            answer: 'Was',
            accepted: [],
            options: [
              { text: 'Was' },
              { text: 'Wo', strategy: 'vocabConfusable' },
              { text: 'Wer', strategy: 'vocabConfusable' },
              { text: 'Wie', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-questions:q.wword'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'arbeitest', 'du?', '—', 'Heute.'],
            gapIndex: 0,
            gloss: { en: '___ do you work? — Today.', it: '___ lavori? — Oggi.' },
            answer: 'Wann',
            accepted: [],
            options: [
              { text: 'Wann' },
              { text: 'Wo', strategy: 'vocabConfusable' },
              { text: 'Warum', strategy: 'vocabConfusable' },
              { text: 'Was', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-questions:q.wword'],
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'Match the W-word to the answer given: wer = who, was = what, wo = where, wann = when, wie = how, warum = why.',
        it: 'Abbina la parola in W alla risposta data: wer = chi, was = che cosa, wo = dove, wann = quando, wie = come, warum = perché.',
      },
      v2Violation: {
        en: 'Yes/no questions put the verb FIRST; in W-questions the verb comes right after the W-word.',
        it: 'Le domande sì/no mettono il verbo AL PRIMO POSTO; nelle domande con W il verbo viene subito dopo la parola in W.',
      },
    },
  },

  {
    id: 'de-plurals',
    lang: 'de',
    title: { en: 'Plurals', it: 'Il plurale' },
    ruleSummary: {
      en: 'Five main patterns — -e, -er, -(e)n, -s, umlaut — and the plural article is always die.',
      it: 'Cinque schemi principali — -e, -er, -(e)n, -s, Umlaut — e l’articolo del plurale è sempre die.',
    },
    cefr: 'A1',
    dependencies: ['de-noun-gender'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'German has no single plural rule — nouns follow one of **five main patterns**, often with an **umlaut** on top (*Stadt → Städte*). So learn each noun’s plural **with the word**, just like its gender. The consolation prize: in the plural, gender vanishes — the article is **always die**.',
          it: 'Il tedesco non ha un’unica regola per il plurale — i sostantivi seguono uno di **cinque schemi principali**, spesso con l’aggiunta di un **Umlaut** (*Stadt → Städte*). Impara quindi il plurale di ogni sostantivo **insieme alla parola**, proprio come il genere. Il premio di consolazione: al plurale il genere sparisce — l’articolo è **sempre die**.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The five main plural patterns', it: 'I cinque schemi principali del plurale' },
        header: [
          { en: 'pattern', it: 'schema' },
          { en: 'singular', it: 'singolare' },
          { en: 'plural', it: 'plurale' },
        ],
        rows: [
          ['-e', 'der Tisch', 'die Tische'],
          ['-er', 'das Kind', 'die Kinder'],
          ['-(e)n', 'die Frau', 'die Frauen'],
          ['-s', 'das Auto', 'die Autos'],
          [{ en: 'umlaut', it: 'Umlaut' }, 'der Apfel', 'die Äpfel'],
        ],
      },
      { kind: 'example', text: 'die Kinder', gloss: { en: 'the children', it: 'i bambini' } },
      {
        kind: 'example',
        text: 'die Äpfel',
        gloss: { en: 'the apples', it: 'le mele' },
        note: { en: 'umlaut only, no ending', it: 'solo Umlaut, nessuna desinenza' },
      },
      {
        kind: 'example',
        text: 'die Männer',
        gloss: { en: 'the men', it: 'gli uomini' },
        note: { en: 'umlaut + -er', it: 'Umlaut + -er' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Whatever the gender was in the singular, the plural “the” is **die**: *der Mann → die Männer*, *das Buch → die Bücher*. Watch the umlauts — they are part of the plural, not decoration: *Stadt → Städte*.',
          it: 'Qualunque fosse il genere al singolare, l’articolo del plurale è **die**: *der Mann → die Männer*, *das Buch → die Bücher*. Attenzione agli Umlaut — fanno parte del plurale, non sono una decorazione: *Stadt → Städte*.',
        },
      },
    ],
    skillCells: [
      { cellId: 'pl-form', label: { en: 'plural forms', it: 'forme del plurale' } },
      { cellId: 'pl-article', label: { en: 'plural article', it: 'articolo del plurale' } },
    ],
    introLexemeIds: ['de/noun/apfel', 'de/noun/auto'],
    drillItems: [
      {
        gen: 'plural',
        nounIds: [
          'de/noun/tisch',
          'de/noun/kind',
          'de/noun/frau',
          'de/noun/buch',
          'de/noun/apfel',
          'de/noun/stadt',
          'de/noun/mann',
        ],
        count: 5,
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/tisch', 'de/noun/frau', 'de/noun/kind', 'de/noun/apfel'],
        count: 3,
        case: 'nom',
        det: 'def',
        number: 'pl',
        frames: [
          { tokens: ['___', '{noun}'], gloss: { en: 'the {gloss} (plural)', it: '{gloss} (plurale)' } },
        ],
        cellId: 'pl-article',
      },
    ],
    errorHints: {
      wrongGenderArticle: {
        en: 'Gender disappears in the plural — the article is always die.',
        it: 'Al plurale il genere sparisce — l’articolo è sempre die.',
      },
      wrongCaseArticle: {
        en: 'Plural “the” in the nominative is die; den is the dative plural.',
        it: 'L’articolo plurale al nominativo è die; den è il dativo plurale.',
      },
    },
  },

  {
    id: 'de-nom-acc',
    lang: 'de',
    title: { en: 'Nominative vs accusative', it: 'Nominativo e accusativo' },
    ruleSummary: {
      en: 'Subject = nominative, direct object = accusative; only masculine changes: der → den, ein → einen.',
      it: 'Soggetto = nominativo, complemento oggetto = accusativo; cambia solo il maschile: der → den, ein → einen.',
    },
    cefr: 'A1',
    dependencies: ['de-noun-gender', 'de-regular-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'The **subject** of a sentence stands in the **nominative** — the forms you already know (*der, die, das*). The **direct object** (whatever is seen, taken, found…) stands in the **accusative**. The good news: feminine and neuter look exactly the same in both cases. Only the **masculine** changes: **der → den**, **ein → einen**.',
          it: 'Il **soggetto** della frase sta al **nominativo** — le forme che già conosci (*der, die, das*). Il **complemento oggetto** (ciò che viene visto, preso, trovato…) sta all’**accusativo**. La buona notizia: femminile e neutro sono identici nei due casi. Cambia solo il **maschile**: **der → den**, **ein → einen**.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Articles: nominative vs accusative', it: 'Gli articoli: nominativo e accusativo' },
        header: ['', { en: 'nominative', it: 'nominativo' }, { en: 'accusative', it: 'accusativo' }],
        rows: [
          [{ en: 'masculine', it: 'maschile' }, 'der / ein', 'den / einen'],
          [{ en: 'feminine', it: 'femminile' }, 'die / eine', 'die / eine'],
          [{ en: 'neuter', it: 'neutro' }, 'das / ein', 'das / ein'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
        ],
      },
      {
        kind: 'example',
        text: 'Der Mann trinkt Kaffee.',
        gloss: { en: 'The man drinks coffee.', it: 'L’uomo beve il caffè.' },
        note: { en: 'der Mann = subject → nominative', it: 'der Mann = soggetto → nominativo' },
      },
      {
        kind: 'example',
        text: 'Ich sehe den Mann.',
        gloss: { en: 'I see the man.', it: 'Vedo l’uomo.' },
        note: { en: 'den Mann = direct object → accusative', it: 'den Mann = complemento oggetto → accusativo' },
      },
      {
        kind: 'example',
        text: 'Ich sehe den Studenten.',
        gloss: { en: 'I see the student.', it: 'Vedo lo studente.' },
        note: {
          en: 'a few masculine nouns also add -en',
          it: 'alcuni sostantivi maschili aggiungono anche -en',
        },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'In German it’s the **article**, not the word order, that marks the object: *Den Mann sieht die Frau* still means the woman sees the man. A small group of masculine “weak” nouns (*der Student, der Junge*) adds **-(e)n** in the accusative: *den Studenten*, *den Jungen*.',
          it: 'In tedesco è l’**articolo**, non l’ordine delle parole, a segnalare il complemento oggetto: *Den Mann sieht die Frau* significa comunque che la donna vede l’uomo. Un piccolo gruppo di sostantivi maschili “deboli” (*der Student, der Junge*) aggiunge **-(e)n** all’accusativo: *den Studenten*, *den Jungen*.',
        },
      },
    ],
    skillCells: [
      { cellId: 'acc.m', label: { en: 'accusative masculine (den)', it: 'accusativo maschile (den)' } },
      { cellId: 'acc.f', label: { en: 'accusative feminine (die)', it: 'accusativo femminile (die)' } },
      { cellId: 'acc.n', label: { en: 'accusative neuter (das)', it: 'accusativo neutro (das)' } },
    ],
    introLexemeIds: ['de/verb/sehen', 'de/verb/finden', 'de/verb/nehmen', 'de/noun/student'],
    drillItems: [
      {
        gen: 'case-article',
        nounIds: ['de/noun/mann', 'de/noun/student', 'de/noun/tisch', 'de/noun/apfel'],
        count: 3,
        case: 'acc',
        det: 'def',
        number: 'sg',
        frames: [
          { tokens: ['Ich', 'sehe', '___', '{noun}'], gloss: { en: 'I see the {gloss}', it: 'Vedo {gloss}' } },
          { tokens: ['Ich', 'finde', '___', '{noun}'], gloss: { en: 'I find the {gloss}', it: 'Trovo {gloss}' } },
        ],
        cellId: 'acc.m',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/frau', 'de/noun/tasche', 'de/noun/stadt'],
        count: 2,
        case: 'acc',
        det: 'def',
        number: 'sg',
        frames: [
          { tokens: ['Ich', 'sehe', '___', '{noun}'], gloss: { en: 'I see the {gloss}', it: 'Vedo {gloss}' } },
          { tokens: ['Ich', 'finde', '___', '{noun}'], gloss: { en: 'I find the {gloss}', it: 'Trovo {gloss}' } },
        ],
        cellId: 'acc.f',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/buch', 'de/noun/auto', 'de/noun/brot'],
        count: 2,
        case: 'acc',
        det: 'def',
        number: 'sg',
        frames: [
          { tokens: ['Ich', 'sehe', '___', '{noun}'], gloss: { en: 'I see the {gloss}', it: 'Vedo {gloss}' } },
          { tokens: ['Ich', 'nehme', '___', '{noun}'], gloss: { en: 'I take the {gloss}', it: 'Prendo {gloss}' } },
        ],
        cellId: 'acc.n',
      },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: [],
            gloss: {
              en: 'Which sentence is correct? — “I see the man.”',
              it: 'Quale frase è corretta? — “Vedo l’uomo.”',
            },
            answer: 'Ich sehe den Mann.',
            accepted: [],
            options: [
              { text: 'Ich sehe den Mann.' },
              { text: 'Ich sehe der Mann.', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-nom-acc:acc.m'],
          },
        ],
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'The direct object takes the accusative — and only masculine changes: der → den, ein → einen.',
        it: 'Il complemento oggetto va all’accusativo — e cambia solo il maschile: der → den, ein → einen.',
      },
      wrongGenderArticle: {
        en: 'Check the noun’s gender first; feminine and neuter keep their nominative article in the accusative.',
        it: 'Controlla prima il genere del sostantivo; femminile e neutro mantengono all’accusativo l’articolo del nominativo.',
      },
    },
  },

  {
    id: 'de-negation',
    lang: 'de',
    title: { en: 'nicht vs kein', it: 'nicht o kein' },
    ruleSummary: {
      en: 'kein negates nouns with ein or no article (declines like ein: acc masc keinen); nicht negates everything else.',
      it: 'kein nega i sostantivi con ein o senza articolo (si declina come ein: accusativo maschile keinen); nicht nega tutto il resto.',
    },
    cefr: 'A1',
    dependencies: ['de-nom-acc'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'German has two negators. **kein** negates a noun that has *ein* or **no article at all**: *Ich habe ein Auto → Ich habe **kein** Auto*; *Ich trinke Bier → Ich trinke **kein** Bier*. **nicht** negates everything else — verbs, adjectives, whole sentences — and usually comes **late** in the sentence: *Er arbeitet **nicht***.',
          it: 'Il tedesco ha due negazioni. **kein** nega un sostantivo che ha *ein* o **nessun articolo**: *Ich habe ein Auto → Ich habe **kein** Auto*; *Ich trinke Bier → Ich trinke **kein** Bier*. **nicht** nega tutto il resto — verbi, aggettivi, frasi intere — e di solito viene **verso la fine** della frase: *Er arbeitet **nicht***.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'kein declines exactly like ein', it: 'kein si declina esattamente come ein' },
        header: [
          '',
          { en: 'masculine', it: 'maschile' },
          { en: 'feminine', it: 'femminile' },
          { en: 'neuter', it: 'neutro' },
        ],
        rows: [
          [{ en: 'nominative', it: 'nominativo' }, 'kein', 'keine', 'kein'],
          [{ en: 'accusative', it: 'accusativo' }, 'keinen', 'keine', 'kein'],
        ],
        highlight: [[1, 1]],
      },
      {
        kind: 'example',
        text: 'Ich habe kein Auto.',
        gloss: { en: 'I don’t have a car.', it: 'Non ho la macchina.' },
      },
      {
        kind: 'example',
        text: 'Ich sehe keinen Mann.',
        gloss: { en: 'I don’t see a man.', it: 'Non vedo nessun uomo.' },
        note: { en: 'accusative masculine → keinen', it: 'accusativo maschile → keinen' },
      },
      { kind: 'example', text: 'Er arbeitet nicht.', gloss: { en: 'He doesn’t work.', it: 'Non lavora.' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Quick test: could you put **ein** in front of the thing you’re negating (or is it a bare noun like *Bier*)? Then use **kein** — declined like *ein*. Everything else gets **nicht**.',
          it: 'Test rapido: davanti alla cosa che stai negando potresti mettere **ein** (o è un sostantivo senza articolo come *Bier*)? Allora usa **kein** — declinato come *ein*. Tutto il resto prende **nicht**.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'nicht vs kein', it: 'nicht o kein' } }],
    introLexemeIds: ['de/noun/bier', 'de/noun/auto', 'de/noun/milch'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'trinke', '___', 'Bier.'],
            gapIndex: 2,
            gloss: { en: 'I don’t drink beer.', it: 'Non bevo birra.' },
            answer: 'kein',
            accepted: [],
            options: [
              { text: 'kein' },
              { text: 'nicht', strategy: 'nichtKeinSwap' },
              { text: 'keinen', strategy: 'wrongCaseArticle' },
              { text: 'keine', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-negation:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'habe', '___', 'Auto.'],
            gapIndex: 2,
            gloss: { en: 'I don’t have a car.', it: 'Non ho la macchina.' },
            answer: 'kein',
            accepted: [],
            options: [
              { text: 'kein' },
              { text: 'nicht', strategy: 'nichtKeinSwap' },
              { text: 'keinen', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-negation:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', 'arbeitet', '___'],
            gapIndex: 2,
            gloss: { en: 'He doesn’t work.', it: 'Non lavora.' },
            answer: 'nicht',
            accepted: [],
            options: [
              { text: 'nicht' },
              { text: 'kein', strategy: 'nichtKeinSwap' },
              { text: 'keine', strategy: 'nichtKeinSwap' },
            ],
            skillIds: ['de-negation:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'sehe', '___', 'Mann.'],
            gapIndex: 2,
            gloss: { en: 'I don’t see a man.', it: 'Non vedo nessun uomo.' },
            answer: 'keinen',
            accepted: [],
            options: [
              { text: 'keinen' },
              { text: 'kein', strategy: 'wrongCaseArticle' },
              { text: 'keine', strategy: 'wrongCaseArticle' },
              { text: 'nicht', strategy: 'nichtKeinSwap' },
            ],
            skillIds: ['de-negation:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Sie', 'trinkt', '___', 'Milch.'],
            gapIndex: 2,
            gloss: { en: 'She doesn’t drink milk.', it: 'Lei non beve latte.' },
            answer: 'keine',
            accepted: [],
            options: [
              { text: 'keine' },
              { text: 'keinen', strategy: 'wrongCaseArticle' },
              { text: 'nicht', strategy: 'nichtKeinSwap' },
            ],
            skillIds: ['de-negation:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Der', 'Kaffee', 'ist', '___', 'gut.'],
            gapIndex: 3,
            gloss: { en: 'The coffee is not good.', it: 'Il caffè non è buono.' },
            answer: 'nicht',
            accepted: [],
            options: [
              { text: 'nicht' },
              { text: 'kein', strategy: 'nichtKeinSwap' },
              { text: 'keinen', strategy: 'nichtKeinSwap' },
            ],
            skillIds: ['de-negation:core'],
          },
        ],
      },
    ],
    errorHints: {
      nichtKeinSwap: {
        en: 'kein for nouns you could put ein before (or bare nouns); nicht for verbs, adjectives and everything else.',
        it: 'kein per i sostantivi davanti a cui potresti mettere ein (o senza articolo); nicht per verbi, aggettivi e tutto il resto.',
      },
      wrongCaseArticle: {
        en: 'kein declines like ein — accusative masculine is keinen: Ich sehe keinen Mann.',
        it: 'kein si declina come ein — l’accusativo maschile è keinen: Ich sehe keinen Mann.',
      },
    },
  },

  {
    id: 'de-vowel-change',
    lang: 'de',
    title: { en: 'Strong verbs: du/er vowel change', it: 'Verbi forti: cambio di vocale con du/er' },
    ruleSummary: {
      en: 'Some verbs change their vowel in du and er/sie/es only: fahren → du fährst, essen → du isst.',
      it: 'Alcuni verbi cambiano vocale solo con du e er/sie/es: fahren → du fährst, essen → du isst.',
    },
    cefr: 'A1',
    dependencies: ['de-regular-present'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'A group of very common verbs — the **strong verbs** — changes its stem vowel in exactly two forms: **du** and **er/sie/es**. Three patterns: **a → ä** (*fahren → fährst/fährt*, *schlafen → schläfst*), **e → i** (*essen → isst*, *sprechen → sprichst*, *nehmen → nimmst*, *geben → gibst*) and **e → ie** (*lesen → liest*, *sehen → siehst*). All other forms are perfectly regular: *wir fahren*, *ihr fahrt*.',
          it: 'Un gruppo di verbi molto comuni — i **verbi forti** — cambia la vocale della radice in esattamente due forme: **du** e **er/sie/es**. Tre schemi: **a → ä** (*fahren → fährst/fährt*, *schlafen → schläfst*), **e → i** (*essen → isst*, *sprechen → sprichst*, *nehmen → nimmst*, *geben → gibst*) e **e → ie** (*lesen → liest*, *sehen → siehst*). Tutte le altre forme sono perfettamente regolari: *wir fahren*, *ihr fahrt*.',
        },
      },
      {
        kind: 'table',
        caption: {
          en: 'fahren & essen — the vowel changes in du and er only',
          it: 'fahren e essen — la vocale cambia solo con du e er',
        },
        header: ['', 'fahren (a → ä)', 'essen (e → i)'],
        rows: [
          ['ich', 'fahre', 'esse'],
          ['du', 'fährst', 'isst'],
          ['er / sie / es', 'fährt', 'isst'],
          ['wir', 'fahren', 'essen'],
          ['ihr', 'fahrt', 'esst'],
          ['sie / Sie', 'fahren', 'essen'],
        ],
        highlight: [
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
        ],
      },
      {
        kind: 'example',
        text: 'Du fährst nach Berlin.',
        gloss: { en: 'You are driving to Berlin.', it: 'Vai a Berlino.' },
      },
      { kind: 'example', text: 'Er isst Brot.', gloss: { en: 'He eats bread.', it: 'Mangia il pane.' } },
      {
        kind: 'example',
        text: 'Wir fahren nach Berlin.',
        gloss: { en: 'We are driving to Berlin.', it: 'Andiamo a Berlino.' },
        note: { en: 'wir keeps the stem — no change', it: 'wir mantiene la radice — nessun cambio' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'The change never leaves *du* and *er/sie/es*: **wir fahren, ihr fahrt** keep the plain stem. And *nehmen* doubles the *m* on top of the vowel change: *du nimmst, er nimmt*.',
          it: 'Il cambio non esce mai da *du* e *er/sie/es*: **wir fahren, ihr fahrt** mantengono la radice semplice. E *nehmen*, oltre al cambio di vocale, raddoppia la *m*: *du nimmst, er nimmt*.',
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
    introLexemeIds: [
      'de/verb/fahren',
      'de/verb/sehen',
      'de/verb/sprechen',
      'de/verb/schlafen',
      'de/verb/nehmen',
      'de/verb/geben',
    ],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/fahren', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/essen', tense: 'pres', persons: ['2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/fahren', tense: 'pres', persons: ['2sg', '1pl'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/lesen', tense: 'pres', persons: ['3sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'de/verb/schlafen', tense: 'pres', persons: ['2sg'], type: 'cloze' },
    ],
    errorHints: {
      missingVowelChange: {
        en: 'This verb changes its vowel for du and er/sie/es: fährst, isst, liest.',
        it: 'Questo verbo cambia vocale con du e er/sie/es: fährst, isst, liest.',
      },
      wrongPerson: {
        en: 'Only du and er/sie/es change the vowel — wir, ihr and sie/Sie keep the infinitive stem.',
        it: 'Solo du e er/sie/es cambiano la vocale — wir, ihr e sie/Sie mantengono la radice dell’infinito.',
      },
      infinitive: {
        en: 'That’s the dictionary form — conjugate it, and check the vowel.',
        it: 'Questa è la forma del dizionario — coniugalo e controlla la vocale.',
      },
    },
  },

  {
    id: 'de-coord-conjunctions',
    lang: 'de',
    title: 'und, aber, oder, denn',
    ruleSummary: {
      en: 'und, aber, oder, denn sit at “position zero” — the word order stays verb-second after them.',
      it: 'und, aber, oder, denn occupano la “posizione zero” — dopo di loro l’ordine resta con il verbo in seconda posizione.',
    },
    cefr: 'A1',
    dependencies: ['de-word-order-v2'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Four little connectors join whole sentences: **und** (and), **aber** (but), **oder** (or), **denn** (because). They occupy “**position zero**” — they don’t count as an element at all, so the clause after them keeps its normal verb-second order: *Ich trinke Kaffee, **aber** er trinkt Tee.* Nothing moves.',
          it: 'Quattro piccoli connettori uniscono frasi intere: **und** (e), **aber** (ma), **oder** (o), **denn** (perché). Occupano la “**posizione zero**” — non contano affatto come elemento, quindi la frase che segue mantiene il normale ordine con il verbo in seconda posizione: *Ich trinke Kaffee, **aber** er trinkt Tee.* Non si sposta nulla.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The four connectors', it: 'I quattro connettori' },
        header: [
          { en: 'connector', it: 'connettore' },
          { en: 'meaning', it: 'significato' },
          { en: 'example', it: 'esempio' },
        ],
        rows: [
          ['und', { en: 'and', it: 'e' }, 'Ich lese und er schläft.'],
          ['aber', { en: 'but', it: 'ma' }, 'Ich arbeite, aber er schläft.'],
          ['oder', { en: 'or', it: 'o' }, 'Trinkst du Kaffee oder Tee?'],
          ['denn', { en: 'because', it: 'perché' }, 'Ich lerne Deutsch, denn es ist schön.'],
        ],
      },
      {
        kind: 'example',
        text: 'Ich trinke Kaffee, aber er trinkt Tee.',
        gloss: { en: 'I drink coffee, but he drinks tea.', it: 'Io bevo il caffè, ma lui beve il tè.' },
      },
      {
        kind: 'example',
        text: 'Trinkst du Kaffee oder Tee?',
        gloss: { en: 'Do you drink coffee or tea?', it: 'Bevi caffè o tè?' },
      },
      {
        kind: 'example',
        text: 'Ich lerne Deutsch, denn es ist schön.',
        gloss: { en: 'I am learning German, because it is beautiful.', it: 'Imparo il tedesco perché è bello.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Later you’ll meet **weil**, which also means “because” but kicks the verb to the end of its clause. **denn** is the easy one: subject + verb, exactly as usual.',
          it: 'Più avanti incontrerai **weil**, che significa anch’esso “perché” ma spedisce il verbo alla fine della sua frase. **denn** è quello facile: soggetto + verbo, esattamente come al solito.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'connectors', it: 'connettori' } }],
    introLexemeIds: [],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'lerne', 'Deutsch,', '___', 'es', 'ist', 'schön.'],
            gapIndex: 3,
            gloss: {
              en: 'I am learning German, because it is beautiful.',
              it: 'Imparo il tedesco perché è bello.',
            },
            answer: 'denn',
            accepted: [],
            options: [
              { text: 'denn' },
              { text: 'aber', strategy: 'vocabConfusable' },
              { text: 'oder', strategy: 'vocabConfusable' },
              { text: 'und', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-coord-conjunctions:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Trinkst', 'du', 'Kaffee', '___', 'Tee?'],
            gapIndex: 3,
            gloss: { en: 'Do you drink coffee or tea?', it: 'Bevi caffè o tè?' },
            answer: 'oder',
            accepted: [],
            options: [
              { text: 'oder' },
              { text: 'und', strategy: 'vocabConfusable' },
              { text: 'denn', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-coord-conjunctions:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'arbeite', 'heute,', '___', 'er', 'schläft.'],
            gapIndex: 3,
            gloss: { en: 'I am working today, but he is sleeping.', it: 'Io oggi lavoro, ma lui dorme.' },
            answer: 'aber',
            accepted: [],
            options: [
              { text: 'aber' },
              { text: 'und', strategy: 'vocabConfusable' },
              { text: 'oder', strategy: 'vocabConfusable' },
              { text: 'denn', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-coord-conjunctions:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', 'isst', 'Brot', '___', 'trinkt', 'Wasser.'],
            gapIndex: 3,
            gloss: { en: 'He eats bread and drinks water.', it: 'Mangia pane e beve acqua.' },
            answer: 'und',
            accepted: [],
            options: [
              { text: 'und' },
              { text: 'oder', strategy: 'vocabConfusable' },
              { text: 'aber', strategy: 'vocabConfusable' },
              { text: 'denn', strategy: 'vocabConfusable' },
            ],
            skillIds: ['de-coord-conjunctions:core'],
          },
        ],
      },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ich lese und er schläft',
            gloss: { en: 'I read and he sleeps', it: 'Io leggo e lui dorme' },
            cellId: 'core',
          },
          {
            answer: 'Er isst Brot aber ich esse Reis',
            gloss: { en: 'He eats bread but I eat rice', it: 'Lui mangia pane ma io mangio riso' },
            cellId: 'core',
          },
        ],
      },
    ],
    errorHints: {
      vocabConfusable: {
        en: 'und = and, aber = but, oder = or, denn = because — pick the one that matches the English.',
        it: 'und = e, aber = ma, oder = o, denn = perché — scegli quello che corrisponde alla frase italiana.',
      },
      v2Violation: {
        en: 'After und, aber, oder and denn nothing moves: subject first, verb second, as usual.',
        it: 'Dopo und, aber, oder e denn non si sposta nulla: soggetto per primo, verbo in seconda posizione, come al solito.',
      },
    },
  },
]
