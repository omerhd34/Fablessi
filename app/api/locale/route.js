import { NextResponse } from "next/server";
import { defaultLocale, isValidLocale, localeCookieName } from "@/lib/i18n/config";

export async function POST(request) {
 let body;

 try {
  body = await request.json();
 } catch {
  return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
 }

 const locale = isValidLocale(body?.locale) ? body.locale : defaultLocale;
 const response = NextResponse.json({ locale });

 response.cookies.set(localeCookieName, locale, {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax",
 });

 return response;
}
