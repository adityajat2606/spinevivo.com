import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'

const licenses = [
  { name: 'Next.js', description: 'MIT License — React framework and tooling.' },
  { name: 'React', description: 'MIT License — UI library.' },
  { name: 'Tailwind CSS', description: 'MIT License — utility-first styling.' },
  { name: 'Lucide', description: 'ISC License — icon set.' },
  { name: 'Radix UI', description: 'MIT License — accessible primitives.' },
  { name: 'Zod', description: 'MIT License — schema validation.' },
]

export default function LicensesPage() {
  return (
    <PageShell
      title="Licenses"
      description="Open source software powers large parts of this product. We are grateful to the maintainers listed below."
    >
      <DirPanel className="mb-8">
        <DirEyebrow>Attribution</DirEyebrow>
        <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>
          This page highlights major dependencies. Full transitive notices ship with the application bundle where required by upstream licenses.
        </p>
      </DirPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        {licenses.map((license) => (
          <DirPanel key={license.name} variant="inset">
            <h3 className={`text-sm font-semibold ${dirSurface.title}`}>{license.name}</h3>
            <p className={`mt-2 text-sm leading-relaxed ${dirSurface.muted}`}>{license.description}</p>
          </DirPanel>
        ))}
      </div>
    </PageShell>
  )
}
