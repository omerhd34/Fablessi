import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import { cn } from "@/lib/utils";

export function SocialIcon({ label, className }) {
 const iconClass = cn("size-4", className);

 if (label === "Facebook") {
  return <FaFacebook className={iconClass} aria-hidden />;
 }

 if (label === "Instagram") {
  return <FaInstagram className={iconClass} aria-hidden />;
 }

 if (label === "Pinterest") {
  return <FaPinterest className={iconClass} aria-hidden />;
 }

 return null;
}
