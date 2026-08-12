import { useState } from 'react'
import { Share, X } from 'lucide-react'
import { isIOS, isStandalone } from '../lib/platform'

const DISMISS_KEY = 'lingua-install-hint-dismissed'

export default function InstallHint() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === '1')

  if (dismissed || !isIOS() || isStandalone()) return null

  return (
    <div className="fixed inset-x-4 bottom-20 z-20 mx-auto max-w-lg rounded-2xl bg-indigo-900 p-4 text-white shadow-lg">
      <button
        aria-label="Dismiss"
        className="absolute top-2 right-2 p-1 text-indigo-300"
        onClick={() => {
          localStorage.setItem(DISMISS_KEY, '1')
          setDismissed(true)
        }}
      >
        <X size={18} />
      </button>
      <p className="pr-6 text-sm leading-snug">
        Install Lingua on your home screen: tap{' '}
        <Share size={16} className="inline align-text-bottom" /> <b>Share</b>, then{' '}
        <b>Add to Home Screen</b>. It works fully offline.
      </p>
    </div>
  )
}
