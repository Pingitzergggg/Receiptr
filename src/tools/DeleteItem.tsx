import {type ReactElement, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {type endpoints, extractResponse, requestResource, type response} from "../misc/receiver.ts";
import type {responseType} from "../misc/databaseTables.ts";
import Popup from "./Popup.tsx";

type props = {
    itemType : "RECEIPTS" | "CARDS" | "CATEGORIES"
}

function DeleteItem<T extends keyof responseType>({itemType} : props) : ReactElement {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // @ts-ignore
    const itemId : string = searchParams.get('id')!;
    const [error, setError] = useState<string>('');

    async function load() {
        if (await destroy()) {
            navigate('/'+itemType.toLowerCase(), {state: {deleteSuccess: true}});
        } else {
            setError('Delete failed!');
        }
    }

    async function destroy(): Promise<boolean> {
        try {
            const response: response<T> = await requestResource(itemType.toLowerCase() as endpoints, 'DELETE', itemId);
            await extractResponse<T>(response);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (<>
        {error && <Popup type={"ERROR"} message={error} />}
        <div className="fixed! bg-(--card-background) p-[1rem] absolute-center rounded-[15px] window">
            <h2 className="text-2xl font-bold text-center my-[2rem] mx-[1rem]">Delete {itemType.toLowerCase().replace(/^[a-z]/, c => c.toUpperCase())}?</h2>
            <div className="flex justify-evenly mb-[1rem]">
                <button className="btn bta" onClick={() => navigate(-1)}>Cancel</button>
                <button className="btn ml-[1rem]" onClick={load}>Delete</button>
            </div>
        </div>
    </>);
}

export default DeleteItem;