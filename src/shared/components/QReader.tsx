import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Scanner } from "@yudiel/react-qr-scanner";
import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { extractResponse, requestResource } from "../../services/receiver";

function QReader(): ReactElement {
    const navigate = useNavigate();
    
    async function load(key: string): Promise<void> {
        try {
            if (!key) throw Error('Raw value not found!');
            const response = await requestResource<'receipts'>('assign-session', "POST", null, null, {session_key: key});
            await extractResponse<'receipts'>(response);
            navigate('/receipts', {state: {
                globalPopup: {
                    message: 'Receipt saved!',
                    type: 'SUCCESS'
                },
                uploadSuccess: true
            }});
        } catch (error) {
            const errorMessage = error instanceof WebTransportError ? error.message : "Binding failed!";
            console.error(error);
            navigate('/receipts', {state: {
                globalPopup: {
                    message: errorMessage,
                    type: 'ERROR'
                }
            }});
        }
    }

    return <>
        <div className="w-[100vw] h-[100vh]">
            <a onClick={() => navigate(-1)} className="absolute top-5 right-5 z-2 btn-nav bg-red-400">
                <FontAwesomeIcon icon={faXmark} />
            </a>
            <div className="absolute-center border border-[white] border-[3px] rounded-[15px] md:w-[50vh] w-[90%] h-[50vh] flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold mb-5">Scan code!</h1>
                <FontAwesomeIcon style={{width: '5rem', height: '5rem'}} icon={faMagnifyingGlass} />
            </div>
            <Scanner
                components={{
                    finder: false
                }}
                onScan={result => load(result[0].rawValue)}
                onError={error => {
                    console.error(error);
                    navigate('/receipts', {state: {
                        globalPopup: {
                            message: 'Scanning failed!',
                            type: 'ERROR'
                        }
                    }});
                }}
            />
        </div>
    </>
}

export default QReader;