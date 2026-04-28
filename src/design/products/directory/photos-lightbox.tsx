"use client";

import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function PhotosLightbox({ images, title }: { images: string[]; title: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.slice(0, 6).map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-md border border-[#e1e3e8] bg-[#f3f5fa] text-left"
          >
            <ContentImage
              src={image}
              alt={`${title} photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              intrinsicWidth={960}
              intrinsicHeight={720}
            />
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent showCloseButton className="max-w-4xl border-none bg-transparent p-2 shadow-none">
          <DialogTitle className="sr-only">{title} photo viewer</DialogTitle>
          {selectedIndex !== null ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-black">
              <ContentImage
                src={images[selectedIndex]}
                alt={`${title} photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
                intrinsicWidth={1600}
                intrinsicHeight={1000}
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}

