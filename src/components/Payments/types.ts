export interface IPayment {
  name: string;
  amount: number;
  date: string;
  paymentCategory: {
    id: number;
    name: string;
  };
}

export interface PaymentsProps {
  predefinedPaymentNames: string[];
  payments: IPayment[];
}

interface IUsePaymentResponse {
  loading: boolean;
  error?: Error;
}

export interface IUsePaymentQuery extends IUsePaymentResponse {
  userPayments: IPayment[];
}

export interface IUsePaymentMutationCreate extends IUsePaymentResponse {
  addPayment: (
    amount: number,
    name: string,
    paymentCategoryId: number
  ) => Promise<void>;
}
