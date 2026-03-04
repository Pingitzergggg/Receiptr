import type { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type propsType = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

function Upload({onClick} : propsType) : ReactElement {
    // @ts-ignore
    const navigate = useNavigate();

    return (<>
        <button onClick={onClick} className='upload-button btn'>
            <svg className="transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path className="transition" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
        </button>
    </>);
}

export default Upload;