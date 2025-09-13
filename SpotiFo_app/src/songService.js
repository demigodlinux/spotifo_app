// songService.js

// If fetching from public/songs.json (e.g., after placing songs.json in public folder)
export async function getSongs() {
  const response = await fetch('/songs2025.json');
  if (!response.ok) {
    throw new Error('Failed to fetch songs');
  }
  return response.json();
}

