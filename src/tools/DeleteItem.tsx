import type { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type props = {
    itemType : "RECEIPT" | "CARD" | "CLASS"
}

function DeleteItem({itemType} : props) : ReactElement {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    // @ts-ignore
    const itemId : string = searchParams.get('id')!;

    return (<>
        <div className="fixed! bg-(--card-background) p-[1rem] absolute-center rounded-[15px]">
            <h2 className="text-2xl font-bold text-center my-[2rem] mx-[1rem]">Delete {itemType.toLowerCase().replace(/^[a-z]/, c => c.toUpperCase())}?</h2>
            <div className="flex justify-evenly mb-[1rem]">
                <button className="btn bta" onClick={() => navigate(-1)}>Cancel</button>
                <button className="btn ml-[1rem]">Delete</button>
            </div>
        </div>
    </>);
}

export default DeleteItem;