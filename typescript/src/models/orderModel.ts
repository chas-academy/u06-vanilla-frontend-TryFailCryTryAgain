export interface Order {
    _id: string;
    userId: string;
    bookIds: string[];
    orderDate: string | Date;
    status: string;
    totalAmount: number;
}