import { supabase } from "./supabase";

export async function uploadTeamImage(file: File) {
  const fileExt = file.name.split(".").pop();

  const filePath = `TeamLogos/${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("Public")
    .upload(filePath, file);

  if (error) {
    throw new Error(error?.message);
  }

  const { data: urlData } = supabase.storage
    .from("Public")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}
