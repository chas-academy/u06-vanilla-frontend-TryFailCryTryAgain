import { Users } from '../../models/userModel.js';
import { userUrl } from "../utils/Urls.js";
import { fetchUsers } from '../fetch/fetchUsers.js';

export async function editUser(userId: string): Promise<void> {
    const specificUserUrl = `${userUrl}/id/${userId}`;
    const updateUserUrl = `${userUrl}${userId}`;

    try {
        const response = await fetch(specificUserUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Users = await response.json();
        console.log(data);

        const createForm = document.getElementById('create_form');
        const formBackground = document.querySelector('.create_form_background') as HTMLElement;
        
        if (!createForm || !formBackground) return;

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

        document.getElementById('cancel_edit')?.addEventListener('click', () => {
            formBackground.style.display = 'none';
        });

        document.getElementById('confirm_edit')?.addEventListener('click', async () => {
            const confirmButton = document.getElementById('confirm_edit') as HTMLButtonElement;
            
            const updateData: {
                first_name: string;
                last_name: string;
                phone: string;
                email: string;
                adress: string;
                ZIP: string;
                password?: string;
            } = {
                first_name: (document.getElementById('first_name') as HTMLInputElement).value,
                last_name: (document.getElementById('last_name') as HTMLInputElement).value,
                phone: (document.getElementById('phone') as HTMLInputElement).value,
                email: (document.getElementById('email') as HTMLInputElement).value,
                adress: (document.getElementById('address') as HTMLInputElement).value,
                ZIP: (document.getElementById('zip') as HTMLInputElement).value
            };

            const newPassword = (document.getElementById('password') as HTMLInputElement).value;
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
                const updateResponse = await fetch(updateUserUrl, {
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
                console.log("User updated successfully:", responseData);
                alert("User updated successfully!");
                
                formBackground.style.display = 'none';
                
                fetchUsers();
            } catch (error) {
                console.error("Update failed:", error);
                alert(`Error updating user: ${error instanceof Error ? error.message : String(error)}`);
            } finally {
                confirmButton.disabled = false;
                confirmButton.textContent = 'Confirm';
            }
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        alert("Error loading user data. Please try again.");
    }
}