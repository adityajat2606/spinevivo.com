'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white/90 py-1 pl-1 pr-2 shadow-sm">
        <Avatar className="h-9 w-9 border border-black/10">
          <AvatarImage src={user?.avatar} alt={user?.name ?? 'Account'} />
          <AvatarFallback>{user?.name?.charAt(0) ?? '?'}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-[140px] truncate text-sm font-medium text-[#0a0a0a] md:inline">{user?.name}</span>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="Sign out"
        onClick={() => logout()}
        className="h-9 gap-1.5 rounded-full border-black/15 px-3 text-sm font-semibold hover:bg-[#f8fafc] sm:px-4"
      >
        <LogOut className="h-4 w-4" />
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </div>
  )
}
