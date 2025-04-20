import { Reviews } from '../../models/reviewModel.js';
import { reviewUrl } from "../utils/Urls.js";
import { editReview } from '../edit/editReview.js';
import { deleteReview } from '../delete/deleteReview.js';

export async function fetchReviews(): Promise<void> {
    try {
        const response = await fetch(reviewUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Reviews[] = await response.json();
        console.log(data);

        const mainNode = document.getElementById('review_container');
        if (!mainNode) return;

        mainNode.innerHTML = data.map(Reviews => `
            <div class="review_info">
                <p><strong>Review ID:</strong> ${Reviews._id}</p>
                <p><strong>Book ID:</strong> ${Reviews.bookId}</p>
                <p><strong>User ID:</strong> ${Reviews.userId}</p>
                <p><strong>Rating:</strong> ${Reviews.rating}</p>
                <p><strong>Comment:</strong> ${Reviews.comment}</p>
                <p><strong>Create at:</strong> ${new Date(Reviews.date).toLocaleString()} </p>
            </div>
            <div class="review_button">
                <button class="review_edit" id="review_edit" data-review-id="${Reviews._id}">Edit</button>
                <button class="review_delete" id="review_delete" data-review-id="${Reviews._id}">Delete</button>
            </div>
            `).join('');

                    // Add event listeners (separate function recommended for production)
            document.querySelectorAll('.review_edit').forEach(button => {
                button.addEventListener('click', (e) => handleReviewEdit(e));
            });
            
            document.querySelectorAll('.review_delete').forEach(button => {
                button.addEventListener('click', (e) => handleReviewDelete(e));
            });
    } catch (error) {
        console.error('Error fetching review: ', error);
    }

    function handleReviewEdit(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const reviewId = button.dataset.reviewId;

        if (!reviewId) {
            console.error('ERROR ReviewID is undefiend!');
            return;
        }

        console.log('Edit order:', reviewId);
        editReview(reviewId);
    }

    function handleReviewDelete(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const reviewId = button.dataset.reviewId;

        if (!reviewId) {
            console.error('ERROR ReviewID is undefined!');
            return;
        }

        console.log('Delete order:', reviewId);
        deleteReview(reviewId);
    }
}