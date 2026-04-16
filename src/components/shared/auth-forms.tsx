'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useToast } from '@/components/ui/use-toast'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export function AuthLoginForm({ actionClassName }: { actionClassName: string }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim() || !password) {
      toast({
        title: 'Missing information',
        description: 'Enter your email and password to continue.',
        variant: 'destructive',
      })
      return
    }
    await login(email.trim(), password)
    toast({ title: 'Signed in', description: 'Your session is saved on this device.' })
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <Input
        className="h-12 rounded-2xl border-black/10 bg-white px-4 text-sm"
        placeholder="Email address"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        className="h-12 rounded-2xl border-black/10 bg-white px-4 text-sm"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50',
          actionClassName,
        )}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}

export function AuthRegisterForm({ actionClassName }: { actionClassName: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !password) {
      toast({
        title: 'Missing information',
        description: 'Name, email, and password are required.',
        variant: 'destructive',
      })
      return
    }
    await signup(name.trim(), email.trim(), password)
    toast({ title: 'Welcome', description: 'Your account is saved on this device.' })
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <Input
        className="h-12 rounded-2xl border-black/10 bg-white px-4 text-sm"
        placeholder="Full name"
        name="name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        className="h-12 rounded-2xl border-black/10 bg-white px-4 text-sm"
        placeholder="Email address"
        type="email"
        name="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        className="h-12 rounded-2xl border-black/10 bg-white px-4 text-sm"
        placeholder="Password"
        type="password"
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'inline-flex h-12 w-full items-center justify-center rounded-full px-6 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50',
          actionClassName,
        )}
      >
        {isLoading ? 'Creating…' : 'Create account'}
      </button>
    </form>
  )
}
