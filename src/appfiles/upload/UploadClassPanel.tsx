import { useEffect, useRef, type ReactElement } from "react";
import Input from "../../tools/Input";

function UploadClassPanel() : ReactElement {
    const uploadField = useRef<HTMLDivElement | null>(null);

    useEffect(() => uploadField.current?.scrollIntoView({'behavior': 'smooth'}), []);

    const Element = () => 
        <div ref={uploadField} id="class-upload" className="grid grid-cols-1 md:grid-cols-3 justify-center items-centerrounded-[15px] bg-(--card-background) rounded-[15px] items-center transition hover:scale-103 cursor-pointer p-5 gap-5">
            <input type="text" placeholder="Name" className="input w-[100%]" />
            <div className="maximize-view relative">
                <input type="color" placeholder="Color" className="maximize-view cursor-pointer absolute opacity-0" />
                <div className="maximize-view rounded-[5px] bg-stone-950"></div>
            </div>
            <button className="btn w-[100%]">Save</button>
        </div>;

    return (<>
        <Element />
    </>);
}

export default UploadClassPanel;