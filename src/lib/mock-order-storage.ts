import type { Order } from "@/types/order";
import type { PaymentIntent } from "@/types/payment";

const ORDER_KEY = "sanfaani_current_order";
const ORDERS_KEY = "sanfaani_orders";
const PAYMENT_KEY = "sanfaani_current_payment";

export function saveMockOrder(order: Order) {
  if (typeof window === "undefined") return;

  // Save as the current order
  localStorage.setItem(ORDER_KEY, JSON.stringify(order));

  // Save/update order history
  const existingOrders = getMockOrders();

  const alreadyExists = existingOrders.some(
    (item) => item.id === order.id
  );

  const updatedOrders = alreadyExists
    ? existingOrders.map((item) =>
        item.id === order.id ? order : item
      )
    : [order, ...existingOrders];

  localStorage.setItem(
    ORDERS_KEY,
    JSON.stringify(updatedOrders)
  );
}

export function getMockOrder(): Order | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(ORDER_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function getMockOrders(): Order[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(ORDERS_KEY);

  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function getMockOrderById(
  orderId: string
): Order | null {
  const orders = getMockOrders();

  return (
    orders.find((order) => order.id === orderId) ?? null
  );
}

export function saveMockPayment(payment: PaymentIntent) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    PAYMENT_KEY,
    JSON.stringify(payment)
  );

  // Keep the mock order synchronized with successful payment.
  if (payment.status === "successful") {
    const order = getMockOrder();

    if (order && order.id === payment.orderId) {
      const updatedOrder: Order = {
        ...order,
        status: "processing",
        payment: {
          ...order.payment,
          status: "paid",
          transactionId: payment.transactionId,
        },
      };

      saveMockOrder(updatedOrder);
    }
  }
}

export function getMockPayment(): PaymentIntent | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(PAYMENT_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearMockCheckout() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(ORDER_KEY);
  localStorage.removeItem(PAYMENT_KEY);
}