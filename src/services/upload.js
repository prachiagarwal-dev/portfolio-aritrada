
import { supabase } from "../lib/supabase";
export async function uploadFile(file, folder = "projects") {
  if (!file) throw new Error("Please select a file.");

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf"
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, WEBP, GIF and PDF files are allowed.");
  }

  const maxSize = file.type === "application/pdf"
    ? 10 * 1024 * 1024
    : 8 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("File size is too large.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${folder}/${Date.now()}-${safeName}`;

  const { data, error } = await supabase.storage
    .from("portfolio-assets")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) throw error;

  const { data: publicData } = supabase.storage
    .from("portfolio-assets")
    .getPublicUrl(data.path);

  return publicData.publicUrl;
}
