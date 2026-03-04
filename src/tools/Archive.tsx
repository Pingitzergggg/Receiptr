import type {ReactElement} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

type ArchiveType = {
    id: number;
    name: string;
}

type PropsType = {
    type: "Receipts" | "Cards" | "Classes"
}

function Archive({type}: PropsType): ReactElement {
    const navigate = useNavigate();
    let archive: ArchiveType[] = [
        { id: 1, name: "Archived title 1" },
        { id: 2, name: "Archived title 2" },
        { id: 3, name: "Archived title 3" },
        { id: 4, name: "Archived title 4" },
    ]

    const archivePanel: ReactElement[] = archive.map(archivedElement => {
        return(<div className='flex bg-(--bg-color) rounded-[15px] p-2 justify-between items-center transition hover:scale-102'>
            <p>{archivedElement.name}</p>
            <a title='Restore' className='transition hover:scale-120 hover:text-(--accent-color) cursor-pointer'>
                <svg className='w-[1.5rem] h-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#127012" d="M263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9C237.1 56.8 249.3 48 263.1 48zM128 208L512 208L490.9 531.1C489.3 556.4 468.3 576 443 576L197 576C171.7 576 150.7 556.4 149.1 531.1L128 208zM337 287C327.6 277.6 312.4 277.6 303.1 287L231.1 359C221.7 368.4 221.7 383.6 231.1 392.9C240.5 402.2 255.7 402.3 265 392.9L296 361.9L296 464C296 477.3 306.7 488 320 488C333.3 488 344 477.3 344 464L344 361.9L375 392.9C384.4 402.3 399.6 402.3 408.9 392.9C418.2 383.5 418.3 368.3 408.9 359L336.9 287z"/></svg>
            </a>
        </div>);
    })
    return (<>
        <div className="absolute-center bg-(--card-background) rounded-[15px] p-5 w-[25rem]">
            <div className='flex justify-end'>
                <a onClick={() => navigate('/settings')} className="btn-nav bg-red-400">
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </div>
            <h2 className='text-2xl font-bold mb-5'>Archived {type}</h2>
            <div className="grid grid-cols-1 gap-2">
                {archivePanel}
            </div>
        </div>
    </>);
}

export default Archive;