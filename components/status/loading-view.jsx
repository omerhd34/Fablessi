import { cn } from "@/lib/utils";
import "./status-page.css";

export function LoadingView({
 title,
 description,
 className,
 compact = false,
}) {
 return (
  <section
   className={cn(
    compact ? "py-16" : "status-loading page-content-offset container-premium pb-20",
    className
   )}
   role="status"
   aria-live="polite"
   aria-busy="true"
  >
   <div className="status-loading__inner">
    <div className="status-loading__ring" aria-hidden="true" />
    <div>
     <p className="status-loading__title">{title}</p>
     {description ? (
      <p className="status-loading__description">{description}</p>
     ) : null}
    </div>
   </div>
  </section>
 );
}
