import type { Topic } from '../../types'

// Unit DE-4 · Der Dativ
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const DE_U4_TOPICS: Topic[] = [
  {
    id: 'de-dative-case',
    lang: 'de',
    title: { en: 'The dative case', it: 'Il dativo' },
    ruleSummary: {
      en: 'Dative articles: dem (m), der (f), dem (n), den + -n (pl); indefinite einem, einer, einem.',
      it: 'Articoli al dativo: dem (m), der (f), dem (n), den + -n (pl); indeterminativo einem, einer, einem.',
    },
    cefr: 'A2',
    dependencies: ['de-nom-acc'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'The third case marks the **indirect object** — the person something is given, said or done **to** — and it is required by certain verbs and prepositions. The definite articles are **dem** (masculine), **der** (feminine), **dem** (neuter) and **den** in the plural, where the noun itself also adds **-n** (*den Kindern*). Indefinite: **einem, einer, einem**. The weak masculine nouns add their -(e)n here too: *dem Studenten*.',
          it: 'Il terzo caso segna il **complemento di termine** — la persona **a cui** si dà, si dice o si fa qualcosa — ed è richiesto da certi verbi e preposizioni. Gli articoli determinativi sono **dem** (maschile), **der** (femminile), **dem** (neutro) e **den** al plurale, dove anche il sostantivo aggiunge una **-n** (*den Kindern*). Indeterminativo: **einem, einer, einem**. I maschili deboli aggiungono la loro -(e)n anche qui: *dem Studenten*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The full article grid: three cases', it: 'La griglia completa degli articoli: tre casi' },
        header: [
          '',
          { en: 'masculine', it: 'maschile' },
          { en: 'feminine', it: 'femminile' },
          { en: 'neuter', it: 'neutro' },
          { en: 'plural', it: 'plurale' },
        ],
        rows: [
          [{ en: 'nominative', it: 'nominativo' }, 'der / ein', 'die / eine', 'das / ein', 'die'],
          [{ en: 'accusative', it: 'accusativo' }, 'den / einen', 'die / eine', 'das / ein', 'die'],
          [{ en: 'dative', it: 'dativo' }, 'dem / einem', 'der / einer', 'dem / einem', 'den … -n'],
        ],
        highlight: [
          [2, 1],
          [2, 2],
          [2, 3],
          [2, 4],
        ],
      },
      {
        kind: 'example',
        text: 'Ich helfe dem Mann.',
        gloss: { en: 'I help the man.', it: 'Aiuto l’uomo.' },
        note: { en: 'helfen takes the dative', it: 'helfen regge il dativo' },
      },
      {
        kind: 'example',
        text: 'Wir danken der Lehrerin.',
        gloss: { en: 'We thank the teacher.', it: 'Ringraziamo la professoressa.' },
      },
      {
        kind: 'example',
        text: 'Ich helfe dem Studenten.',
        gloss: { en: 'I help the student.', it: 'Aiuto lo studente.' },
        note: { en: 'weak noun: -en also in the dative', it: 'sostantivo debole: -en anche al dativo' },
      },
      {
        kind: 'callout',
        style: 'warning',
        md: {
          en: '**der** is a trap: in the dative it is **feminine** — *der Frau* = to the woman, nothing to do with *der Mann*. And in the dative plural the **noun itself** grows an -n: *den Kindern, den Männern*.',
          it: '**der** è una trappola: al dativo è **femminile** — *der Frau* = alla donna, niente a che vedere con *der Mann*. E al dativo plurale è **il sostantivo stesso** a prendere una -n: *den Kindern, den Männern*.',
        },
      },
    ],
    skillCells: [
      { cellId: 'dat.m', label: { en: 'dative masculine (dem)', it: 'dativo maschile (dem)' } },
      { cellId: 'dat.f', label: { en: 'dative feminine (der)', it: 'dativo femminile (der)' } },
      { cellId: 'dat.n', label: { en: 'dative neuter (dem)', it: 'dativo neutro (dem)' } },
    ],
    introLexemeIds: ['de/noun/student', 'de/noun/lehrer', 'de/noun/lehrerin', 'de/noun/mädchen'],
    drillItems: [
      {
        gen: 'case-article',
        nounIds: ['de/noun/mann', 'de/noun/student', 'de/noun/lehrer'],
        count: 3,
        case: 'dat',
        det: 'def',
        number: 'sg',
        frames: [
          { tokens: ['Ich', 'helfe', '___', '{noun}'], gloss: { en: 'I help the {gloss}', it: 'Aiuto {gloss}' } },
          {
            tokens: ['Wir', 'danken', '___', '{noun}'],
            gloss: { en: 'We thank the {gloss}', it: 'Ringraziamo {gloss}' },
          },
        ],
        cellId: 'dat.m',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/frau', 'de/noun/lehrerin'],
        count: 2,
        case: 'dat',
        det: 'def',
        number: 'sg',
        frames: [
          { tokens: ['Ich', 'helfe', '___', '{noun}'], gloss: { en: 'I help the {gloss}', it: 'Aiuto {gloss}' } },
          {
            tokens: ['Wir', 'danken', '___', '{noun}'],
            gloss: { en: 'We thank the {gloss}', it: 'Ringraziamo {gloss}' },
          },
        ],
        cellId: 'dat.f',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/kind', 'de/noun/mädchen'],
        count: 2,
        case: 'dat',
        det: 'def',
        number: 'sg',
        frames: [
          { tokens: ['Ich', 'helfe', '___', '{noun}'], gloss: { en: 'I help the {gloss}', it: 'Aiuto {gloss}' } },
          {
            tokens: ['Wir', 'danken', '___', '{noun}'],
            gloss: { en: 'We thank the {gloss}', it: 'Ringraziamo {gloss}' },
          },
        ],
        cellId: 'dat.n',
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'Dative: dem (m), der (f), dem (n) — den is the accusative masculine (or the dative plural).',
        it: 'Dativo: dem (m), der (f), dem (n) — den è l’accusativo maschile (o il dativo plurale).',
      },
      wrongGenderArticle: {
        en: 'Check the gender first: masculine and neuter share dem, feminine takes der.',
        it: 'Controlla prima il genere: maschile e neutro condividono dem, il femminile prende der.',
      },
    },
  },

  {
    id: 'de-dative-pronouns',
    lang: 'de',
    title: { en: 'Dative pronouns', it: 'I pronomi al dativo' },
    ruleSummary: {
      en: 'mir, dir, ihm, ihr, uns, euch, ihnen — the “to me / to you” forms.',
      it: 'mir, dir, ihm, ihr, uns, euch, ihnen — le forme per “a me / a te”.',
    },
    cefr: 'A2',
    dependencies: ['de-dative-case', 'de-acc-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'The pronouns have a third set of forms for the dative: **mir, dir, ihm, ihr, ihm, uns, euch, ihnen** (formal **Ihnen**). Italian hides the difference — *mi* is both *mich* and *mir* (*mi vedi* = mich, *mi dai il libro* = mir) — German always shows it. Good news: **uns** and **euch** don’t change between accusative and dative.',
          it: 'I pronomi hanno una terza serie di forme per il dativo: **mir, dir, ihm, ihr, ihm, uns, euch, ihnen** (formale **Ihnen**). L’italiano nasconde la differenza — *mi* vale sia *mich* sia *mir* (*mi vedi* = mich, *mi dai il libro* = mir) — il tedesco la mostra sempre. Buona notizia: **uns** ed **euch** non cambiano tra accusativo e dativo.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Nominative → accusative → dative', it: 'Nominativo → accusativo → dativo' },
        header: [
          { en: 'nominative', it: 'nominativo' },
          { en: 'accusative', it: 'accusativo' },
          { en: 'dative', it: 'dativo' },
        ],
        rows: [
          ['ich', 'mich', 'mir'],
          ['du', 'dich', 'dir'],
          ['er', 'ihn', 'ihm'],
          ['sie', 'sie', 'ihr'],
          ['es', 'es', 'ihm'],
          ['wir', 'uns', 'uns'],
          ['ihr', 'euch', 'euch'],
          ['sie / Sie', 'sie / Sie', 'ihnen / Ihnen'],
        ],
      },
      {
        kind: 'example',
        text: 'Kannst du mir helfen?',
        gloss: { en: 'Can you help me?', it: 'Puoi aiutarmi?' },
        note: { en: 'helfen takes the dative', it: 'helfen regge il dativo' },
      },
      {
        kind: 'example',
        text: 'Ich gebe ihr das Buch.',
        gloss: { en: 'I give her the book.', it: 'Le do il libro.' },
      },
      {
        kind: 'example',
        text: 'Er gibt mir den Apfel.',
        gloss: { en: 'He gives me the apple.', it: 'Mi dà la mela.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'When Italian *mi/ti/gli/le* could go either way, ask what the verb does: direct object → **mich/dich**; “to someone” (giving, saying, helping) → **mir/dir**. And **ihr** here means “to her” — don’t confuse it with *ihr* = you all.',
          it: 'Quando l’italiano *mi/ti/gli/le* non ti aiuta, chiediti cosa fa il verbo: complemento oggetto → **mich/dich**; “a qualcuno” (dare, dire, aiutare) → **mir/dir**. E qui **ihr** significa “a lei” — non confonderlo con *ihr* = voi.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'dative pronouns', it: 'pronomi al dativo' } }],
    introLexemeIds: ['de/verb/geben', 'de/verb/schreiben', 'de/noun/buch', 'de/noun/apfel'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Kannst', 'du', '___', 'helfen?'],
            gapIndex: 2,
            gloss: { en: 'Can you help me?', it: 'Puoi aiutarmi?' },
            answer: 'mir',
            accepted: [],
            options: [
              { text: 'mir' },
              { text: 'mich', strategy: 'wrongCaseArticle' },
              { text: 'ich', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-dative-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'gebe', '___', 'das', 'Buch.'],
            gapIndex: 2,
            gloss: { en: 'I give her the book.', it: 'Le do il libro.' },
            answer: 'ihr',
            accepted: [],
            options: [
              { text: 'ihr' },
              { text: 'sie', strategy: 'wrongCaseArticle' },
              { text: 'ihm', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-dative-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Sie', 'gibt', '___', 'das', 'Buch.'],
            gapIndex: 2,
            gloss: { en: 'She gives him the book.', it: 'Gli dà il libro.' },
            answer: 'ihm',
            accepted: [],
            options: [
              { text: 'ihm' },
              { text: 'ihn', strategy: 'wrongCaseArticle' },
              { text: 'ihr', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-dative-pronouns:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'danke', '___'],
            gapIndex: 2,
            gloss: { en: 'I thank them.', it: 'Li ringrazio.' },
            answer: 'ihnen',
            accepted: [],
            options: [
              { text: 'ihnen' },
              { text: 'sie', strategy: 'wrongCaseArticle' },
              { text: 'ihm', strategy: 'wrongPerson' },
            ],
            skillIds: ['de-dative-pronouns:core'],
          },
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['Er', 'gibt', '___', 'den', 'Apfel.'],
            gapIndex: 2,
            gloss: { en: 'He gives me the apple.', it: 'Mi dà la mela.' },
            answer: 'mir',
            accepted: [],
            skillIds: ['de-dative-pronouns:core'],
          },
          {
            type: 'match',
            lang: 'de',
            sentence: [],
            gloss: {
              en: 'Match each pronoun with its dative form',
              it: 'Abbina ogni pronome alla sua forma al dativo',
            },
            answer: '',
            accepted: [],
            pairs: [
              ['ich', 'mir'],
              ['du', 'dir'],
              ['er', 'ihm'],
              ['wir', 'uns'],
              ['sie (Plural)', 'ihnen'],
            ],
            skillIds: ['de-dative-pronouns:core'],
          },
        ],
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: '“To me / to you” takes the dative: mir, dir, ihm, ihr, ihnen — mich/dich are accusative.',
        it: '“A me / a te” vuole il dativo: mir, dir, ihm, ihr, ihnen — mich/dich sono accusativo.',
      },
      wrongPerson: {
        en: 'ihm = to him, ihr = to her, ihnen = to them — match the person.',
        it: 'ihm = a lui, ihr = a lei, ihnen = a loro — abbina la persona.',
      },
    },
  },

  {
    id: 'de-dative-verbs',
    lang: 'de',
    title: { en: 'Verbs with the dative', it: 'Verbi con il dativo' },
    ruleSummary: {
      en: 'helfen, danken, gefallen, gehören, schmecken always take the dative.',
      it: 'helfen, danken, gefallen, gehören, schmecken reggono sempre il dativo.',
    },
    cefr: 'A2',
    dependencies: ['de-dative-pronouns'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'A handful of very common verbs govern the **dative** even where Italian expects a direct object: **helfen** (to help), **danken** (to thank), **gefallen** (to please), **gehören** (to belong to), **schmecken** (to taste good). So it’s *Ich helfe **dem** Mann* — never *den Mann* — and *Das Buch gefällt **mir***.',
          it: 'Una manciata di verbi molto comuni regge il **dativo** anche dove l’italiano si aspetta un complemento oggetto: **helfen** (aiutare), **danken** (ringraziare), **gefallen** (piacere), **gehören** (appartenere a), **schmecken** (piacere, di sapore). Quindi *Ich helfe **dem** Mann* — mai *den Mann* — e *Das Buch gefällt **mir***.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Five dative verbs', it: 'Cinque verbi con il dativo' },
        header: [
          { en: 'verb', it: 'verbo' },
          { en: 'meaning', it: 'significato' },
          { en: 'example', it: 'esempio' },
        ],
        rows: [
          ['helfen', { en: 'to help', it: 'aiutare' }, 'Ich helfe dem Mann.'],
          ['danken', { en: 'to thank', it: 'ringraziare' }, 'Wir danken der Lehrerin.'],
          ['gefallen', { en: 'to please', it: 'piacere' }, 'Das Buch gefällt mir.'],
          ['gehören', { en: 'to belong to', it: 'appartenere a' }, 'Das Auto gehört der Frau.'],
          ['schmecken', { en: 'to taste good', it: 'piacere (di sapore)' }, 'Der Kaffee schmeckt dem Vater.'],
        ],
      },
      {
        kind: 'example',
        text: 'Das Buch gefällt mir.',
        gloss: { en: 'I like the book.', it: 'Il libro mi piace.' },
        note: { en: 'built exactly like Italian piacere', it: 'costruito esattamente come piacere' },
      },
      {
        kind: 'example',
        text: 'Ich helfe dem Mann.',
        gloss: { en: 'I help the man.', it: 'Aiuto l’uomo.' },
        note: {
          en: 'dative, although Italian uses a direct object',
          it: 'dativo, anche se in italiano è complemento oggetto',
        },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '**gefallen** and **schmecken** work exactly like *piacere*: the thing liked is the subject, the person goes in the dative — *Mir gefällt das Buch* = *Mi piace il libro*. The real traps are **helfen** and **danken**: Italian says *aiuto **lui***, German says *ich helfe **ihm***.',
          it: '**gefallen** e **schmecken** funzionano esattamente come *piacere*: la cosa che piace è il soggetto, la persona va al dativo — *Mir gefällt das Buch* = *Mi piace il libro*. Le vere trappole sono **helfen** e **danken**: l’italiano dice *aiuto **lui***, il tedesco *ich helfe **ihm***.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'dative after the verb', it: 'il dativo dopo il verbo' } }],
    introLexemeIds: ['de/noun/buch', 'de/noun/kaffee', 'de/noun/vater'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'helfe', '___', 'Mann.'],
            gapIndex: 2,
            gloss: { en: 'I help the man.', it: 'Aiuto l’uomo.' },
            answer: 'dem',
            accepted: [],
            options: [
              { text: 'dem' },
              { text: 'den', strategy: 'wrongCaseArticle' },
              { text: 'der', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-dative-verbs:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Das', 'Buch', 'gefällt', '___'],
            gapIndex: 3,
            gloss: { en: 'I like the book.', it: 'Il libro mi piace.' },
            answer: 'mir',
            accepted: [],
            options: [
              { text: 'mir' },
              { text: 'mich', strategy: 'wrongCaseArticle' },
              { text: 'ich', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-dative-verbs:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Der', 'Kaffee', 'schmeckt', '___', 'Vater.'],
            gapIndex: 3,
            gloss: { en: 'Father likes the coffee.', it: 'Il caffè piace al padre.' },
            answer: 'dem',
            accepted: [],
            options: [
              { text: 'dem' },
              { text: 'den', strategy: 'wrongCaseArticle' },
              { text: 'das', strategy: 'wrongGenderArticle' },
            ],
            skillIds: ['de-dative-verbs:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Wir', 'danken', '___', 'Lehrerin.'],
            gapIndex: 2,
            gloss: { en: 'We thank the teacher.', it: 'Ringraziamo la professoressa.' },
            answer: 'der',
            accepted: [],
            options: [
              { text: 'der' },
              { text: 'die', strategy: 'wrongCaseArticle' },
              { text: 'dem', strategy: 'wrongGenderArticle' },
            ],
            skillIds: ['de-dative-verbs:core'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Das', 'Auto', 'gehört', '___', 'Frau.'],
            gapIndex: 3,
            gloss: { en: 'The car belongs to the woman.', it: 'La macchina appartiene alla donna.' },
            answer: 'der',
            accepted: [],
            options: [
              { text: 'der' },
              { text: 'die', strategy: 'wrongCaseArticle' },
              { text: 'dem', strategy: 'wrongGenderArticle' },
            ],
            skillIds: ['de-dative-verbs:core'],
          },
          {
            type: 'cloze',
            lang: 'de',
            sentence: ['Das', 'Haus', 'gefällt', '___'],
            gapIndex: 3,
            gloss: { en: 'He likes the house.', it: 'La casa gli piace.' },
            answer: 'ihm',
            accepted: [],
            skillIds: ['de-dative-verbs:core'],
          },
        ],
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'These verbs always take the dative: helfen, danken, gefallen, gehören, schmecken — dem Mann, der Frau, mir.',
        it: 'Questi verbi reggono sempre il dativo: helfen, danken, gefallen, gehören, schmecken — dem Mann, der Frau, mir.',
      },
      wrongGenderArticle: {
        en: 'Dative: masculine and neuter → dem, feminine → der.',
        it: 'Dativo: maschile e neutro → dem, femminile → der.',
      },
    },
  },

  {
    id: 'de-prep-acc',
    lang: 'de',
    title: { en: 'Prepositions + accusative', it: 'Preposizioni con l’accusativo' },
    ruleSummary: {
      en: 'für, ohne, gegen, durch, um always take the accusative: für den Mann.',
      it: 'für, ohne, gegen, durch, um vogliono sempre l’accusativo: für den Mann.',
    },
    cefr: 'A2',
    dependencies: ['de-nom-acc'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Five prepositions are always followed by the **accusative**, no exceptions: **für** (for), **ohne** (without), **gegen** (against), **durch** (through) and **um** (around / at, with times). As usual only the masculine shows it: *für **den** Vater*, *ohne **einen** Freund* — feminine and neuter look like the nominative.',
          it: 'Cinque preposizioni sono sempre seguite dall’**accusativo**, senza eccezioni: **für** (per), **ohne** (senza), **gegen** (contro), **durch** (attraverso) e **um** (intorno a / alle, con le ore). Come al solito solo il maschile lo mostra: *für **den** Vater*, *ohne **einen** Freund* — femminile e neutro sembrano il nominativo.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The five accusative prepositions', it: 'Le cinque preposizioni con l’accusativo' },
        header: [
          { en: 'preposition', it: 'preposizione' },
          { en: 'meaning', it: 'significato' },
          { en: 'example', it: 'esempio' },
        ],
        rows: [
          ['für', { en: 'for', it: 'per' }, 'Das Geschenk ist für den Vater.'],
          ['ohne', { en: 'without', it: 'senza' }, 'Wir gehen ohne das Kind.'],
          ['gegen', { en: 'against', it: 'contro' }, 'Er spielt gegen den Freund.'],
          ['durch', { en: 'through', it: 'attraverso' }, 'Wir gehen durch die Stadt.'],
          ['um', { en: 'around / at (time)', it: 'intorno a / alle (ora)' }, 'Wir gehen um den Park.'],
        ],
      },
      {
        kind: 'example',
        text: 'Das Geschenk ist für den Vater.',
        gloss: { en: 'The present is for the father.', it: 'Il regalo è per il padre.' },
        note: { en: 'für + accusative → den', it: 'für + accusativo → den' },
      },
      {
        kind: 'example',
        text: 'Wir gehen durch die Stadt.',
        gloss: { en: 'We walk through the city.', it: 'Attraversiamo la città.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Memorize them as a chant — **durch, für, gegen, ohne, um** — and the case comes for free. After these five the article is accusative even at the start of a sentence: *Für den Vater kaufe ich Wein.*',
          it: 'Imparale come una filastrocca — **durch, für, gegen, ohne, um** — e il caso viene gratis. Dopo queste cinque l’articolo è all’accusativo anche a inizio frase: *Für den Vater kaufe ich Wein.*',
        },
      },
    ],
    skillCells: [
      { cellId: 'prep.m', label: { en: 'preposition + accusative (masculine)', it: 'preposizione + accusativo (maschile)' } },
      { cellId: 'prep.f', label: { en: 'preposition + accusative (feminine)', it: 'preposizione + accusativo (femminile)' } },
      { cellId: 'prep.n', label: { en: 'preposition + accusative (neuter)', it: 'preposizione + accusativo (neutro)' } },
    ],
    introLexemeIds: ['de/noun/freund', 'de/noun/vater', 'de/noun/mutter', 'de/noun/mädchen'],
    drillItems: [
      {
        gen: 'case-article',
        nounIds: ['de/noun/mann', 'de/noun/lehrer', 'de/noun/freund', 'de/noun/vater'],
        count: 3,
        case: 'acc',
        det: 'def',
        number: 'sg',
        frames: [
          {
            tokens: ['Das', 'Geschenk', 'ist', 'für', '___', '{noun}'],
            gloss: { en: 'The present is for the {gloss}', it: 'Il regalo è per {gloss}' },
          },
          {
            tokens: ['Wir', 'gehen', 'ohne', '___', '{noun}'],
            gloss: { en: 'We go without the {gloss}', it: 'Andiamo senza {gloss}' },
          },
        ],
        cellId: 'prep.m',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/frau', 'de/noun/schwester', 'de/noun/mutter'],
        count: 2,
        case: 'acc',
        det: 'def',
        number: 'sg',
        frames: [
          {
            tokens: ['Das', 'Geschenk', 'ist', 'für', '___', '{noun}'],
            gloss: { en: 'The present is for the {gloss}', it: 'Il regalo è per {gloss}' },
          },
          {
            tokens: ['Wir', 'gehen', 'ohne', '___', '{noun}'],
            gloss: { en: 'We go without the {gloss}', it: 'Andiamo senza {gloss}' },
          },
        ],
        cellId: 'prep.f',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/kind', 'de/noun/mädchen'],
        count: 2,
        case: 'acc',
        det: 'def',
        number: 'sg',
        frames: [
          {
            tokens: ['Das', 'Geschenk', 'ist', 'für', '___', '{noun}'],
            gloss: { en: 'The present is for the {gloss}', it: 'Il regalo è per {gloss}' },
          },
          {
            tokens: ['Wir', 'gehen', 'ohne', '___', '{noun}'],
            gloss: { en: 'We go without the {gloss}', it: 'Andiamo senza {gloss}' },
          },
        ],
        cellId: 'prep.n',
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'After für, ohne, gegen, durch, um the article is accusative: der → den, ein → einen.',
        it: 'Dopo für, ohne, gegen, durch, um l’articolo è all’accusativo: der → den, ein → einen.',
      },
      wrongGenderArticle: {
        en: 'Only the masculine changes in the accusative — check the noun’s gender first.',
        it: 'All’accusativo cambia solo il maschile — controlla prima il genere del sostantivo.',
      },
    },
  },

  {
    id: 'de-prep-dat',
    lang: 'de',
    title: { en: 'Prepositions + dative', it: 'Preposizioni con il dativo' },
    ruleSummary: {
      en: 'mit, nach, bei, von, zu, aus, seit always take the dative: mit dem Mann.',
      it: 'mit, nach, bei, von, zu, aus, seit vogliono sempre il dativo: mit dem Mann.',
    },
    cefr: 'A2',
    dependencies: ['de-dative-case'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Seven prepositions are always followed by the **dative**: **mit** (with), **nach** (after / to, with places), **bei** (at, near), **von** (from, of), **zu** (to, with people and places), **aus** (from, out of), **seit** (since, for). So: *mit **dem** Mann*, *aus **der** Stadt*, *seit **einem** Jahr*.',
          it: 'Sette preposizioni sono sempre seguite dal **dativo**: **mit** (con), **nach** (dopo / verso, con i luoghi), **bei** (presso, da), **von** (di, da), **zu** (da, verso — con persone e luoghi), **aus** (da, provenienza), **seit** (da, tempo). Quindi: *mit **dem** Mann*, *aus **der** Stadt*, *seit **einem** Jahr*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'The seven dative prepositions', it: 'Le sette preposizioni con il dativo' },
        header: [
          { en: 'preposition', it: 'preposizione' },
          { en: 'meaning', it: 'significato' },
          { en: 'example', it: 'esempio' },
        ],
        rows: [
          ['mit', { en: 'with', it: 'con' }, 'Ich spreche mit dem Mann.'],
          ['nach', { en: 'after / to (places)', it: 'dopo / verso (luoghi)' }, 'Wir fahren nach Berlin.'],
          ['bei', { en: 'at / near', it: 'presso / da' }, 'Er wohnt bei der Familie.'],
          ['von', { en: 'from / of', it: 'di / da' }, 'Das Buch ist von dem Lehrer.'],
          ['zu', { en: 'to (people, places)', it: 'da / verso' }, 'Ich gehe zum Arzt. (zu + dem)'],
          ['aus', { en: 'from / out of', it: 'da (provenienza)' }, 'Sie kommt aus der Stadt.'],
          ['seit', { en: 'since / for', it: 'da (tempo)' }, 'Ich lerne seit einem Jahr Deutsch.'],
        ],
      },
      {
        kind: 'example',
        text: 'Ich spreche mit dem Lehrer.',
        gloss: { en: 'I speak with the teacher.', it: 'Parlo con il professore.' },
      },
      {
        kind: 'example',
        text: 'Sie kommt aus der Stadt.',
        gloss: { en: 'She comes from the city.', it: 'Viene dalla città.' },
        note: { en: 'aus + feminine → der', it: 'aus + femminile → der' },
      },
      {
        kind: 'example',
        text: 'Ich spiele mit dem Kind.',
        gloss: { en: 'I play with the child.', it: 'Gioco con il bambino.' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Another chant: **mit, nach, bei, von, zu, aus, seit** → always dative. German loves to contract them with dem/der: **zu dem → zum**, **zu der → zur**, **bei dem → beim**, **von dem → vom**.',
          it: 'Un’altra filastrocca: **mit, nach, bei, von, zu, aus, seit** → sempre dativo. Il tedesco ama contrarle con dem/der: **zu dem → zum**, **zu der → zur**, **bei dem → beim**, **von dem → vom**.',
        },
      },
    ],
    skillCells: [
      { cellId: 'prepd.m', label: { en: 'preposition + dative (masculine)', it: 'preposizione + dativo (maschile)' } },
      { cellId: 'prepd.f', label: { en: 'preposition + dative (feminine)', it: 'preposizione + dativo (femminile)' } },
      { cellId: 'prepd.n', label: { en: 'preposition + dative (neuter)', it: 'preposizione + dativo (neutro)' } },
    ],
    introLexemeIds: ['de/verb/sprechen', 'de/verb/spielen', 'de/noun/lehrerin', 'de/noun/student'],
    drillItems: [
      {
        gen: 'case-article',
        nounIds: ['de/noun/mann', 'de/noun/lehrer', 'de/noun/student'],
        count: 3,
        case: 'dat',
        det: 'def',
        number: 'sg',
        frames: [
          {
            tokens: ['Ich', 'spreche', 'mit', '___', '{noun}'],
            gloss: { en: 'I speak with the {gloss}', it: 'Parlo con {gloss}' },
          },
        ],
        cellId: 'prepd.m',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/frau', 'de/noun/lehrerin', 'de/noun/mutter'],
        count: 2,
        case: 'dat',
        det: 'def',
        number: 'sg',
        frames: [
          {
            tokens: ['Ich', 'spreche', 'mit', '___', '{noun}'],
            gloss: { en: 'I speak with the {gloss}', it: 'Parlo con {gloss}' },
          },
        ],
        cellId: 'prepd.f',
      },
      {
        gen: 'case-article',
        nounIds: ['de/noun/kind', 'de/noun/mädchen'],
        count: 2,
        case: 'dat',
        det: 'def',
        number: 'sg',
        frames: [
          {
            tokens: ['Ich', 'spiele', 'mit', '___', '{noun}'],
            gloss: { en: 'I play with the {gloss}', it: 'Gioco con {gloss}' },
          },
          {
            tokens: ['Ich', 'spreche', 'mit', '___', '{noun}'],
            gloss: { en: 'I speak with the {gloss}', it: 'Parlo con {gloss}' },
          },
        ],
        cellId: 'prepd.n',
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'After mit, nach, bei, von, zu, aus, seit the article is dative: dem, der, dem.',
        it: 'Dopo mit, nach, bei, von, zu, aus, seit l’articolo è al dativo: dem, der, dem.',
      },
      wrongGenderArticle: {
        en: 'Dative: masculine and neuter share dem, feminine takes der.',
        it: 'Al dativo maschile e neutro condividono dem, il femminile prende der.',
      },
    },
  },

  {
    id: 'de-two-way-preps',
    lang: 'de',
    title: { en: 'Two-way prepositions', it: 'Preposizioni a doppio caso' },
    ruleSummary: {
      en: 'in, an, auf, über, unter…: motion (wohin?) → accusative, location (wo?) → dative.',
      it: 'in, an, auf, über, unter…: moto (wohin?) → accusativo, stato (wo?) → dativo.',
    },
    cefr: 'A2',
    dependencies: ['de-prep-acc', 'de-prep-dat'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Nine prepositions of place — **in, an, auf, über, unter, vor, hinter, neben, zwischen** — take either case, depending on the question the sentence answers. **Wohin?** (where to? — movement towards a goal) → **accusative**: *Ich gehe in **die** Schule.* **Wo?** (where? — position, no change of place) → **dative**: *Ich bin in **der** Schule.*',
          it: 'Nove preposizioni di luogo — **in, an, auf, über, unter, vor, hinter, neben, zwischen** — reggono l’uno o l’altro caso, a seconda della domanda a cui risponde la frase. **Wohin?** (verso dove? — moto verso una meta) → **accusativo**: *Ich gehe in **die** Schule.* **Wo?** (dove? — posizione, nessun cambio di luogo) → **dativo**: *Ich bin in **der** Schule.*',
        },
      },
      {
        kind: 'table',
        caption: { en: 'wohin? vs wo?', it: 'wohin? o wo?' },
        header: [
          { en: 'preposition', it: 'preposizione' },
          { en: 'wohin? → accusative', it: 'wohin? → accusativo' },
          { en: 'wo? → dative', it: 'wo? → dativo' },
        ],
        rows: [
          ['in', 'Ich gehe in die Schule.', 'Ich bin in der Schule.'],
          ['auf', 'Ich lege das Buch auf den Tisch.', 'Das Buch liegt auf dem Tisch.'],
          ['vor', 'Er fährt vor das Haus.', 'Das Auto steht vor dem Haus.'],
        ],
      },
      {
        kind: 'example',
        text: 'Ich gehe in die Schule.',
        gloss: { en: 'I am going to school.', it: 'Vado a scuola.' },
        note: { en: 'motion → accusative', it: 'moto → accusativo' },
      },
      {
        kind: 'example',
        text: 'Ich bin in der Schule.',
        gloss: { en: 'I am at school.', it: 'Sono a scuola.' },
        note: { en: 'location → dative', it: 'stato → dativo' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Italian uses the same preposition for both (*vado a scuola / sono a scuola*); German asks the question first. Is something moving towards a place? **wohin → accusative**. Is it simply there? **wo → dative**. Verb pairs help: *legen* (to put) → accusative, *liegen* (to lie) → dative; *stellen* → accusative, *stehen* → dative.',
          it: 'L’italiano usa la stessa preposizione per entrambi (*vado a scuola / sono a scuola*); il tedesco prima si fa la domanda. Qualcosa si muove verso un luogo? **wohin → accusativo**. Sta semplicemente lì? **wo → dativo**. Le coppie di verbi aiutano: *legen* (mettere) → accusativo, *liegen* (stare disteso) → dativo; *stellen* → accusativo, *stehen* → dativo.',
        },
      },
    ],
    skillCells: [
      { cellId: 'motion', label: { en: 'motion → accusative', it: 'moto → accusativo' } },
      { cellId: 'location', label: { en: 'location → dative', it: 'stato → dativo' } },
    ],
    introLexemeIds: ['de/noun/schule', 'de/noun/tisch', 'de/noun/park', 'de/noun/haus', 'de/noun/stadt'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'gehe', 'in', '___', 'Schule.'],
            gapIndex: 3,
            gloss: { en: 'I am going to school. (motion)', it: 'Vado a scuola. (moto)' },
            answer: 'die',
            accepted: [],
            options: [
              { text: 'die' },
              { text: 'der', strategy: 'wrongCaseArticle' },
              { text: 'dem', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:motion'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'bin', 'in', '___', 'Schule.'],
            gapIndex: 3,
            gloss: { en: 'I am at school. (location)', it: 'Sono a scuola. (stato)' },
            answer: 'der',
            accepted: [],
            options: [
              { text: 'der' },
              { text: 'die', strategy: 'wrongCaseArticle' },
              { text: 'den', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:location'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Das', 'Buch', 'liegt', 'auf', '___', 'Tisch.'],
            gapIndex: 4,
            gloss: { en: 'The book is lying on the table.', it: 'Il libro è sul tavolo.' },
            answer: 'dem',
            accepted: [],
            options: [
              { text: 'dem' },
              { text: 'den', strategy: 'wrongCaseArticle' },
              { text: 'der', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:location'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Ich', 'lege', 'das', 'Buch', 'auf', '___', 'Tisch.'],
            gapIndex: 5,
            gloss: { en: 'I put the book on the table.', it: 'Metto il libro sul tavolo.' },
            answer: 'den',
            accepted: [],
            options: [
              { text: 'den' },
              { text: 'dem', strategy: 'wrongCaseArticle' },
              { text: 'der', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:motion'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Wir', 'gehen', 'in', '___', 'Park.'],
            gapIndex: 3,
            gloss: { en: 'We are going into the park.', it: 'Andiamo al parco.' },
            answer: 'den',
            accepted: [],
            options: [
              { text: 'den' },
              { text: 'dem', strategy: 'wrongCaseArticle' },
              { text: 'der', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:motion'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Wir', 'sind', 'in', '___', 'Park.'],
            gapIndex: 3,
            gloss: { en: 'We are in the park.', it: 'Siamo al parco.' },
            answer: 'dem',
            accepted: [],
            options: [
              { text: 'dem' },
              { text: 'den', strategy: 'wrongCaseArticle' },
              { text: 'die', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:location'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Das', 'Auto', 'steht', 'vor', '___', 'Haus.'],
            gapIndex: 4,
            gloss: { en: 'The car is in front of the house.', it: 'La macchina è davanti alla casa.' },
            answer: 'dem',
            accepted: [],
            options: [
              { text: 'dem' },
              { text: 'das', strategy: 'wrongCaseArticle' },
              { text: 'den', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:location'],
          },
          {
            type: 'mc',
            lang: 'de',
            sentence: ['Er', 'fährt', 'in', '___', 'Stadt.'],
            gapIndex: 3,
            gloss: { en: 'He is driving into the city.', it: 'Va in città (in macchina).' },
            answer: 'die',
            accepted: [],
            options: [
              { text: 'die' },
              { text: 'der', strategy: 'wrongCaseArticle' },
              { text: 'dem', strategy: 'wrongCaseArticle' },
            ],
            skillIds: ['de-two-way-preps:motion'],
          },
        ],
      },
    ],
    errorHints: {
      wrongCaseArticle: {
        en: 'Ask the question first: wohin? (movement towards) → accusative; wo? (place where) → dative.',
        it: 'Fatti prima la domanda: wohin? (moto verso) → accusativo; wo? (stato in luogo) → dativo.',
      },
    },
  },
]
