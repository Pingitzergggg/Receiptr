import { useState, type ReactElement } from "react";
import Input from "./Input";
import Button from "./Button";
import { stringValidate } from "../misc/stringValidator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import Popup from "./Popup";
import NotFound from "./NotFound";
import { domainUrl } from "../misc/receiver";

type FormField = {
        value: string;
        error: string;
    };

type FormFields = {
    password: FormField;
    password_confirm: FormField;
};

function PasswordReset(): ReactElement {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const email: string|null = params.get('email');
    const token: string|null = params.get('token');
    
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

    const [error, setError] = useState<string>('');
    async function load() {
        try {
            if (!email || !token) {
                setError('Invalid URL parameters!');
                return;
            }
            if (passwordData.password.error || passwordData.password_confirm.error) return;
            const response = await fetch(domainUrl+"/api/receiptr/reset-password", {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    token: token,
                    password: passwordData.password.value,
                    password_confirmation: passwordData.password_confirm.value
                })
            });
            const data = await response.json();
    
            if (!response.ok) {
                if (data.toDisplay) {
                    setError(data.error);
                } else {
                    setError("Error occurred!");
                }
            } else {
                navigate("/login", {state: {passwordReset: true}});
            }
        } catch {
            console.error("Request failed!");
        }
    }
    
    let Element: ReactElement = <>
        {error && <Popup type="ERROR" message={error} />}
        <div className="upload window bg-(--card-background) md:w-[35rem]! w-[90%]!">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[10rem] h-[7.5rem]" src="/icon.png" alt="logo" />
                <h1 className="text-6xl font-bold">Receiptr</h1>
            </div>
            <h2 className="text-4xl text-center my-5">Reset Password</h2>
            <Input id="password" title="New password" errorInValue={passwordData.password.error.length != 0} error={passwordData.password.error} value={passwordData.password.value} onChange={handleInputChange} width="100%" />
            <Input id="password_confirm" title="New password again" errorInValue={passwordData.password_confirm.error.length != 0} error={passwordData.password_confirm.error} value={passwordData.password_confirm.value} onChange={handleInputChange} width="100%" />
            <Button onClick={load} className="mt-5" label="Reset Password" width="100%" icon={<FontAwesomeIcon icon={faArrowRotateLeft} />} />
        </div>
    </>;

    
    if (!email || !token) {
        Element = <NotFound />;
    }

    return Element;
}

export default PasswordReset;