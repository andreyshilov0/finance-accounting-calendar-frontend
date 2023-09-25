export interface Payment {
  name: string;
  amount: number;
};

export interface PaymentsProps {
  predefinedPaymentNames: string[];
  payments: Payment[];
};
