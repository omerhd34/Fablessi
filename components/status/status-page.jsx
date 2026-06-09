import Link from "next/link";
import { cn } from "@/lib/utils";
import "./status-page.css";

export function StatusPage({
 code,
 title,
 description,
 children,
 className,
}) {
 return (
  <section
   className={cn("status-page page-content-offset container-premium pb-20", className)}
   aria-labelledby="status-page-title"
  >
   <div className="status-page__inner">
    {code ? (
     <p className="status-page__code" aria-hidden="true">
      {code}
     </p>
    ) : null}
    <div className="status-page__content">
     <h1 id="status-page-title" className="status-page__title">
      {title}
     </h1>
     {description ? (
      <p className="status-page__description">{description}</p>
     ) : null}
     {children ? (
      <div className="status-page__actions">{children}</div>
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
   className={cn(
    "status-page__action",
    primary && "status-page__action--primary"
   )}
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
    "status-page__action",
    primary && "status-page__action--primary"
   )}
  >
   {children}
  </button>
 );
}
