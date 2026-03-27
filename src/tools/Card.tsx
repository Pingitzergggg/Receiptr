import { faFilePen, faPlantWilt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type cardProps = {
    id : number,
    title: string,
    currency: string,
    type: string,
    total_receipts: number,
    total_spent: number,
    category?: string,
    category_id: number|null,
    color?: string
};

// @ts-ignore
function Card({id, title, currency, type, total_receipts, total_spent, color, category, category_id} : cardProps) : ReactElement {
    const navigate = useNavigate();
    return (
        <a key={id} id={`card-${id}`} className="hover-3d">
        
        <div className={`card text-white relative`} style={{backgroundColor: color ? color : "#323339"}}>
            <div className="absolute top-0 right-0 m-3 flex justify-end">
                <a onClick={() => navigate(`/cards/upload/${id}?data=${JSON.stringify({title: title, type: type, category_id: category_id, currency: currency})}`)} className="cursor-pointer transition hover:scale-130">
                    <FontAwesomeIcon icon={faFilePen} />
                </a>
                <a onClick={() => navigate(`/cards/delete?id=${id}`)} className="cursor-pointer transition hover:scale-130">
                    <FontAwesomeIcon icon={faTrashCan} />
                </a>
            </div>

            <div className="card-body">
            <div className="flex justify-between">
                <div className="font-bold">{title.toUpperCase()}</div>
                <div className="text-[5rem] opacity-10 m-[2rem] absolute top-[0] right-[0]">
                    <FontAwesomeIcon icon={faPlantWilt} />
                </div>
            </div>
            <div className="mt-[3rem]">
                <div className="text-xs opacity-40">TOTAL</div>
                <div><h2 className="text-(--font-color) text-[2rem]"><b>{total_spent ? total_spent.toFixed(2) : 0} {currency}</b></h2></div>
                <div>{category?.toUpperCase()}</div>
            </div>
            <div className="flex justify-between">
                <div>
                <div className="text-xs opacity-40">TYPE</div>
                <div>{type.toUpperCase()}</div>
                </div>
                <div>
                <div className="text-xs opacity-40">PAYMENTS</div>
                <div>{total_receipts}</div>
                </div>
            </div>
            </div>
        </div>
        </a>
    );
}

export default Card