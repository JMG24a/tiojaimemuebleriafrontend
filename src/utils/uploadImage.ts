import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://glomigxpdhupcdmmmtfg.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdsb21pZ3hwZGh1cGNkbW1tdGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE0NjU5ODIsImV4cCI6MjEwNzA0MTk4Mn0.dYSL7AnRbvl6LdOR_m-RH6J3tl6iX0jUTGnCICSkZng";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/rgqgfmc8/image/upload",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();
  return data.secure_url as string;
}


export async function uploadToSupabase(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `public/${fileName}`;

  // 1. Subir la imagen
  const { data, error } = await supabase.storage
    .from('images') // Tu bucket
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false
    });

  if (error) {
    throw new Error(error.message);
  }

  // 2. Obtener y retornar la URL pública
  const { data: publicUrlData } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
