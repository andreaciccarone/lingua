import { useState } from 'react'
import type { ExerciseInstance } from '../../content/types'
import SpeakButton from '../SpeakButton'
import { useT } from '../../i18n/ui'

interface Props {
  exercise: ExerciseInstance
  onComplete: () => void
}

export default function Flashcard({ exercise, onComplete }: Props) {
  const [revealed, setRevealed] = useState(false)
  const t = useT()

  return (
    <div className="flex flex-col items-center pt-16">
      <p className="text-xs font-semibold tracking-wide text-indigo-500 uppercase">{t('newWord')}</p>
      <div className="mt-6 flex items-center gap-2">
        <p className="text-4xl font-bold">{exercise.sentence[0]}</p>
        {exercise.ttsText && (
          <SpeakButton text={exercise.ttsText} lang={exercise.lang} size={24} autoPlay />
        )}
      </div>
      <div className="mt-6 h-10">
        {revealed && <p className="text-xl text-slate-600">{exercise.gloss}</p>}
      </div>
      <button
        onClick={() => (revealed ? onComplete() : setRevealed(true))}
        className="mt-12 w-full rounded-2xl bg-indigo-600 py-4 text-lg font-bold text-white shadow"
      >
        {revealed ? t('gotIt') : t('revealMeaning')}
      </button>
    </div>
  )
}
