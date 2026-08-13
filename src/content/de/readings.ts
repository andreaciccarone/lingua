import type { ReadingPassage } from '../types'

// Short A1/A2 reading passages. Each passage uses only grammar its unit has
// reached (u2: present + V2, nom/acc; u3: + modals/possessives/separables;
// u4: + dative preps; u5: + Perfekt, war/hatte; u6: + weil/dass; u7: + werden,
// adjective endings). ids append-only.
export const DE_READINGS: ReadingPassage[] = [
  {
    id: 'de-read-familie',
    lang: 'de',
    unitId: 'de-u2',
    title: 'Annas Familie',
    blurb: {
      en: 'Anna introduces her family and tells us where everyone lives.',
      it: 'Anna presenta la sua famiglia e ci racconta dove vivono tutti.',
    },
    text:
      'Hallo! Ich heiße Anna und ich wohne in Hamburg. Die Familie ist nicht groß: Vater, Mutter, Bruder und ich.\n\n' +
      'Der Vater heißt Peter und ist Arzt. Die Mutter heißt Maria. Sie ist Lehrerin und liest gern. ' +
      'Der Bruder heißt Tim. Er ist Student und wohnt in Berlin. Er kommt oft nach Hamburg, denn er isst gern hier.\n\n' +
      'Sonntags essen wir alle zusammen. Das ist schön!',
    glossary: [
      ['heißt', { en: 'is called', it: 'si chiama' }],
      ['gern', { en: 'gladly, likes to', it: 'volentieri' }],
      ['oft', { en: 'often', it: 'spesso' }],
      ['sonntags', { en: 'on Sundays', it: 'di domenica' }],
      ['zusammen', { en: 'together', it: 'insieme' }],
    ],
    questions: [
      {
        prompt: 'Wo wohnt Anna?',
        options: [
          { text: 'In Hamburg' },
          { text: 'In Berlin', strategy: 'vocabConfusable' },
          { text: 'In München', strategy: 'vocabConfusable' },
        ],
        answer: 'In Hamburg',
      },
      {
        prompt: 'Wer wohnt in Berlin?',
        options: [
          { text: 'Tim' },
          { text: 'Peter', strategy: 'vocabConfusable' },
          { text: 'Maria', strategy: 'vocabConfusable' },
          { text: 'Anna', strategy: 'vocabConfusable' },
        ],
        answer: 'Tim',
      },
      {
        prompt: 'Was macht Tim in Berlin?',
        options: [
          { text: 'Er ist Student.' },
          { text: 'Er ist Arzt.', strategy: 'vocabConfusable' },
          { text: 'Er ist Lehrer.', strategy: 'vocabConfusable' },
        ],
        answer: 'Er ist Student.',
      },
      {
        prompt: 'Wann isst die Familie zusammen?',
        options: [
          { text: 'Sonntags' },
          { text: 'Montags', strategy: 'vocabConfusable' },
          { text: 'Freitags', strategy: 'vocabConfusable' },
        ],
        answer: 'Sonntags',
      },
    ],
  },

  {
    id: 'de-read-supermarkt',
    lang: 'de',
    unitId: 'de-u2',
    title: 'Der Supermarkt',
    blurb: {
      en: 'A quick trip to the supermarket — what Lukas and Marie buy and what it costs.',
      it: 'Una spesa veloce al supermercato — cosa comprano Lukas e Marie e quanto costa.',
    },
    text:
      'Lukas und Marie kaufen heute Brot, Käse und Obst. Der Supermarkt ist groß, und die Preise sind gut.\n\n' +
      'Der Käse kostet vier Euro. Die Äpfel kosten drei Euro. Marie nimmt auch eine Tomate und einen Salat. ' +
      'Lukas trinkt gern Wein, aber der Wein kostet zwölf Euro. Das ist zu teuer! Er kauft keinen Wein, er nimmt einen Saft.\n\n' +
      'Alles zusammen kostet zwanzig Euro. Marie findet den Preis gut.',
    glossary: [
      ['kostet', { en: 'costs', it: 'costa' }],
      ['zu teuer', { en: 'too expensive', it: 'troppo caro' }],
      ['nimmt', { en: 'takes', it: 'prende' }],
      ['alles zusammen', { en: 'all together', it: 'tutto insieme' }],
      ['Preise', { en: 'prices', it: 'i prezzi' }],
    ],
    questions: [
      {
        prompt: 'Was kostet der Käse?',
        options: [
          { text: 'Vier Euro' },
          { text: 'Drei Euro', strategy: 'vocabConfusable' },
          { text: 'Zwölf Euro', strategy: 'vocabConfusable' },
          { text: 'Zwanzig Euro', strategy: 'vocabConfusable' },
        ],
        answer: 'Vier Euro',
      },
      {
        prompt: 'Warum kauft Lukas keinen Wein?',
        options: [
          { text: 'Der Wein ist zu teuer.' },
          { text: 'Er trinkt keinen Wein.', strategy: 'vocabConfusable' },
          { text: 'Der Supermarkt hat keinen Wein.', strategy: 'vocabConfusable' },
        ],
        answer: 'Der Wein ist zu teuer.',
      },
      {
        prompt: 'Was nimmt Marie?',
        options: [
          { text: 'Eine Tomate und einen Salat' },
          { text: 'Einen Saft', strategy: 'vocabConfusable' },
          { text: 'Einen Wein', strategy: 'vocabConfusable' },
        ],
        answer: 'Eine Tomate und einen Salat',
      },
      {
        prompt: 'Was kostet alles zusammen?',
        options: [
          { text: 'Zwanzig Euro' },
          { text: 'Zwölf Euro', strategy: 'vocabConfusable' },
          { text: 'Vier Euro', strategy: 'vocabConfusable' },
        ],
        answer: 'Zwanzig Euro',
      },
    ],
  },

  {
    id: 'de-read-wohnung',
    lang: 'de',
    unitId: 'de-u3',
    title: 'Unsere Wohnung',
    blurb: {
      en: 'A small flat, four rooms — and a few house rules.',
      it: 'Un piccolo appartamento, quattro stanze — e qualche regola di casa.',
    },
    text:
      'Unsere Wohnung ist klein, aber schön. Sie hat ein Wohnzimmer, zwei Schlafzimmer, eine Küche und ein Bad. ' +
      'Die Küche ist klein, aber ich koche gern.\n\n' +
      'Wir haben auch Hausregeln. Man darf abends keine Musik machen, denn die Nachbarn wollen schlafen. ' +
      'Man muss die Küche und das Bad putzen. Ich muss mein Zimmer aufräumen, und mein Bruder muss das Wohnzimmer putzen.\n\n' +
      'Wir dürfen keinen Hund haben. Das finde ich nicht gut, denn ich will einen Hund!',
    glossary: [
      ['Wohnung', { en: 'flat, apartment', it: 'l’appartamento' }],
      ['Nachbarn', { en: 'neighbours', it: 'i vicini' }],
      ['putzen', { en: 'to clean', it: 'pulire' }],
      ['aufräumen', { en: 'to tidy up', it: 'mettere in ordine' }],
      ['koche', { en: '(I) cook', it: 'cucino' }],
      ['Hund', { en: 'dog', it: 'il cane' }],
    ],
    questions: [
      {
        prompt: 'Was darf man abends nicht machen?',
        options: [
          { text: 'Musik machen' },
          { text: 'Schlafen', strategy: 'vocabConfusable' },
          { text: 'Kochen', strategy: 'vocabConfusable' },
        ],
        answer: 'Musik machen',
      },
      {
        prompt: 'Was muss der Bruder putzen?',
        options: [
          { text: 'Das Wohnzimmer' },
          { text: 'Die Küche', strategy: 'vocabConfusable' },
          { text: 'Das Bad', strategy: 'vocabConfusable' },
          { text: 'Das Schlafzimmer', strategy: 'vocabConfusable' },
        ],
        answer: 'Das Wohnzimmer',
      },
      {
        prompt: 'Warum darf man abends keine Musik machen?',
        options: [
          { text: 'Die Nachbarn wollen schlafen.' },
          { text: 'Die Wohnung ist zu klein.', strategy: 'vocabConfusable' },
          { text: 'Die Familie will kochen.', strategy: 'vocabConfusable' },
        ],
        answer: 'Die Nachbarn wollen schlafen.',
      },
      {
        prompt: 'Darf die Familie einen Hund haben?',
        options: [
          { text: 'Nein, sie darf nicht.' },
          { text: 'Ja, sie darf.', strategy: 'vocabConfusable' },
          { text: 'Sie hat schon einen Hund.', strategy: 'vocabConfusable' },
        ],
        answer: 'Nein, sie darf nicht.',
      },
    ],
  },

  {
    id: 'de-read-brief',
    lang: 'de',
    unitId: 'de-u4',
    title: 'Eine Postkarte aus Berlin',
    blurb: {
      en: 'A postcard from Berlin: buses, museums and an evening with a friend.',
      it: 'Una cartolina da Berlino: autobus, musei e una serata con un’amica.',
    },
    text:
      'Liebe Marta,\n\n' +
      'viele Grüße aus Berlin! Die Stadt ist wunderbar. Ich wohne bei einer Freundin. Sie heißt Julia und wohnt seit einem Jahr hier.\n\n' +
      'Wir fahren jeden Tag mit dem Bus oder mit der U-Bahn. Heute besuchen wir ein Museum, und morgen gehen wir in den Park. ' +
      'In der Stadt gibt es viele Cafés, und der Kaffee ist sehr gut. Am Abend essen wir bei Julia zu Hause.\n\n' +
      'Bis bald! Deine Lisa',
    glossary: [
      ['viele Grüße', { en: 'best wishes, greetings', it: 'tanti saluti' }],
      ['seit einem Jahr', { en: 'for a year', it: 'da un anno' }],
      ['jeden Tag', { en: 'every day', it: 'ogni giorno' }],
      ['besuchen', { en: 'to visit', it: 'visitare' }],
      ['es gibt', { en: 'there is / there are', it: 'c’è / ci sono' }],
      ['Bis bald!', { en: 'see you soon', it: 'a presto' }],
    ],
    questions: [
      {
        prompt: 'Wo ist Lisa jetzt?',
        options: [
          { text: 'In Berlin' },
          { text: 'In Hamburg', strategy: 'vocabConfusable' },
          { text: 'In München', strategy: 'vocabConfusable' },
        ],
        answer: 'In Berlin',
      },
      {
        prompt: 'Wo wohnt Lisa in Berlin?',
        options: [
          { text: 'Bei Julia' },
          { text: 'In einem Hotel', strategy: 'vocabConfusable' },
          { text: 'Bei Marta', strategy: 'vocabConfusable' },
        ],
        answer: 'Bei Julia',
      },
      {
        prompt: 'Wie fahren Lisa und Julia durch die Stadt?',
        options: [
          { text: 'Mit dem Bus und mit der U-Bahn' },
          { text: 'Mit dem Auto', strategy: 'vocabConfusable' },
          { text: 'Mit dem Zug', strategy: 'vocabConfusable' },
        ],
        answer: 'Mit dem Bus und mit der U-Bahn',
      },
      {
        prompt: 'Was machen sie am Abend?',
        options: [
          { text: 'Sie essen bei Julia zu Hause.' },
          { text: 'Sie besuchen ein Museum.', strategy: 'vocabConfusable' },
          { text: 'Sie gehen in den Park.', strategy: 'vocabConfusable' },
        ],
        answer: 'Sie essen bei Julia zu Hause.',
      },
    ],
  },

  {
    id: 'de-read-tag',
    lang: 'de',
    unitId: 'de-u5',
    title: 'Gestern',
    blurb: {
      en: 'Markus looks back on a busy day, from getting up to going to bed.',
      it: 'Markus ripensa a una giornata piena, da quando si alza a quando va a letto.',
    },
    text:
      'Gestern hat Markus viel gemacht. Er ist um sieben Uhr aufgestanden und hat Kaffee getrunken. ' +
      'Dann ist er mit der U-Bahn zur Universität gefahren. Er hat dort vier Stunden gelernt, denn er hat bald eine Prüfung.\n\n' +
      'Am Nachmittag hat er im Supermarkt eingekauft. Er hat Brot, Obst und Milch gekauft. ' +
      'Dann hat er einen Freund getroffen. Sie haben viel gesprochen und gelacht.\n\n' +
      'Am Abend hat Markus gekocht und ein Buch gelesen. Um elf Uhr ist er ins Bett gegangen. Der Tag war lang, aber schön.',
    glossary: [
      ['aufgestanden', { en: 'got up', it: 'si è alzato' }],
      ['eingekauft', { en: 'did the shopping', it: 'ha fatto la spesa' }],
      ['getroffen', { en: 'met', it: 'ha incontrato' }],
      ['gelacht', { en: 'laughed', it: 'hanno riso' }],
      ['Am Nachmittag', { en: 'in the afternoon', it: 'nel pomeriggio' }],
      ['Prüfung', { en: 'exam', it: 'l’esame' }],
    ],
    questions: [
      {
        prompt: 'Wann ist Markus aufgestanden?',
        options: [
          { text: 'Um sieben Uhr' },
          { text: 'Um neun Uhr', strategy: 'vocabConfusable' },
          { text: 'Um elf Uhr', strategy: 'vocabConfusable' },
        ],
        answer: 'Um sieben Uhr',
      },
      {
        prompt: 'Warum hat Markus vier Stunden gelernt?',
        options: [
          { text: 'Er hat bald eine Prüfung.' },
          { text: 'Er arbeitet im Supermarkt.', strategy: 'vocabConfusable' },
          { text: 'Er will ein Buch schreiben.', strategy: 'vocabConfusable' },
        ],
        answer: 'Er hat bald eine Prüfung.',
      },
      {
        prompt: 'Was hat Markus im Supermarkt gekauft?',
        options: [
          { text: 'Brot, Obst und Milch' },
          { text: 'Kaffee und Käse', strategy: 'vocabConfusable' },
          { text: 'Pizza und Wein', strategy: 'vocabConfusable' },
        ],
        answer: 'Brot, Obst und Milch',
      },
      {
        prompt: 'Was hat Markus am Abend gemacht?',
        options: [
          { text: 'Er hat gekocht und gelesen.' },
          { text: 'Er hat einen Freund getroffen.', strategy: 'vocabConfusable' },
          { text: 'Er ist zur Universität gefahren.', strategy: 'vocabConfusable' },
        ],
        answer: 'Er hat gekocht und gelesen.',
      },
    ],
  },

  {
    id: 'de-read-urlaub',
    lang: 'de',
    unitId: 'de-u5',
    title: 'Urlaub am Meer',
    blurb: {
      en: 'Two weeks in Italy by train: sun, sea — and one very late train.',
      it: 'Due settimane in Italia in treno: sole, mare — e un treno in grande ritardo.',
    },
    text:
      'Im Juli hatten wir zwei Wochen Urlaub. Meine Frau und ich sind mit dem Zug nach Italien gefahren, denn wir fliegen nicht gern.\n\n' +
      'Das Hotel war klein, aber es war direkt am Meer. Das Wetter war super: Wir hatten jeden Tag Sonne. ' +
      'Wir sind viel geschwommen und haben Fisch gegessen. Einmal haben wir auch ein Museum besucht.\n\n' +
      'Die Reise nach Hause war lang. Der Zug hatte drei Stunden Verspätung! ' +
      'Aber das ist egal: Der Urlaub war wunderbar, und wir waren sehr glücklich.',
    glossary: [
      ['meine Frau', { en: 'my wife', it: 'mia moglie' }],
      ['fliegen', { en: 'to fly', it: 'volare' }],
      ['geschwommen', { en: 'swum (schwimmen)', it: 'nuotato (nuotare)' }],
      ['Fisch', { en: 'fish', it: 'il pesce' }],
      ['Verspätung', { en: 'delay', it: 'il ritardo' }],
      ['egal', { en: 'it doesn’t matter', it: 'non importa' }],
    ],
    questions: [
      {
        prompt: 'Wo waren sie im Urlaub?',
        options: [
          { text: 'In Italien' },
          { text: 'In Deutschland', strategy: 'vocabConfusable' },
          { text: 'In Spanien', strategy: 'vocabConfusable' },
        ],
        answer: 'In Italien',
      },
      {
        prompt: 'Wie sind sie nach Italien gefahren?',
        options: [
          { text: 'Mit dem Zug' },
          { text: 'Mit dem Flugzeug', strategy: 'vocabConfusable' },
          { text: 'Mit dem Auto', strategy: 'vocabConfusable' },
        ],
        answer: 'Mit dem Zug',
      },
      {
        prompt: 'Wie war das Wetter?',
        options: [
          { text: 'Super — jeden Tag Sonne' },
          { text: 'Schlecht — viel Regen', strategy: 'vocabConfusable' },
          { text: 'Nur Wolken und Wind', strategy: 'vocabConfusable' },
        ],
        answer: 'Super — jeden Tag Sonne',
      },
      {
        prompt: 'Warum war die Reise nach Hause lang?',
        options: [
          { text: 'Der Zug hatte Verspätung.' },
          { text: 'Das Auto war kaputt.', strategy: 'vocabConfusable' },
          { text: 'Das Flugzeug ist spät gekommen.', strategy: 'vocabConfusable' },
        ],
        answer: 'Der Zug hatte Verspätung.',
      },
    ],
  },

  {
    id: 'de-read-freundin',
    lang: 'de',
    unitId: 'de-u6',
    title: 'Lena liebt Köln',
    blurb: {
      en: 'Why Lena loves her city: the river, the cafés and the people.',
      it: 'Perché Lena ama la sua città: il fiume, i caffè e la gente.',
    },
    text:
      'Meine Freundin Lena wohnt in Köln, und sie liebt ihre Stadt. Sie sagt oft, dass Köln schöner als Berlin ist. ' +
      'Das finde ich lustig, aber ich verstehe sie.\n\n' +
      'Lena liebt Köln, weil die Stadt direkt am Rhein liegt. Sie geht jeden Tag am Fluss spazieren. ' +
      'Sie liebt auch die Cafés, weil die Menschen dort so freundlich sind. ' +
      'Und sie fährt nie mit dem Auto, weil die U-Bahn schnell und billig ist.\n\n' +
      'Ich glaube, dass Lena nie umzieht. Ihre Familie und ihre Freunde wohnen dort, und sie ist sehr glücklich.',
    glossary: [
      ['liegt', { en: 'lies, is located', it: 'si trova' }],
      ['spazieren', { en: '(to go) for a walk', it: 'a passeggio (passeggiare)' }],
      ['Menschen', { en: 'people', it: 'la gente' }],
      ['freundlich', { en: 'friendly', it: 'gentili' }],
      ['billig', { en: 'cheap', it: 'economico' }],
      ['umzieht', { en: 'moves house (umziehen)', it: 'trasloca (traslocare)' }],
    ],
    questions: [
      {
        prompt: 'Wo wohnt Lena?',
        options: [
          { text: 'In Köln' },
          { text: 'In Berlin', strategy: 'vocabConfusable' },
          { text: 'In Hamburg', strategy: 'vocabConfusable' },
        ],
        answer: 'In Köln',
      },
      {
        prompt: 'Was sagt Lena oft?',
        options: [
          { text: 'Dass Köln schöner als Berlin ist.' },
          { text: 'Dass Berlin schöner als Köln ist.', strategy: 'vocabConfusable' },
          { text: 'Dass sie bald umzieht.', strategy: 'vocabConfusable' },
        ],
        answer: 'Dass Köln schöner als Berlin ist.',
      },
      {
        prompt: 'Warum liebt Lena die Cafés?',
        options: [
          { text: 'Weil die Menschen dort freundlich sind.' },
          { text: 'Weil der Kaffee billig ist.', strategy: 'vocabConfusable' },
          { text: 'Weil sie am Fluss liegen.', strategy: 'vocabConfusable' },
        ],
        answer: 'Weil die Menschen dort freundlich sind.',
      },
      {
        prompt: 'Warum fährt Lena nie mit dem Auto?',
        options: [
          { text: 'Weil die U-Bahn schnell und billig ist.' },
          { text: 'Weil sie kein Auto hat.', strategy: 'vocabConfusable' },
          { text: 'Weil die Stadt zu klein ist.', strategy: 'vocabConfusable' },
        ],
        answer: 'Weil die U-Bahn schnell und billig ist.',
      },
    ],
  },

  {
    id: 'de-read-zukunft',
    lang: 'de',
    unitId: 'de-u7',
    title: 'Pläne für nächstes Jahr',
    blurb: {
      en: 'Marco’s plans for next year: German, a trip to Berlin and a new flat.',
      it: 'I piani di Marco per l’anno prossimo: il tedesco, un viaggio a Berlino e un nuovo appartamento.',
    },
    text:
      'Ich heiße Marco, und nächstes Jahr wird ein wichtiges Jahr für mich. Ich werde endlich richtig Deutsch lernen! ' +
      'Ich werde jeden Tag dreißig Minuten lernen und viele Bücher lesen.\n\n' +
      'Im Sommer werde ich nach Deutschland fahren. Ich will einen Monat in Berlin bleiben, denn ich habe dort gute Freunde. ' +
      'Meine Schwester wird mitkommen, weil sie die Stadt noch nicht kennt. ' +
      'Wir werden viele Museen besuchen und in kleinen Restaurants essen.\n\n' +
      'Ich werde auch eine neue Wohnung suchen, weil meine Wohnung zu klein ist. Das nächste Jahr wird super!',
    glossary: [
      ['nächstes Jahr', { en: 'next year', it: 'l’anno prossimo' }],
      ['endlich', { en: 'finally', it: 'finalmente' }],
      ['richtig', { en: 'properly, for real', it: 'per bene, davvero' }],
      ['bleiben', { en: 'to stay', it: 'restare' }],
      ['kennt', { en: 'knows (kennen)', it: 'conosce' }],
      ['suchen', { en: 'to look for', it: 'cercare' }],
    ],
    questions: [
      {
        prompt: 'Was wird Marco jeden Tag machen?',
        options: [
          { text: 'Dreißig Minuten Deutsch lernen' },
          { text: 'Viele Museen besuchen', strategy: 'vocabConfusable' },
          { text: 'Eine neue Wohnung suchen', strategy: 'vocabConfusable' },
        ],
        answer: 'Dreißig Minuten Deutsch lernen',
      },
      {
        prompt: 'Wann wird Marco nach Deutschland fahren?',
        options: [
          { text: 'Im Sommer' },
          { text: 'Im Winter', strategy: 'vocabConfusable' },
          { text: 'Nächste Woche', strategy: 'vocabConfusable' },
        ],
        answer: 'Im Sommer',
      },
      {
        prompt: 'Warum wird die Schwester mitkommen?',
        options: [
          { text: 'Weil sie Berlin noch nicht kennt.' },
          { text: 'Weil sie in Berlin wohnt.', strategy: 'vocabConfusable' },
          { text: 'Weil sie dort gute Freunde hat.', strategy: 'vocabConfusable' },
        ],
        answer: 'Weil sie Berlin noch nicht kennt.',
      },
      {
        prompt: 'Warum sucht Marco eine neue Wohnung?',
        options: [
          { text: 'Seine Wohnung ist zu klein.' },
          { text: 'Seine Wohnung ist zu teuer.', strategy: 'vocabConfusable' },
          { text: 'Er will nicht in der Stadt wohnen.', strategy: 'vocabConfusable' },
        ],
        answer: 'Seine Wohnung ist zu klein.',
      },
    ],
  },
]
