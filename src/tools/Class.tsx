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
        <div key={id} id={`class=${id}`} className="grid grid-cols-3 justify-evenly items-centerrounded-[15px] bg-(--card-background) rounded-[15px] items-center transition hover:scale-103 cursor-pointer">
            <h2 className="text-2xl font-bold p-5">{title}</h2>
            <p className="p-5">Cards linked: <b>{cardsLinked}</b><br/>Receipts Linked: <b>{receiptsLinked}</b></p>
            <div className={`h-[100%] w-[100%] rounded-[15px]`} style={{backgroundColor: `${color}`}}></div>
        </div>
    );
}

export default Class;