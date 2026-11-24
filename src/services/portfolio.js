import initialData from "../data/initialData";
import { supabase } from "../lib/supabase";

const TABLE = "portfolio_content";
const LOCAL_CACHE_KEY = "aritra_portfolio_cache_v1";

export function slugify(text = "") {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function mergeById(defaultItems = [], savedItems = []) {
  const result = defaultItems.map((item) => ({ ...item }));

  for (const saved of savedItems) {
    if (!saved) continue;
    const index = result.findIndex(
      (item) =>
        String(item.id) === String(saved.id) ||
        (saved.slug && item.slug && String(item.slug) === String(saved.slug))
    );

    if (index >= 0) {
      result[index] = {
        ...result[index],
        ...saved,
        id: result[index].id,
        slug: saved.slug || result[index].slug
      };
    } else {
      const generatedId = saved.id || slugify(saved.title || saved.name) || `item-${Date.now()}`;
      result.push({
        hidden: false,
        is_deleted: false,
        ...saved,
        id: generatedId,
        slug: saved.slug || generatedId
      });
    }
  }

  return result;
}

export function mergePortfolio(saved = {}) {
  return {
    ...initialData,
    ...saved,
    profile: {
      ...initialData.profile,
      ...(saved.profile || {})
    },
    contact: {
      ...initialData.contact,
      ...(saved.contact || {})
    },
    sectionSettings: {
      ...initialData.sectionSettings,
      ...(saved.sectionSettings || {})
    },
    websiteSettings: {
      ...initialData.websiteSettings,
      ...(saved.websiteSettings || {})
    },
    projects: mergeById(initialData.projects, saved.projects || []),
    skills: mergeById(initialData.skills, saved.skills || []),
    experience: mergeById(initialData.experience, saved.experience || []),
    education: mergeById(initialData.education, saved.education || []),
    services: mergeById(initialData.services, saved.services || []),
    socials: mergeById(initialData.socials, saved.socials || []),
    categories: mergeById(initialData.categories, saved.categories || [])
  };
}

export function getCachedPortfolio() {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    return raw ? mergePortfolio(JSON.parse(raw)) : mergePortfolio({});
  } catch {
    return mergePortfolio({});
  }
}

export async function getPortfolio() {
  try {
    const { data, error } = await supabase
      .from(TABLE)
      .select("content")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;

    const merged = mergePortfolio(data?.content || {});
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(merged));
    return merged;
  } catch {
    return getCachedPortfolio();
  }
}

export async function savePortfolio(content) {
  const normalized = mergePortfolio(content);
  localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(normalized));

  const { error } = await supabase.from(TABLE).upsert({
    id: 1,
    content: normalized,
    updated_at: new Date().toISOString()
  });

  if (error) {
    throw error;
  }

  return normalized;
}

const portfolioAPI = {
  getPortfolio,
  getPublicPortfolio: getPortfolio,
  savePortfolio,
  getCachedPortfolio,
  slugify
};

export default portfolioAPI;