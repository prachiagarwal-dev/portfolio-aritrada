export function normalizeCategories(rawCategories = []) {
  const seen = new Set();
  const list = [];

  for (const item of rawCategories) {
    if (!item) continue;

    if (typeof item === "string") {
      const trimmed = item.trim();
      if (!trimmed || trimmed === "All") continue;
      if (!seen.has(trimmed.toLowerCase())) {
        seen.add(trimmed.toLowerCase());
        list.push(trimmed);
      }
    } else if (typeof item === "object") {
      if (item.hidden || item.is_deleted) continue;
      const name = (item.name || item.title || item.label || "").toString().trim();
      if (!name || name === "All") continue;
      if (!seen.has(name.toLowerCase())) {
        seen.add(name.toLowerCase());
        list.push(name);
      }
    }
  }

  return ["All", ...list];
}
