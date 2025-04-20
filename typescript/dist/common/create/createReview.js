var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reviewUrl, userUrl, bookUrl } from "../utils/Urls.js";
import { fetchReviews } from "../fetch/fetchReviews.js";
export function createReview() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const createForm = document.getElementById('create_form');
        const formBackground = document.querySelector('.create_form_background');
        if (!createForm || !formBackground)
            return;
        createForm.innerHTML = '';
        formBackground.style.display = 'block';
        const createReviewHtml = `
        <div class="edit_form_container">
            <h3 class="section_title">Create Review</h3>
            <form id="form_id" class="edit_form" action="#" method="POST">
                <div class="form_field">
                    <strong class="field_label">Book:</strong>
                    <select class="form_control" id="book_select" required></select>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">User:</strong>
                    <select class="form_control" id="user_select" required></select>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Rating (1-5):</strong>
                    <input type="number" class="form_control" id="rating" min="1" max="5" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Comment:</strong>
                    <textarea class="form_control" id="comment" rows="3" required></textarea>
                </div>
                
                <div class="form_actions">
                    <button type="button" class="confirm_button" id="confirm_create">Confirm</button>
                    <button type="button" class="cancel_button" id="cancel_create">Cancel</button>
                </div>
            </form>
        </div>
    `;
        createForm.insertAdjacentHTML('beforeend', createReviewHtml);
        try {
            const userResponse = yield fetch(userUrl);
            if (!userResponse.ok)
                throw new Error(`HTTP error! Status: ${userResponse.status}`);
            const userData = yield userResponse.json();
            const userSelect = document.getElementById('user_select');
            if (userSelect) {
                userSelect.innerHTML = '<option value="">-- Select a user --</option>';
                userData.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user._id;
                    option.textContent = `${user.first_name} ${user.last_name} (${user._id})`;
                    userSelect.appendChild(option);
                });
            }
        }
        catch (error) {
            console.error('Error loading users:', error);
        }
        try {
            const bookResponse = yield fetch(bookUrl);
            if (!bookResponse.ok)
                throw new Error(`HTTP error! Status: ${bookResponse.status}`);
            const bookData = yield bookResponse.json();
            const bookSelect = document.getElementById('book_select');
            if (bookSelect) {
                bookSelect.innerHTML = '<option value="">-- Select a book --</option>';
                bookData.forEach(book => {
                    const option = document.createElement('option');
                    option.value = book._id;
                    option.textContent = `${book.title} (${book._id})`;
                    bookSelect.appendChild(option);
                });
            }
        }
        catch (error) {
            console.error('Error loading books:', error);
        }
        (_a = document.getElementById('cancel_create')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            formBackground.style.display = 'none';
        });
        (_b = document.getElementById('confirm_create')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const confirmButton = document.getElementById('confirm_create');
            const reviewData = {
                bookId: document.getElementById('book_select').value,
                userId: document.getElementById('user_select').value,
                rating: document.getElementById('rating').value,
                comment: document.getElementById('comment').value
            };
            if (!reviewData.bookId || !reviewData.userId || !reviewData.rating || !reviewData.comment) {
                alert("Please fill in all fields");
                return;
            }
            confirmButton.disabled = true;
            confirmButton.textContent = 'Creating...';
            try {
                const response = yield fetch(reviewUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reviewData)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = yield response.json();
                console.log("Review created successfully:", responseData);
                alert("Review created successfully!");
                formBackground.style.display = 'none';
                fetchReviews();
            }
            catch (error) {
                console.error("Create failed:", error);
                alert(`Error creating review: ${error instanceof Error ? error.message : String(error)}`);
            }
            finally {
                confirmButton.disabled = false;
                confirmButton.textContent = 'Confirm';
            }
        }));
    });
}
