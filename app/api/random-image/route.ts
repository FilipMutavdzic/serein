import { NextResponse } from "next/server";
export const runtime = "nodejs";

const UNSPLASH = "https://api.unsplash.com/photos/random";

export async function GET() {
  try {
    const key = process.env.UNSPLASH_ACCESS_KEY;
    if (!key) return NextResponse.json({ error: "Missing UNSPLASH_ACCESS_KEY" }, { status: 500 });

    const r = await fetch(`${UNSPLASH}?query=calm,nature&orientation=landscape`, {
      headers: { Authorization: `Client-ID ${key}` },
      next: { revalidate: 600 }
    });

    if (!r.ok) {
      let detail: any = null;
      try { detail = await r.json(); } catch {}
      return NextResponse.json({ error: "Unsplash error", status: r.status, detail }, { status: r.status });
    }

    const data = await r.json();
    return NextResponse.json({
      id: data.id,
      alt: data.alt_description ?? "Unsplash",
      author: data.user?.name ?? "Unknown",
      link: data.links?.html ?? "",
      src: data.urls?.regular ?? data.urls?.full ?? "",
      width: data.width ?? 1200,
      height: data.height ?? 800
    });
  } catch (e: any) {
    return NextResponse.json({ error: "fetch_failed", message: String(e?.message || e) }, { status: 500 });
  }
}
