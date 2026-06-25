"use client";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "@/components/ui/table";
import { getCornerStandardSize } from "@/lib/product-utils";
import { cn } from "@/lib/utils";

export function ProductCornerStandardTable({ product, t, className }) {
 const size = getCornerStandardSize(product);

 if (!size) return null;

 return (
  <div className={cn("space-y-2", className)}>
   <p className="text-xs font-semibold tracking-[0.12em] text-charcoal/55 uppercase">
    {t("product.standardConfig")}
   </p>
   <div className="overflow-hidden rounded-xl border border-charcoal/10 bg-cream/20">
    <Table className="text-xs text-charcoal/75">
     <TableHeader>
      <TableRow className="border-charcoal/10 hover:bg-transparent">
       <TableHead className="h-8 px-2 font-semibold text-charcoal/55" />
       <TableHead className="h-8 px-2 text-center font-semibold text-charcoal/55">
        {t("product.cornerStandardSideA")}
       </TableHead>
       <TableHead className="h-8 px-2 text-center font-semibold text-charcoal/55">
        {t("product.cornerStandardSideB")}
       </TableHead>
      </TableRow>
     </TableHeader>
     <TableBody>
      <TableRow className="border-charcoal/8 hover:bg-charcoal/2">
       <TableCell className="px-2 py-2 font-medium text-charcoal/80">
        {t("product.cornerStandardSize")}
       </TableCell>
       <TableCell className="px-2 py-2 text-center font-medium tabular-nums text-charcoal/85">
        {size.sideA}
       </TableCell>
       <TableCell className="px-2 py-2 text-center font-medium tabular-nums text-charcoal/85">
        {size.sideB}
       </TableCell>
      </TableRow>
     </TableBody>
    </Table>
   </div>
   <p className="text-xs leading-relaxed text-charcoal/55">
    {t("product.cornerStandardNote")}
   </p>
  </div>
 );
}
