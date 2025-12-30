import { faTrashCan, faFilePen, faArrowUp, faPlantWilt, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import UploadReceiptPanel from "../appfiles/upload/UploadReceiptPanel";

type receiptProps = {
    id: number,
    title: string,
    size: number,
    unit: string,
    type: string,
    store: string,
    creation: string,
    cardNumber: number,
    category?: string,
    color?: string,
    price: number,
    currency: string
};

function Receipt({id, title, size, type, unit, store, creation, cardNumber, category, color, price, currency} : receiptProps) : ReactElement {
    const navigate = useNavigate();

    return (
        <div key={id} id={`receipt-${id}`} className="card receipt w-96 bg-base-100 card-xs shadow-sm relative transition hover:scale-103 cursor-pointer mb-[4rem]">
            <div className="card-body p-3">
                        <div className="flex justify-end items-center">
                            <a onClick={() => navigate(`/receipts/delete?id=${id}`)} title='Delete' className='btn-nav bg-red-400 ml-1'>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </a>

                            <a onClick={() => navigate(`/receipts/upload?data=${JSON.stringify({id: id, title: title, price: price, currency: currency, category: category, date: creation})}`)} title='Edit' className="btn-nav bg-amber-400 ml-1">
                                <FontAwesomeIcon icon={faFilePen} />
                            </a>

                            <a onClick={() => navigate(`/receipts/${id}`)} title='Open' className='btn-nav bg-green-400 ml-1'>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </a>
                        </div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                <div className="flex justify-between items-center">
                <p>
                Size: {size + unit}<br/>
                Type: {type}<br/>
                Store: {store}<br/>
                Creation: {creation}<br/>
                With card: {cardNumber}
                </p>
                <div>
                    <h3 className="flex items-start text-right justify-end text-lg font-bold h-[100%]">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[1rem] h-[1rem] mr-[4px] mt-[6px]">
                            <path fill={color} d="M32.5 96l0 149.5c0 17 6.7 33.3 18.7 45.3l192 192c25 25 65.5 25 90.5 0L483.2 333.3c25-25 25-65.5 0-90.5l-192-192C279.2 38.7 263 32 246 32L96.5 32c-35.3 0-64 28.7-64 64zm112 16a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
                        </svg>
                        {category}
                    </h3>
                    <h4 className="text-right text-2xl"><b>{price}</b> {currency}</h4>
                </div>
                </div>
            </div>

            <div className="absolute triangle bottom-[-30px] right-[0%]"></div>
            <div className="absolute triangle bottom-[-30px] left-[50%]" style={{transform: 'translate(-50%, 0)'}}></div>
            <div className="absolute triangle bottom-[-30px] left-[0%]"></div>
        </div>
    );
}

export default Receipt;