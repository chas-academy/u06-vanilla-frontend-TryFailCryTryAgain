import { orderUrl } from "../utils/Urls.js";
import { fetchOrders } from "../fetch/fetchOrders.js";

export async function deleteOrder(orderId: string): Promise<void> {
    if (!confirm("Are you sure you want to delete this order?")) {
        return;
    }

    try {
        const response = await fetch(`${orderUrl}${orderId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Order deleted successfully:", responseData);
        alert("Order deleted successfully!");
        fetchOrders();
    } catch (error) {
        console.error("Delete failed:", error);
        alert(`Error deleting order: ${error instanceof Error ? error.message : String(error)}`);
    }
}