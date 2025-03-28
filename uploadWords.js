import { supabase } from "./supabaseConfig.js";

// Sample word data structure
const wordsData = [
  // Easy - Doctor
  { difficulty: "easy", category: "doctor", word: "cast", hint: "Used to support broken bones" },
  { difficulty: "easy", category: "doctor", word: "pill", hint: "A small tablet of medicine" },
  { difficulty: "easy", category: "doctor", word: "heal", hint: "Recovery from an injury" },

  // Easy - Scientist
  { difficulty: "easy", category: "scientist", word: "atom", hint: "Basic unit of matter" },
  { difficulty: "easy", category: "scientist", word: "gene", hint: "Carrier of genetic information" },

  // Easy - Astronaut
  { difficulty: "easy", category: "astronaut", word: "star", hint: "A shining object in space" },
  { difficulty: "easy", category: "astronaut", word: "moon", hint: "Earth's natural satellite" },

  // Medium - Doctor
  { difficulty: "medium", category: "doctor", word: "clinic", hint: "A small medical facility" },
  { difficulty: "medium", category: "doctor", word: "oxygen", hint: "Essential for breathing" },

  // Medium - Scientist
  { difficulty: "medium", category: "scientist", word: "biology", hint: "Study of life" },
  { difficulty: "medium", category: "scientist", word: "fusion", hint: "Nuclear energy process" },

  // Medium - Astronaut
  { difficulty: "medium", category: "astronaut", word: "galaxy", hint: "A system of stars" },
  { difficulty: "medium", category: "astronaut", word: "rocket", hint: "A spacecraft carrier" },

  // Hard - Doctor
  { difficulty: "hard", category: "doctor", word: "diagnosis", hint: "Process of identifying a disease" },
  { difficulty: "hard", category: "doctor", word: "pathology", hint: "Study of diseases" },

  // Hard - Scientist
  { difficulty: "hard", category: "scientist", word: "hypothesis", hint: "A proposed explanation" },
  { difficulty: "hard", category: "scientist", word: "radiation", hint: "Emission of energy waves" },

  // Hard - Astronaut
  { difficulty: "hard", category: "astronaut", word: "blackhole", hint: "A region with extreme gravity" },
  { difficulty: "hard", category: "astronaut", word: "cosmology", hint: "Study of the universe" }
];

// Function to upload words to Supabase
const uploadWords = async () => {
  try {
    const { data, error } = await supabase
      .from("words") // Your table name
      .insert(wordsData);

    if (error) {
      console.error("❌ Error uploading words:", error);
    } else {
      console.log("✅ Words uploaded successfully!", data);
    }
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
};

// Call the function
uploadWords();
