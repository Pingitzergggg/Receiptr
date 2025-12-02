type requestType = {
    login : {
        request: {
            email : string,
            password : string
        },
        response : {
            status : string,
            value : string
        } 
    },

    register : {
        request: {
            name : string,
            email : string,
            phone : string,
            countryCode : number,
            password : string
        },
        response : {
            status : string,
            value : string
        } 
    },

    fetch_user_data : {
        request: {
            id: number
        },
        response : {
            status : string,
            value : string
        } 
    },

    fetch_card_data : {
        request: {
            id: number
        },
        response : {
            status : string,
            value : string
        } 
    },

    fetch_receipt_data : {
        request: {
            id: number
        },
        response : {
            status : string,
            value : string
        } 
    },

    fetch_binary_data : {
        request: {
            id: number
        },
        response : {
            status : string,
            value : string
        } 
    },

    insert_user_data : {
        request: {
            name : string,
            email : string,
            phone : string,
            countryCode : number,
            password : string,
            userId : number
        },
        response : {
            status : string,
            value : string
        } 
    }

    insert_user_card_data : {
        request : {
            name : string,
            number : string,
            expiryDate : string,
            userId: number
        },
        response : {
            status : string,
            value : string
        }
    },

    insert_user_receipt_data : {
        request : {
            title : string,
            cardId: number,
            userId: number,
            value: Blob
        },
        response : {
            status : string,
            value : string
        }
    }
}

async function requestResource<currentType extends keyof requestType> (
    enpoint : currentType,
    body : requestType[currentType]['request']
) : Promise<requestType[currentType]['response'] | null> {
    try {
        const request = await fetch(`https://pgapi.ddns.net/receiptr/${enpoint}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S"
            }, 
            body: JSON.stringify(body)
        });

        if (!request.ok) throw "REQUEST_ERROR: Connection problem occured...";

        return await request.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default requestResource;