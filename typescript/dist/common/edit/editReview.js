var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { reviewUrl, bookUrl, userUrl } from "../utils/Urls.js";
import { fetchReviews } from '../fetch/fetchReviews.js';
export function editReview(reviewId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const specificReviewUrl = `${reviewUrl}${reviewId}`;
        const updateReviewUrl = `${reviewUrl}${reviewId}`;
        try {
            const reviewResponse = yield fetch(specificReviewUrl);
            if (!reviewResponse.ok) {
                throw new Error(`HTTP error! Status: ${reviewResponse.status}`);
            }
            const data = yield reviewResponse.json();
            console.log(data);
            const createForm = document.getElementById('create_form');
            const formBackground = document.querySelector('.create_form_background');
            if (!createForm || !formBackground)
                return;
            createForm.innerHTML = '';
            formBackground.style.display = 'block';
            const editReviewHtml = `
            <div class="edit_form_container">
                <h3 class="section_title">Edit Review</h3>
                <form id="form_id" class="edit_form" action="#" method="PUT">
                    <div class="form_field">
                        <strong class="field_label">Review ID:</strong>
                        <p class="field_value">${data._id}</p>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Book:</strong>
                        <select class="form_control" id="book_select" required>
                            <option value="">-- Select a book --</option>
                        </select>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">User:</strong>
                        <select class="form_control" id="user_select" required>
                            <option value="">-- Select a user --</option>
                        </select>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Rating (1-5):</strong>
                        <input type="number" class="form_control" id="rating" min="1" max="5" value="${data.rating}" required>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Comment:</strong>
                        <textarea class="form_control" id="comment" rows="3" required>${data.comment}</textarea>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Created at:</strong>
                        <p class="field_value">${new Date(data.date).toLocaleString()}</p>
                    </div>
                    
                    <div class="form_actions">
                        <button type="button" class="confirm_button" id="confirm_edit">Confirm</button>
                        <button type="button" class="cancel_button" id="cancel_edit">Cancel</button>
                    </div>
                </form>
            </div>
        `;
            createForm.insertAdjacentHTML('beforeend', editReviewHtml);
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
                        option.selected = book._id === data.bookId;
                        bookSelect.appendChild(option);
                    });
                }
            }
            catch (error) {
                console.error('Error loading books:', error);
            }
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
                        option.selected = user._id === data.userId;
                        userSelect.appendChild(option);
                    });
                }
            }
            catch (error) {
                console.error('Error loading users:', error);
            }
            (_a = document.getElementById('cancel_edit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                console.log("Cancel Edit from registered!");
                formBackground.style.display = 'none';
            });
            (_b = document.getElementById('confirm_edit')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                const confirmButton = document.getElementById('confirm_edit');
                const updateData = {
                    bookId: document.getElementById('book_select').value,
                    userId: document.getElementById('user_select').value,
                    rating: document.getElementById('rating').value,
                    comment: document.getElementById('comment').value
                };
                if (!updateData.bookId || !updateData.userId || !updateData.rating || !updateData.comment) {
                    alert("Please fill in all fields");
                    return;
                }
                confirmButton.disabled = true;
                confirmButton.textContent = 'Updating...';
                try {
                    const updateResponse = yield fetch(updateReviewUrl, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updateData)
                    });
                    if (!updateResponse.ok) {
                        throw new Error(`HTTP error! Status: ${updateResponse.status}`);
                    }
                    const responseData = yield updateResponse.json();
                    console.log("Review updated successfully:", responseData);
                    alert("Review updated successfully!");
                    formBackground.style.display = 'none';
                    fetchReviews();
                }
                catch (error) {
                    console.error("Update failed:", error);
                    alert(`Error updating review: ${error instanceof Error ? error.message : String(error)}`);
                }
                finally {
                    confirmButton.disabled = false;
                    confirmButton.textContent = 'Confirm';
                }
            }));
        }
        catch (error) {
            console.error('Error fetching review data:', error);
            alert("Error loading review data. Please try again.");
        }
    });
}
