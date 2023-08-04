import supabase from "./supabase";
import { supabaseUrl } from "./supabase";

//
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  return data;
}

//
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("cabins could not be deleted");
  }
}

//
// export async function createEditCabin(newCabin, editId) {
//   // to check if image is string or array
//   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

//   const imageName = hasImagePath
//     ? newCabin.image
//     : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

//   const imagePath = hasImagePath
//     ? newCabin.image
//     : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

//   // create/edit cabin
//   let query = supabase.from("cabins");

//   // 1. create a new cabin for the first time
//   if (!editId) {
//     query = query.insert([{ ...newCabin, image: imagePath }]);
//   }
//   // 2. update an existing cabin
//   if (editId) {
//     query = query.update({ ...newCabin, image: imagePath }).eq("id", editId);
//   }

//   const { data, error } = await query.select().single();

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log(newCabin);

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  console.log(query);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
