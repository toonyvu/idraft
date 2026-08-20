import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.SUPABASE_URL);
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function generateURLCsv() {
  const { data, error } = await supabase.storage
    .from("Public")
    .list("MapImages", {
      sortBy: {
        column: "name",
        order: "asc",
      },
    });

  if (error) {
    throw error;
  }

  const rows = data.map((file) => {
    const { data: urlData } = supabase.storage
      .from("Public")
      .getPublicUrl(`MapImages/${file.name}`);

    return `${urlData.publicUrl}`;
  });

  const csv = ["image_url", ...rows].join("\n");

  fs.writeFileSync("characters.csv", csv);

  console.log(`Generated characters.csv with ${rows.length} characters.`);
}

generateURLCsv();
