import type { Order } from "@/types/order";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export type CreateOrderRequest = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  items: {
    productId: string;
    quantity: number;
  }[];

  fulfillment: {
    method: "delivery" | "pickup";

    address?: {
      address: string;
      city: string;
      area: string;
    };
  };

  payment: {
    method:
      | "card"
      | "bank-transfer"
      | "pickup";
  };

  notes?: string;
};

export async function createOrder(
  input: CreateOrderRequest
): Promise<Order> {
  if (!API_BASE_URL) {
    throw new Error(
      "Order API is not configured."
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(
      () => null
    );

    throw new Error(
      error?.message ||
        "Unable to create your order."
    );
  }

  return response.json();
}