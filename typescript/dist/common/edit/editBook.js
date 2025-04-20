var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { bookUrl } from "../utils/Urls.js";
import { fetchBooks } from '../fetch/fetchBooks.js';
export function editBook(bookId) {
    return __awaiter(this, void 0, void 0, function* () {
        const specificBookUrl = `${bookUrl}/id/${bookId}`;
        const updateBookUrl = `${bookUrl}${bookId}`;
        try {
            // Fetch book data
            const response = yield fetch(specificBookUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            // Create and display edit form
            const createForm = document.getElementById('create_form');
            const formBackground = document.querySelector('.create_form_background');
            if (!createForm || !formBackground)
                return;
            createForm.innerHTML = '';
            formBackground.style.display = 'block';
            const editBookHtml = `
            <div class="edit_form_container">
                <h3 class="section_title">Edit Book</h3>
                <form id="form_id" class="edit_form" action="#" method="PUT">
                    <div class="form_field">
                        <strong class="field_label">Book ID:</strong>
                        <p class="field_value">${data._id}</p>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Title:</strong>
                        <input type="text" class="form_control" id="title" value="${data.title}" required>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Author:</strong>
                        <input type="text" class="form_control" id="author" value="${data.author}" required>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Genre:</strong>
                        <input type="text" class="form_control" id="genre" value="${data.genre}" required>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Price (€):</strong>
                        <input type="number" step="0.01" class="form_control" id="price" value="${data.price}" required>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Stock:</strong>
                        <input type="number" class="form_control" id="stock" value="${data.stock}" required>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Description:</strong>
                        <textarea class="form_control" id="description" rows="3" required>${data.description}</textarea>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Published Date:</strong>
                        <p class="field_value">${new Date(data.publishedDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div class="form_actions">
                        <button type="button" class="confirm_button" id="confirm_edit">Confirm</button>
                        <button type="button" class="cancel_button" id="cancel_edit">Cancel</button>
                    </div>
                </form>
            </div>
        `;
            createForm.insertAdjacentHTML('beforeend', editBookHtml);
            // Cancel button handler
            const cancelButton = document.getElementById('cancel_edit');
            if (cancelButton) {
                cancelButton.addEventListener('click', () => {
                    formBackground.style.display = 'none';
                });
            }
            // Confirm button handler
            const confirmButton = document.getElementById('confirm_edit');
            if (confirmButton) {
                confirmButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                    const updateData = {
                        title: document.getElementById('title').value,
                        author: document.getElementById('author').value,
                        genre: document.getElementById('genre').value,
                        price: parseFloat(document.getElementById('price').value),
                        stock: parseInt(document.getElementById('stock').value),
                        description: document.getElementById('description').value
                    };
                    // Validate required fields
                    if (!updateData.title || !updateData.author || !updateData.genre ||
                        isNaN(updateData.price) || isNaN(updateData.stock) || !updateData.description) {
                        alert("Please fill in all fields with valid values");
                        return;
                    }
                    // // Show loading state
                    // confirmButton.disabled = true;
                    // confirmButton.textContent = 'Updating...';
                    try {
                        const updateResponse = yield fetch(updateBookUrl, {
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
                        console.log("Book updated successfully:", responseData);
                        alert("Book updated successfully!");
                        // Hide the edit form
                        formBackground.style.display = 'none';
                        // Refresh the books list
                        fetchBooks();
                    }
                    catch (error) {
                        console.error("Update failed:", error);
                        alert(`Error updating book: ${error instanceof Error ? error.message : String(error)}`);
                    }
                    finally {
                        // Reset button state
                        // if (confirmButton) {
                        //     confirmButton.disabled = false;
                        //     confirmButton.textContent = 'Confirm';
                        // }
                    }
                }));
            }
        }
        catch (error) {
            console.error('Error fetching book data:', error);
            alert("Error loading book data. Please try again.");
        }
    });
}
