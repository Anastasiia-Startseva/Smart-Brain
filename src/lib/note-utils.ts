export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
}

export function formatNoteDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function matchesNoteSearch(
  title: string,
  content: string,
  query: string,
): boolean {
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return true

  return (
    title.toLowerCase().includes(normalizedQuery) ||
    stripHtml(content).toLowerCase().includes(normalizedQuery)
  )
}
