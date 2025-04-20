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
export function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }
        try {
            const response = yield fetch(`${userUrl}${userId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const responseData = yield response.json();
            console.log("User deleted successfully:", responseData);
            alert("User deleted successfully!");
            fetchUsers();
        }
        catch (error) {
            console.error("Delete failed:", error);
            alert(`Error deleting user: ${error instanceof Error ? error.message : String(error)}`);
        }
    });
}
