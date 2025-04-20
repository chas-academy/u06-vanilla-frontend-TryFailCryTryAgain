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
import { fetchBooks } from "../fetch/fetchBooks.js";
export function createBook() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const createForm = document.getElementById('create_form');
        const formBackground = document.querySelector('.create_form_background');
        if (!createForm || !formBackground)
            return;
        createForm.innerHTML = '';
        formBackground.style.display = 'block';
        const createBookHtml = `
        <div class="edit_form_container">
            <h3 class="section_title">Create Book</h3>
            <form id="form_id" class="edit_form" action="#" method="POST">
                <div class="form_field">
                    <strong class="field_label">Title:</strong>
                    <input type="text" class="form_control" id="title" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Author:</strong>
                    <input type="text" class="form_control" id="author" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Genre:</strong>
                    <input type="text" class="form_control" id="genre" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Price (€):</strong>
                    <input type="number" step="0.01" class="form_control" id="price" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Stock:</strong>
                    <input type="number" class="form_control" id="stock" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Description:</strong>
                    <textarea class="form_control" id="description" rows="3" required></textarea>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Published Date:</strong>
                    <input type="date" class="form_control" id="published_date" required>
                </div>
                
                <div class="form_actions">
                    <button type="button" class="confirm_button" id="confirm_create">Confirm</button>
                    <button type="button" class="cancel_button" id="cancel_create">Cancel</button>
                </div>
            </form>
        </div>
    `;
        createForm.insertAdjacentHTML('beforeend', createBookHtml);
        (_a = document.getElementById('cancel_create')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            formBackground.style.display = 'none';
        });
        (_b = document.getElementById('confirm_create')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const confirmButton = document.getElementById('confirm_create');
            const bookData = {
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                genre: document.getElementById('genre').value,
                price: parseFloat(document.getElementById('price').value),
                stock: parseInt(document.getElementById('stock').value),
                description: document.getElementById('description').value,
                publishedDate: document.getElementById('published_date').value
            };
            if (!bookData.title || !bookData.author || !bookData.genre ||
                isNaN(bookData.price) || isNaN(bookData.stock) || !bookData.description || !bookData.publishedDate) {
                alert("Please fill in all fields with valid values");
                return;
            }
            confirmButton.disabled = true;
            confirmButton.textContent = 'Creating...';
            try {
                const response = yield fetch(bookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(bookData)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = yield response.json();
                console.log("Book created successfully:", responseData);
                alert("Book created successfully!");
                formBackground.style.display = 'none';
                fetchBooks();
            }
            catch (error) {
                console.error("Create failed:", error);
                alert(`Error creating book: ${error instanceof Error ? error.message : String(error)}`);
            }
            finally {
                confirmButton.disabled = false;
                confirmButton.textContent = 'Confirm';
            }
        }));
    });
}
