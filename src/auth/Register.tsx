import { NavLink, useNavigate } from 'react-router-dom';
import { stringValidate } from '../misc/stringValidator';
import CountryCodes from './CountryCodes';
import type { inputType } from '../misc/stringValidator';
import { useState } from 'react';
import '../tailwind.css'
import '../style.scss'
import {extractResponse, requestResource} from "../misc/receiver.ts";
import Popup from "../tools/Popup.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import Button from "../tools/Button.tsx";

function Register() : any {

    type FormField = {
        value: string;
        error: string;
    };

    type FormFields = {
        username: FormField;
        email: FormField;
        tel: FormField;
        password: FormField;
        confirm_password: FormField;
        countryCode: FormField;
    };

    const [registerData, setRegisterData] = useState<FormFields>({
        username: {
            value: '',
            error: '',
        },
        email: {
            value: '',
            error: '',
        },
        tel: {
            value: '',
            error: '',
        },
        password: {
            value: '',
            error: '',
        },
        confirm_password: {
            value: '',
            error: ''
        },
        countryCode: {
            value: '',
            error: ''
        }
    });

    const [error, setError] = useState<string>('');

    async function register() {
        setError('');
        for (let field in registerData) {
            if (registerData[field as keyof FormFields].error.length != 0) {
                setError('Fields are incorrect!');
                return;
            }
        }
        const body = {
            username: registerData.username.value,
            email: registerData.email.value,
            country_code: registerData.countryCode.value ?? null,
            phone: registerData.tel.value ?? null,
            password: registerData.password.value,
            confirm_password: registerData.confirm_password.value
        }
        try {
            const response = await requestResource<'user'>('register', 'POST', null, null, body, true);
            await extractResponse<'user'>(response);
            sessionStorage.removeItem('cards');
            sessionStorage.removeItem('receipts');
            sessionStorage.removeItem('categories');
            navigate('/', {state: {fromLogin: true}});
        } catch (error) {
            if (error instanceof WebTransportError) {
                setError(error.message);
            } else {
                setError('Error occurred!');
            }
            console.error(error);
        }
    }

    const handleInputChange = (event : any) => {
        const getId: string = event.target.id;
        const getValue: string = event.target.value;
        const currentCommand: inputType = getId.toLowerCase().includes('password') ? 'PASSWORD' : getId.toLowerCase().includes('name') ? 'NAME' :  getId.toUpperCase() as inputType;
        try {
            stringValidate(currentCommand, getValue);
            setRegisterData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
        } catch(err : any) {
            if (getValue.length != 0) {
                setRegisterData((prev) => ({...prev, [getId]: {value: '', error: err}}));
            } else {
                setRegisterData((prev) => ({...prev, [getId]: {value: '', error: ''}}));
            }
        }
    };

    const handleSelectChange = (event : any) => {
        const getValue = event.target.value;
        if (getValue.length != 0) {
            setRegisterData((prev) => ({...prev, countryCode : {value : getValue, error: ''}}));
        } else {
            setRegisterData((prev) => ({...prev, countryCode : {value : '', error: ''}}));
        }
    }

    const navigate = useNavigate();

    return (
        <>{error && <Popup type={"ERROR"} message={error} />}
        <div className='flex justify-evenly items-center w-[100vw] h-[100vh]'>
            <div className='w-full hidden lg:block'>
                <img src='/banner.jpg' alt='Banner' className='h-[100vh] w-[50vw]' />
            </div>
            <div className='w-full flex flex-col justify-center items-center'>
                <div className='flex items-center justify-center mb-10 flex-wrap'>
                    <img src='/icon.png' alt='Logo' className='w-[10rem] h-[7.5rem]' />
                    <h1 className='text-6xl font-bold'>Receiptr</h1>
                </div>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box md:w-[50%] w-[90%] border p-4">
                    <legend className="fieldset-legend">Register Account</legend>

                    <label className="label">Username<b className='text-red-500!'>*</b></label>
                    <input id="username" onChange={handleInputChange} type="text" className="input w-full" placeholder="First Name" />
                    {(registerData.username.error.length != 0) && <span className='error'>{registerData.username.error}</span>}

                    <label className="label">Email<b className='text-red-500!'>*</b></label>
                    <input id='email' onChange={handleInputChange} type="email" className="input w-full" placeholder="Email" />
                    {(registerData.email.error.length != 0) && <span className='error'>{registerData.email.error}</span>}

                    <label className="label">Country Code</label>
                    <select onChange={handleSelectChange} className='select w-full' name="" id="countryCode">
                        <option value="">Select your country</option>
                        < CountryCodes/>
                    </select>

                    <label className="label">Phone</label>
                    <input id='tel' onChange={handleInputChange} type="tel" className="input w-full" placeholder="Phone" />
                    {(registerData.tel.error.length != 0) && <span className='error'>{registerData.tel.error}</span>}

                    <label className="label">Password<b className='text-red-500!'>*</b></label>
                    <input id='password' onChange={handleInputChange} type="password" className="input w-full" placeholder="Password" />
                    {(registerData.password.error.length != 0) && <span className='error'>{registerData.password.error}</span>}

                    <label className="label">Confirm password<b className='text-red-500!'>*</b></label>
                    <input id='confirm_password' onChange={handleInputChange} type="password" className="input w-full" placeholder="Password" />
                    {(registerData.confirm_password.error.length != 0) && <span className='error'>{registerData.confirm_password.error}</span>}

                    <Button onClick={register} className='mt-3' width="100%" label="Register" icon={<FontAwesomeIcon icon={faArrowRightToBracket} />} />

                    <p>Back to <NavLink to='/login'>Login</NavLink></p>
                </fieldset>
                <p className='italic text-right absolute right-1 bottom-1'>
                    Application by <a className='hover:underline' href='https://github.com/Fyrra1' target='_blank'><b>Fyrra</b></a> <a className='hover:underline' href='https://github.com/TrxpleD23' target='_blank'><b>Guido</b></a> <a className='hover:underline' href='https://github.com/Pingitzergggg' target='_blank'><b>Pingitzergggg</b></a><br/>
                    This software is under the <a className='hover:underline' href='https://github.com/Pingitzergggg/Receiptr/blob/main/README.md' target='_blank'><b>MIT License</b></a> {/*Replace link to actual License when created*/}
                </p>
            </div>
        </div></>
    )
}

export default Register;