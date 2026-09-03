/* The subject chips, in the order they read best. Every session in
   sessions.json carries one of these names. Names must be single words: the
   CSS matches them as space-separated tokens. */
export const CHIPS = [
  "Engineering",
  "Product",
  "Design",
  "Security",
  "AI",
  "Data",
  "Career",
  "Wildcard",
] as const;
