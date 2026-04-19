import { redirect } from 'next/navigation'

/** Overview removed from UI; `/dashboard` sends users to the public home. */
export default function DashboardIndexPage() {
  redirect('/')
}
