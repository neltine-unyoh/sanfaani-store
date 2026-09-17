import type { CartItem } from "@/components/commerce/CartProvider";
import type {
  FulfillmentMethod,
  Order,
  OrderCustomer,
  OrderAddress,
  PaymentMethod,
} from "@/types/order";

type CreateOrderInput = {
  customer: OrderCustomer;
  items: CartItem[];
  fulfillment: FulfillmentMethod;
  address?: OrderAddress;
  paymentMethod: PaymentMethod;
  notes?: string;
};

export function createPendingOrder(
  input: CreateOrderInput
): Order {
  const now = new Date();

  const orderId = crypto.randomUUID();

  const orderNumber = `SAN-${now.getFullYear()}-${String(
    now.getTime()
  ).slice(-6)}`;

  const orderItems = input.items.map((item) => ({
    productId: item.product.id,
    name: item.product.name,
    category: item.product.category,
    condition: item.product.condition,
    quantity: item.quantity,
    unitPrice: item.product.price,
    totalPrice: item.product.price * item.quantity,
  }));

  const subtotal = orderItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return {
    id: orderId,

    orderNumber,

    customer: input.customer,

    items: orderItems,

    fulfillment: {
      method: input.fulfillment,
      address: input.address,
    },

    payment: {
      method: input.paymentMethod,
      status: "pending",
    },

    subtotal,

    deliveryFee: 0,

    total: subtotal,

    notes: input.notes,

    status: "pending_payment",

    createdAt: now.toISOString(),
  };
}