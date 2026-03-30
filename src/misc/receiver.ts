import type {paginatable, responseType} from "./databaseTables"

export const domainUrl: string = 'https://pgapi.ddns.net';
// export const domainUrl: string = 'http://localhost:8000';

export type methods = "GET" | "POST" | "PUT" | "DELETE";
export type endpoints = "user" | "cards" | "categories" | "receipts" | "archive" | "login" | "register" | "logout";

function decodeCSRF(): string | undefined {
    const pair: string[] | undefined = decodeURIComponent(document.cookie).split(";")
                            .map(cookie => cookie.split("="))
                                .filter(pair => pair[0] === "XSRF-TOKEN")[0];
    return pair === undefined ? undefined : pair[1]

}

export type response<T extends keyof responseType> = {
    status: number;
    content?: keyof responseType[T]
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
    if (decodeCSRF() === undefined) await getCSRF();
    const token: string = decodeCSRF()!;
    const response = await fetch(domainUrl+'/api/receiptr/receipts', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
            'X-XSRF-TOKEN': token,
        }, body: data
    });
    if (response.status === 401) await authenticate();
    await extractResponse(response);
    return response.ok;
}

export async function requestFile(id: number): Promise<Blob>{
    const response = await fetch(domainUrl+'/api/receiptr/receipts/'+id, {
        method: 'GET',
        credentials: 'include',
        headers: {
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
    body?: any,
    forcedCSRFfetch = false
): Promise<response<O>> {
    try {
        if (decodeCSRF() === undefined || forcedCSRFfetch) await getCSRF();
        const token: string = decodeCSRF()!;
        console.log(domainUrl+`/api/receiptr/${endpoint}${urlParam ? "/"+urlParam : ""}${queryParam ? "?"+queryParam : ""}`);
        const request = await fetch(domainUrl+`/api/receiptr/${endpoint}${urlParam ? "/"+urlParam : ""}${queryParam ? "?"+queryParam : ""}`, {
            method: method,
            credentials: 'include',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
                'X-XSRF-TOKEN': token
            },
            body: body ? JSON.stringify(body) : null
        });

        const data = await request.json();
        if (!request.ok) return {content: data, status: request.status};

        if ((/login|register/.test(endpoint) && method === "POST")
                    || "user" === endpoint && "GET" === method) {
            console.log("creating session...");
            sessionStorage.setItem('user', JSON.stringify(data));
        }

        return {status: request.status, content: data};
    } catch (err) {
        console.error(err);
        return {status: -1};
    }
}

export async function getCSRF(): Promise<void> {
    await fetch(domainUrl+'/api/receiptr/sanctum/csrf-cookie', {
        method: 'GET',
        credentials: 'include',
    });
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