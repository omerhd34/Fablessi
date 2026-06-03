/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function HeaderSearchBar({ open, onClose }) {
 const router = useRouter();
 const inputRef = useRef(null);
 const [query, setQuery] = useState("");

 useEffect(() => {
  if (!open) {
   setQuery("");
   return;
  }
  const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
  return () => window.clearTimeout(timer);
 }, [open]);

 const handleSubmit = (event) => {
  event.preventDefault();
  const trimmed = query.trim();
  if (trimmed) {
   router.push(`/ara?q=${encodeURIComponent(trimmed)}`);
  }
  onClose();
 };

 return (
  <div
   className={cn(
    "overflow-hidden border-border bg-white text-foreground transition-[max-height,opacity,border-color] duration-300 ease-out",
    open
     ? "max-h-14 border-y opacity-100"
     : "pointer-events-none max-h-0 border-transparent opacity-0"
   )}
   aria-hidden={!open}
  >
   <form
    onSubmit={handleSubmit}
    className="mx-auto flex h-12 max-w-[1920px] items-center gap-4 px-6 lg:h-14 lg:px-12"
    role="search"
   >
    <Search
     className="size-4 shrink-0 text-muted-foreground"
     aria-hidden
    />
    <input
     ref={inputRef}
     type="search"
     value={query}
     onChange={(event) => setQuery(event.target.value)}
     placeholder="Ürün, koleksiyon veya proje ara…"
     className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground md:text-base"
     aria-label="Arama"
    />
    <Button
     type="button"
     variant="ghost"
     size="icon"
     className="shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
     onClick={onClose}
     aria-label="Aramayı kapat"
    >
     <X className="size-4" />
    </Button>
   </form>
  </div>
 );
}
