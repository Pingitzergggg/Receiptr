import { faPlantWilt, faTrashCan } from "@fortawesome/free-solid-svg-icons";
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

function Card({id, bank, number, date, holder, category, color} : cardProps) : ReactElement {
    const navigate = useNavigate();
    return (
        <a key={id} id={`card-${id}`} className="hover-3d">
        
        <div className={`card text-white relative`} style={{backgroundColor: color}}>
        <a onClick={() => navigate(`/cards/delete?id=${id}`)} className="absolute top-[1%] right-[1%] m-2 cursor-pointer transition hover:scale-130">
            <FontAwesomeIcon icon={faTrashCan} />
        </a>
            <div className="card-body">
            <div className="flex justify-between">
                <div className="font-bold">{bank.toUpperCase()}</div>
                <div className="text-5xl opacity-10">
                    <FontAwesomeIcon icon={faPlantWilt} />
                </div>
            </div>
            <div>
                <div className="text-lg opacity-40">{`**** **** **** ${number}`}</div>
                <div>{category}</div>
            </div>
            <div className="flex justify-between">
                <div>
                <div className="text-xs opacity-20">CARD HOLDER</div>
                <div>{holder.toUpperCase()}</div>
                </div>
                <div>
                <div className="text-xs opacity-20">EXPIRES</div>
                <div>{date}</div>
                </div>
            </div>
            </div>
        </div>
        </a>
    );
}

export default Card