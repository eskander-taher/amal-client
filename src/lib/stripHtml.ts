/**
 * Strip HTML tags from a string and return plain text
 * Works in both server and client environments
 */
export function stripHtml(html: string): string {
	if (!html) return "";

	// Remove HTML tags
	let text = html.replace(/<[^>]*>/g, "");

	// Decode common HTML entities
	text = text
		.replace(/&nbsp;/g, " ")
		.replace(/&amp;/g, "&")
		.replace(/&lt;/g, "<")
		.replace(/&gt;/g, ">")
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'")
		.replace(/&apos;/g, "'");

	// Remove extra whitespace
	text = text.replace(/\s+/g, " ").trim();

	return text;
}

/**
 * Truncate text to a specific length and add ellipsis
 */
export function truncateText(text: string, maxLength: number = 150): string {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength).trim() + "...";
}






