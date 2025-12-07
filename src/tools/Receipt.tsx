import { faTrashCan, faFilePen, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type receiptProps = {
    id: number,
    title: string,
    size: number,
    unit: string,
    type: string,
    store: string,
    creation: string,
    cardNumber: number
};

function Receipt({id, title, size, type, unit, store, creation, cardNumber} : receiptProps) : ReactElement {
    const navigate = useNavigate();

    return (
        <div key={id} className="card receipt w-96 bg-base-100 card-xs shadow-sm">
            <div className="card-body p-3">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p>
                Size: {size + unit}<br/>
                Type: {type}<br/>
                Store: {store}<br/>
                Creation: {creation}<br/>
                With card: {cardNumber}
                </p>
                    <div className='flex justify-end'>
                        <a title='Delete' className='btn-nav bg-red-400 ml-1'>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </a>

                        <a title='Edit' className="btn-nav bg-amber-400 ml-1">
                            <FontAwesomeIcon icon={faFilePen} />
                        </a>

                        <a onClick={() => navigate(`/receipts/${id}`)} title='Open' className='btn-nav bg-green-400 ml-1'>
                            <FontAwesomeIcon icon={faArrowUp} />
                        </a>
                    </div>
            </div>
        </div>
    );
}

export default Receipt;