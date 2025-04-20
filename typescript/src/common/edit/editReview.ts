import { Reviews } from '../../models/reviewModel.js';
import { Books } from '../../models/bookModel.js';
import { Users } from '../../models/userModel.js';
import { reviewUrl, bookUrl, userUrl } from "../utils/Urls.js";
import { fetchReviews } from '../fetch/fetchReviews.js';

export async function editReview(reviewId: string): Promise<void> {
    const specificReviewUrl = `${reviewUrl}${reviewId}`;
    const updateReviewUrl = `${reviewUrl}${reviewId}`;

    try {
        const reviewResponse = await fetch(specificReviewUrl);
        if (!reviewResponse.ok) {
            throw new Error(`HTTP error! Status: ${reviewResponse.status}`);
        }
        const data: Reviews = await reviewResponse.json();
        console.log(data);

        const createForm = document.getElementById('create_form');
        const formBackground = document.querySelector('.create_form_background') as HTMLElement;
        
        if (!createForm || !formBackground) return;

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
            const bookResponse = await fetch(bookUrl);
            if (!bookResponse.ok) throw new Error(`HTTP error! Status: ${bookResponse.status}`);
            const bookData: Books[] = await bookResponse.json();
            
            const bookSelect = document.getElementById('book_select') as HTMLSelectElement;
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
        } catch (error) {
            console.error('Error loading books:', error);
        }

        try {
            const userResponse = await fetch(userUrl);
            if (!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`);
            const userData: Users[] = await userResponse.json();
            
            const userSelect = document.getElementById('user_select') as HTMLSelectElement;
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
        } catch (error) {
            console.error('Error loading users:', error);
        }

        document.getElementById('cancel_edit')?.addEventListener('click', () => {
            console.log("Cancel Edit from registered!");
            formBackground.style.display = 'none';
        });

        document.getElementById('confirm_edit')?.addEventListener('click', async () => {
            const confirmButton = document.getElementById('confirm_edit') as HTMLButtonElement;
            
            const updateData = {
                bookId: (document.getElementById('book_select') as HTMLSelectElement).value,
                userId: (document.getElementById('user_select') as HTMLSelectElement).value,
                rating: (document.getElementById('rating') as HTMLInputElement).value,
                comment: (document.getElementById('comment') as HTMLTextAreaElement).value
            };

            if (!updateData.bookId || !updateData.userId || !updateData.rating || !updateData.comment) {
                alert("Please fill in all fields");
                return;
            }

            confirmButton.disabled = true;
            confirmButton.textContent = 'Updating...';

            try {
                const updateResponse = await fetch(updateReviewUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData)
                });

                if (!updateResponse.ok) {
                    throw new Error(`HTTP error! Status: ${updateResponse.status}`);
                }

                const responseData = await updateResponse.json();
                console.log("Review updated successfully:", responseData);
                alert("Review updated successfully!");
                
                formBackground.style.display = 'none';
                
                fetchReviews();
            } catch (error) {
                console.error("Update failed:", error);
                alert(`Error updating review: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                confirmButton.disabled = false;
                confirmButton.textContent = 'Confirm';
            }
        });

    } catch (error) {
        console.error('Error fetching review data:', error);
        alert("Error loading review data. Please try again.");
    }
}