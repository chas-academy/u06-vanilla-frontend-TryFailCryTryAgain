import { userUrl } from "../utils/Urls.js";
import { fetchUsers } from "../fetch/fetchUsers.js";

export async function deleteUser(userId: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this user?")) {
        return;
    }

    try {
        const response = await fetch(`${userUrl}${userId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("User deleted successfully:", responseData);
        alert("User deleted successfully!");
        fetchUsers();
    } catch (error) {
        console.error("Delete failed:", error);
        alert(`Error deleting user: ${error instanceof Error ? error.message : String(error)}`);
    }
}