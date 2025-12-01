export async function getUserData(userId : number) : Promise<Object | null> {
    try {
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/user', {
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
        const request = await fetch('https://pgapi.ddns.net/api/receiptr/cards', {
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