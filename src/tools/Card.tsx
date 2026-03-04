import { faFilePen, faPlantWilt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type cardProps = {
    id : number,
    bank: string,
    number: string,
    date: string,
    holder: string,
    category?: string,
    color?: string
};

// @ts-ignore
function Card({id, bank, number, date, holder, category, color} : cardProps) : ReactElement {
    const navigate = useNavigate();
    return (
        <a key={id} id={`card-${id}`} className="hover-3d">
        
        <div className={`card text-white relative`} style={{backgroundColor: color}}>
            <div className="absolute top-0 right-0 m-3 flex justify-end">
                <a onClick={() => navigate(`/classes/delete?id=${id}`)} className="cursor-pointer transition hover:scale-130">
                    <FontAwesomeIcon icon={faFilePen} />
                </a>
                <a onClick={() => navigate(`/cards/delete?id=${id}`)} className="cursor-pointer transition hover:scale-130">
                    <FontAwesomeIcon icon={faTrashCan} />
                </a>
            </div>

            <div className="card-body">
            <div className="flex justify-between">
                <div className="font-bold">{bank.toUpperCase()}</div>
                <div className="text-[5rem] opacity-10 m-[2rem] absolute top-[0] right-[0]">
                    <FontAwesomeIcon icon={faPlantWilt} />
                </div>
            </div>
            <div className="mt-[3rem]">
                <div className="text-xs opacity-40">TOTAL</div>
                <div><h2 className="text-(--font-color) text-[2rem]"><b>5000 HUF</b></h2></div>
                <div>{category}</div>
            </div>
            <div className="flex justify-between">
                <div>
                <div className="text-xs opacity-40">CARD HOLDER</div>
                <div>{holder.toUpperCase()}</div>
                </div>
                <div>
                <div className="text-xs opacity-40">PAYMENTS</div>
                <div>{date}</div>
                </div>
            </div>
            </div>
        </div>
        </a>
    );
}

export default Card