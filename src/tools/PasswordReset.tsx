import { useState, type ReactElement } from "react";
import Input from "./Input";
import Button from "./Button";
import { checkInjection, stringValidate } from "../misc/stringValidator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

type FormField = {
        value: string;
        error: string;
    };

type FormFields = {
    password: FormField;
    password_confirm: FormField;
};

function PasswordReset(): ReactElement {
    
    const [passwordData, setPasswordData] = useState<FormFields>({
        password: {
            value: '',
            error: ''
        },
        password_confirm: {
            value: '',
            error: ''
        }
    });

    const handleInputChange = (event: any) => {
        const getId: string = event.target.id;
        const getValue: string = event.target.value;
        try {
            stringValidate("PASSWORD", getValue);
            setPasswordData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
        } catch(err) {
            if (getValue.length != 0) {
                setPasswordData((prev) => ({...prev, [getId]: {value: getValue, error: err}}));
            } else {
                setPasswordData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
            }
        }
    };
    
    return <>
        <div className="upload window bg-(--card-background) md:w-[35rem]! w-[90%]!">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[10rem] h-[7.5rem]" src="/icon.png" alt="logo" />
                <h1 className="text-6xl font-bold">Receiptr</h1>
            </div>
            <h2 className="text-4xl text-center mt-5">Reset Password</h2>
            <Input id="password" title="New password" errorInValue={passwordData.password.error.length != 0} error={passwordData.password.error} value={passwordData.password.value} onChange={handleInputChange} width="100%" />
            <Input id="password_confirm" title="New password again" errorInValue={passwordData.password_confirm.error.length != 0} error={passwordData.password_confirm.error} value={passwordData.password_confirm.value} onChange={handleInputChange} width="100%" />
            <Button className="mt-5" label="Reset Password" width="100%" icon={<FontAwesomeIcon icon={faArrowRotateLeft} />} />
        </div>
    </>
}

export default PasswordReset;