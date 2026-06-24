import { NextResponse } from "next/server";
import { searchCatalog } from "@/lib/queries/search";

export async function GET(request) {
 const { searchParams } = new URL(request.url);
 const query = searchParams.get("q") ?? "";

 if (!query.trim()) {
  return NextResponse.json({ products: [] });
 }

 const results = await searchCatalog(query);
 return NextResponse.json(results);
}
