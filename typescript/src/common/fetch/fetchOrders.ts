import { Order } from '../../models/orderModel.js';
import { orderUrl } from '../utils/Urls.js';
import { editOrder } from '../edit/editOrder.js';
import { deleteOrder } from '../delete/deleteOrder.js';

export async function fetchOrders(): Promise<void> {
    try {
        const response = await fetch(orderUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Order[] = await response.json();
        console.log(data);
        
        const mainNode = document.getElementById('order_container');
        if (!mainNode) return;

        mainNode.innerHTML = data.map(order => `
            <div class="order_info">
                <p><strong>Order ID:</strong> ${order._id}</p>
                <p><strong>User ID:</strong> ${order.userId}</p>
                <p><strong>Books:</strong> ${
                    order.bookIds.map(bookId => `<span>${bookId}</span>`).join(' ')
                }</p>
                <p><strong>Order Date:</strong> ${
                    new Date(order.orderDate).toLocaleString()
                }</p>
                <p><strong>Status:</strong> ${order.status}</p>
                <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
            </div>
            <div class="order_button">
                <button class="order_edit" data-order-id="${order._id}">Edit</button>
                <button class="order_delete" data-order-id="${order._id}">Delete</button>
            </div>
        `).join('');

        // Add event listeners (separate function recommended for production)
        document.querySelectorAll('.order_edit').forEach(button => {
            button.addEventListener('click', (e) => handleEdit(e));
        });
        
        document.querySelectorAll('.order_delete').forEach(button => {
            button.addEventListener('click', (e) => handleDelete(e));
        });

    } catch (error) {
        console.error('Error fetching orders:', error);
        // Consider showing user feedback in UI
    }

    function handleEdit(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const orderId = button.dataset.orderId;

        if (!orderId) {
            console.error('Order ID is undefined');
            return;
        }
        console.log('Edit order:', orderId);
        editOrder(orderId);
    }

    function handleDelete(event: Event): void {
        const button = event.target as HTMLButtonElement;
        const orderId = button.dataset.orderId;

        if (!orderId) {
            console.error('Order ID is undefined');
            return;
        }

        console.log('Delete order:', orderId);
        deleteOrder(orderId);
    }
}