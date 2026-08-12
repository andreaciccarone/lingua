import { useEffect } from 'react'
import { Route, Router, Switch, Link, useRoute } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { House, RotateCcw, ChartColumn, Settings as SettingsIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { useSettings } from './store/settings'
import Home from './screens/Home'
import Review from './screens/Review'
import Stats from './screens/Stats'
import Settings from './screens/Settings'
import Lesson from './screens/Lesson'
import TopicIntro from './screens/TopicIntro'
import InstallHint from './components/InstallHint'
import UpdateToast from './components/UpdateToast'

function Tab({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  const [active] = useRoute(href === '/' ? '/' : `${href}/*?`)
  return (
    <Link
      href={href}
      className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium ${
        active ? 'text-indigo-600' : 'text-slate-400'
      }`}
    >
      {icon}
      {label}
    </Link>
  )
}

function TabShell() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-lg flex-col">
      <main className="flex-1 px-4 pt-safe pb-24">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/review" component={Review} />
          <Route path="/stats" component={Stats} />
          <Route path="/settings" component={Settings} />
          <Route>
            <p className="mt-20 text-center text-slate-400">Page not found</p>
          </Route>
        </Switch>
      </main>

      <nav className="fixed inset-x-0 bottom-0 border-t border-slate-200 bg-white/90 backdrop-blur pb-safe">
        <div className="mx-auto flex max-w-lg">
          <Tab href="/" icon={<House size={22} />} label="Learn" />
          <Tab href="/review" icon={<RotateCcw size={22} />} label="Review" />
          <Tab href="/stats" icon={<ChartColumn size={22} />} label="Stats" />
          <Tab href="/settings" icon={<SettingsIcon size={22} />} label="Settings" />
        </div>
      </nav>

      <InstallHint />
    </div>
  )
}

export default function App() {
  const loadSettings = useSettings((s) => s.load)
  useEffect(() => {
    void loadSettings()
  }, [loadSettings])

  return (
    <Router hook={useHashLocation}>
      <Switch>
        {/* lessons and topic intros run fullscreen, outside the tab shell */}
        <Route path="/lesson/:id" component={Lesson} />
        <Route path="/topic/:id" component={TopicIntro} />
        <Route>
          <TabShell />
        </Route>
      </Switch>
      <UpdateToast />
    </Router>
  )
}
