import Link from 'next/link'
import { Building2, Sparkles } from 'lucide-react'
import { AuthRegisterForm } from '@/components/shared/auth-forms'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'

const config = {
  shell: 'bg-[#f8fbff] text-slate-950',
  panel: 'border border-slate-200 bg-white',
  side: 'border border-slate-200 bg-slate-50',
  muted: 'text-slate-600',
  action: 'bg-slate-950 text-white hover:bg-slate-800',
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Building2 className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">Create your business listing account</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>
              Add services, set business hours, verify locations, and start showing up when local customers search.
            </p>
            <div className="mt-8 grid gap-4">
              {['Fast setup for first-time owners', 'Structured fields for better local ranking', 'Simple workflow for updates and verification'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
            <AuthRegisterForm actionClassName={config.action} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Sign in
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
