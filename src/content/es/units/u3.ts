import type { Topic } from '../../types'

// Unit ES-3 · Verbos con carácter
// Authoring conventions (all unit files follow these):
// - ids are append-only; never rename
// - explanations: short prose, one or two tables, 2+ TTS-able examples, one callout
// - every drillItem's skill cells must appear in skillCells

export const ES_U3_TOPICS: Topic[] = [
  {
    id: 'es-tener-venir',
    lang: 'es',
    title: { en: 'Tener & venir', it: 'Tener e venir' },
    ruleSummary: {
      en: 'tengo, tienes, tiene… / vengo, vienes, viene… — and tener for hunger, thirst, age.',
      it: 'tengo, tienes, tiene… / vengo, vienes, viene… — e tener per fame, sete, età.',
    },
    cefr: 'A1',
    dependencies: ['es-present-er-ir'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**Tener** (to have) and **venir** (to come) follow the same pattern: an irregular yo form in **-go** (*tengo*, *vengo*) and a vowel change **e→ie** in the middle persons (*tienes*, *vienes*). Spanish also uses *tener* where English uses “to be”: *tengo hambre* — I’m hungry.',
          it: '**Tener** (avere) e **venir** (venire) seguono lo stesso schema: una forma di yo irregolare in **-go** (*tengo*, *vengo*) e un cambio di vocale **e→ie** nelle persone centrali (*tienes*, *vienes*). Come l’italiano, lo spagnolo usa *tener* in molte espressioni: *tengo hambre* — ho fame.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'tener & venir — present tense', it: 'tener e venir — presente indicativo' },
        header: ['', 'tener', 'venir'],
        rows: [
          ['yo', 'tengo', 'vengo'],
          ['tú', 'tienes', 'vienes'],
          ['él / ella / usted', 'tiene', 'viene'],
          ['nosotros/as', 'tenemos', 'venimos'],
          ['vosotros/as', 'tenéis', 'venís'],
          ['ellos / ellas / ustedes', 'tienen', 'vienen'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [5, 1],
          [5, 2],
        ],
      },
      {
        kind: 'table',
        caption: { en: 'Tener idioms', it: 'Espressioni con tener' },
        header: [
          { en: 'Spanish', it: 'spagnolo' },
          { en: 'English', it: 'italiano' },
        ],
        rows: [
          ['tener hambre', { en: 'to be hungry', it: 'avere fame' }],
          ['tener sed', { en: 'to be thirsty', it: 'avere sete' }],
          ['tener frío / calor', { en: 'to be cold / hot', it: 'avere freddo / caldo' }],
          ['tener sueño', { en: 'to be sleepy', it: 'avere sonno' }],
          ['tener … años', { en: 'to be … years old', it: 'avere … anni' }],
        ],
      },
      { kind: 'example', text: 'Tengo hambre.', gloss: { en: 'I am hungry.', it: 'Ho fame.' } },
      { kind: 'example', text: '¿Cuántos años tienes?', gloss: { en: 'How old are you?', it: 'Quanti anni hai?' } },
      {
        kind: 'example',
        text: 'Venimos de la ciudad.',
        gloss: { en: 'We come from the city.', it: 'Veniamo dalla città.' },
        note: { en: 'nosotros keeps the e: venimos, not *vienimos', it: 'nosotros mantiene la e: venimos, non *vienimos' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Good news for Italian speakers: these idioms work exactly like *avere fame, avere sete, avere vent’anni*. It’s English that is the odd one out with “to be”.',
          it: 'Ottima notizia: queste espressioni funzionano esattamente come *avere fame, avere sete, avere vent’anni*. È l’inglese a fare eccezione con “to be”.',
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
      { cellId: 'idioms', label: { en: 'tener idioms', it: 'espressioni con tener' } },
    ],
    introLexemeIds: ['es/verb/tener', 'es/verb/venir', 'es/noun/año', 'es/noun/ciudad'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/tener', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/venir', tense: 'pres', persons: ['1sg', '2sg', '3sg'], type: 'mc' },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Tengo', '___'],
            gapIndex: 1,
            gloss: { en: 'I am hungry (lit. I have hunger)', it: 'Ho fame' },
            answer: 'hambre',
            accepted: [],
            skillIds: ['es-tener-venir:idioms'],
            ttsText: 'Tengo hambre.',
            strictSuffixLen: 0,
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Tengo', '___'],
            gapIndex: 1,
            gloss: { en: 'I am thirsty (lit. I have thirst)', it: 'Ho sete' },
            answer: 'sed',
            accepted: [],
            skillIds: ['es-tener-venir:idioms'],
            ttsText: 'Tengo sed.',
            strictSuffixLen: 0,
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['Tengo', '___'],
            gapIndex: 1,
            gloss: { en: 'I am cold (lit. I have cold)', it: 'Ho freddo' },
            answer: 'frío',
            accepted: [],
            skillIds: ['es-tener-venir:idioms'],
            ttsText: 'Tengo frío.',
            strictSuffixLen: 0,
          },
          {
            type: 'cloze',
            lang: 'es',
            sentence: ['¿', 'Cuántos', '___', 'tienes?'],
            gapIndex: 2,
            gloss: { en: 'How old are you? (lit. how many years do you have?)', it: 'Quanti anni hai?' },
            answer: 'años',
            accepted: [],
            skillIds: ['es-tener-venir:idioms'],
            ttsText: '¿Cuántos años tienes?',
            strictSuffixLen: 0,
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'tener: tengo, tienes, tiene, tenemos, tenéis, tienen; venir: vengo, vienes, viene, venimos, venís, vienen.',
        it: 'tener: tengo, tienes, tiene, tenemos, tenéis, tienen; venir: vengo, vienes, viene, venimos, venís, vienen.',
      },
      missingStemChange: {
        en: 'tú / él / ellos change e→ie: tienes, viene, tienen.',
        it: 'tú / él / ellos cambiano e→ie: tienes, viene, tienen.',
      },
      overStemChange: {
        en: 'nosotros/vosotros keep the e: tenemos, venís.',
        it: 'nosotros/vosotros mantengono la e: tenemos, venís.',
      },
      infinitive: {
        en: 'That’s the dictionary form — it must be conjugated here.',
        it: 'Quella è la forma del dizionario — qui va coniugata.',
      },
    },
  },

  {
    id: 'es-ir-future',
    lang: 'es',
    title: { en: 'Ir & the near future', it: 'Ir e il futuro imminente' },
    ruleSummary: {
      en: 'voy, vas, va, vamos, vais, van — and ir + a + infinitive for what is going to happen.',
      it: 'voy, vas, va, vamos, vais, van — e ir + a + infinito per ciò che sta per accadere.',
    },
    cefr: 'A1',
    dependencies: ['es-present-er-ir'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: '**Ir** (to go) is completely irregular: *voy, vas, va, vamos, vais, van*. Its superpower is the **near future**: conjugate *ir*, add **a**, then any infinitive — *Voy a estudiar* (I’m going to study). No new endings to learn.',
          it: '**Ir** (andare) è completamente irregolare: *voy, vas, va, vamos, vais, van*. Il suo superpotere è il **futuro imminente**: coniuga *ir*, aggiungi **a** e poi un infinito qualsiasi — *Voy a estudiar* (studierò). Nessuna nuova desinenza da imparare.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'ir — present tense', it: 'ir — presente indicativo' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['yo', 'voy'],
          ['tú', 'vas'],
          ['él / ella / usted', 'va'],
          ['nosotros/as', 'vamos'],
          ['vosotros/as', 'vais'],
          ['ellos / ellas / ustedes', 'van'],
        ],
      },
      { kind: 'example', text: 'Voy a estudiar español.', gloss: { en: 'I am going to study Spanish.', it: 'Studierò lo spagnolo.' } },
      { kind: 'example', text: 'Vamos a comer en casa.', gloss: { en: 'We are going to eat at home.', it: 'Mangeremo a casa.' } },
      { kind: 'example', text: '¿Vas a venir mañana?', gloss: { en: 'Are you going to come tomorrow?', it: 'Verrai domani?' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '*Vamos a* + infinitive can also be an invitation: *¡Vamos a bailar!* — let’s dance!',
          it: '*Vamos a* + infinito può anche essere un invito: *¡Vamos a bailar!* — balliamo!',
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
      { cellId: 'future', label: { en: 'ir + a + infinitive', it: 'ir + a + infinito' } },
    ],
    introLexemeIds: ['es/verb/ir', 'es/verb/estudiar', 'es/verb/viajar'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/ir', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/ir', tense: 'pres', persons: ['1sg', '3sg', '1pl'], type: 'mc' },
      {
        gen: 'word-order',
        items: [
          {
            answer: 'Voy a estudiar español',
            gloss: { en: 'I am going to study Spanish', it: 'Studierò lo spagnolo' },
            cellId: 'future',
          },
          {
            answer: 'Vamos a comer en casa',
            gloss: { en: 'We are going to eat at home', it: 'Mangeremo a casa' },
            cellId: 'future',
          },
          {
            answer: 'Ella va a trabajar hoy',
            also: ['Hoy ella va a trabajar'],
            gloss: { en: 'She is going to work today', it: 'Lei oggi lavorerà' },
            cellId: 'future',
          },
          {
            answer: 'Vas a venir mañana',
            gloss: { en: 'Are you going to come tomorrow?', it: 'Verrai domani?' },
            cellId: 'future',
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'Ir is irregular: voy, vas, va, vamos, vais, van.',
        it: 'Ir è irregolare: voy, vas, va, vamos, vais, van.',
      },
      infinitive: {
        en: '“ir” is the dictionary form — only the infinitive after “a” stays unconjugated.',
        it: '“ir” è la forma del dizionario — solo l’infinito dopo “a” resta non coniugato.',
      },
    },
  },

  {
    id: 'es-go-verbs',
    lang: 'es',
    title: { en: 'Irregular yo forms', it: 'Le forme irregolari di yo' },
    ruleSummary: {
      en: 'Only yo is odd: hago, salgo, pongo, digo, veo, sé, conozco — the rest is regular.',
      it: 'Solo yo è irregolare: hago, salgo, pongo, digo, veo, sé, conozco — il resto è regolare.',
    },
    cefr: 'A1',
    dependencies: ['es-present-er-ir'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'A family of verbs is irregular **only in the yo form**: *hacer → hago*, *salir → salgo*, *poner → pongo*, *decir → digo*, plus *ver → veo*, *saber → sé* and *conocer → conozco*. Every other person takes the normal endings: *hago, haces, hace…* *Tener* and *venir* join the club (*tengo, vengo*), and *decir* piles a stem change on top of its -go (*dices, dice, dicen*).',
          it: 'Una famiglia di verbi è irregolare **solo nella forma di yo**: *hacer → hago*, *salir → salgo*, *poner → pongo*, *decir → digo*, più *ver → veo*, *saber → sé* e *conocer → conozco*. Tutte le altre persone prendono le desinenze normali: *hago, haces, hace…* Anche *tener* e *venir* fanno parte del gruppo (*tengo, vengo*), e *decir* aggiunge al suo -go un cambio di vocale (*dices, dice, dicen*).',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Irregular yo, regular tú', it: 'Yo irregolare, tú regolare' },
        header: [{ en: 'infinitive', it: 'infinito' }, 'yo', 'tú'],
        rows: [
          ['hacer', 'hago', 'haces'],
          ['salir', 'salgo', 'sales'],
          ['poner', 'pongo', 'pones'],
          ['decir', 'digo', 'dices'],
          ['tener', 'tengo', 'tienes'],
          ['venir', 'vengo', 'vienes'],
          ['ver', 'veo', 'ves'],
          ['saber', 'sé', 'sabes'],
          ['conocer', 'conozco', 'conoces'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
          [2, 1],
          [3, 1],
          [4, 1],
          [5, 1],
          [6, 1],
          [7, 1],
          [8, 1],
        ],
      },
      { kind: 'example', text: 'Hago la cena.', gloss: { en: 'I make dinner.', it: 'Preparo la cena.' } },
      { kind: 'example', text: 'Salgo de casa a las ocho.', gloss: { en: 'I leave home at eight.', it: 'Esco di casa alle otto.' } },
      {
        kind: 'example',
        text: 'No sé dónde está.',
        gloss: { en: 'I don’t know where it is.', it: 'Non so dov’è.' },
        note: { en: 'sé wears an accent to distinguish it from se', it: 'sé porta l’accento per distinguersi da se' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Italian works the same way: *fare → faccio*, *venire → vengo*, *uscire → esco*, *sapere → so*. The irregularity sits in the first person and the rest of the paradigm behaves — so learn the yo form as a separate little word and the other five follow.',
          it: 'L’italiano si comporta allo stesso modo: *fare → faccio*, *venire → vengo*, *uscire → esco*, *sapere → so*. L’irregolarità si concentra nella prima persona e il resto del paradigma fila liscio — impara la forma di yo come una parolina a sé e le altre cinque vengono da sole.',
        },
      },
    ],
    skillCells: [{ cellId: '1sg', label: { en: 'irregular yo form', it: 'forma irregolare di yo' } }],
    introLexemeIds: ['es/verb/hacer', 'es/verb/salir', 'es/verb/poner', 'es/verb/decir', 'es/verb/ver'],
    drillItems: [
      { gen: 'conj', verbId: 'es/verb/hacer', tense: 'pres', persons: ['1sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/salir', tense: 'pres', persons: ['1sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/poner', tense: 'pres', persons: ['1sg'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/decir', tense: 'pres', persons: ['1sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/ver', tense: 'pres', persons: ['1sg'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/saber', tense: 'pres', persons: ['1sg'], type: 'mc' },
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Yo', '___', 'la', 'tarea', 'por', 'la', 'noche.'],
            gapIndex: 1,
            gloss: { en: 'I do my homework at night.', it: 'Faccio i compiti la sera.' },
            answer: 'hago',
            accepted: [],
            options: [
              { text: 'hago' },
              { text: 'hace', strategy: 'wrongPerson' },
              { text: 'hacer', strategy: 'infinitive' },
            ],
            skillIds: ['es-go-verbs:1sg'],
            ttsText: 'Yo hago la tarea por la noche.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Ella', '___', 'la', 'verdad.'],
            gapIndex: 1,
            gloss: { en: 'She tells the truth.', it: 'Lei dice la verità.' },
            answer: 'dice',
            accepted: [],
            options: [
              { text: 'dice' },
              { text: 'digo', strategy: 'wrongPerson' },
              { text: 'decir', strategy: 'infinitive' },
            ],
            skillIds: ['es-go-verbs:1sg'],
            ttsText: 'Ella dice la verdad.',
          },
        ],
      },
    ],
    errorHints: {
      wrongPerson: {
        en: 'The irregularity belongs to yo alone: hago, but haces, hace, hacen.',
        it: 'L’irregolarità appartiene solo a yo: hago, ma haces, hace, hacen.',
      },
      missingStemChange: {
        en: 'decir also stem-changes: dices, dice, dicen.',
        it: 'decir cambia anche la vocale: dices, dice, dicen.',
      },
      infinitive: {
        en: 'That’s the dictionary form — it needs a person ending.',
        it: 'Quella è la forma del dizionario — serve una desinenza di persona.',
      },
    },
  },

  {
    id: 'es-stem-e-ie',
    lang: 'es',
    title: { en: 'Stem change e→ie', it: 'Il cambio di vocale e→ie' },
    ruleSummary: {
      en: 'querer: quiero, quieres, quiere, queremos, queréis, quieren — nosotros/vosotros keep the e.',
      it: 'querer: quiero, quieres, quiere, queremos, queréis, quieren — nosotros/vosotros mantengono la e.',
    },
    cefr: 'A1',
    dependencies: ['es-present-er-ir'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'In many verbs the stressed stem vowel **e** breaks into **ie**: *querer → quiero*. The change hits four forms — yo, tú, él, ellos — but **not nosotros and vosotros**, where the stress falls on the ending. The same happens in *empezar, entender, pensar* and (with its -go yo form) *venir*.',
          it: 'In molti verbi la vocale tonica **e** della radice diventa **ie**: *querer → quiero*. Il cambio riguarda quattro forme — yo, tú, él, ellos — ma **non nosotros e vosotros**, dove l’accento cade sulla desinenza. Lo stesso vale per *empezar, entender, pensar* e (con la sua yo in -go) *venir*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'querer — present tense', it: 'querer — presente indicativo' },
        header: ['', { en: 'form', it: 'forma' }],
        rows: [
          ['yo', 'quiero'],
          ['tú', 'quieres'],
          ['él / ella / usted', 'quiere'],
          ['nosotros/as', 'queremos'],
          ['vosotros/as', 'queréis'],
          ['ellos / ellas / ustedes', 'quieren'],
        ],
        highlight: [
          [0, 1],
          [1, 1],
          [2, 1],
          [5, 1],
        ],
      },
      { kind: 'example', text: 'Quiero un café.', gloss: { en: 'I want a coffee.', it: 'Voglio un caffè.' } },
      { kind: 'example', text: 'El trabajo empieza a las nueve.', gloss: { en: 'Work starts at nine.', it: 'Il lavoro comincia alle nove.' } },
      {
        kind: 'example',
        text: 'Queremos comer.',
        gloss: { en: 'We want to eat.', it: 'Vogliamo mangiare.' },
        note: { en: 'nosotros: no change — queremos, not *quieremos', it: 'nosotros: nessun cambio — queremos, non *quieremos' },
      },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Picture the six forms as a **boot**: the four changed forms sit inside the boot, *nosotros/vosotros* stay outside. Every stem-changing verb follows this shape.',
          it: 'Immagina le sei forme come uno **stivale**: le quattro forme che cambiano stanno dentro lo stivale, *nosotros/vosotros* restano fuori. Tutti i verbi con cambio di vocale seguono questa forma.',
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
    introLexemeIds: ['es/verb/querer', 'es/verb/empezar', 'es/verb/entender', 'es/verb/pensar'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/querer', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/querer', tense: 'pres', persons: ['2sg', '1pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/empezar', tense: 'pres', persons: ['3sg', '2pl'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/entender', tense: 'pres', persons: ['3pl', '1pl'], type: 'mc' },
    ],
    errorHints: {
      missingStemChange: {
        en: 'yo / tú / él / ellos need ie: quiero, quieres, quiere, quieren.',
        it: 'yo / tú / él / ellos vogliono ie: quiero, quieres, quiere, quieren.',
      },
      overStemChange: {
        en: 'nosotros/vosotros keep the e: queremos, queréis, empezamos.',
        it: 'nosotros/vosotros mantengono la e: queremos, queréis, empezamos.',
      },
      wrongPerson: {
        en: 'Right vowel, wrong person — match the ending to the subject.',
        it: 'Vocale giusta, persona sbagliata — fai concordare la desinenza con il soggetto.',
      },
      infinitive: {
        en: 'That’s the dictionary form — it must be conjugated here.',
        it: 'Quella è la forma del dizionario — qui va coniugata.',
      },
    },
  },

  {
    id: 'es-stem-o-ue-e-i',
    lang: 'es',
    title: { en: 'Stem changes o→ue & e→i', it: 'I cambi di vocale o→ue ed e→i' },
    ruleSummary: {
      en: 'poder → puedo, dormir → duermo, jugar → juego, pedir → pido — same boot, different vowels.',
      it: 'poder → puedo, dormir → duermo, jugar → juego, pedir → pido — stesso stivale, vocali diverse.',
    },
    cefr: 'A1',
    dependencies: ['es-stem-e-ie'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Two more vowel changes use the same boot pattern. **o→ue**: *poder → puedo*, *dormir → duermo*, *volver → vuelvo*, *acostarse → me acuesto*. **e→i** (only -ir verbs): *pedir → pido*, *decir → dices*. And one lone **u→ue** verb: *jugar → juego*. As always, *nosotros* and *vosotros* keep the original vowel.',
          it: 'Altri due cambi di vocale seguono lo stesso schema a stivale. **o→ue**: *poder → puedo*, *dormir → duermo*, *volver → vuelvo*, *acostarse → me acuesto*. **e→i** (solo verbi in -ir): *pedir → pido*, *decir → dices*. E un solo verbo con **u→ue**: *jugar → juego*. Come sempre, *nosotros* e *vosotros* mantengono la vocale originale.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'poder (o→ue) & pedir (e→i)', it: 'poder (o→ue) e pedir (e→i)' },
        header: ['', 'poder', 'pedir'],
        rows: [
          ['yo', 'puedo', 'pido'],
          ['tú', 'puedes', 'pides'],
          ['él / ella / usted', 'puede', 'pide'],
          ['nosotros/as', 'podemos', 'pedimos'],
          ['vosotros/as', 'podéis', 'pedís'],
          ['ellos / ellas / ustedes', 'pueden', 'piden'],
        ],
        highlight: [
          [0, 1],
          [0, 2],
          [1, 1],
          [1, 2],
          [2, 1],
          [2, 2],
          [5, 1],
          [5, 2],
        ],
      },
      { kind: 'example', text: 'Duermo ocho horas.', gloss: { en: 'I sleep eight hours.', it: 'Dormo otto ore.' } },
      { kind: 'example', text: 'Pido un café.', gloss: { en: 'I order a coffee.', it: 'Ordino un caffè.' } },
      { kind: 'example', text: '¿Juegas al fútbol?', gloss: { en: 'Do you play football?', it: 'Giochi a calcio?' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: '*Jugar* is the only u→ue verb in the language: *juego, juegas… jugamos*. If you can say *puedo*, you already own the pattern.',
          it: '*Jugar* è l’unico verbo u→ue della lingua: *juego, juegas… jugamos*. Se sai dire *puedo*, lo schema è già tuo.',
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
    introLexemeIds: ['es/verb/poder', 'es/verb/dormir', 'es/verb/volver', 'es/verb/jugar', 'es/verb/pedir'],
    drillItems: [
      { gen: 'match-verb', verbId: 'es/verb/poder', tense: 'pres' },
      { gen: 'conj', verbId: 'es/verb/dormir', tense: 'pres', persons: ['2sg', '1pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/pedir', tense: 'pres', persons: ['3sg', '1pl'], type: 'cloze' },
      { gen: 'conj', verbId: 'es/verb/jugar', tense: 'pres', persons: ['2sg', '1pl'], type: 'mc' },
      { gen: 'conj', verbId: 'es/verb/volver', tense: 'pres', persons: ['3sg'], type: 'cloze' },
    ],
    errorHints: {
      missingStemChange: {
        en: 'Inside the boot the vowel changes: puedo, duermes, pide, juegan.',
        it: 'Dentro lo stivale la vocale cambia: puedo, duermes, pide, juegan.',
      },
      overStemChange: {
        en: 'nosotros/vosotros keep the original vowel: podemos, dormís, pedimos, jugáis.',
        it: 'nosotros/vosotros mantengono la vocale originale: podemos, dormís, pedimos, jugáis.',
      },
      wrongPerson: {
        en: 'Right vowel, wrong person — match the ending to the subject.',
        it: 'Vocale giusta, persona sbagliata — fai concordare la desinenza con il soggetto.',
      },
      infinitive: {
        en: 'That’s the dictionary form — it must be conjugated here.',
        it: 'Quella è la forma del dizionario — qui va coniugata.',
      },
    },
  },

  {
    id: 'es-saber-conocer',
    lang: 'es',
    title: { en: 'Saber vs conocer', it: 'Saber vs conocer' },
    ruleSummary: {
      en: 'saber = facts & skills; conocer = familiarity with people and places.',
      it: 'saber = fatti e abilità; conocer = familiarità con persone e luoghi.',
    },
    cefr: 'A2',
    dependencies: ['es-go-verbs'],
    explanation: [
      {
        kind: 'prose',
        md: {
          en: 'Spanish has two verbs for “to know”. **Saber** is for facts, information and skills (*sé la respuesta*; *sé cocinar* — with an infinitive). **Conocer** is for being familiar with people, places and works (*conozco a María*, *conozco Madrid*). Both have irregular yo forms: *sé* and *conozco*.',
          it: 'Lo spagnolo ha due verbi per “sapere/conoscere” — esattamente come l’italiano. **Saber** è per fatti, informazioni e abilità (*sé la respuesta*; *sé cocinar* — con l’infinito, come “so cucinare”). **Conocer** è per la familiarità con persone, luoghi e opere (*conozco a María*, *conozco Madrid*). Entrambi hanno la yo irregolare: *sé* e *conozco*.',
        },
      },
      {
        kind: 'table',
        caption: { en: 'Two ways to know', it: 'Due modi di conoscere' },
        header: [
          { en: 'saber — facts & skills', it: 'saber — fatti e abilità' },
          { en: 'conocer — familiarity', it: 'conocer — familiarità' },
        ],
        rows: [
          [
            { en: 'fact: Sé dónde vives.', it: 'fatto: Sé dónde vives.' },
            { en: 'person: Conozco a María.', it: 'persona: Conozco a María.' },
          ],
          [
            { en: 'skill: Sé cocinar.', it: 'abilità: Sé cocinar.' },
            { en: 'place: Conozco la ciudad.', it: 'luogo: Conozco la ciudad.' },
          ],
          [
            { en: 'information: ¿Sabes qué hora es?', it: 'informazione: ¿Sabes qué hora es?' },
            { en: 'thing/work: Conozco este libro.', it: 'cosa/opera: Conozco este libro.' },
          ],
        ],
      },
      { kind: 'example', text: 'Sé hablar español.', gloss: { en: 'I know how to speak Spanish.', it: 'So parlare spagnolo.' } },
      {
        kind: 'example',
        text: 'Conozco a María.',
        gloss: { en: 'I know María.', it: 'Conosco Maria.' },
        note: { en: 'a person as object → personal a', it: 'una persona come oggetto → a personale' },
      },
      { kind: 'example', text: '¿Sabes dónde está el banco?', gloss: { en: 'Do you know where the bank is?', it: 'Sai dov’è la banca?' } },
      {
        kind: 'callout',
        style: 'tip',
        md: {
          en: 'Italian makes this easy: *saber* ≈ *sapere*, *conocer* ≈ *conoscere*. If you’d say *sapere*, use saber; if you’d say *conoscere*, use conocer.',
          it: 'L’italiano ti facilita la vita: *saber* ≈ *sapere*, *conocer* ≈ *conoscere*. Se diresti *sapere*, usa saber; se diresti *conoscere*, usa conocer.',
        },
      },
    ],
    skillCells: [{ cellId: 'core', label: { en: 'saber vs conocer choice', it: 'scelta tra saber e conocer' } }],
    introLexemeIds: ['es/verb/saber', 'es/verb/conocer', 'es/verb/cocinar', 'es/noun/ciudad'],
    drillItems: [
      {
        gen: 'authored',
        exercises: [
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', 'hablar', 'español.'],
            gapIndex: 0,
            gloss: { en: 'I know how to speak Spanish.', it: 'So parlare spagnolo.' },
            answer: 'Sé',
            accepted: [],
            options: [
              { text: 'Sé' },
              { text: 'Conozco', strategy: 'saberConocerSwap' },
              { text: 'Sabes', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-saber-conocer:core'],
            ttsText: 'Sé hablar español.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___', 'a', 'María.'],
            gapIndex: 0,
            gloss: { en: 'I know María.', it: 'Conosco Maria.' },
            answer: 'Conozco',
            accepted: [],
            options: [
              { text: 'Conozco' },
              { text: 'Sé', strategy: 'saberConocerSwap' },
              { text: 'Conoces', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-saber-conocer:core'],
            ttsText: 'Conozco a María.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['¿', '___', 'dónde', 'está', 'el', 'banco?'],
            gapIndex: 1,
            gloss: { en: 'Do you know where the bank is?', it: 'Sai dov’è la banca?' },
            answer: 'Sabes',
            accepted: [],
            options: [
              { text: 'Sabes' },
              { text: 'Conoces', strategy: 'saberConocerSwap' },
              { text: 'Sabe', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-saber-conocer:core'],
            ttsText: '¿Sabes dónde está el banco?',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Ellos', '___', 'la', 'ciudad.'],
            gapIndex: 1,
            gloss: { en: 'They know the city.', it: 'Loro conoscono la città.' },
            answer: 'conocen',
            accepted: [],
            options: [
              { text: 'conocen' },
              { text: 'saben', strategy: 'saberConocerSwap' },
              { text: 'conoce', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-saber-conocer:core'],
            ttsText: 'Ellos conocen la ciudad.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['Nosotros', '___', 'cocinar.'],
            gapIndex: 1,
            gloss: { en: 'We know how to cook.', it: 'Sappiamo cucinare.' },
            answer: 'sabemos',
            accepted: [],
            options: [
              { text: 'sabemos' },
              { text: 'conocemos', strategy: 'saberConocerSwap' },
              { text: 'sé', strategy: 'wrongPerson' },
            ],
            skillIds: ['es-saber-conocer:core'],
            ttsText: 'Nosotros sabemos cocinar.',
          },
          {
            type: 'mc',
            lang: 'es',
            sentence: ['___'],
            gapIndex: 0,
            gloss: {
              en: '“I know your brother.” — pick the correct sentence',
              it: '“Conosco tuo fratello.” — scegli la frase corretta',
            },
            answer: 'Conozco a tu hermano.',
            accepted: [],
            options: [
              { text: 'Conozco a tu hermano.' },
              { text: 'Conozco tu hermano.', strategy: 'missingPersonalA' },
              { text: 'Sé a tu hermano.', strategy: 'saberConocerSwap' },
            ],
            skillIds: ['es-saber-conocer:core'],
            ttsText: 'Conozco a tu hermano.',
          },
        ],
      },
    ],
    errorHints: {
      saberConocerSwap: {
        en: 'saber = facts and skills (sé cocinar); conocer = people and places (conozco a María).',
        it: 'saber = fatti e abilità (sé cocinar); conocer = persone e luoghi (conozco a María).',
      },
      wrongPerson: {
        en: 'Right verb, wrong person — match the form to the subject.',
        it: 'Verbo giusto, persona sbagliata — fai concordare la forma con il soggetto.',
      },
      missingPersonalA: {
        en: 'A person as direct object needs the personal a: conozco a tu hermano.',
        it: 'Una persona come complemento oggetto richiede la a personale: conozco a tu hermano.',
      },
    },
  },
]
