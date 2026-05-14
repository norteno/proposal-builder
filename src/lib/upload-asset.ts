import { supabase } from "@/lib/supabase";

export async function uploadProposalAsset(file: File) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${crypto.randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("proposal-assets")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("proposal-assets")
    .getPublicUrl(filePath);

  return data.publicUrl;
}