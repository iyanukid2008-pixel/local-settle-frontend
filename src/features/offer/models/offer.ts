import { PaymentMethodOption } from "../../paymentMethod/models/paymentMethod";

export interface Offer {
    offerId: string,
    creatorId: string,
    type: string,
    assetCode: string,
    price: string,
    minAmount: string,
    maxAmount: string,
    status: string,
    executed?: boolean,
    /** Server-calculated amount still available after open orders reserve capacity. */
    remainingCapacity?: string | number | null,
    payment_methods?: PaymentMethodOption[],
    paymentMethods?: PaymentMethodOption[]
}