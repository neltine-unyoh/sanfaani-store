export type PaymentProvider =
  | "flutterwave"
  | "bank-transfer"
  | "pay-on-pickup";

export type PaymentIntentStatus =
  | "created"
  | "pending"
  | "processing"
  | "successful"
  | "failed"
  | "cancelled";

export type PaymentIntent = {
  id: string;
  orderId: string;
  orderNumber: string;

  provider: PaymentProvider;

  amount: number;
  currency: "XAF";

  status: PaymentIntentStatus;

  checkoutUrl?: string;
  transactionId?: string;

  createdAt: string;
};

export type CreatePaymentIntentInput = {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: "XAF";
  provider: PaymentProvider;
};

export type PaymentVerificationResult = {
  verified: boolean;

  transactionId?: string;

  status:
    | "successful"
    | "pending"
    | "failed"
    | "cancelled";

  message?: string;
};