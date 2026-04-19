'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageShell } from '@/components/shared/page-shell'
import { DirPanel, DirEyebrow, dirSurface } from '@/components/shared/directory-site-marketing'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'

export default function PressPage() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <PageShell
      title="Press"
      description="Brand assets, product facts, and recent coverage—built for journalists, producers, and clinical partners writing about trusted directories."
    >
      <div className="mb-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <DirPanel variant="soft">
          <DirEyebrow>For editors</DirEyebrow>
          <h2 className={`mt-3 text-2xl font-semibold tracking-tight ${dirSurface.title}`}>Fact sheet</h2>
          <ul className={`mt-4 space-y-3 text-sm leading-relaxed ${dirSurface.muted}`}>
            <li>Positioning: calm, verification-forward directory for local care and movement businesses.</li>
            <li>Distribution: web-first responsive app; owner dashboard for live updates.</li>
            <li>Contact: use the general press inbox via Contact and include deadline + beat.</li>
          </ul>
        </DirPanel>
        <DirPanel>
          <DirEyebrow>Voice & tone</DirEyebrow>
          <p className={`mt-3 text-sm leading-relaxed ${dirSurface.muted}`}>
            Prefer plain language, cite verification states accurately, and avoid implying medical advice. When in doubt, quote our public blog or
            this press page.
          </p>
        </DirPanel>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <DirPanel>
          <DirEyebrow>Press kit</DirEyebrow>
          <h2 className={`mt-3 text-xl font-semibold ${dirSurface.title}`}>Logos, screenshots, guidelines</h2>
          <p className={`mt-2 text-sm ${dirSurface.muted}`}>Preview before download. Assets are for editorial use unless otherwise agreed in writing.</p>
          <div className="mt-6 grid gap-3">
            {mockPressAssets.map((asset) => (
              <div key={asset.id} className={`${dirSurface.inset}`}>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className={`text-sm font-semibold ${dirSurface.title}`}>{asset.title}</p>
                    <p className={`mt-1 text-xs ${dirSurface.muted}`}>{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="bg-[#f3f8ff] text-[#0369a1]">
                      {asset.fileType}
                    </Badge>
                    <Button size="sm" variant="outline" className="rounded-full border-black/[0.1]" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-black text-white hover:bg-[#1a1a1a]"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DirPanel>
        <div className="space-y-4">
          <DirEyebrow>Coverage</DirEyebrow>
          {mockPressCoverage.map((item) => (
            <DirPanel key={item.id} variant="soft" className="transition hover:border-black/[0.1] hover:shadow-md">
              <div className={`text-xs font-semibold uppercase tracking-wide ${dirSurface.muted}`}>{item.outlet}</div>
              <p className={`mt-2 text-sm font-medium leading-snug ${dirSurface.title}`}>{item.headline}</p>
              <p className={`mt-2 text-xs ${dirSurface.muted}`}>{item.date}</p>
            </DirPanel>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl rounded-[1.5rem] border-black/[0.08]">
          <DialogHeader>
            <DialogTitle>{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-black/[0.06] bg-[#f8fafc]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          ) : null}
          <p className={`text-sm ${dirSurface.muted}`}>{activeAsset?.description}</p>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" className="rounded-full" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-black text-white hover:bg-[#1a1a1a]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
