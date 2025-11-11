import { useState, type ReactElement } from "react";
import PdfViewer from "./PdfViewer";

function UploadReceiptPanel() : ReactElement {

    const [currentFile, setCurrentFile] = useState<FileList>(null as any);

    function fileLoader() : string {
        if (currentFile === null) {
            return 'null';
        } else {
            return URL.createObjectURL(currentFile[0]);
        }
    }

    return (<>
        <div id="upload-receipt-div">
            <div className="flex flex-col mr-5">
                <h2 className="text-2xl font-semibold">Upload Receipt</h2>

                <label className="mt-2">Title</label>
                <input className="input" type="text" />

                <button className="btn my-5">Upload</button>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
                <div className={`relative rounded-[15px] border bg-gray-500 w-[100%] h-[100%] text-center flex flex-col justify-evenly items-center p-[1rem]`}>
                    <h3>Click or Drag to Upload File</h3>
                    {!currentFile && <svg className="h-[5rem] w-[5rem]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 19H21M19 17V21M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M9 17H12M9 13H15M9 9H10" stroke="#b9babc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}
                    <input className="opacity-0 absolute top-0 left-0 h-[100%] w-[100%] cursor-pointer" type="file" accept=".pdf" onChange={e => setCurrentFile(e.target.files as any)} />
                </div>
                {(fileLoader() != "null") && <PdfViewer fileUrl={fileLoader()} />}
                {currentFile && <p>File: <b>{currentFile[0].name}</b></p>}
            </div>
        </div>
    </>);
};

export default UploadReceiptPanel;