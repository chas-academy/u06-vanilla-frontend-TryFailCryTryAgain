var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { orderUrl } from './Urls.js';
export function first_fetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(orderUrl);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = yield response.json();
            console.log(json);
            // Clears up the dummy data that was used before the dynamic real data is inserted!
            const MainNode = document.getElementById("order_container");
            while (MainNode === null || MainNode === void 0 ? void 0 : MainNode.firstChild) {
                MainNode.removeChild(MainNode.lastChild);
            }
            const SubNode = document.createElement('p');
            SubNode.textContent = 'Hello World!';
            MainNode === null || MainNode === void 0 ? void 0 : MainNode.appendChild(SubNode);
        }
        catch (error) {
            console.error("Error", error);
        }
    });
}
export function fetchOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(orderUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            const mainNode = document.getElementById('order_container');
            if (!mainNode)
                return;
            mainNode.innerHTML = data.map(order => `
            <div class="order_info">
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>User ID:</strong> ${order.userId}</p>
                <p><strong>Books:</strong> ${order.bookIds.map(bookId => `<span>${bookId}</span>`).join(' ')}</p>
                <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
            </div>
            <div class="order_button">
                <button class="order_edit" data-order-id="${order._id}">Edit</button>
                <button class="order_delete" data-order-id="${order._id}">Delete</button>
            </div>
        `).join('');
            // Add event listeners (separate function recommended for production)
        }
        catch (error) {
            console.error('Error fetching orders:', error);
            // Consider showing user feedback in UI
        }
    });
}
