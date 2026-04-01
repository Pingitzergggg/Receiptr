export type responseType = {
    error: {
        error: string,
        toDisplay: boolean
    },
    trash: {
        id: number,
        title: string
    }[],
    user: {
        username: string,
        email: string,
        email_verified: boolean,
        phone: string
    },
    login: {
        content: responseType['user'],
        token: string,
        device: string,
    },
    receipts: {
        query: {
            id: number,
            title: string,
            size: number,
            unit: "MiB" | "KiB",
            price: number,
            currency: string,
            store: string,
            purchased_at: string,
            color?: string,
            card?: string,
            category?: string,
            category_id: number|null,
            card_id: number|null,
        }[],
        last_page: boolean,
        filters: string
    },
    cards: {
        query: {
            id: number,
            title: string,
            currency: string,
            type: "Mastercard" | "Amex" | "Visa" | "Discover" | null,
            color?: string,
            category?: string,
            category_id: number|null,
            total_receipts: number,
            total_spent: number
        }[],
        last_page: boolean,
        filters: string
    },
    categories: {
        query: {
            id: number,
            title: string,
            color?: string,
            total_cards: number,
            total_receipts: number,
        }[],
        last_page: boolean,
        filters: string
    },
    binary: {
        value: any
    }
}

export type paginatable = Omit<responseType, 'user'>;

export type requestType = {
    empty: null
    login: {
        email: string,
        password: string
    }
    register: {
        first_name: string,
        last_name: string,
        email: string,
        phone?: string,
        country_code?: string,
        password: string,
        confirm_password: string,
    },
    receipt: {
        title: string,
        price: number,
        currency: string,
        store?: string,
        purchased_at?: string,
        value: FormData,
        license_id?: number,
        binding_id?: number,
        card_id?: number
    },
    card: {
        title: string,
        currency: string,
        number: string,
        expiry: string,
        cvc: number,
        bank?: string,
        name: string,
        type: "Mastercard" | "Amex" | "Visa" | "Discover" | null,
        binding_id: number | null
    },
    category: {
        title: string,
        color?: string
    }
}