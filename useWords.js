import supabase from "./supabaseClient";

export const fetchWords = async (category, difficulty) => {
  try {
    let { data, error } = await supabase
      .from("words") // Name of your table
      .select("*") // Select all columns
      .eq("category", category)
      .eq("difficulty", difficulty);

    if (error) {
      throw error;
    }

    console.log("Fetched Words:", data);
    return data;
  } catch (error) {
    console.error("Error fetching words:", error.message);
    return [];
  }
};
