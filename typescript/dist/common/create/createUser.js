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
import { fetchUsers } from "../fetch/fetchUsers.js";
export function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const createForm = document.getElementById('create_form');
        const formBackground = document.querySelector('.create_form_background');
        if (!createForm || !formBackground)
            return;
        createForm.innerHTML = '';
        formBackground.style.display = 'block';
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
        createForm.insertAdjacentHTML('beforeend', createUserHtml);
        (_a = document.getElementById('cancel_create')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            formBackground.style.display = 'none';
        });
        (_b = document.getElementById('confirm_create')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            const confirmButton = document.getElementById('confirm_create');
            const userData = {
                first_name: document.getElementById('first_name').value,
                last_name: document.getElementById('last_name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                adress: document.getElementById('address').value,
                ZIP: document.getElementById('zip').value
            };
            if (!userData.first_name || !userData.last_name || !userData.phone ||
                !userData.email || !userData.password || !userData.adress || !userData.ZIP) {
                alert("Please fill in all fields");
                return;
            }
            confirmButton.disabled = true;
            confirmButton.textContent = 'Creating...';
            try {
                const response = yield fetch(userUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const responseData = yield response.json();
                console.log("User created successfully:", responseData);
                alert("User created successfully!");
                formBackground.style.display = 'none';
                fetchUsers();
            }
            catch (error) {
                console.error("Create failed:", error);
                alert(`Error creating user: ${error instanceof Error ? error.message : String(error)}`);
            }
            finally {
                confirmButton.disabled = false;
                confirmButton.textContent = 'Confirm';
            }
        }));
    });
}
