import { useEffect, useState, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../tools/Input";
import Select from "../../tools/Select";
import Button from "../../tools/Button";
import type { inputField } from "../../misc/types";
import { stringValidate, type inputType } from "../../misc/stringValidator";
import type { cards, classes } from "../../misc/databaseTables";
import { requestResource } from "../../misc/receiver";

type optionType = {
    value: string | number,
    label: string
}

type updateReceiptDetails = {
    id : number,
    title : string,
    price : number,
    currency : string,
    category : string,
    date : string,
    card : string
}

type fileNotifierType = {
    title : ReactElement,
    content : ReactElement
}

type inputFields = {
    name : inputField,
    price : inputField,
    currency : inputField,
    date : inputField,
    usedCardId : inputField,
    classId : inputField
}

function UploadReceiptPanel() : ReactElement {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const updateReceipt : updateReceiptDetails = searchParams.get('data') ? JSON.parse(searchParams.get('data')!) : null;

    const cards  = () => {
        if (sessionStorage.getItem("card")) {
            const data : cards[] = JSON.parse(sessionStorage.getItem("card")!);
            return data.map((obj: cards) => {return {value: obj.id, label: obj.title}});
        } else {
            let preData;
            requestResource("fetch_card_data", {id: Number(localStorage.getItem("id"))})
                .then(data => {
                    if (!data) {
                        preData = data!.value.map((obj: cards) => {return {value: obj.id, label: obj.title}});
                    }
                })
            return preData;
        }
    }

    const classes = () => {
        if (sessionStorage.getItem("class")) {
            const data : classes[] = JSON.parse(sessionStorage.getItem("class")!);
            return data.map((obj: classes) => {return {value: obj.id, label: obj.title}});
        } else {
            let preData;
            requestResource("fetch_class_data", {id: Number(localStorage.getItem("id"))})
                .then(data => {
                    if (!data) {
                        preData = data!.value.map((obj: classes) => {return {value: obj.id, label: obj.title}});
                    }
                })
            return preData;
        }
    }

    const [currentFile, setCurrentFile] = useState<FileList|null>(null);
    const [fileNotifier, setFileNotifier] = useState<fileNotifierType>({
        title: <h3>Click to choose file</h3>,
        content: <svg className="h-[5rem] w-[5rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10" stroke={localStorage.getItem("theme") == "light" ? "#000000" : "#e0e0e0"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    });
    const [receiptData, setReceiptData] = useState<inputFields>({
        name: {
            value: updateReceipt ? updateReceipt.title : '',
            error: ''
        },
        price: {
            value: updateReceipt ? String(updateReceipt.price) : '',
            error: ''
        },
        currency: {
            value: updateReceipt ? updateReceipt.currency : '',
            error: ''
        },
        date: {
            value: updateReceipt ? updateReceipt.date : '',
            error: ''
        },
        classId: {
            value: updateReceipt ? updateReceipt.category : '',
            error: ''
        },
        usedCardId: {
            value: '',
            error: ''
        }
    });


    const handleInputChange = (event : any) => {
            console.log(receiptData)
            const getId : string = event.target.id;
            const getValue : string = event.target.value;
            const currentCommand : inputType = getId.toLowerCase() == 'bank' || getId.toLowerCase() == 'cardtitle' ? 'NAME' : getId.toUpperCase() as inputType;
            try {
                stringValidate(currentCommand, getValue);
                setReceiptData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
            } catch(err : any) {
                if (getValue.length != 0) {
                    setReceiptData((prev) => ({...prev, [getId]: {value: getValue, error: err}}));
                } else {
                    setReceiptData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
                }
            }
    };

    function fileLoader() : string { //prolly wont need this later but stays here anyway...
        if (currentFile === null) {
            return 'null';
        } else {
            return URL.createObjectURL(currentFile[0]);
        }
    }

    useEffect(() => {
        if (currentFile) {
            if (currentFile[0].type === 'application/pdf') {
                setFileNotifier({
                    title: <p>File: <b>{currentFile[0].name}</b></p>,
                    content: <svg className="h-[5rem] w-[5rem]" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 6.5V6H2V6.5H2.5ZM6.5 6.5V6H6V6.5H6.5ZM6.5 10.5H6V11H6.5V10.5ZM13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM2.5 7H3.5V6H2.5V7ZM3 11V8.5H2V11H3ZM3 8.5V6.5H2V8.5H3ZM3.5 8H2.5V9H3.5V8ZM4 7.5C4 7.77614 3.77614 8 3.5 8V9C4.32843 9 5 8.32843 5 7.5H4ZM3.5 7C3.77614 7 4 7.22386 4 7.5H5C5 6.67157 4.32843 6 3.5 6V7ZM6 6.5V10.5H7V6.5H6ZM6.5 11H7.5V10H6.5V11ZM9 9.5V7.5H8V9.5H9ZM7.5 6H6.5V7H7.5V6ZM9 7.5C9 6.67157 8.32843 6 7.5 6V7C7.77614 7 8 7.22386 8 7.5H9ZM7.5 11C8.32843 11 9 10.3284 9 9.5H8C8 9.77614 7.77614 10 7.5 10V11ZM10 6V11H11V6H10ZM10.5 7H13V6H10.5V7ZM10.5 9H12V8H10.5V9ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1Z" fill="#127012"></path> </g></svg>
                });
            } else {
                setFileNotifier({
                    title: <p className="text-(--error-color)">You must provide a <b>PDF</b> file!</p>,
                    content: <svg className="h-[5rem] w-[5rem]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7.493 0.015 C 7.442 0.021,7.268 0.039,7.107 0.055 C 5.234 0.242,3.347 1.208,2.071 2.634 C 0.660 4.211,-0.057 6.168,0.009 8.253 C 0.124 11.854,2.599 14.903,6.110 15.771 C 8.169 16.280,10.433 15.917,12.227 14.791 C 14.017 13.666,15.270 11.933,15.771 9.887 C 15.943 9.186,15.983 8.829,15.983 8.000 C 15.983 7.171,15.943 6.814,15.771 6.113 C 14.979 2.878,12.315 0.498,9.000 0.064 C 8.716 0.027,7.683 -0.006,7.493 0.015 M8.853 1.563 C 9.967 1.707,11.010 2.136,11.944 2.834 C 12.273 3.080,12.920 3.727,13.166 4.056 C 13.727 4.807,14.142 5.690,14.330 6.535 C 14.544 7.500,14.544 8.500,14.330 9.465 C 13.916 11.326,12.605 12.978,10.867 13.828 C 10.239 14.135,9.591 14.336,8.880 14.444 C 8.456 14.509,7.544 14.509,7.120 14.444 C 5.172 14.148,3.528 13.085,2.493 11.451 C 2.279 11.114,1.999 10.526,1.859 10.119 C 1.618 9.422,1.514 8.781,1.514 8.000 C 1.514 6.961,1.715 6.075,2.160 5.160 C 2.500 4.462,2.846 3.980,3.413 3.413 C 3.980 2.846,4.462 2.500,5.160 2.160 C 6.313 1.599,7.567 1.397,8.853 1.563 M7.706 4.290 C 7.482 4.363,7.355 4.491,7.293 4.705 C 7.257 4.827,7.253 5.106,7.259 6.816 C 7.267 8.786,7.267 8.787,7.325 8.896 C 7.398 9.033,7.538 9.157,7.671 9.204 C 7.803 9.250,8.197 9.250,8.329 9.204 C 8.462 9.157,8.602 9.033,8.675 8.896 C 8.733 8.787,8.733 8.786,8.741 6.816 C 8.749 4.664,8.749 4.662,8.596 4.481 C 8.472 4.333,8.339 4.284,8.040 4.276 C 7.893 4.272,7.743 4.278,7.706 4.290 M7.786 10.530 C 7.597 10.592,7.410 10.753,7.319 10.932 C 7.249 11.072,7.237 11.325,7.294 11.495 C 7.388 11.780,7.697 12.000,8.000 12.000 C 8.303 12.000,8.612 11.780,8.706 11.495 C 8.763 11.325,8.751 11.072,8.681 10.932 C 8.616 10.804,8.460 10.646,8.333 10.580 C 8.217 10.520,7.904 10.491,7.786 10.530 " stroke="none" fill-rule="evenodd" fill="#a52424"></path></g></svg>
                });
            }
        }
    }, [currentFile]);
    
    return (<>
        <div className="upload">
            <a onClick={() => navigate('/receipts')} className="btn-nav bg-red-400">
                <FontAwesomeIcon icon={faXmark} />
            </a>
            <h2 className="text-3xl font-semibold my-5">{updateReceipt ? 'Update' : 'Upload'} Receipt</h2>
            <div className={updateReceipt ? 'flex-col' : `flex justify-evenly`}>
                <div className={updateReceipt ? "flex-col" :  "flex-col w-[50%]"}>
                    <Input title="Title" errorInValue={receiptData.name.error.length != 0} error={receiptData.name.error} id='name' width="100%" onChange={handleInputChange} value={receiptData.name.value} />
                    <div className="flex justify-between">
                        <Input title="Price" errorInValue={false} id='price' width="48%" value={receiptData.price.value} />
                        <Input title="Currency" errorInValue={false} id="currency" width="48%" value={receiptData.currency.value} />
                    </div>
                    <Input type="date" errorInValue={false} id="date" title="" width="100%" />
                    <Select errorInValue={false} id="card" title="Used Card" width="100%" values={cards()} />
                    <Select errorInValue={false} id="class" title="Choose Class" width="100%" values={classes()} />
                </div>

                <div className={`flex-col ${updateReceipt ? "" : "w-[50%] ml-[2rem]"}`}>
                    {!updateReceipt && <>
                    <div className={`relative w-[100%] h-[75%] text-left flex flex-col justify-center items-center my-[.5rem] ${!currentFile ? " border border-[#4d5051] rounded-[5px] bg-(--input-bg) p-[1rem]" : ""}`} >
                        {fileNotifier.content}
                        {fileNotifier.title}
                        <input className="opacity-0 absolute top-0 left-0 h-[100%] w-[100%] cursor-pointer" type="file" accept=".pdf" onChange={e => {setCurrentFile(e.target.files as any); console.log(e.target.files)}} />
                    </div></>}
                    <Button label="Upload" width="100%" fontSize="1rem" icon={<FontAwesomeIcon icon={faUpload} />}/>
                </div>
            </div>
        </div>
    </>);
};

export default UploadReceiptPanel;