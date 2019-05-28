import { TicketCategory } from './ticket-category';
import { AdditionalService } from './additional-service';

export class ItemsByCategory {

    ticketCategories: TicketCategory[];
    additionalServices: AdditionalService[];

    waitingList: boolean;
    preSales: boolean;
}