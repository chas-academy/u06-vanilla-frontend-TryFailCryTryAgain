import { Books } from '../../models/bookModel.js';
import { bookUrl } from "../utils/Urls.js";
import { editBook } from '../edit/editBook.js';
import { deleteBook } from '../delete/deleteBook.js';

export async function fetchBooks(): Promise<void> {
    try {
        const response = await fetch(bookUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Books[] = await response.json();
        console.log(data);

        const mainNode = document.getElementById('book_container');
        if (!mainNode) return;

        mainNode.innerHTML = data.map(Books => `
            <div class="book_info">
                <p><strong>Book ID:</strong> ${Books._id}</p>
                <p><strong>Title:</strong> ${Books.title}</p>
                <p><strong>Author:</strong> ${Books.author}</p>
                <p><strong>Genre:</strong> ${Books.genre}</p>
                <p><strong>Price:</strong> ${Books.price}€</p>
                <p><strong>Stock:</strong> ${Books.stock} units</p>
                <p><strong>Description</strong> ${Books.description} </p>
                <p><strong>Published Date:</strong> ${new Date(Books.publishedDate).toLocaleString()} </p>
            </div>
            <div class="book_button">
                <button class="book_edit" id="book_edit" data-book-id="${Books._id}">Edit</button>
                <button class="book_delete" id="book_delete" data-book-id="${Books._id}">Delete</button>
            </div>
            `).join('');

        document.querySelectorAll('.book_edit').forEach(button => {
            button.addEventListener('click', (e) => handleBookEdit(e));
        });
        
        document.querySelectorAll('.book_delete').forEach(button => {
            button.addEventListener('click', (e) => handleBookDelete(e));
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
    }

    function handleBookEdit(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const bookId = button.dataset.bookId;

        if (!bookId) {
            console.error('Book ID is undefined');
            return;
        }

        console.log('Edit book:', bookId);
        editBook(bookId);
    }

    function handleBookDelete(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const bookId = button.dataset.bookId;

        if (!bookId) {
            console.error('Book ID is undefined');
            return;
        }
        console.log('Delete Book:', bookId);
        deleteBook(bookId);
    }
}