import type { Topic } from '../../types'

// Unit DE-3 · Modal & Co
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U3_TOPICS: Topic[] = [
  {
    id: 'de-modal-verbs',
    lang: 'de',
    title: { en: 'Modal verbs', it: 'I verbi modali' },
    ruleSummary: {
      en: 'Modal in position 2, infinitive at the END: Ich kann heute nicht kommen.',
      it: 'Il modale in seconda posizione, l’infinito ALLA FINE: Ich kann heute nicht kommen.',
    },
    cefr: 'A1',
    dependencies: ['de-word-order-v2', 'de-vowel-change'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'The modal verbs — **können** (can), **müssen** (must), **wollen** (to want), **dürfen** (may), **sollen** (should), **möchten** (would like) — add a nuance to another verb. Two things to learn. First, their **singular is irregular**: *ich kann, du kannst, er kann* — the 1sg and 3sg are identical, and **er/sie/es takes no -t**. Second, the other verb goes to the **end of the sentence** as a plain infinitive: *Ich kann heute nicht **kommen**.* Modal and infinitive form a frame around everything else — the **Satzklammer** (sentence bracket).',
          it: 'I verbi modali — **können** (potere), **müssen** (dovere), **wollen** (volere), **dürfen** (potere, avere il permesso), **sollen** (dovere, consiglio), **möchten** (gradire) — aggiungono una sfumatura a un altro verbo. Due cose da imparare. Primo, il loro **singolare è irregolare**: *ich kann, du kannst, er kann* — la 1ª e la 3ª persona sono identiche, e **er/sie/es non prende la -t**. Secondo, l’altro verbo va **alla fine della frase** all’infinito: *Ich kann heute nicht **kommen**.* Modale e infinito formano una cornice intorno a tutto il resto — la **Satzklammer** (la parentesi verbale).',
        },
      },
      {
        kind: 'table',
        caption: {
          en: 'können, müssen, wollen — irregular singular, regular plural',
          it: 'können, müssen, wollen — singolare irregolare, plurale regolare',
        },
        header: ['', 'können', 'müssen', 'wollen'],
        rows: [
          ['ich', 'kann', 'muss', 'will'],
          ['du', 'kannst', 'musst', 'willst'],
          ['er / sie / es', 'kann', 'muss', 'will'],
          ['wir', 'können', 'müssen', 'wollen'],
          ['ihr', 'könnt', 'müsst', 'wollt'],
          ['sie / Sie', 'können', 'müssen', 'wollen'],
        ],
        highlight: [
          [2, 1],
          [2, 2],
          [2, 3],
        ],
      },
      {
        kind: 'example',
        text: 'Ich kann heute nicht kommen.',
        gloss: { en: 'I can’t come today.', it: 'Oggi non posso venire.' },
        note: { en: 'kommen waits at the very end', it: 'kommen aspetta proprio alla fine' },
      },
      {
        kind: 'example',
        text: 'Er muss jetzt arbeiten.',
        gloss: { en: 'He has to work now.', it: 'Lui deve lavorare adesso.' },
        note: { en: 'er muss — no -t', it: 'er muss — niente -t' },
      },
      {
        kind: 'example',
        text: 'Möchtest du Kaffee trinken?',
        gloss: { en: 'Would you like to drink coffee?', it: 'Vorresti bere un caffè?' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Almost like Italian: *posso venire* = modal + infinitive. The difference is the word order — the infinitive marches to the **END**, past everything else: *Ich kann **heute nicht** kommen*, literally “I can today not come”. Whatever you add to the sentence lands **inside** the bracket.',
          it: 'Quasi come in italiano: *posso venire* = modale + infinito. La differenza è l’ordine — l’infinito marcia fino **ALLA FINE**, oltre tutto il resto: *Ich kann **heute nicht** kommen*, alla lettera “posso oggi non venire”. Tutto ciò che aggiungi alla frase finisce **dentro** la parentesi.',
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
      { cellId: 'bracket', label: { en: 'sentence bracket', it: 'la parentesi verbale' } },
    ],
    introLexemeIds: [
      'de/verb/können',
      'de/verb/müssen',
      'de/verb/wollen',
      'de/verb/dürfen',
      'de/verb/möchten',
    ],
    drillItems: [
      { gen: 'match-verb', verbId: 'de/verb/können', tense: 'pres' },
      { gen: 'conj', verbId: 'de/verb/müssen', tense: 'pres', persons: ['1sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/wollen', tense: 'pres', persons: ['2sg', '3sg'], type: 'mc' },
      { gen: 'conj', verbId: 'de/verb/dürfen', tense: 'pres', persons: ['3sg'], type: 'cloze' },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ich kann heute nicht kommen',
            gloss: { en: 'I can’t come today', it: 'Oggi non posso venire' },
            cellId: 'bracket',
          },
          {
            answer: 'Wir wollen Deutsch lernen',
            gloss: { en: 'We want to learn German', it: 'Vogliamo imparare il tedesco' },
            cellId: 'bracket',
          },
          {
            answer: 'Er muss jetzt arbeiten',
            gloss: { en: 'He has to work now', it: 'Lui deve lavorare adesso' },
            cellId: 'bracket',
          },
          {
            answer: 'Möchtest du Kaffee trinken',
            gloss: { en: 'Would you like to drink coffee?', it: 'Vorresti bere un caffè?' },
            cellId: 'bracket',
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Modal singulars are irregular: ich kann, du kannst, er kann — er/sie/es takes no -t.',
        it: 'Il singolare dei modali è irregolare: ich kann, du kannst, er kann — er/sie/es non prende la -t.',
      },
      infinitive: {
        en: 'That’s the dictionary form — the conjugated modal changes its vowel in the singular: kann, muss, will, darf.',
        it: 'Questa è la forma del dizionario — il modale coniugato cambia vocale al singolare: kann, muss, will, darf.',
      },
      v2Violation: {
        en: 'The modal sits in position 2; the other verb waits at the END as an infinitive.',
        it: 'Il modale sta in seconda posizione; l’altro verbo aspetta ALLA FINE all’infinito.',
      },
    },
  },

  {
    id: 'de-separable-verbs',
    lang: 'de',
    title: { en: 'Separable verbs', it: 'I verbi separabili' },
    ruleSummary: {
      en: 'aufstehen → Ich stehe um sieben auf: the prefix breaks off and goes to the END.',
      it: 'aufstehen → Ich stehe um sieben auf: il prefisso si stacca e va ALLA FINE.',
    },
    cefr: 'A1',
    dependencies: ['de-word-order-v2'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Many German verbs carry a little prefix — **auf**stehen (to get up), **ein**kaufen (to go shopping), **mit**kommen (to come along). In the dictionary they are one word, but in a present-tense sentence the prefix **breaks off**: the conjugated part sits in position 2 as usual, and the prefix flies to the **very end** — *Ich **stehe** um sieben **auf**.* It’s the same bracket you know from the modals, with the prefix closing it.',
          it: 'Molti verbi tedeschi portano un piccolo prefisso — **auf**stehen (alzarsi), **ein**kaufen (fare la spesa), **mit**kommen (venire insieme). Nel dizionario sono una parola sola, ma in una frase al presente il prefisso **si stacca**: la parte coniugata sta in seconda posizione come sempre, e il prefisso vola **proprio alla fine** — *Ich **stehe** um sieben **auf**.* È la stessa parentesi che conosci dai modali, chiusa dal prefisso.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Three everyday separable verbs', it: 'Tre verbi separabili di ogni giorno' },
        header: [
          { en: 'infinitive', it: 'infinito' },
          { en: 'meaning', it: 'significato' },
          { en: 'example', it: 'esempio' },
        ],
        rows: [
          ['aufstehen', { en: 'to get up', it: 'alzarsi' }, 'Ich stehe um sieben auf.'],
          ['einkaufen', { en: 'to go shopping', it: 'fare la spesa' }, 'Wir kaufen heute ein.'],
          ['mitkommen', { en: 'to come along', it: 'venire insieme' }, 'Kommst du mit?'],
        ],
      },
      {
        kind: 'example',
        text: 'Ich stehe um sieben auf.',
        gloss: { en: 'I get up at seven.', it: 'Mi alzo alle sette.' },
        note: { en: 'auf closes the sentence', it: 'auf chiude la frase' },
      },
      {
        kind: 'example',
        text: 'Kommst du mit?',
        gloss: { en: 'Are you coming along?', it: 'Vieni con noi?' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'In Italian the particle stays glued to the verb (*mi alzo*); in German it detaches and closes the sentence. Handy clue: in the infinitive the stress falls on the prefix — **AUF**stehen, **EIN**kaufen — exactly the part that will break off.',
          it: 'In italiano la particella resta attaccata al verbo (*mi alzo*); in tedesco si stacca e chiude la frase. Indizio utile: all’infinito l’accento cade sul prefisso — **AUF**stehen, **EIN**kaufen — esattamente la parte che si staccherà.',
        },
      },
    ],
    skillCells: [{ cellId: 'split', label: { en: 'separated prefix', it: 'prefisso staccato' } }],
    introLexemeIds: ['de/verb/aufstehen', 'de/verb/einkaufen', 'de/verb/mitkommen'],
    drillItems: [
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Ich stehe um sieben auf',
            gloss: { en: 'I get up at seven', it: 'Mi alzo alle sette' },
            cellId: 'split',
          },
          {
            answer: 'Wir kaufen heute ein',
            gloss: { en: 'We are shopping today', it: 'Oggi facciamo la spesa' },
            cellId: 'split',
          },
          {
            answer: 'Kommst du mit',
            gloss: { en: 'Are you coming along?', it: 'Vieni con noi?' },
            cellId: 'split',
          },
          {
            answer: 'Er steht spät auf',
            gloss: { en: 'He gets up late', it: 'Lui si alza tardi' },
            cellId: 'split',
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
              en: 'Which sentence is correct? — “I get up at seven.”',
              it: 'Quale frase è corretta? — “Mi alzo alle sette.”',
            },
            answer: 'Ich stehe um sieben auf.',
            accepted: [],
            options: [
              { text: 'Ich stehe um sieben auf.' },
              { text: 'Ich aufstehe um sieben.', strategy: 'prefixNotSeparated' },
              { text: 'Ich stehe auf um sieben.', strategy: 'v2Violation' },
            ],
            skillIds: ['de-separable-verbs:split'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: [],
            gloss: {
              en: 'Which sentence is correct? — “We are shopping today.”',
              it: 'Quale frase è corretta? — “Oggi facciamo la spesa.”',
            },
            answer: 'Wir kaufen heute ein.',
            accepted: [],
            options: [
              { text: 'Wir kaufen heute ein.' },
              { text: 'Wir einkaufen heute.', strategy: 'prefixNotSeparated' },
              { text: 'Wir kaufen ein heute.', strategy: 'v2Violation' },
            ],
            skillIds: ['de-separable-verbs:split'],
          },
        ],
      },
    ],
    errorHints: {
      prefixNotSeparated: {
        en: 'In the present the prefix breaks off: aufstehen → Ich stehe … auf.',
        it: 'Al presente il prefisso si stacca: aufstehen → Ich stehe … auf.',
      },
      v2Violation: {
        en: 'Conjugated part in position 2, prefix at the very END — nothing comes after it.',
        it: 'Parte coniugata in seconda posizione, prefisso PROPRIO ALLA FINE — dopo di lui non viene nulla.',
      },
    },
  },

  {
    id: 'de-imperative',
    lang: 'de',
    title: { en: 'The imperative', it: 'L’imperativo' },
    ruleSummary: {
      en: 'du: bare stem (Geh!), ihr: -t (Geht!), Sie: infinitive + Sie (Gehen Sie!).',
      it: 'du: radice nuda (Geh!), ihr: -t (Geht!), Sie: infinito + Sie (Gehen Sie!).',
    },
    cefr: 'A1',
    dependencies: ['de-vowel-change'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Three commands, three recipes. **du**: the bare stem, no pronoun, no ending — *Geh! Trink!* **ihr**: the normal ihr-form without the pronoun — *Geht! Trinkt!* **Sie**: infinitive + *Sie*, inverted — *Gehen Sie!* The strong verbs bring one twist: the **e → i(e)** change survives in the du-imperative (*Iss! Lies! Sprich!*), but the **a → ä** change does **not** (*Fahr! Schlaf!*).',
          it: 'Tre comandi, tre ricette. **du**: la radice nuda, senza pronome e senza desinenza — *Geh! Trink!* **ihr**: la normale forma di ihr senza il pronome — *Geht! Trinkt!* **Sie**: infinito + *Sie*, invertiti — *Gehen Sie!* I verbi forti portano una sorpresa: il cambio **e → i(e)** sopravvive nell’imperativo con du (*Iss! Lies! Sprich!*), mentre il cambio **a → ä** **no** (*Fahr! Schlaf!*).',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The three imperatives', it: 'I tre imperativi' },
        header: ['', 'gehen', 'essen (e → i)', 'fahren (a → ä)'],
        rows: [
          ['du', 'Geh!', 'Iss!', 'Fahr!'],
          ['ihr', 'Geht!', 'Esst!', 'Fahrt!'],
          ['Sie', 'Gehen Sie!', 'Essen Sie!', 'Fahren Sie!'],
        ],
        highlight: [
          [0, 2],
          [0, 3],
        ],
      },
      {
        kind: 'example',
        text: 'Trink deine Milch!',
        gloss: { en: 'Drink your milk!', it: 'Bevi il tuo latte!' },
        note: { en: 'du: bare stem, no pronoun', it: 'du: radice nuda, senza pronome' },
      },
      {
        kind: 'example',
        text: 'Iss dein Brot!',
        gloss: { en: 'Eat your bread!', it: 'Mangia il tuo pane!' },
        note: { en: 'e → i survives in the du-imperative', it: 'e → i resta nell’imperativo con du' },
      },
      {
        kind: 'example',
        text: 'Sprechen Sie bitte langsam!',
        gloss: { en: 'Please speak slowly!', it: 'Parli lentamente, per favore!' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Keep the two vowel families apart: **e → i(e)** stays — *Iss!, Lies!, Nimm!* — but **a → ä** disappears — *Fahr!*, never *Fähr!*. And the du-imperative has no -st: *du trinkst* → *Trink!*',
          it: 'Tieni separate le due famiglie di vocali: **e → i(e)** resta — *Iss!, Lies!, Nimm!* — ma **a → ä** sparisce — *Fahr!*, mai *Fähr!*. E l’imperativo con du non ha la -st: *du trinkst* → *Trink!*',
        },
      },
    ],
    skillCells: [
      { cellId: 'du', label: { en: 'du imperative', it: 'imperativo con du' } },
      { cellId: 'formal', label: { en: 'Sie imperative', it: 'imperativo con Sie' } },
    ],
    introLexemeIds: [
      'de/verb/gehen',
      'de/verb/trinken',
      'de/verb/essen',
      'de/verb/lesen',
      'de/verb/sprechen',
    ],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['___', 'deine', 'Milch'],
            gapIndex: 0,
            gloss: { en: 'Drink your milk! (du)', it: 'Bevi il tuo latte! (du)' },
            answer: 'Trink',
            accepted: [],
            strictSuffixLen: 0,
            skillIds: ['de-imperative:du'],
          },
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['___', 'Sie', 'bitte', 'langsam'],
            gapIndex: 0,
            gloss: { en: 'Please speak slowly! (Sie)', it: 'Parli lentamente, per favore! (Sie)' },
            answer: 'Sprechen',
            accepted: [],
            strictSuffixLen: 2,
            skillIds: ['de-imperative:formal'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'dein', 'Brot'],
            gapIndex: 0,
            gloss: { en: 'Eat your bread! (du)', it: 'Mangia il tuo pane! (du)' },
            answer: 'Iss',
            accepted: [],
            options: [
              { text: 'Iss' },
              { text: 'Ess', strategy: 'missingVowelChange' },
              { text: 'Esse', strategy: 'wrongPerson' },
              { text: 'Esst', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-imperative:du'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'das', 'Buch'],
            gapIndex: 0,
            gloss: { en: 'Read the book! (du)', it: 'Leggi il libro! (du)' },
            answer: 'Lies',
            accepted: [],
            options: [
              { text: 'Lies' },
              { text: 'Les', strategy: 'missingVowelChange' },
              { text: 'Lest', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-imperative:du'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'nach', 'Berlin'],
            gapIndex: 0,
            gloss: { en: 'Drive to Berlin! (du)', it: 'Vai a Berlino! (du)' },
            answer: 'Fahr',
            accepted: [],
            options: [
              { text: 'Fahr' },
              { text: 'Fähr', strategy: 'missingVowelChange' },
              { text: 'Fährst', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-imperative:du'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'nach', 'Hause'],
            gapIndex: 0,
            gloss: { en: 'Go home! (Sie)', it: 'Vada a casa! (Sie)' },
            answer: 'Gehen Sie',
            accepted: [],
            options: [
              { text: 'Gehen Sie' },
              { text: 'Geh Sie', strategy: 'wrongPerson' },
              { text: 'Geht Sie', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-imperative:formal'],
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Match the imperative to the person: du → bare stem (Geh!), ihr → -t (Geht!), Sie → infinitive + Sie (Gehen Sie!).',
        it: 'Abbina l’imperativo alla persona: du → radice nuda (Geh!), ihr → -t (Geht!), Sie → infinito + Sie (Gehen Sie!).',
      },
      missingVowelChange: {
        en: 'e → i(e) stays in the du-imperative (Iss!, Lies!), but a → ä disappears: Fahr!, Schlaf!',
        it: 'e → i(e) resta nell’imperativo con du (Iss!, Lies!), ma a → ä sparisce: Fahr!, Schlaf!',
      },
    },
  },

  {
    id: 'de-possessives',
    lang: 'de',
    title: { en: 'Possessives', it: 'I possessivi' },
    ruleSummary: {
      en: 'mein, dein, sein, ihr, unser, euer decline like ein: acc masculine adds -en (meinen).',
      it: 'mein, dein, sein, ihr, unser, euer si declinano come ein: l’accusativo maschile aggiunge -en (meinen).',
    },
    cefr: 'A1',
    dependencies: ['de-nom-acc'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'One stem per owner: **mein** (my), **dein** (your, du), **sein** (his/its), **ihr** (her/their), **unser** (our), **euer** (your, ihr), **Ihr** (your, formal). They all take exactly the endings of *ein*: feminine and plural add **-e** (*meine Schwester*), masculine and neuter nominative take **no ending** (*mein Bruder, mein Auto*) — and in the accusative only the masculine changes, adding **-en**: *Ich sehe meinen Bruder.* No article on top: never *der mein Bruder*.',
          it: 'Una radice per possessore: **mein** (mio), **dein** (tuo), **sein** (suo di lui), **ihr** (suo di lei / loro), **unser** (nostro), **euer** (vostro), **Ihr** (Suo, formale). Prendono tutte esattamente le desinenze di *ein*: femminile e plurale aggiungono **-e** (*meine Schwester*), maschile e neutro al nominativo restano **senza desinenza** (*mein Bruder, mein Auto*) — e all’accusativo cambia solo il maschile, che aggiunge **-en**: *Ich sehe meinen Bruder.* Niente articolo davanti: mai *der mein Bruder*, a differenza di “il mio…”.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The possessive stems', it: 'Le radici dei possessivi' },
        header: [
          { en: 'owner', it: 'possessore' },
          { en: 'stem', it: 'radice' },
        ],
        rows: [
          ['ich', 'mein'],
          ['du', 'dein'],
          ['er / es', 'sein'],
          ['sie', 'ihr'],
          ['wir', 'unser'],
          ['ihr', 'euer'],
          ['sie / Sie', 'ihr / Ihr'],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'Endings — like ein (shown with mein)', it: 'Le desinenze — come ein (esempio con mein)' },
        header: [
          '',
          { en: 'masculine', it: 'maschile' },
          { en: 'feminine', it: 'femminile' },
          { en: 'neuter', it: 'neutro' },
          { en: 'plural', it: 'plurale' },
        ],
        rows: [
          [{ en: 'nominative', it: 'nominativo' }, 'mein', 'meine', 'mein', 'meine'],
          [{ en: 'accusative', it: 'accusativo' }, 'meinen', 'meine', 'mein', 'meine'],
        ],
        highlight: [[1, 1]],
      },
      {
        kind: 'example',
        text: 'Mein Bruder wohnt in Berlin.',
        gloss: { en: 'My brother lives in Berlin.', it: 'Mio fratello abita a Berlino.' },
      },
      {
        kind: 'example',
        text: 'Ich sehe seine Schwester.',
        gloss: { en: 'I see his sister.', it: 'Vedo sua sorella (di lui).' },
        note: { en: 'sein = his; -e agrees with Schwester', it: 'sein = di lui; la -e concorda con Schwester' },
      },
      {
        kind: 'example',
        text: 'Das ist ihr Auto.',
        gloss: { en: 'That is her car.', it: 'Quella è la sua macchina (di lei).' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: 'Italian *suo* only agrees with the thing owned; German first picks the stem by the **owner** — **sein** = his, **ihr** = her — and then the ending by the thing: *seine Schwester* (his sister) vs *ihre Schwester* (her sister). Small extra: *euer* drops an e before endings — *eure Mutter*.',
          it: 'L’italiano *suo* concorda solo con la cosa posseduta; il tedesco prima sceglie la radice in base al **possessore** — **sein** = di lui, **ihr** = di lei — e poi la desinenza in base alla cosa: *seine Schwester* (la sorella di lui) vs *ihre Schwester* (la sorella di lei). Dettaglio in più: *euer* perde una e davanti alle desinenze — *eure Mutter*.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'possessives (nom/acc)', it: 'possessivi (nom/acc)' } }],
    introLexemeIds: ['de/noun/bruder', 'de/noun/schwester', 'de/noun/auto', 'de/noun/familie'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['___', 'Bruder', 'wohnt', 'in', 'Berlin.'],
            gapIndex: 0,
            gloss: { en: 'My brother lives in Berlin.', it: 'Mio fratello abita a Berlino.' },
            answer: 'Mein',
            accepted: [],
            options: [
              { text: 'Mein' },
              { text: 'Meine', strategy: 'wrongGenderArticle' },
              { text: 'Meinen', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-possessives:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'sehe', '___', 'Schwester.'],
            gapIndex: 2,
            gloss: { en: 'I see his sister.', it: 'Vedo sua sorella (di lui).' },
            answer: 'seine',
            accepted: [],
            options: [
              { text: 'seine' },
              { text: 'sein', strategy: 'wrongGenderArticle' },
              { text: 'ihre', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-possessives:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Das', 'ist', '___', 'Auto.'],
            gapIndex: 2,
            gloss: { en: 'That is our car.', it: 'Quella è la nostra macchina.' },
            answer: 'unser',
            accepted: [],
            options: [
              { text: 'unser' },
              { text: 'unsere', strategy: 'wrongGenderArticle' },
              { text: 'unseren', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-possessives:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Das', 'ist', '___', 'Bruder.'],
            gapIndex: 2,
            gloss: { en: 'That is her brother.', it: 'Quello è suo fratello (di lei).' },
            answer: 'ihr',
            accepted: [],
            options: [
              { text: 'ihr' },
              { text: 'sein', strategy: 'wrongPerson' },
              { text: 'ihre', strategy: 'wrongGenderArticle' },
            ],
            skillIds: ['de-possessives:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', 'sieht', '___', 'Vater.'],
            gapIndex: 2,
            gloss: { en: 'He sees his father.', it: 'Lui vede suo padre.' },
            answer: 'seinen',
            accepted: [],
            options: [
              { text: 'seinen' },
              { text: 'sein', strategy: 'wrongCaseArticle' },
              { text: 'ihren', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-possessives:core'],
          },
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['Ich', 'sehe', '___', 'Familie.'],
            gapIndex: 2,
            gloss: { en: 'I see your family. (du)', it: 'Vedo la tua famiglia. (du)' },
            answer: 'deine',
            accepted: [],
            strictSuffixLen: 1,
            skillIds: ['de-possessives:core'],
          },
        ],
      },
    ],
    errorHints: {
      wrongGenderArticle: {
        en: 'The ending agrees with the thing owned: feminine and plural take -e (meine), masculine and neuter nominative take none (mein).',
        it: 'La desinenza concorda con la cosa posseduta: femminile e plurale prendono -e (meine), maschile e neutro al nominativo nessuna (mein).',
      },
      wrongCaseArticle: {
        en: 'Like ein: only the accusative masculine adds -en — Ich sehe meinen Bruder.',
        it: 'Come ein: solo l’accusativo maschile aggiunge -en — Ich sehe meinen Bruder.',
      },
      wrongPerson: {
        en: 'Pick the stem by the OWNER: sein = his, ihr = her.',
        it: 'Scegli la radice in base al POSSESSORE: sein = di lui, ihr = di lei.',
      },
    },
  },

  {
    id: 'de-acc-pronouns',
    lang: 'de',
    title: { en: 'Accusative pronouns', it: 'I pronomi all’accusativo' },
    ruleSummary: {
      en: 'mich, dich, ihn, sie, es, uns, euch, sie — only masculine er changes visibly to ihn.',
      it: 'mich, dich, ihn, sie, es, uns, euch, sie — solo il maschile er cambia visibilmente in ihn.',
    },
    cefr: 'A1',
    dependencies: ['de-nom-acc'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'When a pronoun is the direct object, it takes its accusative form: *ich → **mich***, *du → **dich***, *er → **ihn***, *wir → **uns***, *ihr → **euch*** — while *sie* and *es* stay unchanged. Unlike Italian clitics (*mi, ti, lo…*), German pronouns are full words and come **after** the verb: *Siehst du **mich**?* — not glued in front of it.',
          it: 'Quando un pronome è complemento oggetto, prende la forma dell’accusativo: *ich → **mich***, *du → **dich***, *er → **ihn***, *wir → **uns***, *ihr → **euch*** — mentre *sie* ed *es* restano uguali. A differenza dei clitici italiani (*mi, ti, lo…*), i pronomi tedeschi sono parole piene e vengono **dopo** il verbo: *Siehst du **mich**?* — non attaccati davanti.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Nominative → accusative', it: 'Nominativo → accusativo' },
        header: [
          { en: 'nominative', it: 'nominativo' },
          { en: 'accusative', it: 'accusativo' },
          { en: 'meaning', it: 'significato' },
        ],
        rows: [
          ['ich', 'mich', { en: 'me', it: 'mi' }],
          ['du', 'dich', { en: 'you', it: 'ti' }],
          ['er', 'ihn', { en: 'him', it: 'lo' }],
          ['sie', 'sie', { en: 'her', it: 'la' }],
          ['es', 'es', { en: 'it', it: 'lo / la' }],
          ['wir', 'uns', { en: 'us', it: 'ci' }],
          ['ihr', 'euch', { en: 'you all', it: 'vi' }],
          ['sie / Sie', 'sie / Sie', { en: 'them / you (formal)', it: 'li / La' }],
        ],
        highlight: [[2, 1]],
      },
      {
        kind: 'example',
        text: 'Siehst du mich?',
        gloss: { en: 'Do you see me?', it: 'Mi vedi?' },
      },
      {
        kind: 'example',
        text: 'Ich sehe ihn nicht.',
        gloss: { en: 'I don’t see him.', it: 'Non lo vedo.' },
        note: { en: 'er → ihn', it: 'er → ihn' },
      },
      {
        kind: 'example',
        text: 'Wir hören euch.',
        gloss: { en: 'We hear you.', it: 'Vi sentiamo.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Only the masculine changes visibly: **er → ihn**, echoing **der → den**. And remember the position: Italian says *Lo vedo*, German says *Ich sehe **ihn*** — pronoun after the verb.',
          it: 'Solo il maschile cambia visibilmente: **er → ihn**, proprio come **der → den**. E occhio alla posizione: l’italiano dice *Lo vedo*, il tedesco *Ich sehe **ihn*** — pronome dopo il verbo.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'accusative pronouns', it: 'pronomi all’accusativo' } }],
    introLexemeIds: ['de/verb/sehen', 'de/verb/hören', 'de/verb/finden'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Siehst', 'du', '___'],
            gapIndex: 2,
            gloss: { en: 'Do you see me?', it: 'Mi vedi?' },
            answer: 'mich',
            accepted: [],
            options: [
              { text: 'mich' },
              { text: 'ich', strategy: 'wrongCaseArticle' },
              { text: 'dich', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-acc-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'sehe', '___', 'nicht.'],
            gapIndex: 2,
            gloss: { en: 'I don’t see him.', it: 'Non lo vedo.' },
            answer: 'ihn',
            accepted: [],
            options: [
              { text: 'ihn' },
              { text: 'er', strategy: 'wrongCaseArticle' },
              { text: 'sie', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-acc-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Wir', 'hören', '___'],
            gapIndex: 2,
            gloss: { en: 'We hear you all.', it: 'Vi sentiamo.' },
            answer: 'euch',
            accepted: [],
            options: [
              { text: 'euch' },
              { text: 'ihr', strategy: 'wrongCaseArticle' },
              { text: 'uns', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-acc-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Sie', 'findet', '___'],
            gapIndex: 2,
            gloss: { en: 'She finds us.', it: 'Lei ci trova.' },
            answer: 'uns',
            accepted: [],
            options: [
              { text: 'uns' },
              { text: 'wir', strategy: 'wrongCaseArticle' },
              { text: 'euch', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-acc-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'höre', '___'],
            gapIndex: 2,
            gloss: { en: 'I hear you. (du)', it: 'Ti sento. (du)' },
            answer: 'dich',
            accepted: [],
            options: [
              { text: 'dich' },
              { text: 'du', strategy: 'wrongCaseArticle' },
              { text: 'mich', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-acc-pronouns:core'],
          },
          {
            type: 'match',
            lang: 'de',
            sentence: [],
            gloss: {
              en: 'Match each pronoun with its accusative form',
              it: 'Abbina ogni pronome alla sua forma all’accusativo',
            },
            answer: '',
            accepted: [],
            pairs: [
              ['ich', 'mich'],
              ['du', 'dich'],
              ['er', 'ihn'],
              ['wir', 'uns'],
              ['ihr', 'euch'],
            ],
            skillIds: ['de-acc-pronouns:core'],
          },
        ],
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'After the verb you need the accusative form: er → ihn, ich → mich, du → dich.',
        it: 'Dopo il verbo serve la forma dell’accusativo: er → ihn, ich → mich, du → dich.',
      },
      wrongPerson: {
        en: 'Check who is meant: mich = me, dich = you, ihn = him, uns = us, euch = you all.',
        it: 'Controlla di chi si parla: mich = mi, dich = ti, ihn = lo, uns = ci, euch = vi.',
      },
    },
  },
]
