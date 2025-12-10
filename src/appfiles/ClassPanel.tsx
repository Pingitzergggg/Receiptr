import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, type ReactElement } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { classDummy } from "../misc/dummydata";
import Class from "../tools/Class";

let classes : any[] = classDummy;
function ClassPanel() : ReactElement {
    const navigate = useNavigate();

    const classData : ReactElement[] = classes.map(classes => 
        <Class   
            id={classes.id}
            title={classes.title}
            cardsLinked={classes.cardsLinked}
            receiptsLinked={classes.receiptsLinked}
            color={classes.color} />
    );

    return (
        <>
            <a>
            <button onClick={() => navigate('upload')} className='upload-button btn'>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            </a>
            <div className='container mt-20 mb-20'>
                <div className='grid grid-cols-1 gap-4'>
                    {classData}
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default ClassPanel;