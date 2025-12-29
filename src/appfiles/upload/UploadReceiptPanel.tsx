import { useState, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import PdfViewer from "../../tools/PdfViewer";
import { useNavigate, useSearchParams } from "react-router-dom";
import Input from "../../tools/Input";
import Select from "../../tools/Select";
import Button from "../../tools/Button";

type updateReceiptDetails = {
    id : number,
    title : string,
    price : number,
    currency : string,
    category : string
}

function UploadReceiptPanel() : ReactElement {
    const navigate = useNavigate();

    const [currentFile, setCurrentFile] = useState<FileList>(null as any);
    const [openPreview, setOpenPreview] = useState<boolean>(false);

    const [searchParams] = useSearchParams();

    const updateReceipt : updateReceiptDetails = searchParams.get('data') ? JSON.parse(searchParams.get('data')!) : null;

    console.log('openprev'+openPreview);

    function fileLoader() : string {
        if (currentFile === null) {
            return 'null';
        } else {
            return URL.createObjectURL(currentFile[0]);
        }
    }

    function fileValidator(filename : string) : boolean {
        const arr = filename.split('.');
        if (arr[arr.length - 1] === 'pdf') {
            return true;
        } else {
            return false;
        }
    }

    return (<>
        <div className="upload">
            <a onClick={() => navigate('/receipts')} className="btn-nav bg-red-400">
                <FontAwesomeIcon icon={faXmark} />
            </a>
            <h2 className="text-3xl font-semibold my-5">{updateReceipt ? 'Update' : 'Upload'} Receipt</h2>
            <div className="flex justify-evenly">
                <div className="flex-col w-[50%]">
                    <Input title="Title" errorInValue={false} id='name' width="100%" />
                    <div className="flex justify-between">
                        <Input title="Price" errorInValue={false} id='price' width="48%" />
                        <Input title="Currency" errorInValue={false} id="currency" width="48%" />
                    </div>
                    <Input type="date" errorInValue={false} id="date" title="" width="100%" />
                    <Select errorInValue={false} id="card" title="Used Card" width="100%" />
                    <Select errorInValue={false} id="class" title="Choose Class" width="100%" />
                </div>

                <div className="flex-col w-[50%] ml-[2rem]">

                    {!updateReceipt && <>
                    <div className={`relative w-[100%] h-[auto] text-left flex flex-col justify-center items-center my-[.5rem] ${!currentFile ? " border border-[#4d5051] rounded-[5px] bg-(--input-bg) p-[1rem]" : ""}`} >
                        {!currentFile ? <h3>Click or Drag File</h3> : <p>File: <b>{currentFile[0].name}</b></p>}
                        {!currentFile ? 
                            <svg className="h-[5rem] w-[5rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10" stroke={localStorage.getItem("theme") == "light" ? "#000000" : "#e0e0e0"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        :
                            <svg className="h-[5rem] w-[5rem]" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.5 6.5V6H2V6.5H2.5ZM6.5 6.5V6H6V6.5H6.5ZM6.5 10.5H6V11H6.5V10.5ZM13.5 3.5H14V3.29289L13.8536 3.14645L13.5 3.5ZM10.5 0.5L10.8536 0.146447L10.7071 0H10.5V0.5ZM2.5 7H3.5V6H2.5V7ZM3 11V8.5H2V11H3ZM3 8.5V6.5H2V8.5H3ZM3.5 8H2.5V9H3.5V8ZM4 7.5C4 7.77614 3.77614 8 3.5 8V9C4.32843 9 5 8.32843 5 7.5H4ZM3.5 7C3.77614 7 4 7.22386 4 7.5H5C5 6.67157 4.32843 6 3.5 6V7ZM6 6.5V10.5H7V6.5H6ZM6.5 11H7.5V10H6.5V11ZM9 9.5V7.5H8V9.5H9ZM7.5 6H6.5V7H7.5V6ZM9 7.5C9 6.67157 8.32843 6 7.5 6V7C7.77614 7 8 7.22386 8 7.5H9ZM7.5 11C8.32843 11 9 10.3284 9 9.5H8C8 9.77614 7.77614 10 7.5 10V11ZM10 6V11H11V6H10ZM10.5 7H13V6H10.5V7ZM10.5 9H12V8H10.5V9ZM2 5V1.5H1V5H2ZM13 3.5V5H14V3.5H13ZM2.5 1H10.5V0H2.5V1ZM10.1464 0.853553L13.1464 3.85355L13.8536 3.14645L10.8536 0.146447L10.1464 0.853553ZM2 1.5C2 1.22386 2.22386 1 2.5 1V0C1.67157 0 1 0.671573 1 1.5H2ZM1 12V13.5H2V12H1ZM2.5 15H12.5V14H2.5V15ZM14 13.5V12H13V13.5H14ZM12.5 15C13.3284 15 14 14.3284 14 13.5H13C13 13.7761 12.7761 14 12.5 14V15ZM1 13.5C1 14.3284 1.67157 15 2.5 15V14C2.22386 14 2 13.7761 2 13.5H1Z" fill="#000000"></path> </g></svg>
                        }
                        <input className="opacity-0 absolute top-0 left-0 h-[100%] w-[100%] cursor-pointer" type="file" accept=".pdf" onChange={e => {setCurrentFile(e.target.files as any); setOpenPreview(true)}} />
                    </div></>}
                    <Button label="Upload" width="100%" fontSize="1rem" className="my-5" icon={<FontAwesomeIcon icon={faUpload} />}/>
                </div>
            </div>
        </div>
    </>);
};

export default UploadReceiptPanel;