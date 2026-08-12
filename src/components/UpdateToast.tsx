import { useEffect } from 'react'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useT } from '../i18n/ui'

export default function UpdateToast() {
  const t = useT()
  const {
    offlineReady: [offlineReady, setOfflineReady],
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (registration) {
        // iOS only checks for a new SW on launch; poll hourly for long sessions
        setInterval(() => registration.update(), 60 * 60 * 1000)
      }
    },
  })

  useEffect(() => {
    if (offlineReady) {
      const t = setTimeout(() => setOfflineReady(false), 4000)
      return () => clearTimeout(t)
    }
  }, [offlineReady, setOfflineReady])

  if (!offlineReady) return null

  return (
    <div className="fixed inset-x-4 top-4 z-30 mx-auto max-w-lg rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg pt-safe">
      {t('offlineReady')}
    </div>
  )
}
