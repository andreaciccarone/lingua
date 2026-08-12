import { useState } from 'react'
import { Share, X } from 'lucide-react'
import { isIOS, isStandalone } from '../lib/platform'
import { useT } from '../i18n/ui'

const DISMISS_KEY = 'lingua-install-hint-dismissed'

export default function InstallHint() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === '1')
  const t = useT()

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
        <Share size={16} className="inline align-text-bottom" /> {t('installHint')}
      </p>
    </div>
  )
}
