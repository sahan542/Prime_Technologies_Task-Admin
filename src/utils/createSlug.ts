export function createSlug(title: string) {
  return title
    .trim() // Remove leading/trailing spaces
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "_"); // Replace all spaces (including multiple spaces) with underscore
}
