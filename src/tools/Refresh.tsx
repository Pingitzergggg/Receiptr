import type {ReactElement} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRotateRight} from "@fortawesome/free-solid-svg-icons";

function Refresh({trigger}: {trigger: () => void}): ReactElement {
    return (
        <div className='w-[85%] mt-10 text-right'>
            <button onClick={trigger} className='transition hover:rotate-90 hover:scale-120 cursor-pointer'>
                <FontAwesomeIcon style={{width: '2rem', height: '2rem'}} icon={faArrowRotateRight} />
            </button>
        </div>
    );
}

export default Refresh;