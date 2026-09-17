export type FulfillmentMethod = "delivery" | "pickup";

export type PaymentMethod =
  | "card"
  | "bank-transfer"
  | "pickup";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "processing"
  | "ready_for_pickup"
  | "dispatched"
  | "delivered"
  | "completed"
  | "cancelled"
  | "returned"
  | "refunded";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "paid"
  | "failed"
  | "refunded";

export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type OrderAddress = {
  address: string;
  city: string;
  area: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  category: string;
  condition: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Order = {
  id: string;
  orderNumber: string;

  customer: OrderCustomer;

  items: OrderItem[];

  fulfillment: {
    method: FulfillmentMethod;
    address?: OrderAddress;
  };

  payment: {
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
  };

  subtotal: number;
  deliveryFee: number;
  total: number;

  notes?: string;

  status: OrderStatus;

  createdAt: string;
};