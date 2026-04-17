import {type ReactElement, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";
import {type endpoints, extractResponse, paginate, requestResource} from "../misc/receiver.ts";
import Popup from "./Popup.tsx";
import type {paginatable} from "../misc/databaseTables.ts";

type ArchiveType = {
    id: number;
    title: string;
}

type PropsType = {
    type: "Receipts" | "Cards" | "Categories"
}

function Archive<T extends keyof paginatable>({type}: PropsType): ReactElement {
    const location = useLocation();
    const navigate = useNavigate();
    const [archive, setArchive] = useState<ArchiveType[]>([]);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        async function effect() {
            try {
                const response = await requestResource<"trash">('archive', 'GET', type.toLowerCase());
                const result: ArchiveType[]|null = await extractResponse<"trash">(response);
                if (result) setArchive(result);
            } catch (error) {
                console.error(error);
            }
        }
        effect();
    }, [location.state]);

    async function restore(id: number) {
        try {
            const response = await requestResource<"trash">('archive', 'PUT', type.toLowerCase()+"/"+id);
            await extractResponse<"trash">(response);
            await paginate<T>(type.toLowerCase() as endpoints, 0);
            setError('');
            navigate(`/settings/archive/${type.toLowerCase()}`, {state: {
                globalPopup: {message: 'Item archived!', type: "SUCCESS"},
                restoreSuccess: true
            }});
        } catch (error) {
            console.error(error);
            setError('Restore failed!');
        }
    }

    const archivePanel: ReactElement[] = archive.map(archivedElement => {
        return(<div className='flex bg-(--bg-color) rounded-[15px] p-2 justify-between items-center transition hover:scale-102'>
            <p>{archivedElement.title}</p>
            <a onClick={() => restore(archivedElement.id)} title='Restore' className='transition hover:scale-120 hover:text-(--accent-color) cursor-pointer'>
                <svg className='w-[1.5rem] h-[1.5rem]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#127012" d="M263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9C237.1 56.8 249.3 48 263.1 48zM128 208L512 208L490.9 531.1C489.3 556.4 468.3 576 443 576L197 576C171.7 576 150.7 556.4 149.1 531.1L128 208zM337 287C327.6 277.6 312.4 277.6 303.1 287L231.1 359C221.7 368.4 221.7 383.6 231.1 392.9C240.5 402.2 255.7 402.3 265 392.9L296 361.9L296 464C296 477.3 306.7 488 320 488C333.3 488 344 477.3 344 464L344 361.9L375 392.9C384.4 402.3 399.6 402.3 408.9 392.9C418.2 383.5 418.3 368.3 408.9 359L336.9 287z"/></svg>
            </a>
        </div>);
    })
    return (<>
        {error && <Popup type={'ERROR'} message={error} />}
        {location.state?.restoreSuccess && <Popup type={'SUCCESS'} message={'Item restored'} />}
        <div className="absolute-center window bg-(--card-background) rounded-[15px] p-5 md:w-[25rem] w-[90%]">
            <div className='flex justify-end'>
                <a onClick={() => navigate('/settings')} className="btn-nav bg-red-400">
                    <FontAwesomeIcon icon={faXmark} />
                </a>
            </div>
            <h2 className='text-2xl font-bold mb-5'>Archived {type}</h2>
            <div className="grid grid-cols-1 gap-2">
                {archivePanel}
                {archivePanel.length == 0 && <p>Empty</p>}
            </div>
        </div>
    </>);
}

export default Archive;