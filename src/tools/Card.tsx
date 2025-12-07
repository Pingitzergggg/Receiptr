import { faPlantWilt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { ReactElement } from "react";

type cardProps = {
    id : number,
    bank: string,
    number: string,
    date: string,
    holder: string,
    category: string
};

function Card({id, bank, number, date, holder, category} : cardProps) : ReactElement {
    return (
        <div>
            working on it
        </div>
    );
}

export default Card