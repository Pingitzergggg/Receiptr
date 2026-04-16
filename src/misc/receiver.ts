import type {paginatable, responseType} from "./databaseTables"

// export const domainUrl: string = 'https://pgapi.ddns.net';
export const domainUrl: string = 'http://localhost:8000';

export type methods = "GET" | "POST" | "PUT" | "DELETE";
export type endpoints = "user" | "cards" | "categories" | "receipts" | "archive" | "login" | "register" | "logout" | "wipeout";

export type response<T extends keyof responseType> = {
    status: number;
    content?: keyof responseType[T]
}

export async function verifyCaptcha(token: string): Promise<boolean> {

    const response = await fetch("https://pgapi.ddns.net/api/receiptr/verify-captcha", {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(token)
    });

    const data: responseType['reCAPTCHA'] = await response.json();
    if (response.status >= 400) {
        const value: responseType['error'] = data as unknown as responseType['error'];
        // @ts-ignore
        throw new WebTransportError({message: value.error, streamErrorCode: response.status});
    }
    return data.success;
}

export async function loadResource<T extends keyof paginatable>(resource: "cards"|"categories"): Promise<paginatable[T] | null> {
    const session : string | null = sessionStorage.getItem(resource);
    if (session) {
        const data : paginatable[T] = JSON.parse(sessionStorage.getItem(resource)!);
        return data;
    } else {
        const response: response<T> = await requestResource<T>(resource, 'GET');
        const data: paginatable[T] | null = await extractResponse<T>(response);
        if (data) {
            sessionStorage.setItem(resource, JSON.stringify(data));
            return data;
        }
        return null;
    }
}

export async function sendFileForm(data: FormData): Promise<boolean> {
    const response = await fetch(domainUrl+'/api/receiptr/receipts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('receiptr-token') ?? null}`,
            'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
        }, body: data
    });
    if (response.status === 401) await authenticate();
    await extractResponse(response);
    return response.ok;
}

export async function requestFile(id: number, barcodeMode: boolean = false): Promise<Blob>{
    const response = await fetch(`${domainUrl}/api/receiptr/receipts/${id}${barcodeMode ? '?barcode' : ''}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('receiptr-token') ?? null}`,
            'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
        }
    });
    if (response.status === 401) await authenticate();
    if (!response.ok) throw Error('Request failed');
    return await response.blob();
}

export async function requestResource<O extends keyof responseType>(
    endpoint: endpoints,
    method: methods,
    urlParam?: string | number | null,
    queryParam?: string | null,
    body?: any
): Promise<response<O>> {
    try {
        console.log(domainUrl+`/api/receiptr/${endpoint}${urlParam ? "/"+urlParam : ""}${queryParam ? "?"+queryParam : ""}`);
        const request = await fetch(domainUrl+`/api/receiptr/${endpoint}${urlParam ? "/"+urlParam : ""}${queryParam ? "?"+queryParam : ""}`, {
            method: method,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('receiptr-token') ?? null}`,
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
                'X-DEVICE-KEY': localStorage.getItem('device-key') ?? ''
            },
            body: body ? JSON.stringify(body) : null
        });

        const data = await request.json();
        if (!request.ok) return {content: data, status: request.status};

        if ("user" === endpoint && "GET" === method) {
            console.log("creating session...");
            sessionStorage.setItem('user', JSON.stringify(data));
        }
        if (/login|register/.test(endpoint) && method === "POST") {
            sessionStorage.setItem('user', JSON.stringify(data.content));
            localStorage.setItem('receiptr-token', data.token);
            localStorage.setItem('device-key', data.device);
        }

        return {status: request.status, content: data};
    } catch (err) {
        console.error(err);
        return {status: -1};
    }
}

export async function extractResponse
<T extends keyof responseType>(response: response<T>)
    : Promise<responseType[T] | null> {
        if (response.status === -1) throw SyntaxError("CLIENT ERROR: Failed to send request!")
        if (response.status > 299) {
            const value: responseType['error'] = response.content as unknown as responseType['error'];
            if (value.toDisplay) {
                //@ts-ignore
                throw new WebTransportError({message: value.error, streamErrorCode: response.status});
            } else if (response.status === 401 && !(await authenticate())) {
                throw ReferenceError("AUTHENTICATION ERROR: User is not authenticated!")
            } else {
                throw Error('UNSUCCESSFUL REQUEST!');
            }
        }
        if (response.content && typeof response.content === "object") {
            return response.content;
        }
        return null;
}

export async function paginate<T extends keyof paginatable>(endpoint: endpoints, offset: number, filter?: string): Promise<paginatable[T] | null> {
    const response: response<T> = await requestResource<T>(endpoint, "GET", null, `cursor=${offset}`+`${filter ? '&'+filter : ''}`);
    const value: responseType[T] | null = await extractResponse<T>(response);
    if (!value) return null;
    const session: string | null = sessionStorage.getItem(endpoint);
    let arr: paginatable[T] = session ? JSON.parse(session) : {query: [], last_page: false};
    console.log(`FILTER: ${filter}`)
    console.log(value);
    if (offset === 0) {
        arr = {...value, filters: filter ? filter : ''}
    } else {
        // @ts-ignore
        arr = {query: [...arr.query, ...value.query], last_page: value.last_page, filters: filter ? filter : ''};
    }
    sessionStorage.setItem(endpoint, JSON.stringify(arr));
    return arr;
}

async function authenticate(): Promise<boolean> {
    const response = await requestResource<'user'>("user", "GET")
    if (response.status === 401) {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('receipts');
        sessionStorage.removeItem('cards');
        sessionStorage.removeItem('categories');
        return false;
    }
    return true;
}