import { Ticket } from './ticket';
import { PaymentProxy } from './event';

export class ReservationInfo {
    id: string;
    shortId: string;
    firstName: string;
    lastName: string;
    email: string;
    validity: number;
    ticketsByCategory: TicketsByTicketCategory[];
    orderSummary: OrderSummary;

    //
    status: ReservationStatus;
    validatedBookingInformation: boolean;
    //
    formattedExpirationDate: {[key: string]: string};
    //

    //
    invoiceNumber: string;
    invoiceRequested: boolean;
    invoiceOrReceiptDocumentPresent: boolean;
    paid: boolean;
    //
    tokenAcquired: boolean;
    paymentProxy: PaymentProxy;
    //
    addCompanyBillingDetails: boolean;
    customerReference: string;
    skipVatNr: boolean;

    billingAddress: string;
    //
    billingDetails: BillingDetails;

    // group related info
    containsCategoriesLinkedToGroups: boolean;
    //
}

export class ReservationStatusInfo {
    status: ReservationStatus;
    validatedBookingInformation: boolean;
}

export class TicketsByTicketCategory {
    name: string;
    tickets: Ticket[];
}

export class OrderSummary {
    summary: SummaryRow[];
    totalPrice: string;
    free: boolean;
    displayVat: boolean;
    priceInCents: number;
    descriptionForPayment: string;
    totalVAT: string;
    vatPercentage: string;
}

export class SummaryRow {
    name: string;
    amount: number;
    price: string;
    subTotal: string;
}

export type ReservationStatus = 'PENDING' | 'IN_PAYMENT' | 'EXTERNAL_PROCESSING_PAYMENT' |
                                'WAITING_EXTERNAL_CONFIRMATION' | 'OFFLINE_PAYMENT' |
                                'COMPLETE' | 'STUCK' | 'CANCELLED' | 'CREDIT_NOTE_ISSUED' | 'NOT_FOUND';

export type ItalianEInvoicingReferenceType = 'ADDRESSEE_CODE' | 'PEC' | 'NONE';

export interface BillingDetails {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  zip: string;
  city: string;
  country: string;
  taxId: string;
  invoicingAdditionalInfo: TicketReservationInvoicingAdditionalInfo;
}

export interface TicketReservationInvoicingAdditionalInfo {
  italianEInvoicing: ItalianEInvoicing;

}

export interface ItalianEInvoicing {
  referenceType: ItalianEInvoicingReferenceType;
  fiscalCode: string;
  addresseeCode: string;
  pec: string;
  /**
   * either addressee code, pec, or null
   */
  reference: string;
}
