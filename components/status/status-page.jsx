import Link from "next/link";
import {
 containerPremiumClass,
 pageContentOffsetClass,
} from "@/lib/layout/shared-styles";
import {
 statusPageActionClass,
 statusPageActionPrimaryClass,
 statusPageActionsClass,
 statusPageClass,
 statusPageCodeClass,
 statusPageContentClass,
 statusPageDescriptionClass,
 statusPageInnerClass,
 statusPageTitleClass,
} from "@/lib/layout/page-styles";
import { cn } from "@/lib/utils";

export function StatusPage({
 code,
 title,
 description,
 children,
 className,
}) {
 return (
  <section
   className={cn(
    pageContentOffsetClass,
    containerPremiumClass,
    statusPageClass,
    "pb-20",
    className
   )}
   aria-labelledby="status-page-title"
  >
   <div className={statusPageInnerClass}>
    {code ? (
     <p className={statusPageCodeClass} aria-hidden="true">
      {code}
     </p>
    ) : null}
    <div className={statusPageContentClass}>
     <h1 id="status-page-title" className={statusPageTitleClass}>
      {title}
     </h1>
     {description ? (
      <p className={statusPageDescriptionClass}>{description}</p>
     ) : null}
     {children ? (
      <div className={statusPageActionsClass}>{children}</div>
     ) : null}
    </div>
   </div>
  </section>
 );
}

export function StatusActionLink({ href, children, primary = false }) {
 return (
  <Link
   href={href}
   className={cn(statusPageActionClass, primary && statusPageActionPrimaryClass)}
  >
   {children}
  </Link>
 );
}

export function StatusActionButton({ onClick, children, primary = false }) {
 return (
  <button
   type="button"
   onClick={onClick}
   className={cn(
    statusPageActionClass,
    "cursor-pointer",
    primary && statusPageActionPrimaryClass
   )}
  >
   {children}
  </button>
 );
}
