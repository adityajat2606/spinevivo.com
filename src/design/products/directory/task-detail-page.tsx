import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { RichContent } from "@/components/shared/rich-content";
import { PhotosLightbox } from "@/design/products/directory/photos-lightbox";
import type { SitePost } from "@/lib/site-connector";
import type { TaskKey } from "@/lib/site-config";

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  descriptionHtml,
  category,
  images,
  mapEmbedUrl,
}: {
  task: TaskKey;
  taskLabel: string;
  taskRoute: string;
  post: SitePost;
  descriptionHtml: string;
  category: string;
  images: string[];
  mapEmbedUrl: string | null;
}) {
  const content = post.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};
  const location = typeof content.address === "string" ? content.address : typeof content.location === "string" ? content.location : "";
  const website = typeof content.website === "string" ? content.website : "";
  const phone = typeof content.phone === "string" ? content.phone : "";
  const email = typeof content.email === "string" ? content.email : "";
  const companyName =
    (typeof content.companyName === "string" && content.companyName.trim()) ||
    (typeof content.businessName === "string" && content.businessName.trim()) ||
    post.title;
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === "string") : [];
  const websiteHref = website && /^https?:\/\//i.test(website) ? website : website ? `https://${website}` : "";
  const galleryImages = images.filter((img) => typeof img === "string" && img.trim());

  return (
    <div className="min-h-screen bg-[#efeff1] text-[#1f2937]">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#525866] transition-colors hover:text-[#1f2937]"
        >
          <span aria-hidden>&larr;</span> Back to {taskLabel}
        </Link>

        <section className="mt-6 space-y-6">
          <div className="rounded-lg border border-[#dddfe4] bg-white px-5 py-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8">
            <div className="grid gap-6 lg:grid-cols-[140px_1fr_auto] lg:items-center">
              <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-[#e3e6ee] bg-[#f3f5fa]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-contain p-3" />
              </div>
              <div>
                <h1 className="text-3xl font-bold leading-tight text-[#434190] sm:text-4xl">{post.title}</h1>
                {location ? (
                  <p className="mt-3 inline-flex items-start gap-2 text-sm text-[#4b4f5c]">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{location}</span>
                  </p>
                ) : null}
                <p className="mt-2 text-sm italic text-[#5e5e8f]">
                  <Link href={taskRoute} className="hover:underline">
                    Local favorite {category.toLowerCase()}
                  </Link>
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 lg:w-auto">
                {websiteHref ? (
                  <a
                    href={websiteHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 min-w-[190px] items-center justify-center rounded-sm bg-[#23b6bb] px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1ca4a9]"
                  >
                    Visit Website
                  </a>
                ) : email ? (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex h-11 min-w-[190px] items-center justify-center rounded-sm bg-[#23b6bb] px-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1ca4a9]"
                  >
                    Write a Review
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="space-y-0 overflow-hidden rounded-lg border border-[#dddfe4] bg-white shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <div className="px-5 py-6 sm:px-8">
              <h2 className="text-4 font-semibold text-[#434190] sm:text-[2rem]">About</h2>
              <RichContent html={descriptionHtml} className="mt-4 text-[#404758]" />
              {highlights.length ? (
                <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-[#4b5563]">
                  {highlights.slice(0, 5).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="border-t border-[#e4e7ed] px-5 py-6 sm:px-8">
              <h2 className="text-4 font-semibold text-[#434190] sm:text-[2rem]">Contact Information</h2>
              <div className="mt-4 overflow-hidden rounded-sm border border-[#e1e3e8]">
                <div className="grid grid-cols-[170px_1fr] border-b border-[#e7eaf0] bg-[#f6f7fa] text-sm">
                  <div className="px-4 py-3 font-semibold text-[#232633]">Company Name</div>
                  <div className="px-4 py-3 text-[#394051]">{companyName}</div>
                </div>
                {websiteHref ? (
                  <div className="grid grid-cols-[170px_1fr] border-b border-[#e7eaf0] bg-white text-sm">
                    <div className="px-4 py-3 font-semibold text-[#232633]">Website</div>
                    <a
                      href={websiteHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3 text-[#434190] hover:underline"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="break-all">{website}</span>
                    </a>
                  </div>
                ) : null}
                {location ? (
                  <div className="grid grid-cols-[170px_1fr] bg-white text-sm">
                    <div className="px-4 py-3 font-semibold text-[#232633]">Location</div>
                    <div className="px-4 py-3 text-[#394051]">{location}</div>
                  </div>
                ) : null}
                {phone ? (
                  <div className="grid grid-cols-[170px_1fr] border-t border-[#e7eaf0] bg-white text-sm">
                    <div className="px-4 py-3 font-semibold text-[#232633]">Phone</div>
                    <a href={`tel:${phone}`} className="px-4 py-3 text-[#394051] hover:underline">{phone}</a>
                  </div>
                ) : null}
                {email ? (
                  <div className="grid grid-cols-[170px_1fr] border-t border-[#e7eaf0] bg-white text-sm">
                    <div className="px-4 py-3 font-semibold text-[#232633]">Email</div>
                    <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-4 py-3 text-[#394051] hover:underline">
                      <Mail className="h-4 w-4" />
                      <span className="break-all">{email}</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>

            {galleryImages.length ? (
              <div className="border-t border-[#e4e7ed] px-5 py-6 sm:px-8">
                <h2 className="text-4 font-semibold text-[#434190] sm:text-[2rem]">Photos</h2>
                <PhotosLightbox images={galleryImages} title={post.title} />
              </div>
            ) : null}

            {mapEmbedUrl ? (
              <div className="border-t border-[#e4e7ed]">
                <div className="flex items-center justify-between bg-[#302c85] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-white sm:px-6">
                  <span>Get directions</span>
                  <a
                    href={websiteHref || taskRoute}
                    className="rounded-sm bg-[#1f1b64] px-3 py-1.5 text-[11px] font-bold hover:bg-[#17144f]"
                  >
                    View on larger map
                  </a>
                </div>
                <div className="overflow-hidden">
                  <iframe
                    src={mapEmbedUrl}
                    title={`${post.title} map`}
                    className="h-[310px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-[#dddfe4] bg-white p-6 shadow-[0_10px_26px_rgba(15,23,42,0.06)]">
            <h3 className="text-2xl font-semibold text-[#1f2937]">Find Agency</h3>
            <form action={taskRoute} className="mt-5 space-y-3">
              <input
                type="text"
                name="q"
                placeholder="Enter agency name"
                className="h-11 w-full rounded-md border border-[#d1d5db] px-3 text-sm outline-none transition focus:border-[#434190]"
              />
              <button
                type="submit"
                className="h-11 w-full rounded-md bg-[#434190] px-4 text-sm font-semibold text-white transition hover:bg-[#373476]"
              >
                Search Agency
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
