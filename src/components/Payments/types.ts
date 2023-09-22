export type Payment = {
  name: string;
  amount: number;
};

export type PaymentsProps = {
  predefinedPaymentNames: string[];
  payments: Payment[];
};
