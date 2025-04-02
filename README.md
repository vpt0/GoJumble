GoJumble

GoJumble is an interactive and engaging Jumble Word Game designed for students. It offers various difficulty modes, user-friendly gameplay, and exciting features to enhance the learning experience.

Live Prototype

Try out the live prototype here: https://sprightly-melomakarona-dd2483.netlify.app/

Tech Stack


GoJumble is built using modern web technologies:

Frontend: React.js, TypeScript, JavaScript

Database: Supabase (previously used Firebase Realtime Database, but Supabase was chosen for its low latency and ease of use)

AI Tools Used: Bolt AI, ChatGPT, Claude

Hosting: Netlify

Features

Jumble Word Challenges: Different difficulty modes - Easy, Medium, Hard

Themes: Various themes like Doctor, Astronaut, Scientist, etc.

Leaderboard: Compete with other players globally

User Accounts: Guest mode & Google sign-in integration

User Levels & Points: Earn points and level up

Hints System: Free and purchasable hints available

Shop & Payment Integration: Buy keys for hints

Dark/Light Mode: Customizable UI experience

In-game Profile: Create and customize 2D avatars

Cloud Animation Effects: Helps highlight correct letters in the jumbled words

Installation & Setup

Prerequisites

Node.js (Latest LTS version recommended)

npm or yarn

Steps to Run Locally

Clone the repository:

git clone https://github.com/yourusername/GoJumble.git

Navigate to the project directory:

cd GoJumble

Install dependencies:

npm install  # or yarn install

Create a .env file and add your Supabase credentials:

REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_KEY=your_supabase_key

Start the development server:

npm start  # or yarn start

Open http://localhost:3000 in your browser to play the game locally.

Contributing

We welcome contributions to GoJumble! Feel free to fork the repo and submit a pull request with your improvements.

Contact

For any queries or suggestions, feel free to reach out.

Frontend:

Framework: React Native with Expo
Routing: Expo Router (for file-based routing and navigation)
UI Library: React Native built-in components (View, Text, StyleSheet, Pressable, etc.)
Styling: React Native's StyleSheet.create
Animations: react-native-reanimated (for smoother, more performant animations)
Gestures: react-native-gesture-handler (for native-driven gesture handling)
Icons: Lucide React Native (lucide-react-native)
Linear Gradients: expo-linear-gradient
Fonts: Google Fonts, loaded with @expo-google-fonts/* packages and the useFonts hook from expo-font
Camera: expo-camera
Web Browser: expo-web-browser
URL Polyfill: react-native-url-polyfill
Backend and Data:

Database: Supabase (PostgreSQL)
Supabase Client: @supabase/supabase-js (for interacting with the Supabase database)
Firebase: Firebase is configured in firebaseConfig.ts, but it doesn't appear to be actively used in the provided code.
Key Components and Functionality:

Navigation: Tab-based navigation using Expo Router's <Tabs> component. Stack-based navigation is used within tabs for screen flows.
Authentication: The app/(auth) route group contains login and register screens, but the actual authentication logic is not implemented in the provided code. The login screen has "Continue as Guest," "Login with Email," and "Continue with Google" buttons, but they all navigate to the tabs without authentication.
Game Logic:
The game is implemented in the app/(game) route group.
theme-select.tsx: Allows the user to select a theme (doctor, scientist, astronaut).
difficulty.tsx: Allows the user to select a difficulty level (easy, medium, hard).
play.tsx: Implements the core game logic:
Fetches words from the Supabase database based on the selected theme and difficulty using the useWords hook.
Scrambles the word and presents it to the user.
Handles user input, checks for correct answers, and updates the score.
Provides hints and skip options.
Implements a timer using Animated to limit the time for each word.
Data Fetching: The useWords hook fetches words from the Supabase database.
Leaderboard: The leaderboard.tsx screen displays a static leaderboard.
Profile: The profile.tsx screen displays user profile information (static in the provided code).
Shop: The shop.tsx screen displays a list of items for purchase (static in the provided code).
Environment Variables: Expo's environment variable system is used to store API keys and other configuration values.
Project Structure:

app/: Contains all the routes for the application.
components/: (Not present in the file list, but should contain reusable components).
hooks/: Contains custom hooks like useWords and useFrameworkReady.
supabase/: Contains Supabase migrations.
firebaseConfig.ts: Contains Firebase configuration.
supabaseClient.ts: Contains the Supabase client initialization.
tsconfig.json: TypeScript configuration.
package.json: Lists project dependencies and scripts.
Key Dependencies:

expo-router: For navigation.
@supabase/supabase-js: For database interaction.
expo-linear-gradient: For visual appeal.
lucide-react-native: For icons.
@expo-google-fonts/*: For fonts.


Developer: Ved Prakash Tiwari

Email: tiwarivedprakash5388@gmail.com

