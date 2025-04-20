// Import to fetch existing data into tables
import { fetchOrders } from "./common/fetch/fetchOrders.js";
import { fetchBooks } from "./common/fetch/fetchBooks.js";
import { fetchReviews } from "./common/fetch/fetchReviews.js";
import { fetchUsers } from "./common/fetch/fetchUsers.js";

// Import to create new data enteries into the tables
import { createOrder } from "./common/create/createOrder.js";
import { createUser } from "./common/create/createUser.js";
import { createReview } from "./common/create/createReview.js";
import { createBook } from "./common/create/createBook.js";

// Init the fetching functions
fetchOrders();
fetchBooks();
fetchReviews();
fetchUsers();

// Init event listener regarding the create functions of new data enteries
document.querySelectorAll('#create_order').forEach(button => {
    button.addEventListener('click', () => createOrder());
});

document.querySelectorAll('#create_user').forEach(button => {
    button.addEventListener('click', () => createUser());
});

document.querySelectorAll('#create_review').forEach(button => {
    button.addEventListener('click', () => createReview());
});

document.querySelectorAll('#create_book').forEach(button => {
    button.addEventListener('click', () => createBook());
});