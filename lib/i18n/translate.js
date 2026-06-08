export function t(dictionary, key, vars) {
 const parts = key.split(".");
 let value = dictionary;

 for (const part of parts) {
  if (value == null || typeof value !== "object") return key;
  value = value[part];
 }

 if (typeof value !== "string") return key;

 if (!vars) return value;

 return value.replace(/\{(\w+)\}/g, (_, name) =>
  vars[name] != null ? String(vars[name]) : `{${name}}`
 );
}
