import { Order } from '../../models/orderModel.js';
import { Users } from '../../models/userModel.js';
import { Books } from '../../models/bookModel.js';
import { orderUrl, userUrl, bookUrl } from "../utils/Urls.js";
import { fetchOrders } from '../fetch/fetchOrders.js';

export async function editOrder(orderId: string): Promise<void> {
    const specificOrderUrl = `${orderUrl}${orderId}`;

    try {
        const orderResponse = await fetch(specificOrderUrl);
        if (!orderResponse.ok) {
            throw new Error(`HTTP error! Status: ${orderResponse.status}`);
        }
        const data: Order = await orderResponse.json();
        console.log(data);

        const createForm = document.getElementById('create_form');
        const formBackground = document.querySelector('.create_form_background') as HTMLElement;
        
        if (!createForm || !formBackground) return;

        createForm.innerHTML = '';
        formBackground.style.display = 'block';

        const bookListHtml = data.bookIds.map(bookId => 
            `<p class="book-line" data-bookid="${bookId}">
                <span class="remove-book" data-bookid="${bookId}">&#9747;</span>${bookId}
            </p>`
        ).join('');

        const userHtml = `
            <p class="user-line" data-userid="${data.userId}">
                <span class="remove-user" data-userid="${data.userId}">&#9747;</span>${data.userId}
            </p>`;

        const editOrderHtml = `
            <div class="edit_form_container">
                <h3 class="section_title">Edit Order</h3>
                <form id="form_id" class="edit_form" action="#" method="PUT">
                    <div class="form_field">
                        <strong class="field_label">Order ID:</strong>
                        <p class="field_value">${data._id}</p>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">User ID:</strong>
                        <div class="item_list">
                            ${userHtml}
                        </div>
                        <div class="input_group">
                            <button type="button" class="add_button" id="add_user">+</button>
                            <select name="usernames" class="form_control" id="usernames">
                                <option value="">-- Select a username --</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Books:</strong>
                        <div class="item_list">
                            ${bookListHtml}
                        </div>
                        <div class="input_group">
                            <button type="button" class="add_button" id="add_book">+</button>
                            <select name="book_titles" class="form_control" id="book_titles">
                                <option value="">-- Select a book title --</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Order Date:</strong>
                        <p class="field_value">${new Date(data.orderDate).toLocaleDateString()}</p>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Status:</strong>
                        <p class="field_value">${data.status}</p>
                    </div>
                    
                    <div class="form_field">
                        <strong class="field_label">Total Amount:</strong>
                        <p class="field_value">$${data.totalAmount.toFixed(2)}</p>
                    </div>
                    
                    <div class="form_actions">
                        <button type="button" class="confirm_button" id="confirm_edit">Confirm</button>
                        <button type="button" class="cancel_button" id="cancel_edit">Cancel</button>
                    </div>
                </form>
            </div>
        `;

        createForm.insertAdjacentHTML('beforeend', editOrderHtml);

        try {
            const userResponse = await fetch(userUrl);
            if (!userResponse.ok) throw new Error(`HTTP error! Status: ${userResponse.status}`);
            const userData: Users[] = await userResponse.json();
            
            const usernamesSelect = document.getElementById('usernames') as HTMLSelectElement;
            if (usernamesSelect) {
                usernamesSelect.innerHTML = '<option value="">-- Select a username --</option>';
                
                userData.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user._id;
                    option.textContent = `${user.first_name} ${user.last_name} (${user._id})`;
                    usernamesSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading users:', error);
        }

        try {
            const bookResponse = await fetch(bookUrl);
            if (!bookResponse.ok) throw new Error(`HTTP error! Status: ${bookResponse.status}`);
            const bookData: Books[] = await bookResponse.json();
            
            const bookTitlesSelect = document.getElementById('book_titles') as HTMLSelectElement;
            if (bookTitlesSelect) {
                bookTitlesSelect.innerHTML = '<option value="">-- Select a book title --</option>';
                
                bookData.forEach(book => {
                    const option = document.createElement('option');
                    option.value = book._id;
                    option.textContent = `${book.title} (${book._id})`;
                    bookTitlesSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error loading books:', error);
        }

        document.getElementById('cancel_edit')?.addEventListener('click', () => {
            formBackground.style.display = 'none';
        });

        document.getElementById('add_user')?.addEventListener('click', () => {
            const usernamesSelect = document.getElementById('usernames') as HTMLSelectElement;
            const selectedUserId = usernamesSelect.value;
            const selectedOption = usernamesSelect.options[usernamesSelect.selectedIndex];
            
            if (!selectedUserId) {
                alert("Please select a user first");
                return;
            }
        
            document.querySelectorAll('.user-line').forEach(el => el.remove());
        
            const userList = document.querySelector('.item_list');
            if (userList) {
                const userLine = document.createElement('p');
                userLine.className = 'user-line';
                userLine.dataset.userid = selectedUserId;
                userLine.innerHTML = `
                    <span class="remove-user" data-userid="${selectedUserId}">&#9747;</span>
                    ${selectedOption.text}
                `;
                userList.appendChild(userLine);
            }
            
            usernamesSelect.value = "";
        });

        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('remove-user')) {
                e.stopPropagation();
                target.closest('.user-line')?.remove();
            }
        });

        document.getElementById('add_book')?.addEventListener('click', () => {
            const bookTitlesSelect = document.getElementById('book_titles') as HTMLSelectElement;
            const selectedBookId = bookTitlesSelect.value;
            const selectedOption = bookTitlesSelect.options[bookTitlesSelect.selectedIndex];
            
            if (!selectedBookId) {
                alert("Please select a book first");
                return;
            }
        
            const bookLists = document.querySelectorAll('.item_list');
            if (bookLists.length > 1) {
                const bookLine = document.createElement('p');
                bookLine.className = 'book-line';
                bookLine.dataset.bookid = selectedBookId;
                bookLine.innerHTML = `
                    <span class="remove-book" data-bookid="${selectedBookId}">&#9747;</span>
                    ${selectedOption.text}
                `;
                bookLists[1].appendChild(bookLine);
            }
            
            bookTitlesSelect.value = "";
        });

        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains('remove-book')) {
                e.stopPropagation();
                target.closest('.book-line')?.remove();
            }
        });

        document.getElementById('confirm_edit')?.addEventListener('click', async () => {
            const confirmButton = document.getElementById('confirm_edit') as HTMLButtonElement;
            
            const userLine = document.querySelector('.user-line');
            if (!userLine) {
                alert("Please select a user");
                return;
            }
            const userId = userLine.getAttribute('data-userid');
            
            const bookLines = document.querySelectorAll('.book-line');
            if (bookLines.length === 0) {
                alert("Please add at least one book");
                return;
            }
            
            const bookIds = Array.from(bookLines).map(bookLine => 
                bookLine.getAttribute('data-bookid')
            ).filter((id): id is string => id !== null);
        
            if (!userId) {
                alert("Invalid user selection");
                return;
            }
        
            const updateData = {
                userId: userId,
                bookIds: bookIds,
                status: data.status,
                totalAmount: data.totalAmount
            };
        
            confirmButton.disabled = true;
            confirmButton.textContent = 'Updating...';
        
            try {
                const updateResponse = await fetch(`${orderUrl}${orderId}`, {
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
                console.log("Order updated successfully:", responseData);
                alert("Order updated successfully!");
                
                formBackground.style.display = 'none';
                
                fetchOrders();
            } catch (error) {
                console.error("Update failed:", error);
                alert(`Error updating order: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                confirmButton.disabled = false;
                confirmButton.textContent = 'Confirm';
            }
        });

    } catch (error) {
        console.error('Error fetching order data:', error);
        alert("Error loading order data. Please try again.");
    }
}