import {type ReactElement, type RefObject, useEffect, useRef, useState} from "react";
import Input from "../../tools/Input.tsx";
import Button from "../../tools/Button.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUpload, faXmark} from "@fortawesome/free-solid-svg-icons";
import {type inputType, stringValidate} from "../../misc/stringValidator.ts";
import {extractResponse, requestResource} from "../../misc/receiver.ts";
import Popup from "../../tools/Popup.tsx";
import Select from "../../tools/Select.tsx";
import codes from "../../misc/CountryCodes.json";

function UploadSettingsPanel(): ReactElement {
    const {type} = useParams();
    const navigate = useNavigate();
    const current_password = useRef<string>('');
    const [data, setData] = useState<{value: string, error: string}>({value: '', error: ''});
    const countryCode: RefObject<string> = useRef('');

    useEffect(() => {
        if (type == undefined || !["Email", "Password", "Phone", "Username"].includes(type)) navigate('/*');
    }, []);

    const handleInputChange = (event : any) => {
        const getId : string = event.target.id;
        const getValue : string = event.target.value;
        const currentCommand : inputType = getId.toUpperCase() as inputType;
        try {
            stringValidate(currentCommand, getValue);
            setData({value: getValue, error: ''});
        } catch(err : any) {
            if (getValue.length != 0) {
                setData({value: getValue, error: err});
            } else {
                setData({value: '', error: ''});
            }
        }
    };

    const [error, setError] = useState<string>('');
    async function upload(): Promise<void> {
        if (!type) return;
        if (type === "Password" && current_password.current.length == 0) {
            setError('Old password is required');
            return;
        }
        if (data.error.length != 0 || data.value.length == 0) {
            setError('Field must be filled!');
            return;
        }
        let body = {[type.toLowerCase()]: data.value};
        if (type === 'Password') body = {...body, current_password: current_password.current};
        if (type === 'Phone') body = {...body, country_code: countryCode.current};
        try {
            const response = await requestResource<'user'>('user', 'PUT', null, null, body);
            await extractResponse<'user'>(response);
            navigate('/settings', {state: {uploadSuccess: true}});
        } catch (error) {
            if (error instanceof WebTransportError) {
                setError(error.message);
            } else {
                setError('Upload failed!');
            }
            console.error(error);
        }
    }

    if (error.length != 0) setTimeout(() => setError(''), 3000);
    return <>{error && <Popup type={"ERROR"} message={error} />}
        <legend className="upload w-[90%]! sm:w-[30rem]!">
        <a onClick={() => navigate('/settings')} className="btn-nav bg-red-400">
            <FontAwesomeIcon icon={faXmark} />
        </a>
        <h2 className="text-2xl font-bold mb-2.5">Change {type}</h2>

        {type === "Phone" &&
            <Select width='100%' title="Country Code" id='cc' errorInValue={false} onChange={(event) => countryCode.current = event.target.value} values={codes.map(value => {return {label: `${value.name} - ${value.dial_code}`, value: value.dial_code}})} />}

        {type === "Password" &&
            <Input type='password' width='100%' onChange={(event) => current_password.current = event.target.value} title={'Current password'} id={'secondary'} errorInValue={false} />}

        <Input type={type === "Password" ? "password" : "text"} width='100%' id={type!.includes("name") ? "name" : type!} title={type!} errorInValue={data.error.length != 0} error={data.error} value={data.value} onChange={handleInputChange} />

        <Button label={'Upload'} onClick={upload} className='mt-5' fontSize="1rem" width="100%" icon={<FontAwesomeIcon icon={faUpload} />} />
    </legend></>
}

export default UploadSettingsPanel;