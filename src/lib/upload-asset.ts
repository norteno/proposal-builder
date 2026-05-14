import { supabase } from "@/lib/supabase";

export async function uploadProposalAsset(file: File) {
  if (!supabase) {
    return readFileAsDataUrl(file);
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "png";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "") || "asset";
  const filePath = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}.${fileExt}`;

  const { error } = await supabase.storage
    .from("proposal-assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) throw error;

  const { data } = supabase.storage.from("proposal-assets").getPublicUrl(filePath);
  return data.publicUrl;
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
