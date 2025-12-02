export async function login(email : string, password : string) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getUserData(userId : number) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/fetch_user_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify({
                id: userId
            })
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getCardData(userId : number) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/fetch_card_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify({
                id: userId
            })
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export async function getReceiptData(userId : number) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/fetch_receipt_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify({
                id: userId
            })
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

type registerType = {
    name : string,
    email : string,
    phone : string,
    countryCode : number,
    password : string
}
export async function register(data : registerType) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify(data)
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

type setCardType = {
    name : string,
    number : string,
    expiryDate : string,
    userId: number
}
export async function setCard(data : setCardType) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/insert_user_card_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify(data)
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

type setReceiptType = {
    title : string,
    cardId: number,
    userId: number,
    value: Blob
}
export async function setReceipt(data : setReceiptType) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/insert_user_receipt_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify(data)
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

type setUserType = {
    name : string,
    email : string,
    phone : string,
    countryCode : number,
    password : string,
    userId : number
}
export async function setUser(data : setUserType) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/insert_user_data', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            },
            body: JSON.stringify(data)
        });
        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

type test = {
    id: number,
    name: string,
    isBoolean: boolean,
    value: number
};
export async function testerMethod() : Promise<test[] | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/test/tester');
        if (!request.ok) throw "ERROR_REQUEST: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

