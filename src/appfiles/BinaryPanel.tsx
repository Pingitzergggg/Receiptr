import { faDownload, faUpRightAndDownLeftFromCenter, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {type ReactElement, useEffect, useState} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {requestFile} from "../misc/receiver.ts";
import Popup from "../tools/Popup.tsx";
import PdfViewer from "../tools/PdfViewer.tsx";

function BinaryPanel() : any {
    // @ts-ignore
    const { receiptId } = useParams();
    const [searchParams] = useSearchParams();
    const title: string|null = searchParams.get("title");
    const barcode: string|null = searchParams.get("barcode");
    
//   const [innerRenderCount, setInnerRenderCount] = useState(0); //This is the working fetch call, only commented for local testing!! DONT DELETE

//   useEffect(() => {
//     fetch('http://localhost:5001/billconvert/fetch_binary_data', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       'X-API-KEY': "]WcdihR9N6}Ol5/V`e}sDD',HRRZIm`Kk|oG'grXb})cJqKS(S",
//       'id': '1'
//     },
//     body: JSON.stringify({id:1})
//   })
//     .then(response => response.blob())
//     .then(data => {
//       const objectURL = URL.createObjectURL(data);
//       console.log(`BinaryPanel has re-rendered the page!\nValue: ${innerRenderCount}`);
//       setInnerRenderCount((innerRenderCount) => innerRenderCount + 1);
//     });
//   }, [])

    async function load(barcodeMode: boolean = false) {
        try {
            const blob: Blob = await requestFile(Number(receiptId));
            setContent(<Display barcodeMode={barcodeMode} fileUrl={URL.createObjectURL(blob)} />);
        } catch (error) {
            console.error(error);
            setError('Failed to load');
        }
    }

    function download(fileUrl: string) {
        console.log(fileUrl)
        const link: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;
        link.href = fileUrl;
        link.download = title ? `${title}.pdf` : "unknown.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const navigate = useNavigate();

    const [content, setContent] = useState<ReactElement>(<div className={barcode !== null ? "h-[5rem]" : "md:h-[80vh] h-[60vh]"}><i>Loading<span className="loading loading-spinner loading-md mx-1"></span></i></div>);
    const [error, setError] = useState<string>('');

    const Display = ({fileUrl, barcodeMode}: {fileUrl: string, barcodeMode?: boolean}) => {
        return <>
            {error && <Popup type={"ERROR"} message={error} />}
            <div id="binary-panel-content" className={barcodeMode ? 'h-full top-[40%]!' : 'md:h-[80vh] h-[60vh] top-[5vh]!'}>
                {barcodeMode && <div className="w-full bg-[#ffffff] py-5 px-2 flex justify-center items-center"><img src='/barcode.png' /></div>}
                {!barcodeMode && <PdfViewer fileUrl={fileUrl} />}
            </div>
            <div id="binary-panel-control-bar">
                <p>{title}</p>
                <div className="flex justify-center items-center">
                    <a onClick={() => {
                        URL.revokeObjectURL(fileUrl);
                        navigate('/receipts');
                    }} className="btn-nav bg-red-400 ml-3">
                        <FontAwesomeIcon icon={faXmark} />
                    </a>
                    <a onClick={() => window.location.assign(fileUrl)} className="btn-nav bg-amber-400 ml-3">
                        <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                    </a>
                    <a  onClick={() => download(fileUrl)} className='btn-nav bg-green-400 ml-3'>
                        <FontAwesomeIcon icon={faDownload} />
                    </a>
                </div>
            </div>
        </>
    }

    useEffect(() => {load(barcode !== null)}, []);

    return <div id="binary-panel-div"> {content} </div>;
}

export default BinaryPanel;