import type { ReadingPassage } from '../types'

// Short A1–A2 reading passages, one cluster per unit; ids append-only.
// Each passage uses only grammar its unit has reached.
export const ES_READINGS: ReadingPassage[] = [
  {
    id: 'es-read-familia',
    lang: 'es',
    unitId: 'es-u2',
    title: 'Mi familia',
    blurb: {
      en: 'María introduces her family: who they are, where they live, what they do.',
      it: 'María presenta la sua famiglia: chi sono, dove vivono, che cosa fanno.',
    },
    text: `¡Hola! Soy María y vivo en Sevilla con mi familia. Mi padre es médico y trabaja en un hospital. Mi madre es profesora en una escuela del barrio.

Mi hermano Pablo estudia en la universidad y habla tres idiomas. Mis abuelos viven en un pueblo pequeño, cerca del mar.

Los domingos comemos todos juntos en la casa de los abuelos. La abuela cocina muy bien y la comida siempre está deliciosa.`,
    glossary: [
      ['barrio', { en: 'neighbourhood', it: 'il quartiere' }],
      ['idiomas', { en: 'languages', it: 'le lingue' }],
      ['cerca del mar', { en: 'near the sea', it: 'vicino al mare' }],
      ['todos juntos', { en: 'all together', it: 'tutti insieme' }],
      ['cocina', { en: 'cooks (verb)', it: 'cucina (verbo)' }],
    ],
    questions: [
      {
        prompt: '¿Dónde trabaja el padre de María?',
        options: [
          { text: 'En un hospital.' },
          { text: 'En una escuela.', strategy: 'vocabConfusable' },
          { text: 'En la universidad.', strategy: 'vocabConfusable' },
        ],
        answer: 'En un hospital.',
      },
      {
        prompt: '¿Quién es profesora?',
        options: [
          { text: 'La madre de María.' },
          { text: 'La abuela de María.', strategy: 'vocabConfusable' },
          { text: 'El padre de María.', strategy: 'vocabConfusable' },
        ],
        answer: 'La madre de María.',
      },
      {
        prompt: '¿Dónde viven los abuelos?',
        options: [
          { text: 'En un pueblo pequeño.' },
          { text: 'En Sevilla.', strategy: 'vocabConfusable' },
          { text: 'En el barrio de la escuela.', strategy: 'vocabConfusable' },
        ],
        answer: 'En un pueblo pequeño.',
      },
      {
        prompt: '¿Cuándo comen todos juntos?',
        options: [
          { text: 'Los domingos.' },
          { text: 'Los sábados.', strategy: 'vocabConfusable' },
          { text: 'Los lunes.', strategy: 'vocabConfusable' },
        ],
        answer: 'Los domingos.',
      },
    ],
  },

  {
    id: 'es-read-mercado',
    lang: 'es',
    unitId: 'es-u2',
    title: 'Una mañana en el mercado',
    blurb: {
      en: 'Ana shops at the market: fruit, fish, prices — and a coffee to finish.',
      it: 'Ana fa la spesa al mercato: frutta, pesce, prezzi — e un caffè per finire.',
    },
    text: `Los sábados por la mañana, Ana compra en el mercado de la plaza. El mercado está lleno de gente y las señoras hablan con los vendedores.

Ana busca fruta: manzanas, naranjas y tomates. Las naranjas están a un euro el kilo; no son caras. También compra pan, queso y pescado fresco. El pescado es caro, pero está muy bueno.

Ana no compra carne hoy. Con el dinero que queda, toma un café en el bar de la esquina.`,
    glossary: [
      ['lleno de gente', { en: 'full of people', it: 'pieno di gente' }],
      ['vendedores', { en: 'sellers, stallholders', it: 'i venditori' }],
      ['están a un euro el kilo', { en: 'they cost one euro a kilo', it: 'costano un euro al chilo' }],
      ['caras', { en: 'expensive', it: 'care, costose' }],
      ['queda', { en: 'is left (over)', it: 'rimane, avanza' }],
      ['esquina', { en: 'corner', it: 'l’angolo' }],
    ],
    questions: [
      {
        prompt: '¿Cuándo compra Ana en el mercado?',
        options: [
          { text: 'Los sábados por la mañana.' },
          { text: 'Los domingos por la mañana.', strategy: 'vocabConfusable' },
          { text: 'Los sábados por la tarde.', strategy: 'vocabConfusable' },
        ],
        answer: 'Los sábados por la mañana.',
      },
      {
        prompt: '¿Qué fruta busca Ana?',
        options: [
          { text: 'Manzanas, naranjas y tomates.' },
          { text: 'Pan y queso.', strategy: 'vocabConfusable' },
          { text: 'Carne y pescado.', strategy: 'vocabConfusable' },
        ],
        answer: 'Manzanas, naranjas y tomates.',
      },
      {
        prompt: '¿Cómo es el pescado?',
        options: [
          { text: 'Es caro, pero está muy bueno.' },
          { text: 'Es barato y fresco.', strategy: 'vocabConfusable' },
          { text: 'No está bueno.', strategy: 'vocabConfusable' },
        ],
        answer: 'Es caro, pero está muy bueno.',
      },
      {
        prompt: '¿Qué no compra Ana hoy?',
        options: [
          { text: 'Carne.' },
          { text: 'Pescado.', strategy: 'vocabConfusable' },
          { text: 'Pan.', strategy: 'vocabConfusable' },
          { text: 'Fruta.', strategy: 'vocabConfusable' },
        ],
        answer: 'Carne.',
      },
    ],
  },

  {
    id: 'es-read-piso',
    lang: 'es',
    unitId: 'es-u3',
    title: 'El piso nuevo',
    blurb: {
      en: 'A couple describe their new flat — its rooms, and what they are going to change.',
      it: 'Una coppia descrive il nuovo appartamento — le stanze e cosa cambieranno.',
    },
    text: `Lucía y yo tenemos un piso nuevo en el centro de la ciudad. El piso tiene tres dormitorios, un salón grande, una cocina pequeña y un baño. Desde la ventana del salón vemos un parque.

En el salón tenemos una mesa, cuatro sillas y un espejo viejo. La cocina no tiene mucha luz, por eso vamos a pintar las paredes de blanco. También vamos a comprar una cama nueva, porque la cama vieja es muy incómoda.

El sábado vienen los padres de Lucía a ver el piso.`,
    glossary: [
      ['piso', { en: 'flat, apartment', it: 'l’appartamento' }],
      ['luz', { en: 'light', it: 'la luce' }],
      ['por eso', { en: 'that is why', it: 'per questo' }],
      ['pintar las paredes', { en: 'to paint the walls', it: 'dipingere le pareti' }],
      ['incómoda', { en: 'uncomfortable', it: 'scomoda' }],
    ],
    questions: [
      {
        prompt: '¿Cuántos dormitorios tiene el piso?',
        options: [
          { text: 'Tres.' },
          { text: 'Dos.', strategy: 'vocabConfusable' },
          { text: 'Cuatro.', strategy: 'vocabConfusable' },
        ],
        answer: 'Tres.',
      },
      {
        prompt: '¿Qué van a pintar de blanco?',
        options: [
          { text: 'Las paredes de la cocina.' },
          { text: 'Las paredes del salón.', strategy: 'vocabConfusable' },
          { text: 'La puerta del baño.', strategy: 'vocabConfusable' },
        ],
        answer: 'Las paredes de la cocina.',
      },
      {
        prompt: '¿Por qué van a comprar una cama nueva?',
        options: [
          { text: 'Porque la cama vieja es muy incómoda.' },
          { text: 'Porque no tienen cama.', strategy: 'vocabConfusable' },
          { text: 'Porque la cama vieja es muy pequeña.', strategy: 'vocabConfusable' },
        ],
        answer: 'Porque la cama vieja es muy incómoda.',
      },
      {
        prompt: '¿Quién viene el sábado a ver el piso?',
        options: [
          { text: 'Los padres de Lucía.' },
          { text: 'Los hermanos de Lucía.', strategy: 'vocabConfusable' },
          { text: 'Los amigos de Lucía.', strategy: 'vocabConfusable' },
        ],
        answer: 'Los padres de Lucía.',
      },
    ],
  },

  {
    id: 'es-read-restaurante',
    lang: 'es',
    unitId: 'es-u4',
    title: 'Cena en el restaurante',
    blurb: {
      en: 'Marta and Sara eat out: ordering, likes and dislikes, and a good tip.',
      it: 'Marta e Sara cenano fuori: ordinazioni, gusti e una buona mancia.',
    },
    text: `Soy Marta y esta noche ceno con mi amiga Sara en un restaurante del barrio. Nos gusta este sitio porque la comida es buena y no es cara.

El camarero nos trae la carta. A Sara le gusta el pescado y lo pide con ensalada. A mí no me gusta el pescado: prefiero el pollo con patatas.

De postre pedimos una tarta de chocolate y la compartimos. Al final, el camarero nos pregunta si nos gusta la cena. Le decimos que sí y le dejamos una buena propina.`,
    glossary: [
      ['la carta', { en: 'the menu', it: 'il menù' }],
      ['sitio', { en: 'place, spot', it: 'il posto' }],
      ['lo pide', { en: 'orders it', it: 'lo ordina' }],
      ['la compartimos', { en: 'we share it', it: 'la condividiamo' }],
      ['propina', { en: 'tip', it: 'la mancia' }],
    ],
    questions: [
      {
        prompt: '¿Por qué les gusta este restaurante?',
        options: [
          { text: 'Porque la comida es buena y no es cara.' },
          { text: 'Porque el pescado es barato.', strategy: 'vocabConfusable' },
          { text: 'Porque está en el centro de la ciudad.', strategy: 'vocabConfusable' },
        ],
        answer: 'Porque la comida es buena y no es cara.',
      },
      {
        prompt: '¿Qué pide Sara?',
        options: [
          { text: 'Pescado con ensalada.' },
          { text: 'Pollo con patatas.', strategy: 'vocabConfusable' },
          { text: 'Sopa y pan.', strategy: 'vocabConfusable' },
        ],
        answer: 'Pescado con ensalada.',
      },
      {
        prompt: '¿A quién no le gusta el pescado?',
        options: [
          { text: 'A Marta.' },
          { text: 'A Sara.', strategy: 'vocabConfusable' },
          { text: 'Al camarero.', strategy: 'vocabConfusable' },
        ],
        answer: 'A Marta.',
      },
      {
        prompt: '¿Qué piden de postre?',
        options: [
          { text: 'Una tarta de chocolate.' },
          { text: 'Un helado.', strategy: 'vocabConfusable' },
          { text: 'Fruta.', strategy: 'vocabConfusable' },
        ],
        answer: 'Una tarta de chocolate.',
      },
    ],
  },

  {
    id: 'es-read-rutina',
    lang: 'es',
    unitId: 'es-u5',
    title: 'La rutina de Carlos',
    blurb: {
      en: 'A workday in Carlos’s life, from waking up to going to bed.',
      it: 'Una giornata di lavoro di Carlos, dal risveglio fino a quando va a letto.',
    },
    text: `Carlos se despierta a las seis y media, pero se levanta a las siete. Se ducha, se viste y desayuna un café con pan. A las ocho sale de casa y va a la oficina en metro.

Por la mañana tiene reuniones y contesta correos. A las dos come con sus compañeros en un bar cerca de la oficina. Por la tarde tiene que terminar un informe, por eso vuelve tarde a casa.

Después de cenar, ve un poco la televisión. Se lava los dientes y se acuesta a las once y media.`,
    glossary: [
      ['se viste', { en: 'gets dressed', it: 'si veste' }],
      ['sale de casa', { en: 'leaves the house', it: 'esce di casa' }],
      ['contesta correos', { en: 'answers emails', it: 'risponde alle e-mail' }],
      ['compañeros', { en: 'colleagues', it: 'i colleghi' }],
      ['informe', { en: 'report', it: 'la relazione, il rapporto' }],
      ['se acuesta', { en: 'goes to bed', it: 'va a letto, si corica' }],
    ],
    questions: [
      {
        prompt: '¿A qué hora se levanta Carlos?',
        options: [
          { text: 'A las siete.' },
          { text: 'A las seis y media.', strategy: 'vocabConfusable' },
          { text: 'A las ocho.', strategy: 'vocabConfusable' },
        ],
        answer: 'A las siete.',
      },
      {
        prompt: '¿Cómo va Carlos a la oficina?',
        options: [
          { text: 'En metro.' },
          { text: 'En autobús.', strategy: 'vocabConfusable' },
          { text: 'En coche.', strategy: 'vocabConfusable' },
          { text: 'A pie.', strategy: 'vocabConfusable' },
        ],
        answer: 'En metro.',
      },
      {
        prompt: '¿Por qué vuelve tarde a casa?',
        options: [
          { text: 'Porque tiene que terminar un informe.' },
          { text: 'Porque tiene reuniones por la tarde.', strategy: 'vocabConfusable' },
          { text: 'Porque come con sus compañeros.', strategy: 'vocabConfusable' },
        ],
        answer: 'Porque tiene que terminar un informe.',
      },
      {
        prompt: '¿Qué hace Carlos después de cenar?',
        options: [
          { text: 'Ve un poco la televisión.' },
          { text: 'Se ducha y se viste.', strategy: 'vocabConfusable' },
          { text: 'Contesta correos.', strategy: 'vocabConfusable' },
        ],
        answer: 'Ve un poco la televisión.',
      },
    ],
  },

  {
    id: 'es-read-vacaciones',
    lang: 'es',
    unitId: 'es-u6',
    title: 'Vacaciones en la costa',
    blurb: {
      en: 'Last summer’s trip to the coast: the journey, the beach, and a final party.',
      it: 'Il viaggio al mare dell’estate scorsa: il tragitto, la spiaggia e una festa finale.',
    },
    text: `El verano pasado mi hermana y yo fuimos de vacaciones a la costa. Viajamos en tren y llegamos al hotel el sábado por la tarde. El primer día nadamos en el mar y descansamos en la playa.

El martes visitamos un pueblo de pescadores. Comimos pescado fresco en un restaurante pequeño y compramos regalos para la familia: mi hermana compró un sombrero y yo compré un bolso.

La última noche fuimos a una fiesta en la plaza. Bailamos hasta muy tarde y volvimos al hotel a las dos. Fueron unas vacaciones estupendas.`,
    glossary: [
      ['nadamos', { en: 'we swam', it: 'abbiamo nuotato' }],
      ['descansamos', { en: 'we rested', it: 'ci siamo riposati' }],
      ['pueblo de pescadores', { en: 'fishing village', it: 'paese di pescatori' }],
      ['hasta muy tarde', { en: 'until very late', it: 'fino a molto tardi' }],
      ['estupendas', { en: 'wonderful', it: 'fantastiche, magnifiche' }],
    ],
    questions: [
      {
        prompt: '¿Cómo viajaron a la costa?',
        options: [
          { text: 'En tren.' },
          { text: 'En avión.', strategy: 'vocabConfusable' },
          { text: 'En autobús.', strategy: 'vocabConfusable' },
        ],
        answer: 'En tren.',
      },
      {
        prompt: '¿Qué hicieron el primer día?',
        options: [
          { text: 'Nadaron en el mar y descansaron en la playa.' },
          { text: 'Visitaron un pueblo de pescadores.', strategy: 'vocabConfusable' },
          { text: 'Bailaron en la plaza.', strategy: 'vocabConfusable' },
        ],
        answer: 'Nadaron en el mar y descansaron en la playa.',
      },
      {
        prompt: '¿Qué compró la hermana?',
        options: [
          { text: 'Un sombrero.' },
          { text: 'Un bolso.', strategy: 'vocabConfusable' },
          { text: 'Un vestido.', strategy: 'vocabConfusable' },
        ],
        answer: 'Un sombrero.',
      },
      {
        prompt: '¿A qué hora volvieron al hotel la última noche?',
        options: [
          { text: 'A las dos.' },
          { text: 'A las doce.', strategy: 'vocabConfusable' },
          { text: 'A las diez.', strategy: 'vocabConfusable' },
        ],
        answer: 'A las dos.',
      },
    ],
  },

  {
    id: 'es-read-abuela',
    lang: 'es',
    unitId: 'es-u7',
    title: 'El pueblo de la abuela',
    blurb: {
      en: 'Grandmother remembers her childhood village — and the night everything changed.',
      it: 'La nonna ricorda il paese della sua infanzia — e la sera in cui tutto cambiò.',
    },
    text: `Mi abuela siempre habla del pueblo donde nació. Cuando era niña, vivía en una casa blanca cerca del río. El pueblo era pequeño y tranquilo, y no había muchos coches: la gente iba a pie a todas partes.

Su padre trabajaba en el campo y su madre vendía huevos y queso en el mercado. Los niños jugaban en la plaza hasta la noche.

Pero un día de 1962 todo cambió: llegó la primera televisión al pueblo. La pusieron en el bar de la plaza, y aquella noche todo el pueblo fue a verla. «Nadie volvió a casa temprano», dice mi abuela, y sonríe.`,
    glossary: [
      ['nació', { en: 'was born', it: 'è nata, nacque' }],
      ['había', { en: 'there was / there were', it: 'c’era, c’erano' }],
      ['iba a pie', { en: 'went on foot', it: 'andava a piedi' }],
      ['a todas partes', { en: 'everywhere', it: 'dappertutto' }],
      ['la pusieron', { en: 'they put it', it: 'la misero' }],
      ['temprano', { en: 'early', it: 'presto' }],
    ],
    questions: [
      {
        prompt: '¿Dónde vivía la abuela cuando era niña?',
        options: [
          { text: 'En una casa blanca cerca del río.' },
          { text: 'En una casa cerca del mar.', strategy: 'vocabConfusable' },
          { text: 'En un bar de la plaza.', strategy: 'vocabConfusable' },
        ],
        answer: 'En una casa blanca cerca del río.',
      },
      {
        prompt: '¿Qué vendía su madre en el mercado?',
        options: [
          { text: 'Huevos y queso.' },
          { text: 'Fruta y pan.', strategy: 'vocabConfusable' },
          { text: 'Leche y carne.', strategy: 'vocabConfusable' },
        ],
        answer: 'Huevos y queso.',
      },
      {
        prompt: '¿Qué pasó en 1962?',
        options: [
          { text: 'Llegó la primera televisión al pueblo.' },
          { text: 'Llegaron muchos coches al pueblo.', strategy: 'vocabConfusable' },
          { text: 'Abrieron un mercado nuevo.', strategy: 'vocabConfusable' },
        ],
        answer: 'Llegó la primera televisión al pueblo.',
      },
      {
        prompt: '¿Dónde pusieron la televisión?',
        options: [
          { text: 'En el bar de la plaza.' },
          { text: 'En la casa de la abuela.', strategy: 'vocabConfusable' },
          { text: 'En el mercado.', strategy: 'vocabConfusable' },
        ],
        answer: 'En el bar de la plaza.',
      },
    ],
  },

  {
    id: 'es-read-carta',
    lang: 'es',
    unitId: 'es-u7',
    title: 'Un correo de Marina',
    blurb: {
      en: 'An email from a friend: what she has done this week and her weekend plans.',
      it: 'Una e-mail di un’amica: cosa ha fatto questa settimana e i piani per il weekend.',
    },
    text: `¡Hola, Paola! ¿Qué tal? Esta semana ha sido muy larga, pero buena.

El lunes he empezado un trabajo nuevo en una empresa del centro. Mis compañeros son simpáticos y la jefa me ha ayudado mucho. El miércoles he comido con mi hermana y hemos visto una película en casa. Todavía no he hecho los deberes del curso de alemán… ¡esta noche, seguro!

¿Y el fin de semana? El sábado voy a ir al mercado y por la tarde vamos a celebrar el cumpleaños de mi madre. ¿Vas a venir a la fiesta? ¡Escríbeme pronto!

Un abrazo, Marina`,
    glossary: [
      ['ha sido', { en: 'has been', it: 'è stata' }],
      ['jefa', { en: 'boss (female)', it: 'la capo, la responsabile' }],
      ['todavía no he hecho', { en: 'I have not done yet', it: 'non ho ancora fatto' }],
      ['deberes', { en: 'homework', it: 'i compiti' }],
      ['escríbeme pronto', { en: 'write to me soon', it: 'scrivimi presto' }],
      ['un abrazo', { en: 'a hug (letter sign-off)', it: 'un abbraccio' }],
    ],
    questions: [
      {
        prompt: '¿Qué ha empezado Marina el lunes?',
        options: [
          { text: 'Un trabajo nuevo.' },
          { text: 'Un curso de alemán.', strategy: 'vocabConfusable' },
          { text: 'Una película.', strategy: 'vocabConfusable' },
        ],
        answer: 'Un trabajo nuevo.',
      },
      {
        prompt: '¿Con quién ha visto una película?',
        options: [
          { text: 'Con su hermana.' },
          { text: 'Con su madre.', strategy: 'vocabConfusable' },
          { text: 'Con la jefa.', strategy: 'vocabConfusable' },
          { text: 'Con Paola.', strategy: 'vocabConfusable' },
        ],
        answer: 'Con su hermana.',
      },
      {
        prompt: '¿Qué no ha hecho todavía Marina?',
        options: [
          { text: 'Los deberes del curso de alemán.' },
          { text: 'La compra del mercado.', strategy: 'vocabConfusable' },
          { text: 'El trabajo de la empresa.', strategy: 'vocabConfusable' },
        ],
        answer: 'Los deberes del curso de alemán.',
      },
      {
        prompt: '¿Qué van a celebrar el sábado por la tarde?',
        options: [
          { text: 'El cumpleaños de la madre de Marina.' },
          { text: 'El cumpleaños de la hermana de Marina.', strategy: 'vocabConfusable' },
          { text: 'Una fiesta en la empresa.', strategy: 'vocabConfusable' },
        ],
        answer: 'El cumpleaños de la madre de Marina.',
      },
    ],
  },
]
