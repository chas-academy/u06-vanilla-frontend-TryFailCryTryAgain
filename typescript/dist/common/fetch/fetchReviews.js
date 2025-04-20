var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reviewUrl } from "../utils/Urls.js";
import { editReview } from '../edit/editReview.js';
import { deleteReview } from '../delete/deleteReview.js';
export function fetchReviews() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(reviewUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            const mainNode = document.getElementById('review_container');
            if (!mainNode)
                return;
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
        }
        catch (error) {
            console.error('Error fetching review: ', error);
        }
        function handleReviewEdit(event) {
            const button = event.target;
            const reviewId = button.dataset.reviewId;
            if (!reviewId) {
                console.error('ERROR ReviewID is undefiend!');
                return;
            }
            console.log('Edit order:', reviewId);
            editReview(reviewId);
        }
        function handleReviewDelete(event) {
            const button = event.target;
            const reviewId = button.dataset.reviewId;
            if (!reviewId) {
                console.error('ERROR ReviewID is undefined!');
                return;
            }
            console.log('Delete order:', reviewId);
            deleteReview(reviewId);
        }
    });
}
