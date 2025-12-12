import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type classProps = {
    id: number,
    title: string,
    cardsLinked: number,
    receiptsLinked: number,
    color: string
}

function Class({id, title, cardsLinked, receiptsLinked, color} : classProps) : ReactElement {
    const navigate = useNavigate();

    return (
        <div key={id} id={`class=${id}`} className="grid grid-cols-1 md:grid-cols-3 items-center rounded-[15px] bg-(--card-background) transition hover:scale-103 cursor-pointer relative">
            <a onClick={() => navigate(`/classes/delete?id=${id}`)} className="absolute top-0 right-0 m-3 transition hover:scale-130">
                <FontAwesomeIcon icon={faTrashCan} />
            </a>
            <h2 className="text-2xl font-bold p-5">{title}</h2>
            <p className="p-5">Cards linked: <b>{cardsLinked}</b><br/>Receipts Linked: <b>{receiptsLinked}</b></p>
            <div className={`md:h-[100%] h-[50px] w-[100%] rounded-[15px]`} style={{backgroundColor: `${color}`}}></div>
        </div>
    );
}

export default Class;