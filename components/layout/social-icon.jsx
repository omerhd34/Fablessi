import { cn } from "@/lib/utils";

export function SocialIcon({ label, className }) {
 const iconClass = cn("size-4", className);

 if (label === "Instagram") {
  return (
   <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={iconClass}
    aria-hidden
   >
    <rect width="18" height="18" x="3" y="3" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
   </svg>
  );
 }

 return null;
}
