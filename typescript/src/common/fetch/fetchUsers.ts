import { Users } from '../../models/userModel.js';
import { userUrl } from "../utils/Urls.js";
import { editUser } from '../edit/editUser.js';
import { deleteUser } from '../delete/deleteUser.js';

export async function fetchUsers(): Promise<void> {
    try {
        const response = await fetch(userUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Users[] = await response.json();
        console.log(data);

        const mainNode = document.getElementById('users_container');
        if (!mainNode) return;

        mainNode.innerHTML = data.map(Users => `
            <div class="users_info">
                <p><strong>User ID:</strong> ${Users._id}</p>
                <p><strong>First Name:</strong> ${Users.first_name}</p>
                <p><strong>Last Name:</strong> ${Users.last_name}</p>
                <p><strong>Phone:</strong> ${Users.phone}</p>
                <p><strong>Email:</strong> ${Users.email}</p>
                <p><strong>Password:</strong> ${Users.password} units</p>
                <p><strong>Adress:</strong> ${Users.adress} </p>
                <p><strong>ZIP:</strong> ${Users.ZIP} </p>
            </div>
            <div class="users_button">
                <button class="users_edit" id="users_edit" data-users-id="${Users._id}">Edit</button>
                <button class="users_delete" id="users_delete" data-users-id="${Users._id}">Delete</button>
            </div>
        `).join('');

        document.querySelectorAll('.users_edit').forEach(button => {
            button.addEventListener('click', (e) => handleUserEdit(e));
        });
        
        document.querySelectorAll('.users_delete').forEach(button => {
            button.addEventListener('click', (e) => handleUserDelete(e));
        });

    } catch (error) {
        console.error('Error fetch Users: ', error);
    }

    function handleUserEdit(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const userID = button.dataset.usersId;

        if (!userID) {
            console.error('User ID is undefined!');
            return;
        }

        console.log('Edit User:', userID);
        editUser(userID);
    }

    function handleUserDelete(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const userID = button.dataset.usersId;

        if (!userID) {
            console.error(`User ID is undefined!`);
            return;
        }
        console.log('Delete User:', userID);
        deleteUser(userID);
    }
}