import { bookUrl } from "../utils/Urls.js";
import { fetchBooks } from "../fetch/fetchBooks.js";

export async function deleteBook(bookId: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }
    try {
        const response = await fetch(`${bookUrl}${bookId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Book deleted successfully:", responseData);
        alert("Book deleted successfully!");
        fetchBooks();
    } catch (error) {
        console.error("Delete failed:", error);
        alert(`Error deleting book: ${error instanceof Error ? error.message : String(error)}`);
    }
}