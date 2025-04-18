


// Crud functions to fetch and display the data in the four sections


$(document).ready(function() {

    // API URL calls
    const orderUrl = 'https://restful-api-sca9.onrender.com/order/';
    const bookUrl = 'https://restful-api-sca9.onrender.com/book/';
    const userUrl = 'https://restful-api-sca9.onrender.com/user/';
    const reviewUrl = 'https://restful-api-sca9.onrender.com/review/';

    function fetchOrders() {
        $.get(orderUrl)
            .done(function(data) {
                console.log(data);
                $('#order_container').empty();

                if (Array.isArray(data)) {
                    data.forEach(order => {
                        const booksList = order.bookIds.map(bookId => 
                            `<span>${bookId}</span>`
                        ).join(' ');

                        const orderHtml = `
                            <div class="order_info">
                                <p><strong>Order ID:</strong> ${order._id}</p>
                                <p><strong>User ID:</strong> ${order.userId}</p>
                                <p><strong>Books:</strong> ${booksList}</p>
                                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
                                <p><strong>Status:</strong> ${order.status}</p>
                                <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
                            </div>
                            <div class="order_button">
                                <button class="order_edit" id="order_edit" data-order-id="${order._id}">Edit</button>
                                <button class="order_delete" id="order_delete" data-order-id="${order._id}">Delete</button>
                            </div>                 
                        `;

                        $('#order_container').append(orderHtml);
                    });
                }
            })
            .fail(function(error) {
                console.error('Error: ', error);
            });
    }

    function fetchBooks() {
        $.get(bookUrl)
            .done(function(data) {
                console.log(data);
                $('.book_container').empty();

                if (Array.isArray(data)) {
                    data.forEach(book => {

                        const bookHtml = `
                            <div class="book_info">
                                <p><strong>Book ID:</strong> ${book._id}</p>
                                <p><strong>Title:</strong> ${book.title}</p>
                                <p><strong>Author:</strong> ${book.author}</p>
                                <p><strong>Genre:</strong> ${book.genre}</p>
                                <p><strong>Price:</strong> ${book.price}€</p>
                                <p><strong>Stock:</strong> ${book.stock} units</p>
                                <p><strong>Description</strong> ${book.description} </p>
                                <p><strong>Published Date:</strong> ${new Date(book.publishedDate).toLocaleString()} </p>
                            </div>
                            <div class="book_button">
                                <button class="book_edit" id="book_edit" data-book-id="${book._id}">Edit</button>
                                <button class="book_delete" id="book_delete" data-book-id="${book._id}">Delete</button>
                            </div>                 
                        `;

                        $('.book_container').append(bookHtml);
                    });
                }
            })
            .fail(function(error) {
                console.error('Error: ', error);
            });
    }


    function fetchReviews() {
        $.get(reviewUrl)
        .done(function(data) {
            console.log(data);
            $('.review_container').empty();

            if (Array.isArray(data)) {
                data.forEach(reviews => {

                    const reviewHtml = `
                        <div class="review_info">
                            <p><strong>Review ID:</strong> ${reviews._id}</p>
                            <p><strong>Book ID:</strong> ${reviews.bookId}</p>
                            <p><strong>User ID:</strong> ${reviews.userId}</p>
                            <p><strong>Rating:</strong> ${reviews.rating}</p>
                            <p><strong>Comment:</strong> ${reviews.comment}</p>
                            <p><strong>Create at:</strong> ${new Date(reviews.date).toLocaleString()} </p>
                        </div>
                        <div class="review_button">
                            <button class="review_edit" id="review_edit" data-review-id="${reviews._id}">Edit</button>
                            <button class="review_delete" id="review_delete" data-review-id="${reviews._id}">Delete</button>
                        </div>                 
                    `;

                    $('.review_container').append(reviewHtml);
                });
            }
        })
        .fail(function(error) {
            console.error('Error: ', error);
        });
    }

    function fetchUsers() {
        $.get(userUrl)
        .done(function(data) {
            console.log(data);
            $('.users_container').empty();

            if (Array.isArray(data)) {
                data.forEach(users => {

                    const userHtml = `
                        <div class="users_info">
                            <p><strong>User ID:</strong> ${users._id}</p>
                            <p><strong>First Name:</strong> ${users.first_name}</p>
                            <p><strong>Last Name:</strong> ${users.last_name}</p>
                            <p><strong>Phone:</strong> ${users.phone}</p>
                            <p><strong>Email:</strong> ${users.email}</p>
                            <p><strong>Password:</strong> ${users.password} units</p>
                            <p><strong>Adress:</strong> ${users.adress} </p>
                            <p><strong>ZIP:</strong> ${users.ZIP} </p>
                        </div>
                        <div class="users_button">
                            <button class="users_edit" id="users_edit" data-users-id="${users._id}">Edit</button>
                            <button class="users_delete" id="users_delete" data-users-id="${users._id}">Delete</button>
                        </div>                 
                    `;

                    $('.users_container').append(userHtml);
                });
            }
        })
        .fail(function(error) {
            console.error('Error: ', error);
        });
    }

    fetchOrders();
    fetchBooks();
    fetchReviews();
    fetchUsers();



    function deleteOrder(orderId) {
        if (!confirm("Are you sure you want to delete this order?")) {
            return;
        }
        
        $.ajax({
            url: `${orderUrl}${orderId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("Order deleted successfully:", response);
                alert("Order deleted successfully!");
                fetchOrders();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting order: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    function deleteUser(userId) {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        $.ajax({
            url: `${userUrl}${userId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("User deleted successfully:", response);
                alert("User deleted successfully!");
                fetchUsers();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting User: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    function deleteReview(reviewId) {
        if (!confirm("Are you sure you want to delete this Review?")) {
            return;
        }

        $.ajax({
            url: `${reviewUrl}${reviewId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("Review deleted successfully:", response);
                alert("Review deleted successfully!");
                fetchReviews();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting Review: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    function deleteBook(bookId) {
        if (!confirm("Are you sure you want to delete this Book?")) {
            return;
        }

        $.ajax({
            url: `${bookUrl}${bookId}`,
            type: 'DELETE',
            success: function(response) {
                console.log("Book deleted successfully:", response);
                alert("Book deleted successfully!");
                fetchBooks();
            },
            error: function(xhr, status, error) {
                console.error("Delete failed:", status, error);
                console.error("Response:", xhr.responseText);
                alert(`Error deleting Book: ${xhr.status} ${xhr.statusText}`);
            }
        });
    }

    // Edit each section
    function editOrder(orderId) {

        const specificOrderUrl = `${orderUrl}${orderId}`;

        $.get(specificOrderUrl)
            .done(function(data) {
                console.log(data);

                $("#create_form").empty();

                // Clear the previous edit order template
                $(".create_form_background").css("display", "block");


                const bookListHtml = data.bookIds.map(bookId => 
                    `<p class="book-line" data-bookid="${bookId}">
                        <span class="remove-book" data-bookid="${bookId}">&#9747;</span>${bookId}
                    </p>`
                ).join('');

                const userHtml = `
                    <p class="user-line" data-userid="${data.userId}">
                        <span class="remove-user" data-userid="${data.userId}">&#9747;</span>${data.userId}
                    </p>`;


                // Add all the users inside the DB into the userlist

                $.get(userUrl)
                .done(function(userData) {
                    console.log(userData);
                    $('#usernames').empty().append('<option value="">-- Select a username --</option>');
                    
                    if (Array.isArray(userData)) {
                        userData.forEach(user => {
                            $('#usernames').append(
                                `<option value="${user._id}">${user.first_name} ${user.last_name} (${user._id})</option>`
                            );
                        });
                    }
                })
                .fail(function(error) {
                    console.error('Error:', error);
                });

                // Add event click so the username and id gets replaced with the old one
                $(document).off('click', '#add_user').on('click', '#add_user', function() {
                    const selectedUserId = $("#usernames").val();
                    const selectedText = $("#usernames option:selected").text();
                    
                    if (!selectedUserId) {
                        alert("Please select a user first");
                        return;
                    }
                
                    $('.user-line').remove();
                
                    const userHtml = `
                        <p class="user-line" data-userid="${selectedUserId}">
                            <span class="remove-user" data-userid="${selectedUserId}">&#9747;</span>
                            ${selectedText}
                        </p>
                    `;
                    
                    $('.item_list').first().append(userHtml);
                    $("#usernames").val(""); // Reset selection
                });
                
                // Event lister to remove the user from the Edit order
                $(document).off('click', '.remove-user').on('click', '.remove-user', function(e) {
                    e.stopPropagation();
                    $(this).closest('.user-line').remove();
                });

                // Repeat functions regarding the books

                $.get(bookUrl)
                .done(function(bookData) {
                    console.log(bookData);
                    $('#book_titles').empty().append('<option value="">-- Select a book --</option>');
                    
                    if (Array.isArray(bookData)) {
                        bookData.forEach(book => {
                            $('#book_titles').append(
                                `<option value="${book._id}">${book.title} (${book._id})</option>`
                            );
                        });
                    }
                })
                .fail(function(error) {
                    console.error('Error:', error);
                });


                $(document).off('click', '#add_book').on('click', '#add_book', function() {
                    const selectedBookId = $("#book_titles").val();
                    const selectedText = $("#book_titles option:selected").text();
                    
                    if (!selectedBookId) {
                        alert("Please select a user first");
                        return;
                    }
                
                    const bookHtml = `
                        <p class="book-line" data-bookid="${selectedBookId}">
                            <span class="remove-book" data-bookid="${selectedText}">&#9747;</span>
                            ${selectedText}
                        </p>
                    `;
                    
                    $('.item_list').last().append(bookHtml);
                    $("#book_titles").val("");
                });

                $(document).off('click', '.remove-book').on('click', '.remove-book', function(e) {
                    e.stopPropagation();
                    $(this).closest('.book-line').remove();
                });


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
                                        <!-- User options will be populated here -->
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
                                        <!-- Book options will be populated here -->
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

                $('#create_form').append(editOrderHtml);
                
                $(document).off('click', '#cancel_edit').on('click', '#cancel_edit', function() {
                    $('.create_form_background').css("display", "none");
                });

                $(document).off('click', '#confirm_edit').on('click', '#confirm_edit', function() {
                    // Get the selected user
                    const userLine = $('.user-line');
                    if (userLine.length === 0) {
                        alert("Please select a user");
                        return;
                    }
                    const userId = userLine.data('userid');
                    
                    // Get all selected books
                    const bookIds = $('.book-line').map(function() {
                        return $(this).data('bookid');
                    }).get();
                    
                    if (bookIds.length === 0) {
                        alert("Please add at least one book");
                        return;
                    }
                
                    const updateData = {
                        userId: userId,
                        bookIds: bookIds,
                        status: data.status,
                        totalAmount: data.totalAmount
                    };
                
                    $(this).prop('disabled', true).text('Updating...');
                
                    $.ajax({
                        url: `${orderUrl}${orderId}`,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(updateData),
                        success: function(response) {
                            console.log("Order updated successfully:", response);
                            alert("Order updated successfully!");
                            
                            $('.create_form_background').css("display", "none");
                            
                            fetchOrders();
                        },
                        error: function(xhr, status, error) {
                            console.error("Update failed:", status, error);
                            console.error("Response:", xhr.responseText);
                            
                            let errorMessage = `Error updating order: ${xhr.status} ${xhr.statusText}`;
                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage += `\n${xhr.responseJSON.message}`;
                            }
                            
                            alert(errorMessage);
                        },
                        complete: function() {
                            $('#confirm_edit').prop('disabled', false).text('Confirm');
                        }
                    });
                });
            });
    }

    function editUser(userId) {
        const specificUserUrl = `${userUrl}/id/${userId}`;
        const updateUserUrl = `${userUrl}${userId}`;
    
        $.get(specificUserUrl)
            .done(function(data) {
                console.log(data);
    
                $("#create_form").empty();
                $(".create_form_background").css("display", "block");
    
                const editUserHtml = `
                    <div class="edit_form_container">
                        <h3 class="section_title">Edit User</h3>
                        <form id="form_id" class="edit_form" action="#" method="PUT">
                            <div class="form_field">
                                <strong class="field_label">User ID:</strong>
                                <p class="field_value">${data._id}</p>
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">First Name:</strong>
                                <input type="text" class="form_control" id="first_name" value="${data.first_name}" required>
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">Last Name:</strong>
                                <input type="text" class="form_control" id="last_name" value="${data.last_name}" required>
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">Phone:</strong>
                                <input type="tel" class="form_control" id="phone" value="${data.phone}" required>
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">Email:</strong>
                                <input type="email" class="form_control" id="email" value="${data.email}" required>
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">Password:</strong>
                                <input type="password" class="form_control" id="password" placeholder="Leave blank to keep current password">
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">Address:</strong>
                                <input type="text" class="form_control" id="address" value="${data.adress}" required>
                            </div>
                            
                            <div class="form_field">
                                <strong class="field_label">ZIP Code:</strong>
                                <input type="text" class="form_control" id="zip" value="${data.ZIP}" required>
                            </div>
                            
                            <div class="form_actions">
                                <button type="button" class="confirm_button" id="confirm_edit">Confirm</button>
                                <button type="button" class="cancel_button" id="cancel_edit">Cancel</button>
                            </div>
                        </form>
                    </div>
                `;
    
                $('#create_form').append(editUserHtml);
    
                $(document).off('click', '#cancel_edit').on('click', '#cancel_edit', function() {
                    $('.create_form_background').css("display", "none");
                });
    
                $(document).off('click', '#confirm_edit').on('click', '#confirm_edit', function() {
                    const updateData = {
                        first_name: $('#first_name').val(),
                        last_name: $('#last_name').val(),
                        phone: $('#phone').val(),
                        email: $('#email').val(),
                        adress: $('#address').val(),
                        ZIP: $('#zip').val()
                    };
    
                    const newPassword = $('#password').val();
                    if (newPassword) {
                        updateData.password = newPassword;
                    }
    
                    if (!updateData.first_name || !updateData.last_name || !updateData.phone || 
                        !updateData.email || !updateData.adress || !updateData.ZIP) {
                        alert("Please fill in all required fields");
                        return;
                    }
    
                    $(this).prop('disabled', true).text('Updating...');
    
                    $.ajax({
                        url: updateUserUrl,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(updateData),
                        success: function(response) {
                            console.log("User updated successfully:", response);
                            alert("User updated successfully!");
                            
                            $('.create_form_background').css("display", "none");
                            
                            fetchUsers();
                        },
                        error: function(xhr, status, error) {
                            console.error("Update failed:", status, error);
                            console.error("Response:", xhr.responseText);
                            
                            let errorMessage = `Error updating user: ${xhr.status} ${xhr.statusText}`;
                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage += `\n${xhr.responseJSON.message}`;
                            }
                            
                            alert(errorMessage);
                        },
                        complete: function() {
                            $('#confirm_edit').prop('disabled', false).text('Confirm');
                        }
                    });
                });
            })
            .fail(function(error) {
                console.error('Error fetching user data:', error);
                alert("Error loading user data. Please try again.");
            });
    }

    function editReview(reviewId) {
        const specificReviewUrl = `${reviewUrl}${reviewId}`;
        const updateReviewUrl = `${reviewUrl}${reviewId}`;
    
        $.get(specificReviewUrl)
            .done(function(data) {
                console.log(data);
    
                $("#create_form").empty();
                $(".create_form_background").css("display", "block");
    
                $.get(bookUrl)
                .done(function(bookData) {
                    $('#book_select').empty().append('<option value="">-- Select a book --</option>');
                    if (Array.isArray(bookData)) {
                        bookData.forEach(book => {
                            $('#book_select').append(
                                `<option value="${book._id}" ${book._id === data.bookId ? 'selected' : ''}>${book.title} (${book._id})</option>`
                            );
                        });
                    }
                })
                .fail(console.error);
    
                $.get(userUrl)
                .done(function(userData) {
                    $('#user_select').empty().append('<option value="">-- Select a user --</option>');
                    if (Array.isArray(userData)) {
                        userData.forEach(user => {
                            $('#user_select').append(
                                `<option value="${user._id}" ${user._id === data.userId ? 'selected' : ''}>${user.first_name} ${user.last_name} (${user._id})</option>`
                            );
                        });
                    }
                })
                .fail(console.error);
    
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
    
                $('#create_form').append(editReviewHtml);
    
                $(document).off('click', '#cancel_edit').on('click', '#cancel_edit', function() {
                    console.log("Cancel Edit from registered!");
                    $('.create_form_background').css("display", "none");
                });
    
                $(document).off('click', '#confirm_edit').on('click', '#confirm_edit', function() {
                    const updateData = {
                        bookId: $('#book_select').val(),
                        userId: $('#user_select').val(),
                        rating: $('#rating').val(),
                        comment: $('#comment').val()
                    };
    
                    // Validate required fields
                    if (!updateData.bookId || !updateData.userId || !updateData.rating || !updateData.comment) {
                        alert("Please fill in all fields");
                        return;
                    }
    
                    // Show loading state
                    $(this).prop('disabled', true).text('Updating...');
    
                    $.ajax({
                        url: updateReviewUrl,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(updateData),
                        success: function(response) {
                            console.log("Review updated successfully:", response);
                            alert("Review updated successfully!");
                            
                            // Hide the edit form
                            $('.create_form_background').css("display", "none");
                            
                            // Refresh the reviews list
                            fetchReviews();
                        },
                        error: function(xhr, status, error) {
                            console.error("Update failed:", status, error);
                            console.error("Response:", xhr.responseText);
                            
                            let errorMessage = `Error updating review: ${xhr.status} ${xhr.statusText}`;
                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage += `\n${xhr.responseJSON.message}`;
                            }
                            
                            alert(errorMessage);
                        },
                        complete: function() {
                            // Reset button state
                            $('#confirm_edit').prop('disabled', false).text('Confirm');
                        }
                    });
                });
            })
            .fail(function(error) {
                console.error('Error fetching review data:', error);
                alert("Error loading review data. Please try again.");
            });
    }

    function editBook(bookId) {
        const specificBookUrl = `${bookUrl}/id/${bookId}`;
        const updateBookUrl = `${bookUrl}${bookId}`;
    
        $.get(specificBookUrl)
            .done(function(data) {
                console.log(data);
    
                $("#create_form").empty();
                $(".create_form_background").css("display", "block");
    
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
    
                $('#create_form').append(editBookHtml);
    
                // Cancel button handler
                $(document).off('click', '#cancel_edit').on('click', '#cancel_edit', function() {
                    $('.create_form_background').css("display", "none");
                });
    
                // Confirm button handler
                $(document).off('click', '#confirm_edit').on('click', '#confirm_edit', function() {
                    const updateData = {
                        title: $('#title').val(),
                        author: $('#author').val(),
                        genre: $('#genre').val(),
                        price: parseFloat($('#price').val()),
                        stock: parseInt($('#stock').val()),
                        description: $('#description').val()
                    };
    
                    // Validate required fields
                    if (!updateData.title || !updateData.author || !updateData.genre || 
                        isNaN(updateData.price) || isNaN(updateData.stock) || !updateData.description) {
                        alert("Please fill in all fields with valid values");
                        return;
                    }
    
                    // Show loading state
                    $(this).prop('disabled', true).text('Updating...');
    
                    $.ajax({
                        url: updateBookUrl,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(updateData),
                        success: function(response) {
                            console.log("Book updated successfully:", response);
                            alert("Book updated successfully!");
                            
                            // Hide the edit form
                            $('.create_form_background').css("display", "none");
                            
                            // Refresh the books list
                            fetchBooks();
                        },
                        error: function(xhr, status, error) {
                            console.error("Update failed:", status, error);
                            console.error("Response:", xhr.responseText);
                            
                            let errorMessage = `Error updating book: ${xhr.status} ${xhr.statusText}`;
                            if (xhr.responseJSON && xhr.responseJSON.message) {
                                errorMessage += `\n${xhr.responseJSON.message}`;
                            }
                            
                            alert(errorMessage);
                        },
                        complete: function() {
                            // Reset button state
                            $('#confirm_edit').prop('disabled', false).text('Confirm');
                        }
                    });
                });
            })
            .fail(function(error) {
                console.error('Error fetching book data:', error);
                alert("Error loading book data. Please try again.");
            });
    }

    // Create for each section

    function createOrder() {

    $("#create_form").empty();
    $(".create_form_background").css("display", "block");

    $.get(userUrl)
    .done(function(userData) {
        console.log(userData);
        $('#usernames').empty().append('<option value="">-- Select a username --</option>');
        
        if (Array.isArray(userData)) {
            userData.forEach(user => {
                $('#usernames').append(
                    `<option value="${user._id}">${user.first_name} ${user.last_name} (${user._id})</option>`
                );
            });
        }
    })
    .fail(function(error) {
        console.error('Error:', error);
    });

    // Add event click so the username and id gets replaced with the old one
    $(document).off('click', '#add_user').on('click', '#add_user', function() {
        const selectedUserId = $("#usernames").val();
        const selectedText = $("#usernames option:selected").text();
        
        if (!selectedUserId) {
            alert("Please select a user first");
            return;
        }
    
        $('.user-line').remove();
    
        const userHtml = `
            <p class="user-line" data-userid="${selectedUserId}">
                <span class="remove-user" data-userid="${selectedUserId}">&#9747;</span>
                ${selectedText}
            </p>
        `;
        
        $('.item_list').first().append(userHtml);
        $("#usernames").val("");
    });

    // Event lister to remove the user from the Edit order
    $(document).off('click', '.remove-user').on('click', '.remove-user', function(e) {
        e.stopPropagation();
        $(this).closest('.user-line').remove();
    });

    // Repeat functions regarding the books

    $.get(bookUrl)
    .done(function(bookData) {
        console.log(bookData);
        $('#book_titles').empty().append('<option value="">-- Select a book --</option>');
        
        if (Array.isArray(bookData)) {
            bookData.forEach(book => {
                $('#book_titles').append(
                    `<option value="${book._id}">${book.title} (${book._id})</option>`
                );
            });
        }
    })
    .fail(function(error) {
        console.error('Error:', error);
    });


    $(document).off('click', '#add_book').on('click', '#add_book', function() {
        const selectedBookId = $("#book_titles").val();
        const selectedText = $("#book_titles option:selected").text();
        
        if (!selectedBookId) {
            alert("Please select a user first");
            return;
        }
    
        const bookHtml = `
            <p class="book-line" data-bookid="${selectedBookId}">
                <span class="remove-book" data-bookid="${selectedText}">&#9747;</span>
                ${selectedText}
            </p>
        `;
        
        $('.item_list').last().append(bookHtml);
        $("#book_titles").val("");
    });

    $(document).off('click', '.remove-book').on('click', '.remove-book', function(e) {
        e.stopPropagation();
        $(this).closest('.book-line').remove();
    });

    const createOrderHtml = `
        <div class="edit_form_container">
            <h3 class="section_title">Create Order</h3>
            <form id="form_id" class="edit_form" action="#" method="POST">
                
                <div class="form_field">
                    <strong class="field_label">User ID:</strong>
                    <div class="item_list">
                        
                    </div>
                    <div class="input_group">
                        <button type="button" class="add_button" id="add_user">+</button>
                        <select name="usernames" class="form_control" id="usernames">
                            <option value="">-- Select a username --</option>
                            <!-- User options will be populated here -->
                        </select>
                    </div>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Books:</strong>
                    <div class="item_list">
                        
                    </div>
                    <div class="input_group">
                        <button type="button" class="add_button" id="add_book">+</button>
                        <select name="book_titles" class="form_control" id="book_titles">
                            <option value="">-- Select a book title --</option>
                            <!-- Book options will be populated here -->
                        </select>
                    </div>
                </div>
                                                      
                <div class="form_actions">
                    <button type="button" class="confirm_button" id="confirm_create">Confirm</button>
                    <button type="button" class="cancel_button" id="cancel_create">Cancel</button>
                </div>
            </form>
        </div>
    `;

    $('#create_form').append(createOrderHtml);
    

    // API Call
    $(document).off('click', '#confirm_create').on('click', '#confirm_create', function() {

        // Get the selected user
        const userLine = $('.user-line');
        if (userLine.length === 0) {
            alert("Please select a user");
            return;
        }
        const userId = userLine.data('userid');

        // Get all selected books
        const bookIds = $('.book-line').map(function() {
            return $(this).data('bookid');
        }).get();
        
        if (bookIds.length === 0) {
            alert("Please add at least one book");
            return;
        }

        const createData = {
            userId: userId,
            bookIds: bookIds
        };

        $(this).prop('disabled', true).text('Updating...');

        $.ajax({
            url: `${orderUrl}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(createData),
            success: function(response) {
                console.log("Order was created successfully: ", response);
                alert("Order was created successfully!");

                // Hide the create_form
                $(".create_form_background").css("display", "none");
                $("#create_form").empty();

                // Refresh the orderlist
                fetchOrders();
            },
            error: function(xhr, status, error) {
                console.error("Created order failed:", status, error);
                console.error("Response:", xhr.responseText);
                
                let errorMessage = `Error creating order: ${xhr.status} ${xhr.statusText}`;
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage += `\n${xhr.responseJSON.message}`;
                }
                
                alert(errorMessage);
            },
            complete: function() {
                $('#confirm_create').prop('disabled', false).text('Confirm');
            }
        })
    });
} 

function createUser() {
    $("#create_form").empty();
    $(".create_form_background").css("display", "block");

    const createUserHtml = `
        <div class="edit_form_container">
            <h3 class="section_title">Create User</h3>
            <form id="form_id" class="edit_form" action="#" method="POST">
                <div class="form_field">
                    <strong class="field_label">First Name:</strong>
                    <input type="text" class="form_control" id="first_name" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Last Name:</strong>
                    <input type="text" class="form_control" id="last_name" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Phone:</strong>
                    <input type="tel" class="form_control" id="phone" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Email:</strong>
                    <input type="email" class="form_control" id="email" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Password:</strong>
                    <input type="password" class="form_control" id="password" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">Address:</strong>
                    <input type="text" class="form_control" id="address" required>
                </div>
                
                <div class="form_field">
                    <strong class="field_label">ZIP Code:</strong>
                    <input type="text" class="form_control" id="zip" required>
                </div>
                
                <div class="form_actions">
                    <button type="button" class="confirm_button" id="confirm_create">Confirm</button>
                    <button type="button" class="cancel_button" id="cancel_create">Cancel</button>
                </div>
            </form>
        </div>
    `;

    $('#create_form').append(createUserHtml);

    // Cancel button
    $(document).off('click', '#cancel_create').on('click', '#cancel_create', function() {
        $('.create_form_background').css("display", "none");
    });

    // Confirm button
    $(document).off('click', '#confirm_create').on('click', '#confirm_create', function() {
        const userData = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            phone: $('#phone').val(),
            email: $('#email').val(),
            password: $('#password').val(),
            adress: $('#address').val(),
            ZIP: $('#zip').val()
        };

        // Validate required fields
        if (!userData.first_name || !userData.last_name || !userData.phone || 
            !userData.email || !userData.password || !userData.adress || !userData.ZIP) {
            alert("Please fill in all fields");
            return;
        }

        $(this).prop('disabled', true).text('Creating...');

        $.ajax({
            url: userUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                console.log("User created successfully:", response);
                alert("User created successfully!");
                
                $('.create_form_background').css("display", "none");
                fetchUsers();
            },
            error: function(xhr, status, error) {
                console.error("Create failed:", status, error);
                console.error("Response:", xhr.responseText);
                
                let errorMessage = `Error creating user: ${xhr.status} ${xhr.statusText}`;
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage += `\n${xhr.responseJSON.message}`;
                }
                
                alert(errorMessage);
            },
            complete: function() {
                $('#confirm_create').prop('disabled', false).text('Confirm');
            }
        });
    });
}

    function createReview() {
        $("#create_form").empty();
        $(".create_form_background").css("display", "block");
    
        // Populate book dropdown
        $.get(bookUrl)
        .done(function(bookData) {
            $('#book_select').empty().append('<option value="">-- Select a book --</option>');
            if (Array.isArray(bookData)) {
                bookData.forEach(book => {
                    $('#book_select').append(
                        `<option value="${book._id}">${book.title} (${book._id})</option>`
                    );
                });
            }
        })
        .fail(console.error);
    
        // Populate user dropdown
        $.get(userUrl)
        .done(function(userData) {
            $('#user_select').empty().append('<option value="">-- Select a user --</option>');
            if (Array.isArray(userData)) {
                userData.forEach(user => {
                    $('#user_select').append(
                        `<option value="${user._id}">${user.first_name} ${user.last_name} (${user._id})</option>`
                    );
                });
            }
        })
        .fail(console.error);
    
        const createReviewHtml = `
            <div class="edit_form_container">
                <h3 class="section_title">Create Review</h3>
                <form id="form_id" class="edit_form" action="#" method="POST">
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
    
        $('#create_form').append(createReviewHtml);
    
        // Cancel button
        $(document).off('click', '#cancel_create').on('click', '#cancel_create', function() {
            $('.create_form_background').css("display", "none");
        });
    
        // Confirm button
        $(document).off('click', '#confirm_create').on('click', '#confirm_create', function() {
            const bookId = $('#book_select').val();
            const userId = $('#user_select').val();
            const rating = $('#rating').val();
            const comment = $('#comment').val();
    
            if (!bookId || !userId || !rating || !comment) {
                alert("Please fill in all fields");
                return;
            }
    
            const reviewData = {
                bookId: bookId,
                userId: userId,
                rating: rating,
                comment: comment
            };
    
            $(this).prop('disabled', true).text('Creating...');
    
            $.ajax({
                url: reviewUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(reviewData),
                success: function(response) {
                    console.log("Review created successfully:", response);
                    alert("Review created successfully!");
                    
                    $('.create_form_background').css("display", "none");
                    fetchReviews();
                },
                error: function(xhr, status, error) {
                    console.error("Create failed:", status, error);
                    console.error("Response:", xhr.responseText);
                    
                    let errorMessage = `Error creating review: ${xhr.status} ${xhr.statusText}`;
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage += `\n${xhr.responseJSON.message}`;
                    }
                    
                    alert(errorMessage);
                },
                complete: function() {
                    $('#confirm_create').prop('disabled', false).text('Confirm');
                }
            });
        });
    }

    function createBook() {
        $("#create_form").empty();
        $(".create_form_background").css("display", "block");
    
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
    
        $('#create_form').append(createBookHtml);
    
        // Cancel button
        $(document).off('click', '#cancel_create').on('click', '#cancel_create', function() {
            $('.create_form_background').css("display", "none");
        });
    
        // Confirm button
        $(document).off('click', '#confirm_create').on('click', '#confirm_create', function() {
            const bookData = {
                title: $('#title').val(),
                author: $('#author').val(),
                genre: $('#genre').val(),
                price: parseFloat($('#price').val()),
                stock: parseInt($('#stock').val()),
                description: $('#description').val(),
                publishedDate: $('#published_date').val()
            };
    
            // Validate required fields
            if (!bookData.title || !bookData.author || !bookData.genre || 
                isNaN(bookData.price) || isNaN(bookData.stock) || !bookData.description || !bookData.publishedDate) {
                alert("Please fill in all fields with valid values");
                return;
            }
    
            $(this).prop('disabled', true).text('Creating...');
    
            $.ajax({
                url: bookUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(bookData),
                success: function(response) {
                    console.log("Book created successfully:", response);
                    alert("Book created successfully!");
                    
                    $('.create_form_background').css("display", "none");
                    fetchBooks();
                },
                error: function(xhr, status, error) {
                    console.error("Create failed:", status, error);
                    console.error("Response:", xhr.responseText);
                    
                    let errorMessage = `Error creating book: ${xhr.status} ${xhr.statusText}`;
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage += `\n${xhr.responseJSON.message}`;
                    }
                    
                    alert(errorMessage);
                },
                complete: function() {
                    $('#confirm_create').prop('disabled', false).text('Confirm');
                }
            });
        });
    }



    // Event listners for each button

    // Orders
    $(document).off('click', '#order_edit').on('click', '#order_edit', function() {
        console.log("event registered for orders");
        const orderId = $(this).data('order-id');
        editOrder(orderId);
    });

    $(document).off('click', '#order_delete').on('click', '#order_delete', function() {
        console.log("event registered for delete orders");
        const orderId = $(this).data('order-id');
        deleteOrder(orderId);
    });

    $(document).off('click', '#create_order').on('click', '#create_order', function() {
        console.log("event registered for create orders");
        createOrder();
    });

    // Users
    $(document).off('click', '#users_edit').on('click', '#users_edit', function() {
        console.log("Event registered for users!");
        const userId = $(this).data('users-id');
        editUser(userId);
    });

    $(document).off('click', '#users_delete').on('click', '#users_delete', function() {
        console.log("Event registered for delete users!");
        const userId = $(this).data('users-id');
        deleteUser(userId);
    });

    $(document).off('click', '#create_user').on('click', '#create_user', function() {
        console.log("Event registered for create users!");
        createUser();
    });

    // Books
    $(document).off('click', '#book_edit').on('click', '#book_edit', function() {
        console.log("Event registered for books!");
        const bookId = $(this).data('book-id');
        console.log(bookId);
        editBook(bookId);
    });

    $(document).off('click', '#book_delete').on('click', '#book_delete', function() {
        console.log("Event registered for delete books!");
        const bookId = $(this).data('book-id');
        deleteBook(bookId);
    });

    $(document).off('click', '#create_book').on('click', '#create_book', function() {
        console.log("Event registered for create books!");
        createBook();
    });

    // Reviews
    $(document).off('click', '#review_edit').on('click', '#review_edit', function() {
        console.log("Event registered for reviews!");
        const reviewId = $(this).data('review-id');
        editReview(reviewId);
    });

    $(document).off('click', '#review_delete').on('click', '#review_delete', function() {
        console.log("Event registered for delete reviews!");
        const reviewId = $(this).data('review-id');
        deleteReview(reviewId);
    });

    $(document).off('click', '#create_review').on('click', '#create_review', function() {
        console.log("Event registered for create reviews!");
        createReview();
    });
});