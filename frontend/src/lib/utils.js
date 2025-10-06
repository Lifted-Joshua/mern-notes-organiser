// Formats a JS Date object into a human-readable string (e.g., "Oct 2, 2025")
export function formatDate(date) {
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

// Sorts notes so that pinned notes appear first, then sorts by creation date (newest first)
export function sortPinnedNotes(notes) {
    return [...notes].sort((a, b) => {
        if (a.pinned !== b.pinned) {
            return b.pinned - a.pinned;
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}