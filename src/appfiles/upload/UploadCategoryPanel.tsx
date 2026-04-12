import {useEffect, useRef, useState, type ReactElement, type RefObject} from "react";
import Input from "../../tools/Input";
import type { inputField } from "../../misc/types";
import { stringValidate, type inputType } from "../../misc/stringValidator";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {extractResponse, requestResource} from "../../misc/receiver.ts";
import Popup from "../../tools/Popup.tsx";
import Button from "../../tools/Button.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

type updateData = {
    name: string,
    color: string
}

type inputFields = {
    name: inputField,
    color: inputField
}

function UploadCategoryPanel() : ReactElement {
    const {categoryId} = useParams();
    const [searchParams] = useSearchParams();
    const updateData: RefObject<updateData|null> = useRef(null);
    const uploadField = useRef<HTMLDivElement | null>(null);
    const [categoryData, setCategoryData] = useState<inputFields>({
        name: {
            value: updateData.current?.name ?? '',
            error: ''
        },
        color: {
            value: updateData.current?.color ? '#'+updateData.current?.color : '',
            error: ''
        }
    });

    useEffect(() => {
        updateData.current = searchParams.get('data') ? JSON.parse(searchParams.get('data')!) : null;
        setCategoryData({
            name: {
                value: updateData.current?.name ?? '',
                error: ''
            },
            color: {
                value: updateData.current?.color ? '#'+updateData.current?.color : '',
                error: ''
            }
        })
    }, [searchParams.get('data')]);
    useEffect(() => uploadField.current?.scrollIntoView({'behavior': 'smooth'}), []);

    const handleInputChange = (event : any) => {
                const getId : string = event.target.id;
                const getValue : string = event.target.value;
                const currentCommand : inputType = getId.toLowerCase() == 'bank' || getId.toLowerCase() == 'cardtitle' ? 'NAME' : getId.toUpperCase() as inputType;
                try {
                    stringValidate(currentCommand, getValue);
                    setCategoryData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
                } catch(err : any) {
                    if (getValue.length != 0) {
                        setCategoryData((prev) => ({...prev, [getId]: {value: getValue, error: err}}));
                    } else {
                        setCategoryData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
                    }
                }
    };

    const navigate = useNavigate();
    
    const [error, setError] = useState<string>('');
    async function upload() {
        setError('');
        for (let field in categoryData) {
            if (categoryData[field as keyof inputFields].error.length != 0) {
                setError("All fields must be correct!");
                return
            }
        }
        try {
            const response = await requestResource<'categories'>('categories', updateData.current ? 'PUT' : 'POST', categoryId ?? null, null, {
                title: categoryData.name.value,
                color: categoryData.color.value
            });
            await extractResponse<'categories'>(response);
            navigate('/categories', {state: {uploadSuccess: true}});
        } catch (error) {
            if (error instanceof WebTransportError) {
                setError(error.message);
            } else {
                setError('Upload failed!');
            }
            console.log(error);
        }
    }
        
    return <>
        {error &&
            <div className='flex justify-center'><Popup type={"ERROR"} message={error} /></div>}
        <div ref={uploadField} id="class-upload" className="grid grid-cols-1 md:grid-cols-3 justify-center bg-(--card-background) rounded-[15px] items-center cursor-pointer p-5 gap-5">
            <Input id="name" title="Name" errorInValue={false} width="100%" className="m-0!" onChange={handleInputChange} value={categoryData.name.value} />
            <div className="h-[2.5rem] md:h-full w-full relative">
                <input type="color" id="color" placeholder="Color" className="maximize-view cursor-pointer absolute opacity-0" onChange={handleInputChange} value={categoryData.color.value} />
                <div className={`maximize-view rounded-[5px]`} style={categoryData.color.value ? {backgroundColor: categoryData.color.value} : {backgroundColor: 'black'}}></div>
            </div>
            <Button label="Upload" async={true} width="100%" onClick={upload} icon={<FontAwesomeIcon icon={faUpload} />} />
        </div></>;
}

export default UploadCategoryPanel;