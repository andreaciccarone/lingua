import type { PrimaryLang } from '../content/types'
import { useSettings } from '../store/settings'

/** every UI string in both instruction languages */
const STRINGS = {
  learn: { en: 'Learn', it: 'Impara' },
  review: { en: 'Review', it: 'Ripasso' },
  stats: { en: 'Stats', it: 'Statistiche' },
  settings: { en: 'Settings', it: 'Impostazioni' },
  unit: { en: 'Unit', it: 'Unità' },
  wordPack: { en: 'Word pack', it: 'Pacchetto di parole' },
  words: { en: 'Words', it: 'Parole' },
  learnBtn: { en: 'Learn', it: 'Impara' },
  comingSoon: { en: 'Coming soon', it: 'In arrivo' },
  startLesson: { en: 'Start lesson', it: 'Inizia la lezione' },
  startReview: { en: 'Start review', it: 'Inizia il ripasso' },
  nothingDue: { en: 'Nothing due', it: 'Niente da ripassare' },
  nothingDueBody: {
    en: 'Grammar skills and words you practice come back here at growing intervals. Do a lesson to get started.',
    it: 'Le regole e le parole che studi tornano qui a intervalli crescenti. Fai una lezione per iniziare.',
  },
  grammarSkills: { en: 'grammar skills', it: 'regole di grammatica' },
  wordsDue: { en: 'words', it: 'parole' },
  correct: { en: 'Correct!', it: 'Giusto!' },
  notQuite: { en: 'Not quite.', it: 'Non proprio.' },
  continue: { en: 'Continue', it: 'Continua' },
  check: { en: 'Check', it: 'Controlla' },
  typeMissingWord: { en: 'Type the missing word', it: 'Scrivi la parola mancante' },
  newWord: { en: 'New word', it: 'Parola nuova' },
  revealMeaning: { en: 'Reveal meaning', it: 'Mostra il significato' },
  gotIt: { en: 'Got it', it: 'Capito' },
  tapWordsInOrder: { en: 'Tap the words in order…', it: 'Tocca le parole in ordine…' },
  lessonComplete: { en: 'Lesson complete', it: 'Lezione completata' },
  reviewComplete: { en: 'Review complete', it: 'Ripasso completato' },
  firstTryScore: {
    en: '{n} of {total} right on the first try ({pct}%)',
    it: '{n} su {total} giuste al primo colpo ({pct}%)',
  },
  loading: { en: 'Loading…', it: 'Caricamento…' },
  nothingHere: { en: 'Nothing here', it: 'Niente qui' },
  emptySession: {
    en: 'This session is empty — nothing is due right now.',
    it: 'Questa sessione è vuota — non c’è niente da ripassare ora.',
  },
  back: { en: 'Back', it: 'Indietro' },
  backHome: { en: 'Back home', it: 'Torna alla home' },
  topicNotFound: { en: 'Topic not found.', it: 'Argomento non trovato.' },
  smallTypo: { en: 'Small typo — counted as correct.', it: 'Piccolo errore di battitura — contato come giusto.' },
  watchAccent: { en: 'Watch the accent:', it: 'Attenzione all’accento:' },
  germanCaps: { en: 'German nouns are capitalized.', it: 'I sostantivi tedeschi vogliono la maiuscola.' },
  clearedWithMisses: { en: 'Cleared with some misses.', it: 'Completato con qualche errore.' },
  streak: { en: 'Streak', it: 'Serie' },
  days: { en: 'days', it: 'giorni' },
  day: { en: 'day', it: 'giorno' },
  wordsLearned: { en: 'Words learned', it: 'Parole imparate' },
  at30Days: { en: 'at 30+ days', it: 'a 30+ giorni' },
  freezesBanked: { en: 'freezes banked', it: 'congelamenti salvati' },
  freezeBanked: { en: 'freeze banked', it: 'congelamento salvato' },
  xpLast7: { en: 'XP · last 7 days', it: 'XP · ultimi 7 giorni' },
  goalPerDay: { en: 'goal: {n} XP/day', it: 'obiettivo: {n} XP/giorno' },
  topicMastery: { en: 'Topic mastery', it: 'Padronanza degli argomenti' },
  weakestSkills: { en: 'Weakest skills', it: 'Punti deboli' },
  drillNow: { en: 'Drill these now', it: 'Esercitati subito' },
  minutes: { en: 'min', it: 'min' },
  appLanguage: { en: 'App language', it: 'Lingua dell’app' },
  learning: { en: 'Learning', it: 'Apprendimento' },
  dailyGoal: { en: 'Daily goal', it: 'Obiettivo giornaliero' },
  forgiveAccents: { en: 'Forgive missing accents', it: 'Perdona gli accenti mancanti' },
  forgiveAccentsHint: { en: 'habló = hablo, with a reminder', it: 'habló = hablo, con un promemoria' },
  audio: { en: 'Audio', it: 'Audio' },
  spanishVoice: { en: 'Spanish voice', it: 'Voce spagnola' },
  germanVoice: { en: 'German voice', it: 'Voce tedesca' },
  noVoice: {
    en: 'No Spanish voice installed. On iPhone: Settings → Accessibility → Spoken Content → Voices.',
    it: 'Nessuna voce spagnola installata. Su iPhone: Impostazioni → Accessibilità → Contenuto letto → Voci.',
  },
  speechSpeed: { en: 'Speech speed', it: 'Velocità della voce' },
  slow: { en: 'Slow', it: 'Lenta' },
  normal: { en: 'Normal', it: 'Normale' },
  fast: { en: 'Fast', it: 'Veloce' },
  listeningExercises: { en: 'Listening exercises', it: 'Esercizi di ascolto' },
  listeningHint: { en: 'hear a word, pick what you heard', it: 'ascolta una parola e scegli cosa hai sentito' },
  deviceCheck: { en: 'Device check', it: 'Controllo dispositivo' },
  installed: { en: 'Installed (standalone)', it: 'Installata (app)' },
  installedNo: { en: 'No — running in browser', it: 'No — nel browser' },
  yes: { en: 'Yes', it: 'Sì' },
  no: { en: 'No', it: 'No' },
  offlineCache: { en: 'Offline cache (service worker)', it: 'Cache offline (service worker)' },
  active: { en: 'Active', it: 'Attiva' },
  notActiveYet: { en: 'Not active yet', it: 'Non ancora attiva' },
  storageProtected: { en: 'Storage protected', it: 'Memoria protetta' },
  unknown: { en: 'Unknown', it: 'Sconosciuto' },
  notYet: { en: 'Not yet', it: 'Non ancora' },
  spanishVoices: { en: 'Spanish voices', it: 'Voci spagnole' },
  germanVoices: { en: 'German voices', it: 'Voci tedesche' },
  yourData: { en: 'Your data', it: 'I tuoi dati' },
  exportBackup: { en: 'Export backup (JSON)', it: 'Esporta backup (JSON)' },
  importBackup: { en: 'Import backup…', it: 'Importa backup…' },
  resetProgress: { en: 'Reset all progress', it: 'Cancella tutti i progressi' },
  resetConfirm: {
    en: 'Delete ALL progress on this device? Export a backup first!',
    it: 'Cancellare TUTTI i progressi su questo dispositivo? Prima esporta un backup!',
  },
  backupHint: {
    en: 'Progress lives only on this device — export a backup now and then, especially before deleting the app.',
    it: 'I progressi vivono solo su questo dispositivo — esporta un backup ogni tanto, soprattutto prima di cancellare l’app.',
  },
  restored: { en: 'Restored {cards} cards and {days} days. Reloading…', it: 'Ripristinate {cards} carte e {days} giorni. Ricarico…' },
  importFailed: { en: 'Import failed', it: 'Importazione fallita' },
  notValidBackup: { en: 'Not a valid backup file', it: 'File di backup non valido' },
  offlineReady: { en: 'Ready to work offline ✓', it: 'Pronta per l’uso offline ✓' },
  installHint: {
    en: 'Install Lingua on your home screen: tap Share, then Add to Home Screen. It works fully offline.',
    it: 'Installa Lingua nella schermata Home: tocca Condividi, poi Aggiungi a Home. Funziona completamente offline.',
  },
  // generator strings
  whatDoesThisMean: { en: 'What does this mean?', it: 'Che cosa significa?' },
  whatDoYouHear: { en: 'What do you hear?', it: 'Che cosa senti?' },
  matchWordsMeaning: { en: 'Match each word with its meaning', it: 'Abbina ogni parola al suo significato' },
  matchPronounForm: {
    en: 'Match each pronoun with the right form of “{verb}”',
    it: 'Abbina ogni pronome alla forma giusta di “{verb}”',
  },
  pluralOf: { en: 'plural of “{noun}”', it: 'plurale di “{noun}”' },
  testVoice: { en: 'Test voice', it: 'Prova la voce' },
} satisfies Record<string, { en: string; it: string }>

export type UiKey = keyof typeof STRINGS

export function tFor(primary: PrimaryLang) {
  return (key: UiKey, vars?: Record<string, string | number>): string => {
    let s = STRINGS[key][primary]
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v))
    return s
  }
}

/** hook: translate UI strings in the current instruction language */
export function useT() {
  const primary = useSettings((s) => s.primary)
  return tFor(primary)
}
