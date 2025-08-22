import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    `https://api.unsplash.com/photos/random?query=calm&count=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const data = await res.json();
  return NextResponse.json(data);
}
