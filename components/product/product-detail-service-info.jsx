import { Copyright, Ruler } from "@/lib/icons";
import { getDimensionLabels } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

function getServiceItems(product) {
 const dimensionLabels = getDimensionLabels(product);
 const items = [];

 if (dimensionLabels.length > 0) {
  items.push({
   icon: Ruler,
   key: "dimensions",
   content: (
    <span className="flex flex-col gap-1">
     {dimensionLabels.map((item) => (
      <span key={item.key}>
       {item.label ? (
        <>
         <span className="font-semibold text-charcoal">{item.label}:</span>{" "}
         {item.value}
        </>
       ) : (
        item.value
       )}
      </span>
     ))}
    </span>
   ),
  });
 }

 items.push({
  icon: Copyright,
  key: "copyright",
  content: (
   <>
    Ürün görselleri ve tasarımlar{" "}
    <span className="font-semibold text-charcoal">Fablessi</span>&apos;ye aittir;
    izinsiz kullanılamaz.
   </>
  ),
 });

 return items;
}

export function ProductDetailServiceInfo({
 product,
 className,
 variant = "card",
}) {
 const serviceItems = getServiceItems(product);
 const isPlain = variant === "plain";

 const content = (
  <ul className="space-y-4">
   {serviceItems.map((item) => (
    <li key={item.key} className="flex gap-3">
     <item.icon className="mt-0.5 size-5 shrink-0 text-charcoal/45" aria-hidden />
     <p className="text-sm leading-relaxed text-charcoal/70">{item.content}</p>
    </li>
   ))}
  </ul>
 );

 if (isPlain) {
  return <div className={className}>{content}</div>;
 }

 return (
  <div
   className={cn(
    "rounded-3xl border border-charcoal/12 bg-white p-5 shadow-[0_1px_3px_rgb(0_0_0/4%)]",
    className
   )}
  >
   {content}
  </div>
 );
}
