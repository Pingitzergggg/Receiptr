import { faFilePen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type classProps = {
    id: number,
    title: string,
    color?: string,
    total_cards: number,
    total_receipts: number
}

function Category({id, title, total_receipts, total_cards, color} : classProps) : ReactElement {
    const navigate = useNavigate();

    return (
        <div key={id} id={`class=${id}`} className="grid grid-cols-1 md:grid-cols-3 items-center rounded-[15px] bg-(--card-background) transition hover:scale-103 relative">
            <div className="absolute top-0 right-0 m-3 flex justify-end">
                <a onClick={() => navigate(`/categories/upload/${id}?data=${JSON.stringify({name: title, color: color?.split('#')[1]})}`)} className="cursor-pointer transition hover:scale-130">
                    <FontAwesomeIcon icon={faFilePen} />
                </a>
                <a onClick={() => navigate(`/categories/delete?id=${id}`)} className="cursor-pointer transition hover:scale-130">
                    <FontAwesomeIcon icon={faTrashCan} />
                </a>
            </div>
            <h2 className="text-2xl font-bold p-5">{title}</h2>
            <p className="p-5">Cards linked: <b>{total_cards}</b><br/>Receipts Linked: <b>{total_receipts}</b></p>
            <div className={`md:h-[100%] h-[50px] w-[100%] rounded-[15px]`} style={{backgroundColor: `${color}`}}></div>
        </div>
    );
}

export default Category;