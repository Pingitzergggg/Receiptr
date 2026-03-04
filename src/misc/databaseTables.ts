export type cards = {
    id: number,
    title: string,
    currency: string,
    type: "Mastercard" | "Amex" | "Visa" | "Discover",
    color: string,
    class: string
    total_receipts: number,
    total_spent: number
};

export type classes = {
    id: number,
    title: string,
    color: string,
    total_cards: number,
    total_receipts: number,
};

export type receipts = {
    id: number,
    title: string,
    fileSize: number,
    fileMeasurementUnit: "MiB" | "KiB",
    price: number,
    currency: string,
    store: string,
    purchased_at: Date,
    color: string,
    card: string,
    class: string,
};

export type user = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    countryCode: string
};
