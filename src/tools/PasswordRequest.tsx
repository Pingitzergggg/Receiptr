import { useState, type ReactElement } from "react";
import Input from "./Input";
import Button from "./Button";
import { stringValidate } from "../misc/stringValidator";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { domainUrl } from "../misc/receiver";

type FieldType = {
    value: string,
    error: string
}

function PasswordRequest(): ReactElement {
    const navigate = useNavigate();
    const [email, setEmail] = useState<FieldType>({
        value: '',
        error: ''
    });

    async function load() {
        try {
            if (email.error.length || !email.value.length) return;
            console.log("fetching data...")
            const response = await fetch(domainUrl+"/api/receiptr/request-password-reset", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: email.value})
            });

            if (!response.ok) throw Error(await response.json());
            navigate('/login', {state: {
                globalPopup: {message: 'Email sent!', type: 'SUCCESS'},
                passwordRequest: true
            }});
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        <div className="upload window bg-(--card-background) md:w-[35rem]! w-[90%]!">
            <div className="flex flex-col justify-center items-center">
                <img className="w-[10rem] h-[7.5rem]" src="/icon.png" alt="logo" />
                <h1 className="text-6xl font-bold">Receiptr</h1>
            </div>
            <h2 className="text-4xl text-center my-5">Request Password</h2>
            <Input id="email" title="Email" errorInValue={email.error.length != 0} error={email.error} value={email.value} width="100%"
                onChange={event => {
                    try {
                        stringValidate("EMAIL", event.target.value);
                        setEmail({value: event.target.value, error: ''});
                    } catch (error: any) {
                        if (event.target.value.length == 0) {
                            setEmail({value: '', error: ''})
                        } else {
                            setEmail({value: event.target.value, error: error});
                        }
                    }
                    console.log(email)
                }} />
            <Button onClick={load} className="mt-5" label="Reset Password" width="100%" icon={<FontAwesomeIcon icon={faArrowRotateLeft} />} />
        </div>
    </>
}

export default PasswordRequest;