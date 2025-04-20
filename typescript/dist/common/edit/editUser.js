var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userUrl } from "../utils/Urls.js";
import { fetchUsers } from '../fetch/fetchUsers.js';
export function editUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const specificUserUrl = `${userUrl}/id/${userId}`;
        const updateUserUrl = `${userUrl}${userId}`;
        try {
            const response = yield fetch(specificUserUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            const createForm = document.getElementById('create_form');
            const formBackground = document.querySelector('.create_form_background');
            if (!createForm || !formBackground)
                return;
            createForm.innerHTML = '';
            formBackground.style.display = 'block';
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
            createForm.insertAdjacentHTML('beforeend', editUserHtml);
            (_a = document.getElementById('cancel_edit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
                formBackground.style.display = 'none';
            });
            (_b = document.getElementById('confirm_edit')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                const confirmButton = document.getElementById('confirm_edit');
                const updateData = {
                    first_name: document.getElementById('first_name').value,
                    last_name: document.getElementById('last_name').value,
                    phone: document.getElementById('phone').value,
                    email: document.getElementById('email').value,
                    adress: document.getElementById('address').value,
                    ZIP: document.getElementById('zip').value
                };
                const newPassword = document.getElementById('password').value;
                if (newPassword) {
                    updateData.password = newPassword;
                }
                if (!updateData.first_name || !updateData.last_name || !updateData.phone ||
                    !updateData.email || !updateData.adress || !updateData.ZIP) {
                    alert("Please fill in all required fields");
                    return;
                }
                confirmButton.disabled = true;
                confirmButton.textContent = 'Updating...';
                try {
                    const updateResponse = yield fetch(updateUserUrl, {
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
                    console.log("User updated successfully:", responseData);
                    alert("User updated successfully!");
                    formBackground.style.display = 'none';
                    fetchUsers();
                }
                catch (error) {
                    console.error("Update failed:", error);
                    alert(`Error updating user: ${error instanceof Error ? error.message : String(error)}`);
                }
                finally {
                    confirmButton.disabled = false;
                    confirmButton.textContent = 'Confirm';
                }
            }));
        }
        catch (error) {
            console.error('Error fetching user data:', error);
            alert("Error loading user data. Please try again.");
        }
    });
}
