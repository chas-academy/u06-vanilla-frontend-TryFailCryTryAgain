import { reviewUrl } from "../utils/Urls.js";
import { fetchReviews } from "../fetch/fetchReviews.js";
export async function deleteReview(reviewId: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this review?")) {
        return;
    }

    try {
        const response = await fetch(`${reviewUrl}${reviewId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Review deleted successfully:", responseData);
        alert("Review deleted successfully!");
        fetchReviews();
    } catch (error) {
        console.error("Delete failed:", error);
        alert(`Error deleting review: ${error instanceof Error ? error.message : String(error)}`);
    }
}