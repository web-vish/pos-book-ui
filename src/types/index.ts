export interface EventsParam {
    ID: number;
    Action?: string;
    Account: string ;
    Security: string;
    Quantity?: number;
    EventID?: number;
}

export interface PositionSummaryParam {
    ID: number;
    Account: string;
    Security: string;
    Quantity: number;
    Events?: EventsParam[];
}

export type PageType = "Buy" | "Sell" | "Cancel";

export interface FormValues {
    [key:string]: string;

}

export interface SubmitEventsParam {
    Events: EventsParam[];
}


