import type {
  PaymentIntent,
  PaymentVerificationResult,
} from "@/types/payment";

type MockPaymentInput = {
  orderId: string;
  orderNumber: string;
  amount: number;
  paymentMethod:
    | "card"
    | "bank-transfer"
    | "pickup";
};

export function createMockPayment(
  input: MockPaymentInput
): PaymentIntent {
  const now = new Date();

  const transactionId = `TXN-${Date.now()}`;

  return {
    id: `PAY-${Date.now()}`,
    orderId: input.orderId,
    orderNumber: input.orderNumber,

    provider:
      input.paymentMethod === "card"
        ? "flutterwave"
        : input.paymentMethod === "bank-transfer"
        ? "bank-transfer"
        : "pay-on-pickup",

    amount: input.amount,
    currency: "XAF",

    status: "created",

    transactionId,

    createdAt: now.toISOString(),
  };
}

export async function processMockPayment(
  payment: PaymentIntent
): Promise<PaymentVerificationResult> {
  await new Promise((resolve) =>
    setTimeout(resolve, 1800)
  );

  return {
    verified: true,
    transactionId: payment.transactionId,
    status: "successful",
    message: "Payment completed successfully.",
  };
}