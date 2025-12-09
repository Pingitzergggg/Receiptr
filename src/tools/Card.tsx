import { faPlantWilt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";

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
    return (
        <a key={id} id={`card-${id}`} className="hover-3d cursor-pointer">
        
        <div className={`card text-white`} style={{backgroundColor: color}}>
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

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        </a>
    );
}

export default Card