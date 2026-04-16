import Link from 'next/link'
import { Building2, Sparkles } from 'lucide-react'
import { AuthLoginForm } from '@/components/shared/auth-forms'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

const config = {
  shell: 'bg-[#f8fbff] text-slate-950',
  panel: 'border border-slate-200 bg-white',
  side: 'border border-slate-200 bg-slate-50',
  muted: 'text-slate-600',
  action: 'bg-slate-950 text-white hover:bg-slate-800',
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Building2 className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">Sign in to your business dashboard</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>
              Manage listings, operating hours, service categories, and trust signals from one place.
            </p>
            <div className="mt-8 grid gap-4">
              {['Update business profiles quickly', 'Track visibility and listing quality', 'Keep contact details accurate for local search'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
            <AuthLoginForm actionClassName={config.action} />
            <div className={`mt-6 flex items-center justify-between text-sm ${config.muted}`}>
              <Link href="/forgot-password" className="hover:underline">Forgot password?</Link>
              <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <Sparkles className="h-4 w-4" />
                Create business account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
