type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

export function SchemaJsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  // Escape HTML-sensitive chars so embedded JSON-LD cannot break script parsing/hydration.
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
