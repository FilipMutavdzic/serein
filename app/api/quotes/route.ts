import { NextResponse } from "next/server";

export async function GET() {
  // cached 6h server-side
  const r = await fetch("https://type.fit/api/quotes", { next: { revalidate: 60 * 60 * 6 } });
  const text = await r.text();
  // Some mirrors send HTML on rate limit; guard parse.
  let all: { text: string; author?: string }[] = [];
  try {
    all = JSON.parse(text);
  } catch {
    all = [{ text: "Breathe. You are here now.", author: "Serein" }];
  }
  return NextResponse.json(all.slice(0, 200));
}
