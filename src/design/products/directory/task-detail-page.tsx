import Link from "next/link";
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Badge } from "@/components/ui/badge";
import type { SitePost } from "@/lib/site-connector";
import type { TaskKey } from "@/lib/site-config";

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey;
  taskLabel: string;
  taskRoute: string;
  post: SitePost;
  description: string;
  category: string;
  images: string[];
  mapEmbedUrl: string | null;
  related: SitePost[];
}) {
  const content = post.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};
  const location = typeof content.address === "string" ? content.address : typeof content.location === "string" ? content.location : "";
  const website = typeof content.website === "string" ? content.website : "";
  const phone = typeof content.phone === "string" ? content.phone : "";
  const email = typeof content.email === "string" ? content.email : "";
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === "string") : [];
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_15%_20%,#e2f3ff_0%,transparent_34%),radial-gradient(circle_at_85%_12%,#ffeccc_0%,transparent_31%),linear-gradient(180deg,#f7fafc_0%,#eef4fb_45%,#f9fcff_100%)] text-[#0f172a]">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#334155] transition-colors hover:text-[#0f172a]"
        >
          <span aria-hidden>←</span> Back to {taskLabel}
        </Link>

        <section className="mt-6 grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-[#d8e3f0] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)]">
              <div className="relative aspect-[5/4] overflow-hidden bg-[#dbe3ec]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover transition-transform duration-700 hover:scale-[1.03]" />
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-2 gap-3 border-t border-[#e2e8f0] bg-[#f8fbff] p-4 sm:grid-cols-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-[#d9e5f2] bg-white sm:h-28">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="rounded-[2rem] border border-[#d7e3ef] bg-white/95 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748b]">Overview</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#0f172a] sm:text-3xl">
                A cleaner profile for faster trust decisions.
              </h2>
              <p className="mt-4 text-sm leading-8 text-[#334155] sm:text-base">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-2xl border border-[#dbe6f3] bg-[#f8fbff] px-4 py-4 text-sm leading-6 text-[#334155]">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-[2rem] border border-[#d8e2ee] bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.1)] sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <Badge className="rounded-full border-0 bg-[#eaf2ff] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1e3a8a]">
                  {category || taskLabel}
                </Badge>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
              </div>
              <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.04em] text-[#0f172a] sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 space-y-3">
                {location ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#d9e5f2] bg-[#f8fbff] px-4 py-3 text-sm text-[#334155]">
                    <MapPin className="h-4 w-4 shrink-0 text-[#2563eb]" />
                    <span>{location}</span>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#d9e5f2] bg-[#f8fbff] px-4 py-3 text-sm text-[#334155]">
                    <Phone className="h-4 w-4 shrink-0 text-[#2563eb]" />
                    <span>{phone}</span>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#d9e5f2] bg-[#f8fbff] px-4 py-3 text-sm text-[#334155]">
                    <Mail className="h-4 w-4 shrink-0 text-[#2563eb]" />
                    <span className="break-all">{email}</span>
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-center gap-3 rounded-2xl border border-[#d9e5f2] bg-[#f8fbff] px-4 py-3 text-sm text-[#334155]">
                    <Globe className="h-4 w-4 shrink-0 text-[#2563eb]" />
                    <span className="break-all">{website}</span>
                  </div>
                ) : null}
              </div>
              <div className="mt-7 flex flex-wrap gap-3">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#0f172a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b]"
                  >
                    Visit website
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
                <Link
                  href={taskRoute}
                  className="inline-flex items-center gap-2 rounded-full border border-[#c7d7ea] bg-white px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:bg-[#f8fbff]"
                >
                  Browse more
                </Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-[#d8e2ee] bg-white shadow-[0_22px_60px_rgba(15,23,42,0.09)]">
                <div className="flex items-center justify-between border-b border-[#e2e8f0] px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748b]">Location</p>
                  <Tag className="h-4 w-4 text-[#64748b]" />
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[300px] w-full border-0 sm:h-[340px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </section>

        {related.length ? (
          <section className="mt-14 rounded-[2rem] border border-[#d8e2ee] bg-white/95 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#e2e8f0] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#64748b]">Keep exploring</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[#0f172a] sm:text-3xl">More businesses in this category</h2>
              </div>
              <Badge className="rounded-full bg-[#f1f5f9] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#334155]">
                {taskLabel}
              </Badge>
            </div>
            <div className="mt-7 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
