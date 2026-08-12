import type { ReactNode } from 'react'
import { Lightbulb, TriangleAlert } from 'lucide-react'
import type { ExplanationBlock, Lang } from '../content/types'
import { loc } from '../content/types'
import { useSettings } from '../store/settings'
import SpeakButton from './SpeakButton'

/** minimal inline markdown: **bold** and *italic* */
export function mdInline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    if (part.startsWith('*')) return <em key={i}>{part.slice(1, -1)}</em>
    return <span key={i}>{part}</span>
  })
}

export default function Explanation({ blocks, lang }: { blocks: ExplanationBlock[]; lang: Lang }) {
  const primary = useSettings((s) => s.primary)
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.kind) {
          case 'prose':
            return (
              <p key={i} className="leading-relaxed text-slate-700">
                {mdInline(loc(block.md, primary))}
              </p>
            )
          case 'table': {
            const highlighted = new Set((block.highlight ?? []).map(([r, c]) => `${r}:${c}`))
            return (
              <div key={i} className="overflow-x-auto">
                <p className="mb-1 text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  {loc(block.caption, primary)}
                </p>
                <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm shadow-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      {block.header.map((h, c) => (
                        <th key={c} className="px-3 py-2 text-left font-semibold text-slate-500">
                          {loc(h, primary)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="border-t border-slate-100">
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`px-3 py-2 ${
                              highlighted.has(`${r}:${c}`)
                                ? 'bg-indigo-50 font-semibold text-indigo-700'
                                : c === 0
                                  ? 'text-slate-500'
                                  : 'font-medium'
                            }`}
                          >
                            {loc(cell, primary)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
          case 'example':
            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-indigo-800">{block.text}</p>
                  <p className="text-sm text-slate-500">
                    {loc(block.gloss, primary)}
                    {block.note && <span className="text-slate-400"> · {loc(block.note, primary)}</span>}
                  </p>
                </div>
                <SpeakButton text={block.text} lang={lang} />
              </div>
            )
          case 'callout':
            return (
              <div
                key={i}
                className={`flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
                  block.style === 'warning'
                    ? 'border-amber-200 bg-amber-50 text-amber-900'
                    : 'border-sky-200 bg-sky-50 text-sky-900'
                }`}
              >
                {block.style === 'warning' ? (
                  <TriangleAlert size={18} className="mt-0.5 shrink-0" />
                ) : (
                  <Lightbulb size={18} className="mt-0.5 shrink-0" />
                )}
                <p>{mdInline(loc(block.md, primary))}</p>
              </div>
            )
        }
      })}
    </div>
  )
}
