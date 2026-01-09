import { useEffect, useRef, useState, type ReactElement } from "react";
import Input from "../../tools/Input";
import type { inputField } from "../../misc/types";
import { stringValidate, type inputType } from "../../misc/stringValidator";

type inputFields = {
    name: inputField,
    color: inputField
}

function UploadClassPanel() : ReactElement {
    const uploadField = useRef<HTMLDivElement | null>(null);
    const [classData, setClassData] = useState<inputFields>({
        name: {
            value: '',
            error: ''
        },
        color: {
            value: '',
            error: ''
        }
    });

    useEffect(() => uploadField.current?.scrollIntoView({'behavior': 'smooth'}), []);

    const handleInputChange = (event : any) => {
                const getId : string = event.target.id;
                const getValue : string = event.target.value;
                const currentCommand : inputType = getId.toLowerCase() == 'bank' || getId.toLowerCase() == 'cardtitle' ? 'NAME' : getId.toUpperCase() as inputType;
                try {
                    stringValidate(currentCommand, getValue);
                    setClassData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
                } catch(err : any) {
                    if (getValue.length != 0) {
                        setClassData((prev) => ({...prev, [getId]: {value: getValue, error: err}}));
                    } else {
                        setClassData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
                    }
                }
    };

    const Element = () => 
        <div ref={uploadField} id="class-upload" className="grid grid-cols-1 md:grid-cols-3 justify-center items-centerrounded-[15px] bg-(--card-background) rounded-[15px] items-center transition hover:scale-103 cursor-pointer p-5 gap-5">
            <Input id="name" title="Name" errorInValue={false} width="100%" className="m-0!" />
            <div className="maximize-view relative">
                <input type="color" id="color" placeholder="Color" className="maximize-view cursor-pointer absolute opacity-0" onChange={handleInputChange} />
                <div className={`maximize-view rounded-[5px]`} style={classData.color.value ? {backgroundColor: classData.color.value} : {backgroundColor: 'black'}}></div>
            </div>
            <button className="btn w-[100%]">Save</button>
        </div>;
        
    return (<>
        <Element />
    </>);
}

export default UploadClassPanel;