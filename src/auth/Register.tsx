import { NavLink, useNavigate } from 'react-router-dom';
import { stringValidate } from '../misc/stringValidator';
import CountryCodes from './CountryCodes';
import type { inputType } from '../misc/stringValidator';
import { useRef, useState, type ReactElement, type RefObject } from 'react';
import '../tailwind.css'
import '../style.scss'
import {extractResponse, requestResource, verifyCaptcha} from "../misc/receiver.ts";
import Popup from "../tools/Popup.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket} from "@fortawesome/free-solid-svg-icons";
import Button from "../tools/Button.tsx";
import { useGoogleLogin } from '@react-oauth/google';
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY: string = "6LdEgbgsAAAAALhLcvKuOINgF1dn4lN-KOSRFkcV";

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

function Register(): ReactElement {
    const rememberMe: RefObject<boolean> = useRef(false);
    const eulaAccepted: RefObject<boolean> = useRef(false);

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

    const recaptchaRef: RefObject<ReCAPTCHA|null> = useRef(null);
    async function register() {
        setError('');
        for (let field in registerData) {
            if (registerData[field as keyof FormFields].error.length != 0) {
                setError('Fields are incorrect!');
                return;
            }
        }

        if (!eulaAccepted.current) {
            setError("You must accept the EULA!");
            return;
        }

        const body = {
            username: registerData.username.value,
            email: registerData.email.value,
            country_code: registerData.countryCode.value ?? null,
            phone: registerData.tel.value ?? null,
            password: registerData.password.value,
            confirm_password: registerData.confirm_password.value,
            remember_device: rememberMe.current
        }
        try {
            const token = await recaptchaRef.current?.executeAsync();

            if (!token) {
                setError("CAPTCHA Failed!");
                return;
            }

            if (await verifyCaptcha(token)) {
                setError("CAPTCHA Invalid!");
                return;
            }
            recaptchaRef.current?.reset();

            const response = await requestResource<'login'>('register', 'POST', null, null, body);
            await extractResponse<'login'>(response);
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
                setRegisterData((prev) => ({...prev, [getId]: {value: getValue, error: err}}));
            } else {
                setRegisterData((prev) => ({...prev, [getId]: {value: getValue, error: ''}}));
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

    const GoogleSignupButton = () => {
        const login = useGoogleLogin({
            onSuccess: async (tokenResponse) => {
            const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            }).then(res => res.json());

            setRegisterData(prev => ({
                ...prev,
                username: { value: userInfo.name, error: '' },
                email: { value: userInfo.email, error: '' }
            }));
            },
            onError: () => console.error('Google Login Failed'),
        });

        return (
            <button
            onClick={() => login()}
            className="cursor-pointer mt-5 flex items-center w-full bg-[#1a73e8] hover:bg-[#185abc] text-white rounded-md overflow-hidden p-[1px] transition-all"
            style={{ border: '1px solid #1a73e8' }}
            >
            <div className="bg-white p-2 flex items-center justify-center rounded-l-[4px]">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
                alt="Google" 
                className="w-5 h-5" 
                />
            </div>
            
            <span className="flex-grow text-center font-medium text-sm px-4">
                Sign up with Google
            </span>
            </button>
        );
    };

    return (
        <>{error && <Popup type={"ERROR"} message={error} />}
        <div className='flex justify-evenly items-center w-[100vw] h-[100vh]'>
            <div id='banner' className='w-full hidden lg:block'>
                <img draggable={false} src={`/banner_${localStorage.getItem('theme')}.png`} alt='Banner' className='h-[100vh] w-[50vw]' />
            </div>
            <div className='w-full flex flex-col justify-center items-center m-auto'>
                <div className='flex flex-col md:flex-row items-center justify-center mb-10 flex-wrap'>
                    <img src='/icon.png' alt='Logo' className='w-[10rem] h-[7.5rem]' />
                    <h1 className='text-6xl font-bold'>Receiptr</h1>
                </div>
                <fieldset className="fieldset bg-(--fieldset-bg) border-base-300 rounded-box md:w-[50%] w-[90%] border p-4">
                    <legend className="fieldset-legend">Register Account</legend>

                    <label className="label">Username<b className='text-red-500!'>*</b></label>
                    <input id="username" onChange={handleInputChange} type="text" className="input w-full" value={registerData.username.value} />
                    {(registerData.username.error.length != 0) && <span className='error'>{registerData.username.error}</span>}

                    <label className="label">Email<b className='text-red-500!'>*</b></label>
                    <input id='email' onChange={handleInputChange} type="email" className="input w-full" value={registerData.email.value} />
                    {(registerData.email.error.length != 0) && <span className='error'>{registerData.email.error}</span>}

                    <label className="label">Country Code</label>
                    <select onChange={handleSelectChange} className='select w-full' name="" id="countryCode">
                        <option value="">Select your country</option>
                        < CountryCodes/>
                    </select>

                    <label className="label">Phone</label>
                    <input id='tel' onChange={handleInputChange} type="tel" className="input w-full" />
                    {(registerData.tel.error.length != 0) && <span className='error'>{registerData.tel.error}</span>}

                    <label className="label">Password<b className='text-red-500!'>*</b></label>
                    <input id='password' onChange={handleInputChange} type="password" className="input w-full" />
                    {(registerData.password.error.length != 0) && <span className='error'>{registerData.password.error}</span>}

                    <label className="label">Confirm password<b className='text-red-500!'>*</b></label>
                    <input id='confirm_password' onChange={handleInputChange} type="password" className="input w-full" />
                    {(registerData.confirm_password.error.length != 0) && <span className='error'>{registerData.confirm_password.error}</span>}
                    
                    <div className='flex items-center'>
                        <p>I've read and accepted the <a href='https://github.com/Pingitzergggg/Receiptr/blob/main/EULA.md' target='_blank' className='font-bold hover:underline cursor-pointer'>EULA</a><b className='text-red-500!'>*</b></p>
                        <input onClick={() => eulaAccepted.current = true} className='checkbox checkbox-md ml-2' type='checkbox' />
                    </div>

                    <div className='flex items-center'>
                        <p>Remember me</p>
                        <input onClick={() => rememberMe.current = true} className='checkbox checkbox-md ml-2' type='checkbox' />
                    </div>

                    <GoogleSignupButton />
                    
                    <ReCAPTCHA className='z-[20] hidden md:block' size='invisible' sitekey={RECAPTCHA_SITE_KEY} ref={recaptchaRef} />
                    <Button async={true} onClick={register} className='mt-3' width="100%" label="Register" icon={<FontAwesomeIcon icon={faArrowRightToBracket} />} />

                    <p className='hover:underline'><NavLink to='/login'>Back to Login</NavLink></p>
                </fieldset>
            </div>
        </div></>
    )
}

export default Register;