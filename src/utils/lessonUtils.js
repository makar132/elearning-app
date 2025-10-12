export const ensureArray = (v) => (Array.isArray(v) ? v : []);
export const nonEmpty = (v) => (v === undefined ? undefined : v);
export const inferType = (resourceType, ext) => {
  const r = (resourceType || "").toLowerCase();
  const e = (ext || "").toLowerCase();
  if (e === "pdf") return "pdf";
  if (r === "video" || e === "mp4" || e === "mov" || e === "avi") return "video";
  if (r === "image" || e === "jpg" || e === "png" || e === "jpeg" || e === "gif") return "image";
  if (r === "raw" && (e === "mp3" || e === "wav" || e === "m4a")) return "audio";
  return "file"; // fallback type
};

export const reorder = (arr, fromIdx, toIdx) => {
  const a = [...arr];
  const tmp = a[fromIdx];
  a[fromIdx] = a[toIdx];
  a[toIdx] = tmp;
  return a.map((v, i) => ({ ...v, order: i }));
};
