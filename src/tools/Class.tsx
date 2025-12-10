import type { ReactElement } from "react";

type classProps = {
    id: number,
    title: string,
    cardsLinked: number,
    receiptsLinked: number,
    color: string
}

function Class({id, title, cardsLinked, receiptsLinked, color} : classProps) : ReactElement {
    return (
        <div key={id} id={`class=${id}`} className="grid grid-cols-1 md:grid-cols-3 items-center rounded-[15px] bg-(--card-background) transition hover:scale-103 cursor-pointer">
            <h2 className="text-2xl font-bold p-5">{title}</h2>
            <p className="p-5">Cards linked: <b>{cardsLinked}</b><br/>Receipts Linked: <b>{receiptsLinked}</b></p>
            <div className={`md:h-[100%] h-[50px] w-[100%] rounded-[15px]`} style={{backgroundColor: `${color}`}}></div>
        </div>
    );
}

export default Class;