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

    function fileLoader() : string {
        if (currentFile === null) {
            return 'null';
        } else {
            return URL.createObjectURL(currentFile[0]);
        }
    }

    return (<>
        <div className="upload">
            <a onClick={() => navigate('/receipts')} className="btn-nav bg-red-400">
                <FontAwesomeIcon icon={faXmark} />
            </a>
            <h2 className="text-3xl font-semibold my-5">{updateReceipt ? 'Update' : 'Upload'} Receipt</h2>
            <Input title="Title" errorInValue={false} id='name' width="100%" />
            <div className="flex justify-between">
                <Input title="Price" errorInValue={false} id='price' width="48%" />
                <Input title="Currency" errorInValue={false} id="currency" width="48%" />
            </div>
            <Select errorInValue={false} id="class" title="Choose Class" width="100%" />
            <Select errorInValue={false} id="card" title="Used Card" width="100%" />
            <Input type="date" errorInValue={false} id="date" title="" width="100%" />
            {/* <Input title="Creation Date" errorInValue={false} id="date" width="100%" type="date" /> */}
            {/* <input type="date" className="rounded-[5px] bg-(--bg-input) p-2 border-b" /> */}

            
            {!updateReceipt && <>
            <div className={`relative w-[100%] h-[100%] text-left flex flex-col justify-center items-center my-[.5rem] ${!currentFile ? " border border-[#4d5051] rounded-[5px] bg-(--input-bg) p-[1rem]" : ""}`} >
                {!currentFile && <h3>Click or Drag File</h3>}
                {!currentFile && <svg className="h-[5rem] w-[5rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10" stroke={localStorage.getItem("theme") == "light" ? "#000000" : "#e0e0e0"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}
                {currentFile && <p onClick={() => setOpenPreview(true)} className="w-[100%]">File: <b>{currentFile[0].name}</b></p>}
                <input className="opacity-0 absolute top-0 left-0 h-[100%] w-[100%] cursor-pointer" type="file" accept=".pdf" onChange={e => setCurrentFile(e.target.files as any)} />
            </div>
            {openPreview &&
                <div className="relative absolute-center rounded border-stone-950">
                    <PdfViewer fileUrl={fileLoader()} scrollable={false} />
                    <a className="absolute top-1 right-1 rounded-[50%] bg-red-500 text-stone-600 hover:bg-red-300 cursor-pointer h-[1rem] w-[1rem] p-[.1rem] m-2" onClick={() => setOpenPreview(false)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#1d232a" d="M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z"/></svg></a>
                </div>}</>}
            {/* <button className="btn my-5">Upload</button> */}
            <Button label="Upload" width="100%" fontSize="1rem" className="my-5" icon={<FontAwesomeIcon icon={faUpload} />}/>
        </div>
    </>);
};

export default UploadReceiptPanel;