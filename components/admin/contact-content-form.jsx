"use client";

import { useState } from "react";
import { MdSave } from "react-icons/md";
import { handleContentSave } from "@/components/admin/content-block-save";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function normalizeInitialForm(initial) {
 return {
  weekdayHours: initial.contentTr?.weekdayHours ?? initial.contentEn?.weekdayHours ?? "",
  weekendHours: initial.contentTr?.weekendHours ?? initial.contentEn?.weekendHours ?? "",
 };
}

export function ContactContentForm({ initial }) {
 const [form, setForm] = useState(() => normalizeInitialForm(initial));
 const [loading, setLoading] = useState(false);

 function updateField(field, value) {
  setForm((current) => ({ ...current, [field]: value }));
 }

 return (
  <form
   className="space-y-6"
   onSubmit={(event) => {
    event.preventDefault();
    const content = {
     weekdayHours: form.weekdayHours.trim(),
     weekendHours: form.weekendHours.trim(),
    };
    handleContentSave("contact", content, content, setLoading, "Çalışma saatleri");
   }}
  >
   <Card>
    <CardHeader>
     <CardTitle>Çalışma Saatleri</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
     <p className="text-sm text-muted-foreground">
      Footer ve iletişim sayfasında görünen saatler. Örnek format: 10:00 - 19:00
     </p>
     <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
       <Label htmlFor="weekdayHours">Hafta içi</Label>
       <Input
        id="weekdayHours"
        value={form.weekdayHours}
        onChange={(e) => updateField("weekdayHours", e.target.value)}
        placeholder="10:00 - 19:00"
        required
       />
      </div>
      <div className="space-y-2">
       <Label htmlFor="weekendHours">Hafta sonu</Label>
       <Input
        id="weekendHours"
        value={form.weekendHours}
        onChange={(e) => updateField("weekendHours", e.target.value)}
        placeholder="11:00 - 20:00"
        required
       />
      </div>
     </div>
    </CardContent>
   </Card>

   <Button type="submit" className="cursor-pointer gap-1.5" disabled={loading}>
    {!loading ? <MdSave className="size-4" aria-hidden /> : null}
    {loading ? "Kaydediliyor..." : "Kaydet"}
   </Button>
  </form>
 );
}
